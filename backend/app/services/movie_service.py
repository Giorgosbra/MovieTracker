from sqlmodel import Session

from backend.app.models.movie import Movie
from backend.app.models.user import User
from backend.app.repositories.movie_repository import MovieRepository
from backend.app.schemas.movie import MovieCreate, MovieUpdate


class MovieService:

    def __init__(self, session: Session):
        self.repository = MovieRepository(session)

    def create_movie(
        self,
        movie_data: MovieCreate,
        current_user: User
    ) -> Movie:

        if current_user.id is None:
            raise ValueError("Invalid user")

        movie = Movie(
            title=movie_data.title,
            description=movie_data.description,
            release_year=movie_data.release_year,
            genre=movie_data.genre,
            status=movie_data.status,
            personal_rating=movie_data.personal_rating,
            user_id=current_user.id
        )

        return self.repository.create(movie)

    def get_movies(
        self,
        current_user: User
    ) -> list[Movie]:

        if current_user.id is None:
            raise ValueError("Invalid user")

        return self.repository.get_movies_by_user(current_user.id)

    def get_movie(
        self,
        movie_id: int,
        current_user: User
    ) -> Movie:

        if current_user.id is None:
            raise ValueError("Invalid user")

        movie = self.repository.get_movie_by_id(movie_id)

        if not movie:
            raise ValueError("Movie not found")

        if movie.user_id != current_user.id:
            raise PermissionError("You do not have access to this movie")

        return movie

    def update_movie(
        self,
        movie_id: int,
        movie_data: MovieUpdate,
        current_user: User
    ) -> Movie:

        movie = self.get_movie(movie_id, current_user)

        update_data = movie_data.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(movie, field, value)

        return self.repository.update(movie)

    def delete_movie(
        self,
        movie_id: int,
        current_user: User
    ) -> None:

        movie = self.get_movie(movie_id, current_user)

        self.repository.delete(movie)