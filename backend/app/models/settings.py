"""
Settings and Model Configuration models
"""
from sqlalchemy import Column, String, Text, DateTime, Boolean, JSON
from datetime import datetime
import uuid

from app.db.database import Base

class ModelConfig(Base):
    """用户配置的 LLM 模型"""
    __tablename__ = "model_configs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    # 模型标识
    name = Column(String(255), nullable=False)  # 用户自定义名称,如 "我的 GPT-4"
    provider = Column(String(50), nullable=False)  # openai, anthropic, google, ollama, custom
    model_id = Column(String(255), nullable=False)  # 模型 ID,如 gpt-4

    # API 配置
    api_key = Column(Text, nullable=True)  # 加密存储的 API Key
    base_url = Column(String(500), nullable=True)  # 自定义 Base URL

    # 额外配置
    default_temperature = Column(String(10), default="0.7")  # 存储为字符串以支持精确值
    default_max_tokens = Column(String(10), nullable=True)
    extra_params = Column(JSON, nullable=True)  # 其他参数,如 top_p, frequency_penalty 等

    # 状态
    is_active = Column(Boolean, default=True)
    is_default = Column(Boolean, default=False)  # 是否为默认模型

    # 元数据
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class AppSettings(Base):
    """应用全局设置"""
    __tablename__ = "app_settings"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    # 设置键值
    key = Column(String(255), unique=True, nullable=False)  # 设置键,如 "theme", "language"
    value = Column(Text, nullable=True)  # 设置值
    value_type = Column(String(50), default="string")  # string, number, boolean, json

    # 分类
    category = Column(String(100), default="general")  # general, appearance, privacy, advanced

    # 元数据
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class APIKeyStorage(Base):
    """API Key 加密存储"""
    __tablename__ = "api_key_storage"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    # 标识
    provider = Column(String(50), nullable=False, unique=True)  # openai, anthropic, google 等

    # 加密存储的 Key (实际应用中应该使用加密)
    encrypted_key = Column(Text, nullable=True)

    # 状态
    is_valid = Column(Boolean, default=True)  # Key 是否有效
    last_validated = Column(DateTime, nullable=True)  # 上次验证时间

    # 元数据
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
