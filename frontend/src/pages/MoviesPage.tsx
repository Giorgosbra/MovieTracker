import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import api from '../services/api'
import type { Movie } from '../types/movie'


const posterMap: Record<string, string> = {
  interstellar: '/auth-posters/interstellar.jpg',
  inception: '/auth-posters/inception.jpg',

  'the dark knight':
    '/auth-posters/the_dark_knight.jpg',

  'project hail mary':
    '/auth-posters/project_hail_mary.jpg',

  odyssey:
    '/auth-posters/odyssey.jpg',

  'spider-man: brand new day':
    '/auth-posters/spiderman_brand_new_day.jpg',

  'spiderman brand new day':
    '/auth-posters/spiderman_brand_new_day.jpg',

  'the conjuring 4':
    '/auth-posters/conjuring_4.jpg',

  obsession:
    '/auth-posters/obsession.jpg',

  'forrest gump':
    '/auth-posters/forrest_gump.jpg',
}


function MoviesPage() {
  const navigate = useNavigate()

  const [movies, setMovies] =
    useState<Movie[]>([])

  const [selectedMovie, setSelectedMovie] =
    useState<Movie | null>(null)

  const [isClosing, setIsClosing] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response =
          await api.get<Movie[]>('/movies')

        setMovies(response.data)
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          localStorage.removeItem(
            'access_token',
          )

          navigate('/login')
          return
        }

        setError(
          'Could not load your movies.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [navigate])


  const handleLogout = () => {
    localStorage.removeItem(
      'access_token',
    )

    navigate('/login')
  }


  const getPoster = (
    title: string,
  ) => {
    return posterMap[
      title.toLowerCase()
    ]
  }


  const openMovie = (
    movie: Movie,
  ) => {
    setIsClosing(false)
    setSelectedMovie(movie)
  }


  const closeMovie = () => {
    setIsClosing(true)

    setTimeout(() => {
      setSelectedMovie(null)
      setIsClosing(false)
    }, 250)
  }


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

        <p className="text-slate-400">
          Loading your movies...
        </p>

      </div>
    )
  }


  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(225,29,72,0.20),_transparent_30%)]" />

        <div className="absolute right-[-180px] top-[18%] h-[500px] w-[500px] rounded-full bg-rose-700/10 blur-3xl" />

        <div className="absolute bottom-[-200px] left-[18%] h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-3xl" />

      </div>


      {/* Header */}
      <header className="relative z-20 overflow-hidden border-b border-rose-950/60 bg-[#080b18]/90 backdrop-blur-xl">

        <div className="pointer-events-none absolute left-[-80px] top-[-80px] h-56 w-[500px] bg-rose-600/10 blur-3xl" />

        <div className="relative flex w-full items-center justify-between px-6 py-6 lg:px-8 xl:px-10">

          {/* Logo */}
          <div className="text-4xl font-black tracking-tight lg:text-5xl">
            Movie
            <span className="text-rose-500">
              Tracker
            </span>
          </div>


          <div className="flex items-center gap-6">

            <button
              type="button"
              onClick={() =>
                navigate('/profile')
              }
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Profile
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-rose-500 hover:text-white"
            >
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* Main */}
      <main className="relative z-10 w-full px-6 py-10 lg:px-8 xl:px-10">

        {/* Heading */}
        <div className="mb-14">

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">
            My collection
          </p>


          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <h1 className="text-4xl font-black">
              My Movies
            </h1>


            <button
              type="button"
              onClick={() =>
                navigate('/discover')
              }
              className="w-fit rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              + Add movie
            </button>

          </div>


          <p className="mt-2 text-sm text-slate-400">
            Your personal movie collection.
          </p>

        </div>


        {/* Error */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400">
            {error}
          </div>
        )}


        {/* Empty collection */}
        {!error &&
          movies.length === 0 && (
            <div className="py-24 text-center">

              <h2 className="text-2xl font-bold">
                Your collection is empty
              </h2>

              <p className="mt-3 text-slate-400">
                Add your first movie to get started.
              </p>

            </div>
          )}


        {/* Movies */}
        {movies.length > 0 && (
          <div className="flex flex-wrap gap-5">

            {movies.map((movie) => {
              const poster =
                getPoster(movie.title)

              return (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() =>
                    openMovie(movie)
                  }
                  className="group w-[180px] text-left sm:w-[190px]"
                >

                  <article className="relative overflow-hidden rounded-xl bg-slate-900 shadow-lg transition duration-300 group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-rose-950/30">

                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">

                      {poster ? (
                        <img
                          src={poster}
                          alt=""
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-rose-950/40 p-5">

                          <span className="text-center text-lg font-black text-white/30">
                            {movie.title}
                          </span>

                        </div>
                      )}


                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />


                      {movie.personal_rating !== null && (
                        <div className="absolute right-2.5 top-2.5 rounded-lg bg-black/70 px-2 py-1 text-xs font-bold text-amber-300 backdrop-blur">
                          ★ {movie.personal_rating}
                        </div>
                      )}


                      <div className="absolute inset-x-0 bottom-0 p-3">

                        <h2 className="text-base font-bold text-white">
                          {movie.title}
                        </h2>

                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-300">

                          <span>
                            {movie.release_year}
                          </span>

                          <span className="text-slate-600">
                            •
                          </span>

                          <span>
                            {movie.genre}
                          </span>

                        </div>

                      </div>

                    </div>

                  </article>

                </button>
              )
            })}

          </div>
        )}

      </main>


      {/* Movie details modal */}
      {selectedMovie && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm ${
            isClosing
              ? 'animate-[modalBackdropOut_250ms_ease-in_forwards]'
              : 'animate-[modalBackdropIn_300ms_ease-out]'
          }`}
          onClick={closeMovie}
        >

          <div
            className={`relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl ${
              isClosing
                ? 'animate-[modalOut_250ms_ease-in_forwards]'
                : 'animate-[modalIn_350ms_ease-out]'
            }`}
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Close */}
            <button
              type="button"
              onClick={closeMovie}
              aria-label="Close movie details"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-xl text-white transition duration-200 hover:scale-110 hover:border-rose-500 hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-600/20 active:scale-95"
            >
              ×
            </button>


            <div className="grid md:grid-cols-[300px_1fr]">

              {/* Poster */}
              <div className="relative min-h-[420px] bg-slate-900">

                {getPoster(
                  selectedMovie.title,
                ) ? (
                  <img
                    src={getPoster(
                      selectedMovie.title,
                    )}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[420px] items-center justify-center bg-gradient-to-br from-slate-800 to-rose-950/50 p-8">

                    <span className="text-center text-3xl font-black text-white/30">
                      {selectedMovie.title}
                    </span>

                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/30" />

              </div>


              {/* Information */}
              <div className="flex flex-col justify-center p-8 md:p-10">

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    selectedMovie.status ===
                    'watched'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {selectedMovie.status ===
                  'watched'
                    ? 'Watched'
                    : 'Watchlist'}
                </span>


                <h2 className="mt-5 text-4xl font-black">
                  {selectedMovie.title}
                </h2>


                <p className="mt-2 text-slate-400">
                  {
                    selectedMovie.release_year
                  }
                  {' · '}
                  {selectedMovie.genre}
                </p>


                {selectedMovie.personal_rating !==
                  null && (
                  <p className="mt-5 text-lg font-semibold text-amber-300">
                    ★{' '}
                    {
                      selectedMovie.personal_rating
                    }{' '}
                    / 10
                  </p>
                )}


                <p className="mt-6 leading-7 text-slate-300">
                  {selectedMovie.description ||
                    'No description available.'}
                </p>


                <div className="mt-10 flex gap-3">

                  <button
                    type="button"
                    className="rounded-xl bg-rose-600 px-5 py-3 font-semibold transition hover:bg-rose-500"
                  >
                    Edit rating
                  </button>

                  <button
                    type="button"
                    className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-red-500 hover:text-red-400"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}


export default MoviesPage







































