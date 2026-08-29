from typing import Literal

from sqlmodel import Field, SQLModel


MovieStatus = Literal[
    "watchlist",
    "watched",
]


class MovieCreate(SQLModel):
    title: str = Field(
        min_length=1,
        max_length=150,
    )

    description: str | None = Field(
        default=None,
        max_length=1000,
    )

    release_year: int = Field(
        ge=1888,
        le=2100,
    )

    genre: str = Field(
        min_length=1,
        max_length=50,
    )

    status: MovieStatus = "watchlist"

    personal_rating: float | None = Field(
        default=None,
        ge=0,
        le=10,
    )


class MovieRead(SQLModel):
    id: int

    title: str

    description: str | None

    release_year: int

    genre: str

    status: MovieStatus

    personal_rating: float | None


class MovieUpdate(SQLModel):
    status: MovieStatus | None = None

    personal_rating: float | None = Field(
        default=None,
        ge=0,
        le=10,
    )














    