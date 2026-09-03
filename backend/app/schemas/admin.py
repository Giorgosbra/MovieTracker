from sqlmodel import SQLModel


class AdminUserStats(SQLModel):
    """
    Define the movie statistics returned to an administrator
    for a specific user.
    """

    favorite_genre: str | None = None

    watchlist_count: int

    movies_watched: int

    average_rating: float | None = None