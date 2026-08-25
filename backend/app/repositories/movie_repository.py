from sqlmodel import Session, select

from backend.app.models.movie import Movie
from backend.app.schemas import movie


class MovieRepository:

    def __init__(self, session: Session):
        self.session = session

    def create(self, movie: Movie) -> Movie:
        self.session.add(movie)
        self.session.commit()
        self.session.refresh(movie)

        return movie

    def get_movies_by_user(self, user_id: int) -> list[Movie]:
        statement = select(Movie).where(Movie.user_id == user_id)
        results = self.session.exec(statement)

        return list(results.all())

    def get_movie_by_id(self, movie_id: int) -> Movie | None:
        return self.session.get(Movie, movie_id)

    def delete(self, movie: Movie) -> None:
        self.session.delete(movie)
        self.session.commit()

    def update(self, movie: Movie) -> Movie:
        self.session.add(movie)
        self.session.commit()
        self.session.refresh(movie)

        return movie
































