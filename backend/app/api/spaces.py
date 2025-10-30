"""
Knowledge Space API endpoints
"""
from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, field_validator
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.models.space import KnowledgeSpace


router = APIRouter()


class SpaceCreate(BaseModel):
    name: str
    description: Optional[str] = None
    color: Optional[str] = None

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("空间名称不能为空")
        if len(value) > 255:
            raise ValueError("空间名称长度不能超过 255 字符")
        return value


class SpaceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    color: Optional[str] = None

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        if value is None:
            return value
        value = value.strip()
        if not value:
            raise ValueError("空间名称不能为空")
        if len(value) > 255:
            raise ValueError("空间名称长度不能超过 255 字符")
        return value


class SpaceResponse(BaseModel):
    model_config = {"from_attributes": True}

    id: str
    name: str
    description: Optional[str] = None
    color: str
    created_at: datetime
    updated_at: datetime


@router.get("/", response_model=List[SpaceResponse])
async def list_spaces(db: AsyncSession = Depends(get_db)):
    """获取全部知识空间"""
    result = await db.execute(select(KnowledgeSpace).order_by(KnowledgeSpace.created_at.desc()))
    spaces = result.scalars().all()
    return [SpaceResponse.model_validate(space) for space in spaces]


@router.post("/", response_model=SpaceResponse, status_code=201)
async def create_space(payload: SpaceCreate, db: AsyncSession = Depends(get_db)):
    """创建新的知识空间"""
    space = KnowledgeSpace(
        name=payload.name,
        description=payload.description,
        color=payload.color or KnowledgeSpace.color.default.arg,
    )
    db.add(space)

    try:
        await db.flush()
    except IntegrityError:
        raise HTTPException(status_code=409, detail="该空间名称已存在")

    await db.refresh(space)
    return SpaceResponse.model_validate(space)


def _update_space_common(space: KnowledgeSpace, update_data: dict) -> KnowledgeSpace:
    if "name" in update_data:
        update_data["name"] = update_data["name"].strip()
        if not update_data["name"]:
            raise HTTPException(status_code=400, detail="空间名称不能为空")

    for key, value in update_data.items():
        setattr(space, key, value)

    return space


@router.put("/{space_id}", response_model=SpaceResponse)
async def replace_space(space_id: str, payload: SpaceUpdate, db: AsyncSession = Depends(get_db)):
    """更新知识空间(完整替换)"""
    result = await db.execute(select(KnowledgeSpace).where(KnowledgeSpace.id == space_id))
    space = result.scalar_one_or_none()

    if not space:
        raise HTTPException(status_code=404, detail="空间不存在")

    update_data = payload.model_dump()
    update_data = {k: v for k, v in update_data.items() if v is not None}

    space = _update_space_common(space, update_data)

    try:
        await db.flush()
    except IntegrityError:
        raise HTTPException(status_code=409, detail="该空间名称已存在")

    await db.refresh(space)
    return SpaceResponse.model_validate(space)


@router.patch("/{space_id}", response_model=SpaceResponse)
async def update_space(space_id: str, payload: SpaceUpdate, db: AsyncSession = Depends(get_db)):
    """部分更新知识空间"""
    result = await db.execute(select(KnowledgeSpace).where(KnowledgeSpace.id == space_id))
    space = result.scalar_one_or_none()

    if not space:
        raise HTTPException(status_code=404, detail="空间不存在")

    update_data = payload.model_dump(exclude_unset=True)
    update_data = {k: v for k, v in update_data.items() if v is not None}

    space = _update_space_common(space, update_data)

    try:
        await db.flush()
    except IntegrityError:
        raise HTTPException(status_code=409, detail="该空间名称已存在")

    await db.refresh(space)
    return SpaceResponse.model_validate(space)
