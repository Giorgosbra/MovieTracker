import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import api from '../services/api'
import { movieCatalog } from '../data/movieCatalog'

import type {
  Movie,
  MovieUpdate,
} from '../types/movie'


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

  const [actionError, setActionError] =
    useState('')

  const [isEditing, setIsEditing] =
    useState(false)

  const [editStatus, setEditStatus] =
    useState<'watchlist' | 'watched'>(
      'watchlist',
    )

  const [editRating, setEditRating] =
    useState<number | null>(null)

  const [saving, setSaving] =
    useState(false)

  const [removing, setRemoving] =
    useState(false)

  const [
    showRemoveConfirm,
    setShowRemoveConfirm,
  ] = useState(false)


  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response =
          await api.get<Movie[]>(
            '/movies',
          )

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
    movie: Movie,
  ) => {
    const catalogMovie =
      movieCatalog.find(
        (item) =>
          item.title.toLowerCase() ===
            movie.title.toLowerCase() &&
          item.release_year ===
            movie.release_year,
      )

    return catalogMovie?.poster
  }


  const openMovie = (
    movie: Movie,
  ) => {
    setIsClosing(false)

    setSelectedMovie(movie)

    setEditStatus(
      movie.status === 'watched'
        ? 'watched'
        : 'watchlist',
    )

    setEditRating(
      movie.personal_rating,
    )

    setIsEditing(false)
    setShowRemoveConfirm(false)
    setActionError('')
  }


  const closeMovie = () => {
    if (saving || removing) {
      return
    }

    setIsClosing(true)

    setTimeout(() => {
      setSelectedMovie(null)
      setIsClosing(false)
      setIsEditing(false)
      setShowRemoveConfirm(false)
      setActionError('')
    }, 250)
  }


  const startEditing = () => {
    if (!selectedMovie) {
      return
    }

    setActionError('')
    setShowRemoveConfirm(false)

    setEditStatus(
      selectedMovie.status === 'watched'
        ? 'watched'
        : 'watchlist',
    )

    setEditRating(
      selectedMovie.personal_rating,
    )

    setIsEditing(true)
  }


  const cancelEditing = () => {
    setIsEditing(false)
    setActionError('')
  }


  const decreaseRating = () => {
    if (editStatus !== 'watched') {
      return
    }

    setEditRating((currentRating) => {
      const rating =
        currentRating ?? 0

      return Math.max(
        0,
        rating - 0.5,
      )
    })
  }


  const increaseRating = () => {
    if (editStatus !== 'watched') {
      return
    }

    setEditRating((currentRating) => {
      const rating =
        currentRating ?? 0

      return Math.min(
        10,
        rating + 0.5,
      )
    })
  }


  const handleSave = async () => {
    if (!selectedMovie) {
      return
    }

    setActionError('')


    const movieData: MovieUpdate = {
      status: editStatus,

      personal_rating:
        editStatus === 'watched'
          ? editRating
          : null,
    }


    setSaving(true)


    try {
      const response =
        await api.patch<Movie>(
          `/movies/${selectedMovie.id}`,
          movieData,
        )

      const updatedMovie =
        response.data


      setMovies(
        (currentMovies) =>
          currentMovies.map(
            (movie) =>
              movie.id ===
              updatedMovie.id
                ? updatedMovie
                : movie,
          ),
      )


      setSelectedMovie(
        updatedMovie,
      )

      setIsEditing(false)
    } catch (error) {
      if (
        axios.isAxiosError(error)
      ) {
        if (
          error.response?.status ===
          401
        ) {
          localStorage.removeItem(
            'access_token',
          )

          navigate('/login')
          return
        }

        const detail =
          error.response?.data?.detail

        setActionError(
          typeof detail === 'string'
            ? detail
            : 'Could not update movie.',
        )

        return
      }

      setActionError(
        'Something went wrong.',
      )
    } finally {
      setSaving(false)
    }
  }


  const handleRemove = async () => {
    if (!selectedMovie) {
      return
    }

    setRemoving(true)
    setActionError('')


    try {
      await api.delete(
        `/movies/${selectedMovie.id}`,
      )


      setMovies(
        (currentMovies) =>
          currentMovies.filter(
            (movie) =>
              movie.id !==
              selectedMovie.id,
          ),
      )


      setIsClosing(true)

      setTimeout(() => {
        setSelectedMovie(null)
        setIsClosing(false)
        setShowRemoveConfirm(false)
      }, 250)
    } catch (error) {
      if (
        axios.isAxiosError(error)
      ) {
        if (
          error.response?.status ===
          401
        ) {
          localStorage.removeItem(
            'access_token',
          )

          navigate('/login')
          return
        }

        const detail =
          error.response?.data?.detail

        setActionError(
          typeof detail === 'string'
            ? detail
            : 'Could not remove movie.',
        )

        return
      }

      setActionError(
        'Something went wrong.',
      )
    } finally {
      setRemoving(false)
    }
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


        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400">
            {error}
          </div>
        )}


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


        {movies.length > 0 && (
          <div className="flex flex-wrap justify-center gap-5">

            {movies.map((movie) => {
              const poster =
                getPoster(movie)

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
                          alt={movie.title}
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


                      {movie.personal_rating !==
                        null && (
                        <div className="absolute right-2.5 top-2.5 rounded-lg bg-black/70 px-2 py-1 text-xs font-bold text-amber-300 backdrop-blur">
                          ★{' '}
                          {
                            movie.personal_rating
                          }
                        </div>
                      )}


                      <div className="absolute inset-x-0 bottom-0 p-3">

                        <h2 className="text-base font-bold text-white">
                          {movie.title}
                        </h2>


                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-300">

                          <span>
                            {
                              movie.release_year
                            }
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
              disabled={
                saving || removing
              }
              aria-label="Close movie details"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-xl text-white transition duration-200 hover:scale-110 hover:border-rose-500 hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-600/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ×
            </button>


            <div className="grid md:grid-cols-[300px_1fr]">

              {/* Poster */}
              <div className="relative min-h-[420px] bg-slate-900">

                {getPoster(
                  selectedMovie,
                ) ? (
                  <img
                    src={getPoster(
                      selectedMovie,
                    )}
                    alt={
                      selectedMovie.title
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[420px] items-center justify-center bg-gradient-to-br from-slate-800 to-rose-950/50 p-8">

                    <span className="text-center text-3xl font-black text-white/30">
                      {
                        selectedMovie.title
                      }
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
                  {
                    selectedMovie.genre
                  }
                </p>


                {!isEditing &&
                  selectedMovie.personal_rating !==
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


                {/* Edit mode */}
                {isEditing && (
                  <div className="mt-8 space-y-5 rounded-xl border border-slate-800 bg-slate-900/40 p-5">

                    {/* Status */}
                    <div>

                      <label
                        htmlFor="edit-status"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        Status
                      </label>


                      <select
                        id="edit-status"
                        value={
                          editStatus
                        }
                        onChange={(
                          event,
                        ) => {
                          const status =
                            event.target
                              .value as
                              | 'watchlist'
                              | 'watched'

                          setEditStatus(
                            status,
                          )

                          if (
                            status ===
                            'watchlist'
                          ) {
                            setEditRating(
                              null,
                            )
                          }
                        }}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                      >

                        <option value="watchlist">
                          Watchlist
                        </option>

                        <option value="watched">
                          Watched
                        </option>

                      </select>

                    </div>


                    {/* Custom rating */}
                    <div>

                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Personal rating
                      </label>


                      <div
                        className={`flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 transition ${
                          editStatus ===
                          'watched'
                            ? 'hover:border-slate-600'
                            : 'opacity-40'
                        }`}
                      >

                        {/* Decrease */}
                        <button
                          type="button"
                          onClick={
                            decreaseRating
                          }
                          disabled={
                            editStatus !==
                              'watched' ||
                            editRating === 0
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-2xl font-semibold text-rose-400 transition duration-200 hover:scale-105 hover:border-rose-500 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-600/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 disabled:hover:border-slate-700 disabled:hover:bg-slate-900 disabled:hover:text-rose-400 disabled:hover:shadow-none"
                        >
                          −
                        </button>


                        {/* Rating number */}
                        <div className="flex min-w-[140px] items-baseline justify-center gap-1">

                          <span className="text-3xl font-black text-white">

                            {editStatus ===
                            'watched'
                              ? (
                                  editRating ??
                                  0
                                ).toFixed(
                                  1,
                                )
                              : '—'}

                          </span>


                          {editStatus ===
                            'watched' && (
                            <span className="text-sm font-semibold text-slate-500">
                              / 10
                            </span>
                          )}

                        </div>


                        {/* Increase */}
                        <button
                          type="button"
                          onClick={
                            increaseRating
                          }
                          disabled={
                            editStatus !==
                              'watched' ||
                            editRating === 10
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-2xl font-semibold text-rose-400 transition duration-200 hover:scale-105 hover:border-rose-500 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-600/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 disabled:hover:border-slate-700 disabled:hover:bg-slate-900 disabled:hover:text-rose-400 disabled:hover:shadow-none"
                        >
                          +
                        </button>

                      </div>


                      {editStatus ===
                        'watchlist' && (
                        <p className="mt-2 text-xs text-slate-500">
                          Mark the movie as watched to add a rating.
                        </p>
                      )}

                    </div>


                    {/* Save / Cancel */}
                    <div className="flex gap-3">

                      <button
                        type="button"
                        onClick={
                          handleSave
                        }
                        disabled={
                          saving
                        }
                        className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {saving
                          ? 'Saving...'
                          : 'Save'}
                      </button>


                      <button
                        type="button"
                        onClick={
                          cancelEditing
                        }
                        disabled={
                          saving
                        }
                        className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Cancel
                      </button>

                    </div>

                  </div>
                )}


                {/* Normal actions */}
                {!isEditing &&
                  !showRemoveConfirm && (
                    <div className="mt-10 flex gap-3">

                      <button
                        type="button"
                        onClick={
                          startEditing
                        }
                        className="rounded-xl bg-rose-600 px-5 py-3 font-semibold transition hover:bg-rose-500"
                      >
                        Edit rating
                      </button>


                      <button
                        type="button"
                        onClick={() => {
                          setActionError(
                            '',
                          )

                          setShowRemoveConfirm(
                            true,
                          )
                        }}
                        className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>

                    </div>
                  )}


                {/* Remove confirmation */}
                {!isEditing &&
                  showRemoveConfirm && (
                    <div className="mt-10 rounded-xl border border-red-500/20 bg-red-500/5 p-5">

                      <p className="text-sm font-medium text-slate-200">
                        Remove this movie from your collection?
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        You can add it again later from Discover.
                      </p>


                      <div className="mt-4 flex gap-3">

                        <button
                          type="button"
                          onClick={
                            handleRemove
                          }
                          disabled={
                            removing
                          }
                          className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {removing
                            ? 'Removing...'
                            : 'Remove'}
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            setShowRemoveConfirm(
                              false,
                            )
                          }
                          disabled={
                            removing
                          }
                          className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Cancel
                        </button>

                      </div>

                    </div>
                  )}


                {actionError && (
                  <p className="mt-4 text-sm text-red-400">
                    {actionError}
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}


export default MoviesPage




























