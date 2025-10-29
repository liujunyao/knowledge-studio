"""
LLM Models API endpoints
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from app.services.llm_service import LLMService

router = APIRouter()

class ModelInfo(BaseModel):
    model_config = {"protected_namespaces": ()}

    provider: str
    model_id: str
    display_name: str
    available: bool

# 模型显示名称映射
MODEL_DISPLAY_NAMES = {
    "gpt-4": "GPT-4",
    "gpt-4-turbo": "GPT-4 Turbo",
    "gpt-4o": "GPT-4o",
    "gpt-3.5-turbo": "GPT-3.5 Turbo",
    "claude-3-5-sonnet-20241022": "Claude 3.5 Sonnet",
    "claude-3-opus-20240229": "Claude 3 Opus",
    "claude-3-sonnet-20240229": "Claude 3 Sonnet",
    "claude-3-haiku-20240307": "Claude 3 Haiku",
    "gemini-pro": "Gemini Pro",
    "gemini-1.5-pro": "Gemini 1.5 Pro",
    "gemini-1.5-flash": "Gemini 1.5 Flash",
    "llama3.2": "Llama 3.2",
    "llama3.1": "Llama 3.1",
    "qwen2.5": "Qwen 2.5",
    "mistral": "Mistral"
}

@router.get("/", response_model=List[ModelInfo])
async def list_models():
    """List available LLM models from all providers"""
    models = []
    all_models = LLMService.list_models()

    for provider, model_ids in all_models.items():
        for model_id in model_ids:
            models.append(ModelInfo(
                provider=provider,
                model_id=model_id,
                display_name=MODEL_DISPLAY_NAMES.get(model_id, model_id),
                available=True
            ))

    return models

@router.get("/{provider}", response_model=List[ModelInfo])
async def list_provider_models(provider: str):
    """List models for a specific provider"""
    models = []
    provider_models = LLMService.list_models(provider)

    if provider not in provider_models:
        return []

    for model_id in provider_models[provider]:
        models.append(ModelInfo(
            provider=provider,
            model_id=model_id,
            display_name=MODEL_DISPLAY_NAMES.get(model_id, model_id),
            available=True
        ))

    return models
