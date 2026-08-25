from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.app.database.database import create_db_and_tables
from backend.app.models import User, Movie

from backend.app.api.auth import router as auth_router

from backend.app.api.users import router as users_router
from backend.app.api.movies import router as movies_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(
    title="MovieTracker API",
    description="REST API for the MovieTracker application",
    version="1.0.0",
    lifespan=lifespan
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(movies_router)

@app.get("/")
def root():
    return {"message": "Welcome to the MovieTracker API!"}