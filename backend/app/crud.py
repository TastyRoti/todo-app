from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from app import models, schemas


def get_tasks(db: Session, status: str = "all", search: str = "", sort: str = "created_at", order: str = "asc"):
    query = db.query(models.Task)

    if status == "done":
        query = query.filter(models.Task.done == True)
    elif status == "undone":
        query = query.filter(models.Task.done == False)

    if search:
        query = query.filter(models.Task.title.ilike(f"%{search}%"))

    sort_column = getattr(models.Task, sort, models.Task.created_at)
    if order == "desc":
        query = query.order_by(desc(sort_column))
    else:
        query = query.order_by(asc(sort_column))

    return query.all()


def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(title=task.title, priority=task.priority)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def update_task(db: Session, task_id: int, task_update: schemas.TaskUpdate):
    db_task = get_task(db, task_id)
    if db_task is None:
        return None

    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)

    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)
    if db_task is None:
        return None

    db.delete(db_task)
    db.commit()
    return db_task