from sqlmodel import Session

from backend.app.models.movie import Movie
from backend.app.models.user import User
from backend.app.models.user_movie import UserMovie
from backend.app.repositories.movie_repository import MovieRepository
from backend.app.schemas.movie import MovieCreate, MovieRead, MovieUpdate


class MovieService:
    """
    Service responsible for the business logic of user movie collections.
    """

    def __init__(self, session: Session):
        """
        Initialize the service with a movie repository.

        Parameters:
        session (Session): The active SQLModel database session.
        """
        self.repository = MovieRepository(session)

    def _build_movie_read(
        self,
        movie: Movie,
        user_movie: UserMovie,
    ) -> MovieRead:
        """
        Combine shared movie data with user-specific movie information.

        Parameters:
        movie (Movie): The shared movie data.
        user_movie (UserMovie): The user's personal status and rating.

        Returns:
        MovieRead: A response object containing both shared and
                   user-specific movie information.

        Raises:
        ValueError: If the movie does not have a valid database ID.
        """
        if movie.id is None:
            raise ValueError("Invalid movie")

        return MovieRead(
            id=movie.id,
            title=movie.title,
            description=movie.description,
            release_year=movie.release_year,
            genre=movie.genre,
            status=user_movie.status,
            personal_rating=user_movie.personal_rating,
        )

    def create_movie(
        self,
        movie_data: MovieCreate,
        current_user: User,
    ) -> MovieRead:
        """
        Add a movie to the authenticated user's personal collection.

        Parameters:
        movie_data (MovieCreate): The movie information submitted by the user.
        current_user (User): The currently authenticated user.

        Returns:
        MovieRead: The movie together with the user's personal
                   status and rating.

        Raises:
        ValueError: If the user or movie is invalid, or the movie
                    already exists in the user's collection.
        """
        if current_user.id is None:
            raise ValueError("Invalid user")

        # Search for an existing shared movie using title and release year.
        movie = self.repository.get_movie_by_title_and_year(
            movie_data.title,
            movie_data.release_year,
        )

        # Create the shared movie only if it does not already exist.
        if not movie:
            movie = Movie(
                title=movie_data.title,
                description=movie_data.description,
                release_year=movie_data.release_year,
                genre=movie_data.genre,
            )

            movie = self.repository.create_movie(movie)

        if movie.id is None:
            raise ValueError("Invalid movie")

        # Check if the authenticated user already has this movie.
        existing_user_movie = self.repository.get_user_movie(
            current_user.id,
            movie.id,
        )

        if existing_user_movie:
            raise ValueError(
                "Movie is already in your collection"
            )

        # Store the user's personal status and rating separately
        # from the shared movie information.
        user_movie = UserMovie(
            user_id=current_user.id,
            movie_id=movie.id,
            status=movie_data.status,
            personal_rating=movie_data.personal_rating,
        )

        user_movie = self.repository.create_user_movie(
            user_movie
        )

        return self._build_movie_read(
            movie,
            user_movie,
        )

    def get_movies(
        self,
        current_user: User,
    ) -> list[MovieRead]:
        """
        Retrieve all movies from the authenticated user's collection.

        Parameters:
        current_user (User): The currently authenticated user.

        Returns:
        list[MovieRead]: The user's personal movie collection.

        Raises:
        ValueError: If the authenticated user does not have a valid ID.
        """
        if current_user.id is None:
            raise ValueError("Invalid user")

        results = self.repository.get_movies_by_user(
            current_user.id
        )

        # Convert each Movie and UserMovie pair into the API response format.
        return [
            self._build_movie_read(movie, user_movie)
            for movie, user_movie in results
        ]

    def get_movie(
        self,
        movie_id: int,
        current_user: User,
    ) -> MovieRead:
        """
        Retrieve a movie from the authenticated user's collection.

        Parameters:
        movie_id (int): The ID of the requested movie.
        current_user (User): The currently authenticated user.

        Returns:
        MovieRead: The requested movie and its personal tracking data.

        Raises:
        ValueError: If the user or movie is invalid.
        PermissionError: If the movie does not belong to the user's collection.
        """
        if current_user.id is None:
            raise ValueError("Invalid user")

        movie = self.repository.get_movie_by_id(movie_id)

        if not movie:
            raise ValueError("Movie not found")

        # Verify that the requested movie belongs to the current user.
        user_movie = self.repository.get_user_movie(
            current_user.id,
            movie_id,
        )

        if not user_movie:
            raise PermissionError(
                "You do not have access to this movie"
            )

        return self._build_movie_read(
            movie,
            user_movie,
        )

    def update_movie(
        self,
        movie_id: int,
        movie_data: MovieUpdate,
        current_user: User,
    ) -> MovieRead:
        """
        Update the status or personal rating of a movie in a user's collection.

        Parameters:
        movie_id (int): The ID of the movie to update.
        movie_data (MovieUpdate): The fields submitted for update.
        current_user (User): The currently authenticated user.

        Returns:
        MovieRead: The updated movie information.

        Raises:
        ValueError: If the user or movie is invalid.
        PermissionError: If the movie does not belong to the user's collection.
        """
        if current_user.id is None:
            raise ValueError("Invalid user")

        movie = self.repository.get_movie_by_id(movie_id)

        if not movie:
            raise ValueError("Movie not found")

        # Verify ownership before allowing the update.
        user_movie = self.repository.get_user_movie(
            current_user.id,
            movie_id,
        )

        if not user_movie:
            raise PermissionError(
                "You do not have access to this movie"
            )

        # Include only fields that were actually sent in the PATCH request.
        update_data = movie_data.model_dump(
            exclude_unset=True
        )

        if (
            "status" in update_data
            and update_data["status"] is not None
        ):
            user_movie.status = update_data["status"]

        if "personal_rating" in update_data:
            user_movie.personal_rating = (
                update_data["personal_rating"]
            )

        user_movie = self.repository.update_user_movie(
            user_movie
        )

        return self._build_movie_read(
            movie,
            user_movie,
        )

    def delete_movie(
        self,
        movie_id: int,
        current_user: User,
    ) -> None:
        """
        Remove a movie from the authenticated user's personal collection.

        Parameters:
        movie_id (int): The ID of the movie to remove.
        current_user (User): The currently authenticated user.

        Returns:
        None

        Raises:
        ValueError: If the user or movie is invalid.
        PermissionError: If the movie does not belong to the user's collection.
        """
        if current_user.id is None:
            raise ValueError("Invalid user")

        movie = self.repository.get_movie_by_id(movie_id)

        if not movie:
            raise ValueError("Movie not found")

        # Verify ownership before allowing the movie to be removed.
        user_movie = self.repository.get_user_movie(
            current_user.id,
            movie_id,
        )

        if not user_movie:
            raise PermissionError(
                "You do not have access to this movie"
            )

        # Delete only the user's relation, not the shared Movie record.
        self.repository.delete_user_movie(
            user_movie
        )













































































        