
import asyncio
from datetime import datetime
from sqlmodel import Session, select
from src.db import engine
from src.models.task import Task, Priority
from src.models.user import User

def verify_task_creation():
    with Session(engine) as session:
        # 1. Create a dummy user (needed for foreign key)
        # Note: ID must be a string now
        user_id = "test_user_123"
        user = session.get(User, user_id)
        if not user:
            print(f"Creating test user {user_id}...")
            user = User(id=user_id, email="test@example.com")
            session.add(user)
            session.commit()
            session.refresh(user)
        
        # 2. Create a task with all fields
        print("Creating task with all fields...")
        task = Task(
            title="Test Task",
            description="Testing schema",
            user_id=user_id,
            priority=Priority.HIGH,
            tags="work,urgent",
            due_date=datetime.now(),
            repeat_interval="daily" 
        )
        session.add(task)
        session.commit()
        session.refresh(task)
        
        print(f"Task created! ID: {task.id}")
        print(f"Priority: {task.priority}")
        print(f"Tags: {task.tags}")
        
        # Verify read
        read_task = session.get(Task, task.id)
        assert read_task.priority == Priority.HIGH
        assert read_task.tags == "work,urgent"
        print("Verification SUCCESS")

if __name__ == "__main__":
    try:
        verify_task_creation()
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        exit(1)
