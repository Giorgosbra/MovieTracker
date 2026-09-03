from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.database.database import create_db_and_tables
from backend.app.models import User, Movie

from backend.app.api.auth import router as auth_router
from backend.app.api.users import router as users_router
from backend.app.api.movies import router as movies_router
from backend.app.api.admin import router as admin_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handle application startup and shutdown events.

    Parameters:
    app (FastAPI): The FastAPI application instance.
    """
    # Create any database tables that do not already exist
    # when the application starts.
    create_db_and_tables()

    yield


# Create and configure the main FastAPI application.
app = FastAPI(
    title="MovieTracker API",
    description="REST API for the MovieTracker application",
    version="1.0.0",
    lifespan=lifespan
)


# Register the application's REST API routers.
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(movies_router)
app.include_router(admin_router)


@app.get("/")
def root():
    """Return a simple welcome message for the API."""
    return {"message": "Welcome to the MovieTracker API!"}


# Allow the React development server to communicate with the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
