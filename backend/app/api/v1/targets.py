from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.target import TargetSchema, TargetCreate, TargetUpdate
from app.repositories.target_repo import target_repo
from app.core.exceptions import NotFoundError

router = APIRouter()

@router.get("/", response_model=List[TargetSchema])
def list_targets(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return target_repo.get_multi(db, skip=skip, limit=limit)

@router.post("/", response_model=TargetSchema)
def create_target(target: TargetCreate, db: Session = Depends(get_db)):
    return target_repo.create(db, obj_in=target)

@router.get("/{id}", response_model=TargetSchema)
def get_target(id: str, db: Session = Depends(get_db)):
    target = target_repo.get(db, id=id)
    if not target:
        raise NotFoundError("Target not found")
    return target

@router.patch("/{id}", response_model=TargetSchema)
def update_target(id: str, target_in: TargetUpdate, db: Session = Depends(get_db)):
    target = target_repo.get(db, id=id)
    if not target:
        raise NotFoundError("Target not found")
    return target_repo.update(db, db_obj=target, obj_in=target_in)

@router.delete("/{id}", response_model=TargetSchema)
def delete_target(id: str, db: Session = Depends(get_db)):
    target = target_repo.get(db, id=id)
    if not target:
        raise NotFoundError("Target not found")
    return target_repo.remove(db, id=id)
