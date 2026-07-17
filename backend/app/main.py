from fastapi import FastAPI
from app.database import engine, Base
from app import models
from app.routers import tasks


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(tasks.router)


@app.get("/")
def read_root():
    return {"status": "ok", "message": "TODO API is running"}