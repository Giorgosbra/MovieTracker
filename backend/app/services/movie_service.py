from sqlmodel import Session

from backend.app.models.movie import Movie
from backend.app.models.user import User
from backend.app.models.user_movie import UserMovie
from backend.app.repositories.movie_repository import MovieRepository
from backend.app.schemas.movie import MovieCreate, MovieRead, MovieUpdate


class MovieService:
    def __init__(self, session: Session):
        self.repository = MovieRepository(session)

    def _build_movie_read(
        self,
        movie: Movie,
        user_movie: UserMovie,
    ) -> MovieRead:
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
        if current_user.id is None:
            raise ValueError("Invalid user")

        movie = self.repository.get_movie_by_title_and_year(
            movie_data.title,
            movie_data.release_year,
        )

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

        existing_user_movie = self.repository.get_user_movie(
            current_user.id,
            movie.id,
        )

        if existing_user_movie:
            raise ValueError(
                "Movie is already in your collection"
            )

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
        if current_user.id is None:
            raise ValueError("Invalid user")

        results = self.repository.get_movies_by_user(
            current_user.id
        )

        return [
            self._build_movie_read(movie, user_movie)
            for movie, user_movie in results
        ]

    def get_movie(
        self,
        movie_id: int,
        current_user: User,
    ) -> MovieRead:
        if current_user.id is None:
            raise ValueError("Invalid user")

        movie = self.repository.get_movie_by_id(movie_id)

        if not movie:
            raise ValueError("Movie not found")

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
        if current_user.id is None:
            raise ValueError("Invalid user")

        movie = self.repository.get_movie_by_id(movie_id)

        if not movie:
            raise ValueError("Movie not found")

        user_movie = self.repository.get_user_movie(
            current_user.id,
            movie_id,
        )

        if not user_movie:
            raise PermissionError(
                "You do not have access to this movie"
            )

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
        if current_user.id is None:
            raise ValueError("Invalid user")

        movie = self.repository.get_movie_by_id(movie_id)

        if not movie:
            raise ValueError("Movie not found")

        user_movie = self.repository.get_user_movie(
            current_user.id,
            movie_id,
        )

        if not user_movie:
            raise PermissionError(
                "You do not have access to this movie"
            )

        self.repository.delete_user_movie(
            user_movie
        )


















































































        