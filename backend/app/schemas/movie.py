from typing import Literal

from sqlmodel import Field, SQLModel


# Restrict movie status to the values supported by the application.
MovieStatus = Literal[
    "watchlist",
    "watched",
]


class MovieCreate(SQLModel):
    """
    Define and validate the data required when adding a movie
    to a user's collection.
    """

    title: str = Field(
        min_length=1,
        max_length=150,
    )

    description: str | None = Field(
        default=None,
        max_length=1000,
    )

    # Validate the movie release year within a reasonable range.
    release_year: int = Field(
        ge=1888,
        le=2100,
    )

    genre: str = Field(
        min_length=1,
        max_length=50,
    )

    # New movie entries are added to the watchlist by default.
    status: MovieStatus = "watchlist"

    # Personal ratings are optional and must be between 0 and 10.
    personal_rating: float | None = Field(
        default=None,
        ge=0,
        le=10,
    )


class MovieRead(SQLModel):
    """
    Define the movie information returned by the API.

    The response combines shared movie data with the authenticated
    user's personal status and rating.
    """

    id: int

    title: str

    description: str | None

    release_year: int

    genre: str

    status: MovieStatus

    personal_rating: float | None


class MovieUpdate(SQLModel):
    """
    Define the fields that can be updated in a user's movie entry.

    Both fields are optional so that partial updates can be performed.
    """

    status: MovieStatus | None = None

    personal_rating: float | None = Field(
        default=None,
        ge=0,
        le=10,
    )



    