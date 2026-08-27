from sqlalchemy import UniqueConstraint
from sqlmodel import SQLModel, Field


class Movie(SQLModel, table=True):
    __tablename__ = "movies"

    __table_args__ = (
        UniqueConstraint(
            "title",
            "release_year",
            name="uq_movie_title_year",
        ),
    )

    id: int | None = Field(default=None, primary_key=True)

    title: str = Field(
        max_length=150,
        index=True,
    )

    description: str | None = Field(
        default=None,
        max_length=1000,
    )

    release_year: int

    genre: str = Field(
        max_length=50,
    )








    