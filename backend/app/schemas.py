from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class CategoryBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)


class CategoryCreate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    id: int

    class Config:
        from_attributes = True


class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    priority: int = Field(default=1, ge=1, le=10)
    due_date: Optional[datetime] = None
    category_id: Optional[int] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    done: Optional[bool] = None
    priority: Optional[int] = Field(None, ge=1, le=10)
    due_date: Optional[datetime] = None
    category_id: Optional[int] = None


class TaskOut(TaskBase):
    id: int
    done: bool
    created_at: datetime
    category: Optional[CategoryOut] = None

    class Config:
        from_attributes = True