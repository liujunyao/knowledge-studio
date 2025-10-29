"""
Chat API endpoints with LiteLLM integration
"""
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional
import json

from app.db.database import get_db
from app.models.conversation import Conversation, Message, ModelProvider
from app.services.llm_service import LLMService

router = APIRouter()

# Pydantic schemas
class ChatRequest(BaseModel):
    model_config = {"protected_namespaces": ()}

    conversation_id: str
    content: str
    model_provider: ModelProvider
    model_name: str
    api_key: Optional[str] = None
    temperature: float = 0.7
    max_tokens: Optional[int] = None
    stream: bool = False

class ChatResponse(BaseModel):
    message_id: str
    content: str
    role: str = "assistant"

class MessageCreate(BaseModel):
    content: str
    role: str

class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    role: str
    content: str
    created_at: str

    class Config:
        from_attributes = True

class SendMessageResponse(BaseModel):
    user_message: MessageResponse
    assistant_message: MessageResponse

@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    发送消息并获取 AI 回复(非流式)
    """
    # 验证对话是否存在
    result = await db.execute(
        select(Conversation).where(Conversation.id == request.conversation_id)
    )
    conversation = result.scalar_one_or_none()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # 验证模型是否支持
    if not LLMService.validate_model(request.model_provider.value, request.model_name):
        raise HTTPException(
            status_code=400,
            detail=f"Model {request.model_name} not supported for provider {request.model_provider.value}"
        )

    # 保存用户消息
    user_message = Message(
        conversation_id=request.conversation_id,
        role="user",
        content=request.content
    )
    db.add(user_message)
    await db.flush()

    # 获取对话历史
    messages_result = await db.execute(
        select(Message)
        .where(Message.conversation_id == request.conversation_id)
        .order_by(Message.created_at.asc())
    )
    history = messages_result.scalars().all()

    # 构建消息列表
    messages = [
        {"role": msg.role, "content": msg.content}
        for msg in history
    ]

    try:
        # 调用 LLM
        response = await LLMService.chat_completion(
            provider=request.model_provider.value,
            model_name=request.model_name,
            messages=messages,
            api_key=request.api_key,
            temperature=request.temperature,
            max_tokens=request.max_tokens,
            stream=False
        )

        # 提取回复内容
        assistant_content = response.choices[0].message.content

        # 保存 AI 回复
        assistant_message = Message(
            conversation_id=request.conversation_id,
            role="assistant",
            content=assistant_content
        )
        db.add(assistant_message)
        await db.flush()
        await db.refresh(assistant_message)

        return ChatResponse(
            message_id=assistant_message.id,
            content=assistant_content,
            role="assistant"
        )

    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/stream")
async def chat_stream(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    发送消息并获取 AI 流式回复
    """
    # 验证对话是否存在
    result = await db.execute(
        select(Conversation).where(Conversation.id == request.conversation_id)
    )
    conversation = result.scalar_one_or_none()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # 验证模型是否支持
    if not LLMService.validate_model(request.model_provider.value, request.model_name):
        raise HTTPException(
            status_code=400,
            detail=f"Model {request.model_name} not supported for provider {request.model_provider.value}"
        )

    # 保存用户消息
    user_message = Message(
        conversation_id=request.conversation_id,
        role="user",
        content=request.content
    )
    db.add(user_message)
    await db.flush()

    # 获取对话历史
    messages_result = await db.execute(
        select(Message)
        .where(Message.conversation_id == request.conversation_id)
        .order_by(Message.created_at.asc())
    )
    history = messages_result.scalars().all()

    # 构建消息列表
    messages = [
        {"role": msg.role, "content": msg.content}
        for msg in history
    ]

    async def generate():
        full_content = ""
        message_id = None

        try:
            # 调用 LLM (流式)
            stream = await LLMService.chat_completion(
                provider=request.model_provider.value,
                model_name=request.model_name,
                messages=messages,
                api_key=request.api_key,
                temperature=request.temperature,
                max_tokens=request.max_tokens,
                stream=True
            )

            # 流式返回内容
            async for chunk in stream:
                if chunk.get("type") == "content":
                    content = chunk.get("content", "")
                    full_content += content
                    yield f"data: {json.dumps({'content': content})}\n\n"

            # 保存完整的 AI 回复
            assistant_message = Message(
                conversation_id=request.conversation_id,
                role="assistant",
                content=full_content
            )
            db.add(assistant_message)
            await db.flush()
            await db.refresh(assistant_message)
            message_id = assistant_message.id

            # 发送完成信号
            yield f"data: {json.dumps({'type': 'done', 'message_id': message_id})}\n\n"

        except Exception as e:
            await db.rollback()
            yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream"
    )

@router.post("/{conversation_id}", response_model=SendMessageResponse)
async def send_message(
    conversation_id: str,
    message: MessageCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    发送消息到对话并获取 AI 回复
    """
    # 验证对话是否存在
    result = await db.execute(
        select(Conversation).where(Conversation.id == conversation_id)
    )
    conversation = result.scalar_one_or_none()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # 保存用户消息
    user_message = Message(
        conversation_id=conversation_id,
        role=message.role,
        content=message.content
    )
    db.add(user_message)
    await db.flush()
    await db.refresh(user_message)

    # 获取对话历史
    messages_result = await db.execute(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc())
    )
    history = messages_result.scalars().all()

    # 构建消息列表
    messages = [
        {"role": msg.role, "content": msg.content}
        for msg in history
    ]

    try:
        # 调用 LLM
        response = await LLMService.chat_completion(
            provider=conversation.model_provider.value,
            model_name=conversation.model_name,
            messages=messages,
            temperature=0.7,
            stream=False
        )

        # 提取回复内容
        assistant_content = response.choices[0].message.content

        # 保存 AI 回复
        assistant_message = Message(
            conversation_id=conversation_id,
            role="assistant",
            content=assistant_content
        )
        db.add(assistant_message)
        await db.commit()
        await db.refresh(assistant_message)

        return SendMessageResponse(
            user_message=MessageResponse(
                id=user_message.id,
                conversation_id=user_message.conversation_id,
                role=user_message.role,
                content=user_message.content,
                created_at=user_message.created_at.isoformat()
            ),
            assistant_message=MessageResponse(
                id=assistant_message.id,
                conversation_id=assistant_message.conversation_id,
                role=assistant_message.role,
                content=assistant_content,
                created_at=assistant_message.created_at.isoformat()
            )
        )

    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
