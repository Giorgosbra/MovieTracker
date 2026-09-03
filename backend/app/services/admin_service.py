from sqlmodel import Session

from backend.app.models.user import User
from backend.app.repositories.admin_repository import (
    AdminRepository,
)
from backend.app.schemas.admin import (
    AdminUserStats,
)


class AdminService:
    """
    Service responsible for administrator business logic.
    """

    def __init__(
        self,
        session: Session,
    ):
        """
        Initialize the service with an administrator repository.

        Parameters:
        session (Session): The active SQLModel database session.
        """
        self.repository = (
            AdminRepository(session)
        )


    def get_users(self):
        """
        Retrieve all registered users.

        Returns:
        list[User]: A list containing all registered users.
        """
        return (
            self.repository
            .get_all_users()
        )


    def get_user_stats(
        self,
        user_id: int,
    ) -> AdminUserStats:
        """
        Calculate movie statistics for a specific user.

        Parameters:
        user_id (int): The ID of the user.

        Returns:
        AdminUserStats: Statistics including favorite genre,
                        watchlist count, watched movies and
                        average personal rating.

        Raises:
        ValueError: If the requested user does not exist.
        """
        # Verify that the requested user exists.
        user = (
            self.repository
            .get_user_by_id(user_id)
        )

        if not user:
            raise ValueError(
                'User not found'
            )


        # Retrieve the shared movie data together with
        # the user's personal movie information.
        user_movies = (
            self.repository
            .get_user_movies(user_id)
        )


        # Separate movies marked as watched.
        watched_movies = [
            (movie, user_movie)
            for movie, user_movie
            in user_movies
            if user_movie.status
            == 'watched'
        ]


        # Separate movies that are still in the watchlist.
        watchlist_movies = [
            (movie, user_movie)
            for movie, user_movie
            in user_movies
            if user_movie.status
            == 'watchlist'
        ]


        # Use only ratings from watched movies that have a rating.
        ratings = [
            user_movie.personal_rating
            for _, user_movie
            in watched_movies
            if user_movie.personal_rating
            is not None
        ]


        # Calculate the average rating only when ratings are available.
        average_rating = (
            sum(ratings) / len(ratings)
            if ratings
            else None
        )


        # Count how many movies belong to each genre.
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


        # Select the genre with the highest number of movies.
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
        """
        Delete a user account and its personal movie relations.

        Parameters:
        user_id (int): The ID of the user to delete.
        current_admin (User): The administrator performing the operation.

        Returns:
        None

        Raises:
        ValueError: If the administrator tries to delete their own
                    account or the requested user does not exist.
        """
        # Prevent an administrator from deleting their own account.
        if (
            current_admin.id
            == user_id
        ):
            raise ValueError(
                'You cannot delete your own admin account'
            )


        # Verify that the user to be deleted exists.
        user = (
            self.repository
            .get_user_by_id(user_id)
        )

        if not user:
            raise ValueError(
                'User not found'
            )


        # Delete the user's movie relations before deleting the account.
        self.repository.delete_user_movies(
            user_id,
        )

        self.repository.delete_user(
            user,
        )
































        