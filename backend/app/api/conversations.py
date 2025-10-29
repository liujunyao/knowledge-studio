"""
Conversations API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from typing import List
from pydantic import BaseModel
from datetime import datetime

from app.db.database import get_db
from app.models.conversation import Conversation, Message, ModelProvider

router = APIRouter()

# Pydantic schemas
class MessageCreate(BaseModel):
    role: str
    content: str

class ConversationCreate(BaseModel):
    model_config = {"protected_namespaces": ()}

    title: str
    model_provider: ModelProvider
    model_name: str
    project_id: str | None = None

class MessageResponse(BaseModel):
    id: str
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

class ConversationResponse(BaseModel):
    model_config = {"protected_namespaces": (), "from_attributes": True}

    id: str
    title: str
    model_provider: str
    model_name: str
    created_at: datetime
    updated_at: datetime
    message_count: int = 0
    has_knowledge: bool = False

@router.post("/", response_model=ConversationResponse)
async def create_conversation(
    conversation: ConversationCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create a new conversation"""
    db_conversation = Conversation(**conversation.model_dump())
    db.add(db_conversation)
    await db.flush()
    await db.refresh(db_conversation)

    return ConversationResponse(
        **db_conversation.__dict__,
        message_count=0,
        has_knowledge=False
    )

@router.get("/", response_model=List[ConversationResponse])
async def list_conversations(
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
):
    """List all conversations"""
    result = await db.execute(
        select(Conversation)
        .options(
            selectinload(Conversation.messages),
            selectinload(Conversation.knowledge_points)
        )
        .order_by(Conversation.updated_at.desc())
        .offset(skip)
        .limit(limit)
    )
    conversations = result.scalars().all()

    response_items: List[ConversationResponse] = []
    for conv in conversations:
        knowledge_count = len(conv.knowledge_points or [])
        response_items.append(
            ConversationResponse(
                **conv.__dict__,
                message_count=len(conv.messages) if conv.messages else 0,
                has_knowledge=knowledge_count > 0
            )
        )
    return response_items

@router.get("/{conversation_id}", response_model=ConversationResponse)
async def get_conversation(
    conversation_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get a conversation by ID"""
    result = await db.execute(
        select(Conversation)
        .options(
            selectinload(Conversation.messages),
            selectinload(Conversation.knowledge_points)
        )
        .where(Conversation.id == conversation_id)
    )
    conversation = result.scalar_one_or_none()

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    knowledge_count = len(conversation.knowledge_points or [])
    return ConversationResponse(
        **conversation.__dict__,
        message_count=len(conversation.messages) if conversation.messages else 0,
        has_knowledge=knowledge_count > 0
    )

@router.post("/{conversation_id}/messages", response_model=MessageResponse)
async def add_message(
    conversation_id: str,
    message: MessageCreate,
    db: AsyncSession = Depends(get_db)
):
    """Add a message to a conversation"""
    # Verify conversation exists
    result = await db.execute(
        select(Conversation).where(Conversation.id == conversation_id)
    )
    conversation = result.scalar_one_or_none()

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # Create message
    db_message = Message(
        conversation_id=conversation_id,
        **message.model_dump()
    )
    db.add(db_message)
    await db.flush()
    await db.refresh(db_message)

    return MessageResponse(**db_message.__dict__)

@router.get("/{conversation_id}/messages", response_model=List[MessageResponse])
async def get_messages(
    conversation_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get all messages in a conversation"""
    result = await db.execute(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc())
    )
    messages = result.scalars().all()

    return [MessageResponse(**msg.__dict__) for msg in messages]

@router.delete("/{conversation_id}")
async def delete_conversation(
    conversation_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Delete a conversation"""
    result = await db.execute(
        select(Conversation).where(Conversation.id == conversation_id)
    )
    conversation = result.scalar_one_or_none()

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    await db.delete(conversation)
    return {"message": "Conversation deleted successfully"}
