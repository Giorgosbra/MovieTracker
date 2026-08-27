from sqlmodel import Session, select

from backend.app.models.movie import Movie
from backend.app.models.user_movie import UserMovie


class MovieRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_movie_by_id(self, movie_id: int) -> Movie | None:
        return self.session.get(Movie, movie_id)

    def get_movie_by_title_and_year(
        self,
        title: str,
        release_year: int,
    ) -> Movie | None:
        statement = select(Movie).where(
            Movie.title == title,
            Movie.release_year == release_year,
        )

        return self.session.exec(statement).first()

    def create_movie(self, movie: Movie) -> Movie:
        self.session.add(movie)
        self.session.commit()
        self.session.refresh(movie)

        return movie

    def get_user_movie(
        self,
        user_id: int,
        movie_id: int,
    ) -> UserMovie | None:
        statement = select(UserMovie).where(
            UserMovie.user_id == user_id,
            UserMovie.movie_id == movie_id,
        )

        return self.session.exec(statement).first()

    def create_user_movie(
        self,
        user_movie: UserMovie,
    ) -> UserMovie:
        self.session.add(user_movie)
        self.session.commit()
        self.session.refresh(user_movie)

        return user_movie

    def get_movies_by_user(
        self,
        user_id: int,
    ) -> list[tuple[Movie, UserMovie]]:
        statement = (
            select(Movie, UserMovie)
            .join(
                UserMovie,
                UserMovie.movie_id == Movie.id,
            )
            .where(UserMovie.user_id == user_id)
        )

        results = self.session.exec(statement).all()

        return list(results)

    def update_user_movie(
        self,
        user_movie: UserMovie,
    ) -> UserMovie:
        self.session.add(user_movie)
        self.session.commit()
        self.session.refresh(user_movie)

        return user_movie

    def delete_user_movie(
        self,
        user_movie: UserMovie,
    ) -> None:
        self.session.delete(user_movie)
        self.session.commit()































