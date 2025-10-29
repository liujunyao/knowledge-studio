"""
Knowledge Point models
"""
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum, Integer, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
import uuid

from app.db.database import Base

class UnderstandingLevel(str, enum.Enum):
    NOT_UNDERSTOOD = "not_understood"
    PARTIALLY_UNDERSTOOD = "partially_understood"
    MASTERED = "mastered"

class KnowledgePoint(Base):
    __tablename__ = "knowledge_points"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String(36), ForeignKey("conversations.id"), nullable=False)
    message_id = Column(String(36), ForeignKey("messages.id"), nullable=False)

    # Annotation content
    selected_text = Column(Text, nullable=False)
    start_offset = Column(Integer, nullable=False)
    end_offset = Column(Integer, nullable=False)

    # Understanding status
    understanding_level = Column(Enum(UnderstandingLevel), nullable=False)

    # User notes
    notes = Column(Text, nullable=True)
    questions = Column(JSON, nullable=True)  # List of questions

    # Topic relationship
    topic_id = Column(String(36), ForeignKey("topics.id"), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    conversation = relationship("Conversation", back_populates="knowledge_points")
    message = relationship("Message", back_populates="knowledge_points")
    topic = relationship("Topic", back_populates="knowledge_points")
    parent_links = relationship(
        "ExplorationLink",
        foreign_keys="ExplorationLink.knowledge_point_id",
        back_populates="knowledge_point"
    )

class ExplorationLink(Base):
    __tablename__ = "exploration_links"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    parent_conversation_id = Column(String(36), ForeignKey("conversations.id"), nullable=False)
    child_conversation_id = Column(String(36), ForeignKey("conversations.id"), nullable=False)
    knowledge_point_id = Column(String(36), ForeignKey("knowledge_points.id"), nullable=False)

    depth = Column(Integer, default=1)  # Exploration depth
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    knowledge_point = relationship("KnowledgePoint", back_populates="parent_links")

class Topic(Base):
    __tablename__ = "topics"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    color = Column(String(7), default="#6366f1")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    knowledge_points = relationship("KnowledgePoint", back_populates="topic")
