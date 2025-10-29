"""
Settings and Model Configuration API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

from app.db.database import get_db
from app.models.settings import ModelConfig, AppSettings, APIKeyStorage

router = APIRouter()

# ============= Model Config Schemas =============

class ModelConfigCreate(BaseModel):
    model_config = {"protected_namespaces": ()}

    name: str
    provider: str
    model_id: str
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    default_temperature: str = "0.7"
    default_max_tokens: Optional[str] = None
    extra_params: Optional[Dict[str, Any]] = None
    is_default: bool = False

class ModelConfigUpdate(BaseModel):
    model_config = {"protected_namespaces": ()}

    name: Optional[str] = None
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    default_temperature: Optional[str] = None
    default_max_tokens: Optional[str] = None
    extra_params: Optional[Dict[str, Any]] = None
    is_active: Optional[bool] = None
    is_default: Optional[bool] = None

class ModelConfigResponse(BaseModel):
    model_config = {"protected_namespaces": (), "from_attributes": True}

    id: str
    name: str
    provider: str
    model_id: str
    base_url: Optional[str] = None
    default_temperature: str
    default_max_tokens: Optional[str] = None
    extra_params: Optional[Dict[str, Any]] = None
    is_active: bool
    is_default: bool
    has_api_key: bool  # 不返回实际 key,只返回是否已配置
    created_at: datetime
    updated_at: datetime

# ============= App Settings Schemas =============

class AppSettingsCreate(BaseModel):
    key: str
    value: Optional[str] = None
    value_type: str = "string"
    category: str = "general"
    description: Optional[str] = None

class AppSettingsUpdate(BaseModel):
    value: Optional[str] = None
    description: Optional[str] = None

class AppSettingsResponse(BaseModel):
    model_config = {"from_attributes": True}

    id: str
    key: str
    value: Optional[str] = None
    value_type: str
    category: str
    description: Optional[str] = None
    created_at: datetime
    updated_at: datetime

# ============= API Key Storage Schemas =============

class APIKeyCreate(BaseModel):
    provider: str
    api_key: str

class APIKeyResponse(BaseModel):
    provider: str
    is_valid: bool
    last_validated: Optional[datetime] = None
    has_key: bool

# ============= Model Config Endpoints =============

@router.post("/models", response_model=ModelConfigResponse)
async def create_model_config(
    config: ModelConfigCreate,
    db: AsyncSession = Depends(get_db)
):
    """创建新的模型配置"""

    # 如果设置为默认,取消其他默认模型
    if config.is_default:
        result = await db.execute(
            select(ModelConfig).where(ModelConfig.is_default == True)
        )
        old_defaults = result.scalars().all()
        for old_default in old_defaults:
            old_default.is_default = False

    # 创建新配置
    db_config = ModelConfig(**config.model_dump())
    db.add(db_config)
    await db.flush()
    await db.refresh(db_config)

    return ModelConfigResponse(
        **db_config.__dict__,
        has_api_key=bool(db_config.api_key)
    )

@router.get("/models", response_model=List[ModelConfigResponse])
async def list_model_configs(
    provider: Optional[str] = None,
    is_active: Optional[bool] = None,
    db: AsyncSession = Depends(get_db)
):
    """获取所有模型配置"""
    query = select(ModelConfig)

    if provider:
        query = query.where(ModelConfig.provider == provider)
    if is_active is not None:
        query = query.where(ModelConfig.is_active == is_active)

    query = query.order_by(ModelConfig.is_default.desc(), ModelConfig.created_at.desc())

    result = await db.execute(query)
    configs = result.scalars().all()

    return [
        ModelConfigResponse(
            **config.__dict__,
            has_api_key=bool(config.api_key)
        )
        for config in configs
    ]

@router.get("/models/{config_id}", response_model=ModelConfigResponse)
async def get_model_config(
    config_id: str,
    db: AsyncSession = Depends(get_db)
):
    """获取单个模型配置"""
    result = await db.execute(
        select(ModelConfig).where(ModelConfig.id == config_id)
    )
    config = result.scalar_one_or_none()

    if not config:
        raise HTTPException(status_code=404, detail="Model config not found")

    return ModelConfigResponse(
        **config.__dict__,
        has_api_key=bool(config.api_key)
    )

@router.patch("/models/{config_id}", response_model=ModelConfigResponse)
async def update_model_config(
    config_id: str,
    update: ModelConfigUpdate,
    db: AsyncSession = Depends(get_db)
):
    """更新模型配置"""
    result = await db.execute(
        select(ModelConfig).where(ModelConfig.id == config_id)
    )
    config = result.scalar_one_or_none()

    if not config:
        raise HTTPException(status_code=404, detail="Model config not found")

    # 如果设置为默认,取消其他默认模型
    if update.is_default:
        result = await db.execute(
            select(ModelConfig).where(
                ModelConfig.is_default == True,
                ModelConfig.id != config_id
            )
        )
        old_defaults = result.scalars().all()
        for old_default in old_defaults:
            old_default.is_default = False

    # 更新字段
    update_data = update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(config, key, value)

    await db.flush()
    await db.refresh(config)

    return ModelConfigResponse(
        **config.__dict__,
        has_api_key=bool(config.api_key)
    )

@router.delete("/models/{config_id}")
async def delete_model_config(
    config_id: str,
    db: AsyncSession = Depends(get_db)
):
    """删除模型配置"""
    result = await db.execute(
        select(ModelConfig).where(ModelConfig.id == config_id)
    )
    config = result.scalar_one_or_none()

    if not config:
        raise HTTPException(status_code=404, detail="Model config not found")

    await db.delete(config)
    return {"message": "Model config deleted successfully"}

# ============= App Settings Endpoints =============

@router.post("/app", response_model=AppSettingsResponse)
async def create_app_setting(
    setting: AppSettingsCreate,
    db: AsyncSession = Depends(get_db)
):
    """创建应用设置"""
    # 检查 key 是否已存在
    result = await db.execute(
        select(AppSettings).where(AppSettings.key == setting.key)
    )
    existing = result.scalar_one_or_none()

    if existing:
        raise HTTPException(status_code=400, detail="Setting key already exists")

    db_setting = AppSettings(**setting.model_dump())
    db.add(db_setting)
    await db.flush()
    await db.refresh(db_setting)

    return AppSettingsResponse(**db_setting.__dict__)

@router.get("/app", response_model=List[AppSettingsResponse])
async def list_app_settings(
    category: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """获取所有应用设置"""
    query = select(AppSettings)

    if category:
        query = query.where(AppSettings.category == category)

    query = query.order_by(AppSettings.category, AppSettings.key)

    result = await db.execute(query)
    settings = result.scalars().all()

    return [AppSettingsResponse(**s.__dict__) for s in settings]

@router.get("/app/{key}", response_model=AppSettingsResponse)
async def get_app_setting(
    key: str,
    db: AsyncSession = Depends(get_db)
):
    """获取单个应用设置"""
    result = await db.execute(
        select(AppSettings).where(AppSettings.key == key)
    )
    setting = result.scalar_one_or_none()

    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")

    return AppSettingsResponse(**setting.__dict__)

@router.patch("/app/{key}", response_model=AppSettingsResponse)
async def update_app_setting(
    key: str,
    update: AppSettingsUpdate,
    db: AsyncSession = Depends(get_db)
):
    """更新应用设置"""
    result = await db.execute(
        select(AppSettings).where(AppSettings.key == key)
    )
    setting = result.scalar_one_or_none()

    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")

    update_data = update.model_dump(exclude_unset=True)
    for k, v in update_data.items():
        setattr(setting, k, v)

    await db.flush()
    await db.refresh(setting)

    return AppSettingsResponse(**setting.__dict__)

@router.delete("/app/{key}")
async def delete_app_setting(
    key: str,
    db: AsyncSession = Depends(get_db)
):
    """删除应用设置"""
    result = await db.execute(
        select(AppSettings).where(AppSettings.key == key)
    )
    setting = result.scalar_one_or_none()

    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")

    await db.delete(setting)
    return {"message": "Setting deleted successfully"}

# ============= API Key Storage Endpoints =============

@router.post("/api-keys", response_model=APIKeyResponse)
async def save_api_key(
    key_data: APIKeyCreate,
    db: AsyncSession = Depends(get_db)
):
    """保存 API Key"""
    # 查找是否已存在
    result = await db.execute(
        select(APIKeyStorage).where(APIKeyStorage.provider == key_data.provider)
    )
    existing = result.scalar_one_or_none()

    if existing:
        # 更新现有 key
        existing.encrypted_key = key_data.api_key  # TODO: 应该加密
        existing.updated_at = datetime.utcnow()
        await db.flush()
        await db.refresh(existing)
        storage = existing
    else:
        # 创建新 key
        storage = APIKeyStorage(
            provider=key_data.provider,
            encrypted_key=key_data.api_key  # TODO: 应该加密
        )
        db.add(storage)
        await db.flush()
        await db.refresh(storage)

    return APIKeyResponse(
        provider=storage.provider,
        is_valid=storage.is_valid,
        last_validated=storage.last_validated,
        has_key=bool(storage.encrypted_key)
    )

@router.get("/api-keys", response_model=List[APIKeyResponse])
async def list_api_keys(
    db: AsyncSession = Depends(get_db)
):
    """获取所有 API Key 状态(不返回实际 key)"""
    result = await db.execute(select(APIKeyStorage))
    keys = result.scalars().all()

    return [
        APIKeyResponse(
            provider=k.provider,
            is_valid=k.is_valid,
            last_validated=k.last_validated,
            has_key=bool(k.encrypted_key)
        )
        for k in keys
    ]

@router.get("/api-keys/{provider}", response_model=APIKeyResponse)
async def get_api_key_status(
    provider: str,
    db: AsyncSession = Depends(get_db)
):
    """获取特定提供商的 API Key 状态"""
    result = await db.execute(
        select(APIKeyStorage).where(APIKeyStorage.provider == provider)
    )
    key = result.scalar_one_or_none()

    if not key:
        return APIKeyResponse(
            provider=provider,
            is_valid=False,
            has_key=False
        )

    return APIKeyResponse(
        provider=key.provider,
        is_valid=key.is_valid,
        last_validated=key.last_validated,
        has_key=bool(key.encrypted_key)
    )

@router.delete("/api-keys/{provider}")
async def delete_api_key(
    provider: str,
    db: AsyncSession = Depends(get_db)
):
    """删除 API Key"""
    result = await db.execute(
        select(APIKeyStorage).where(APIKeyStorage.provider == provider)
    )
    key = result.scalar_one_or_none()

    if not key:
        raise HTTPException(status_code=404, detail="API Key not found")

    await db.delete(key)
    return {"message": "API Key deleted successfully"}
