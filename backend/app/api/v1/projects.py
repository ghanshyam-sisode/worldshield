from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.project import ProjectSchema, ProjectCreate, ProjectUpdate
from app.repositories.project_repo import project_repo
from app.core.exceptions import NotFoundError

router = APIRouter()

@router.get("/", response_model=List[ProjectSchema])
def list_projects(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return project_repo.get_multi(db, skip=skip, limit=limit)

@router.post("/", response_model=ProjectSchema)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    return project_repo.create(db, obj_in=project)

@router.get("/{id}", response_model=ProjectSchema)
def get_project(id: str, db: Session = Depends(get_db)):
    project = project_repo.get(db, id=id)
    if not project:
        raise NotFoundError("Project not found")
    return project

@router.patch("/{id}", response_model=ProjectSchema)
def update_project(id: str, project_in: ProjectUpdate, db: Session = Depends(get_db)):
    project = project_repo.get(db, id=id)
    if not project:
        raise NotFoundError("Project not found")
    return project_repo.update(db, db_obj=project, obj_in=project_in)

@router.delete("/{id}", response_model=ProjectSchema)
def delete_project(id: str, db: Session = Depends(get_db)):
    project = project_repo.get(db, id=id)
    if not project:
        raise NotFoundError("Project not found")
    return project_repo.remove(db, id=id)
