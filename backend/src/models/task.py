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

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    is_completed: bool = False
    priority: Optional[Priority] = Field(default=None)
    tags: Optional[str] = Field(default=None) # Changed to string
    due_date: Optional[datetime] = Field(default=None) # Added due_date
    repeat_interval: Optional[RepeatInterval] = Field(default=None) # Added repeat_interval

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional["User"] = Relationship(back_populates="tasks")