from sqlmodel import Session

from backend.app.models.user import User
from backend.app.repositories.admin_repository import (
    AdminRepository,
)
from backend.app.schemas.admin import (
    AdminUserStats,
)


class AdminService:
    def __init__(
        self,
        session: Session,
    ):
        self.repository = (
            AdminRepository(session)
        )


    def get_users(self):
        return (
            self.repository
            .get_all_users()
        )


    def get_user_stats(
        self,
        user_id: int,
    ) -> AdminUserStats:
        user = (
            self.repository
            .get_user_by_id(user_id)
        )

        if not user:
            raise ValueError(
                'User not found'
            )


        user_movies = (
            self.repository
            .get_user_movies(user_id)
        )


        watched_movies = [
            (movie, user_movie)
            for movie, user_movie
            in user_movies
            if user_movie.status
            == 'watched'
        ]


        watchlist_movies = [
            (movie, user_movie)
            for movie, user_movie
            in user_movies
            if user_movie.status
            == 'watchlist'
        ]


        ratings = [
            user_movie.personal_rating
            for _, user_movie
            in watched_movies
            if user_movie.personal_rating
            is not None
        ]


        average_rating = (
            sum(ratings) / len(ratings)
            if ratings
            else None
        )


        genre_counts: dict[
            str,
            int,
        ] = {}

        for movie, _ in user_movies:
            genre_counts[movie.genre] = (
                genre_counts.get(
                    movie.genre,
                    0,
                )
                + 1
            )


        favorite_genre = (
            max(
                genre_counts,
                key=genre_counts.get,
            )
            if genre_counts
            else None
        )


        return AdminUserStats(
            favorite_genre=favorite_genre,
            watchlist_count=len(
                watchlist_movies,
            ),
            movies_watched=len(
                watched_movies,
            ),
            average_rating=average_rating,
        )


    def delete_user(
        self,
        user_id: int,
        current_admin: User,
    ):
        if (
            current_admin.id
            == user_id
        ):
            raise ValueError(
                'You cannot delete your own admin account'
            )


        user = (
            self.repository
            .get_user_by_id(user_id)
        )

        if not user:
            raise ValueError(
                'User not found'
            )


        self.repository.delete_user_movies(
            user_id,
        )

        self.repository.delete_user(
            user,
        )


























        