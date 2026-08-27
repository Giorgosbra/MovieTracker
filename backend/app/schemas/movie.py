from sqlmodel import SQLModel


class MovieCreate(SQLModel):
    title: str
    description: str | None = None
    release_year: int
    genre: str
    status: str = "watchlist"
    personal_rating: float | None = None


class MovieRead(SQLModel):
    id: int
    title: str
    description: str | None
    release_year: int
    genre: str
    status: str
    personal_rating: float | None


class MovieUpdate(SQLModel):
    status: str | None = None
    personal_rating: float | None = None





    