from sqlalchemy import UniqueConstraint
from sqlmodel import SQLModel, Field


class UserMovie(SQLModel, table=True):
    __tablename__ = "user_movies"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "movie_id",
            name="uq_user_movie",
        ),
    )

    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(
        foreign_key="users.id",
        index=True,
    )

    movie_id: int = Field(
        foreign_key="movies.id",
        index=True,
    )

    status: str = Field(
        default="watchlist",
        max_length=20,
    )

    personal_rating: float | None = Field(default=None)