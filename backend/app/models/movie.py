from sqlmodel import SQLModel, Field


class Movie(SQLModel, table=True):
    __tablename__ = "movies"

    id: int | None = Field(default=None, primary_key=True)

    title: str = Field(max_length=200)

    description: str | None = Field(default=None, max_length=10000)

    release_year: int

    genre: str = Field(max_length=100)

    status: str = Field(default="watchlist", max_length=50)

    personal_rating: float | None = Field(default=None)

    user_id: int = Field(foreign_key="users.id")









    