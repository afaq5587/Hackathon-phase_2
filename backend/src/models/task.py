from typing import Optional, List
from datetime import datetime
from enum import Enum

from sqlmodel import Field, Relationship, SQLModel


class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class RepeatInterval(str, Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"

class TaskBase(SQLModel):
    title: str
    description: Optional[str] = None
    is_completed: bool = False
    priority: Optional[Priority] = Field(default=None)
    tags: Optional[str] = Field(default=None)
    due_date: Optional[datetime] = Field(default=None)
    repeat_interval: Optional[RepeatInterval] = Field(default=None)

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    user: Optional["User"] = Relationship(back_populates="tasks")

class TaskCreate(TaskBase):
    pass

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None
    priority: Optional[Priority] = None
    tags: Optional[str] = None
    due_date: Optional[datetime] = None
    repeat_interval: Optional[RepeatInterval] = None