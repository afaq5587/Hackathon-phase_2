from typing import Optional, List
from enum import Enum

from sqlmodel import Field, Relationship, SQLModel
# Removed import of ARRAY, String


class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    is_completed: bool = False
    priority: Optional[Priority] = Field(default=None)
    tags: Optional[str] = Field(default=None) # Changed to string

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional["User"] = Relationship(back_populates="tasks")
