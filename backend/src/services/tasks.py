from datetime import datetime, timedelta
from typing import Optional

from sqlmodel import Session

from src.models.task import Task, RepeatInterval


def create_next_recurring_task(db: Session, completed_task: Task) -> Optional[Task]:
    if not completed_task.repeat_interval:
        return None

    new_due_date = None
    if completed_task.due_date:
        if completed_task.repeat_interval == RepeatInterval.DAILY:
            new_due_date = completed_task.due_date + timedelta(days=1)
        elif completed_task.repeat_interval == RepeatInterval.WEEKLY:
            new_due_date = completed_task.due_date + timedelta(weeks=1)
        elif completed_task.repeat_interval == RepeatInterval.MONTHLY:
            # Simple month addition, might need more robust logic for exact day
            new_due_date = completed_task.due_date.replace(
                month=completed_task.due_date.month % 12 + 1
            )
    
    new_task = Task(
        title=completed_task.title,
        description=completed_task.description,
        user_id=completed_task.user_id,
        priority=completed_task.priority,
        tags=completed_task.tags,
        due_date=new_due_date,
        repeat_interval=completed_task.repeat_interval,
        is_completed=False, # New recurring task is incomplete
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task
