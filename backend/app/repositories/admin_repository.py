from sqlmodel import Session, select

from backend.app.models.user import User
from backend.app.models.movie import Movie
from backend.app.models.user_movie import UserMovie


class AdminRepository:
    """
    Repository responsible for administrator database operations.
    """

    def __init__(self, session: Session):
        """
        Initialize the repository with an active database session.

        Parameters:
        session (Session): The SQLModel database session.
        """
        self.session = session


    def get_all_users(self):
        """
        Retrieve all registered users from the database.

        Returns:
        list[User]: A list containing all registered users.
        """
        statement = select(User)

        return list(
            self.session.exec(statement).all()
        )


    def get_user_by_id(
        self,
        user_id: int,
    ):
        """
        Retrieve a user from the database by ID.

        Parameters:
        user_id (int): The ID of the user.

        Returns:
        User | None: The matching user if found, otherwise None.
        """
        return self.session.get(
            User,
            user_id,
        )


    def get_user_movies(
        self,
        user_id: int,
    ) -> list[tuple[Movie, UserMovie]]:
        """
        Retrieve the movies and personal movie data of a specific user.

        Parameters:
        user_id (int): The ID of the user.

        Returns:
        list[tuple[Movie, UserMovie]]: A list containing shared movie data
                                      together with the user's personal
                                      status and rating.
        """
        # Join Movie with UserMovie to retrieve the user's movie activity.
        statement = (
            select(Movie, UserMovie)
            .join(
                UserMovie,
                UserMovie.movie_id == Movie.id,
            )
            .where(
                UserMovie.user_id == user_id,
            )
        )

        return list(
            self.session.exec(
                statement,
            ).all()
        )


    def delete_user_movies(
        self,
        user_id: int,
    ):
        """
        Delete all movie relations that belong to a specific user.

        Parameters:
        user_id (int): The ID of the user whose movie relations
                       should be deleted.

        Returns:
        None
        """
        # Retrieve all UserMovie records that belong to the user.
        statement = (
            select(UserMovie)
            .where(
                UserMovie.user_id == user_id,
            )
        )

        user_movies = (
            self.session.exec(
                statement,
            ).all()
        )

        # Delete each personal movie relation before deleting the user.
        for user_movie in user_movies:
            self.session.delete(
                user_movie,
            )

        # Apply the pending deletions before the user record is removed.
        self.session.flush()


    def delete_user(
        self,
        user: User,
    ):
        """
        Delete a user from the database.

        Parameters:
        user (User): The user account to delete.

        Returns:
        None
        """
        self.session.delete(user)
        self.session.commit()































        