"""
Knowledge Space model
"""
from datetime import datetime
import uuid

from sqlalchemy import Column, String, Text, DateTime

from app.db.database import Base


class KnowledgeSpace(Base):
    __tablename__ = "knowledge_spaces"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    color = Column(String(7), default="#0ea5e9")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
