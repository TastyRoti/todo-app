from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    priority: int = Field(default=1, ge=1, le=10)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    done: Optional[bool] = None
    priority: Optional[int] = Field(None, ge=1, le=10)

class TaskOut(TaskBase):
    id: int
    done: bool
    created_at: datetime

    class Config:
        from_attributes = True