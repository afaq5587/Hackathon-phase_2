from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from src.db import get_session
from src.models.task import Task
from src.models.user import User
from src.api.dependencies import get_current_user

router = APIRouter()

@router.post("/tasks/", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(task: Task, current_user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    task.user_id = current_user.id
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.get("/tasks/", response_model=List[Task])
def read_tasks(current_user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    tasks = db.exec(select(Task).where(Task.user_id == current_user.id)).all()
    return tasks

@router.get("/tasks/{task_id}", response_model=Task)
def read_task(task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    task = db.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(
    task_id: int, task: Task, current_user: User = Depends(get_current_user), db: Session = Depends(get_session)
):
    db_task = db.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task_data = task.model_dump(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
    
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    task = db.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"ok": True}

@router.patch("/tasks/{task_id}/complete", response_model=Task)
def toggle_task_completion(
    task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_session)
):
    task = db.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.is_completed = not task.is_completed
    db.add(task)
    db.commit()
    db.refresh(task)
    return task