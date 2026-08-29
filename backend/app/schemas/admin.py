from sqlmodel import SQLModel


class AdminUserStats(SQLModel):
    favorite_genre: str | None = None
    watchlist_count: int
    movies_watched: int
    average_rating: float | None = None