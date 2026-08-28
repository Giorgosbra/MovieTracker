import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  movieCatalog,
  type CatalogMovie,
} from '../data/movieCatalog'


function DiscoverMoviesPage() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  const [selectedMovie, setSelectedMovie] =
    useState<CatalogMovie | null>(null)

  const [isClosing, setIsClosing] =
    useState(false)


  const filteredMovies = movieCatalog.filter(
    (movie) =>
      movie.title
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  )


  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }


  const openMovie = (
    movie: CatalogMovie,
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
              onClick={() => navigate('/movies')}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              My Movies
            </button>

            <button
              type="button"
              onClick={() => navigate('/profile')}
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
        <div className="mb-8">

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">
            Discover
          </p>

          <h1 className="text-4xl font-black">
            Discover Movies
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Find your next movie and add it to your collection.
          </p>

        </div>


        {/* Search */}
        <div className="mb-14 max-w-2xl">

          <div className="relative">

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search for a movie..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />

          </div>

        </div>


        {/* Section title */}
        <div className="mb-6">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {search.trim()
              ? 'Search results'
              : 'Movie catalogue'}
          </p>

        </div>


        {/* No results */}
        {filteredMovies.length === 0 && (
          <div className="py-20">

            <h2 className="text-xl font-bold">
              No movies found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Try searching for another title.
            </p>

          </div>
        )}


        {/* Movie catalogue */}
        {filteredMovies.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">

            {filteredMovies.map((movie) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => openMovie(movie)}
                className="group w-[160px] text-left sm:w-[170px]"
              >

                <article className="relative overflow-hidden rounded-xl bg-slate-900 shadow-lg transition duration-300 group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-rose-950/30">

                  {/* Poster */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">

                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />


                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />


                    {/* Movie information */}
                    <div className="absolute inset-x-0 bottom-0 p-3">

                      <h2 className="text-sm font-bold text-white">
                        {movie.title}
                      </h2>

                      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-300">

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
            ))}

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

                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/30" />

              </div>


              {/* Information */}
              <div className="flex flex-col justify-center p-8 md:p-10">

                <span className="w-fit rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
                  Discover
                </span>


                <h2 className="mt-5 text-4xl font-black">
                  {selectedMovie.title}
                </h2>


                <p className="mt-2 text-slate-400">
                  {selectedMovie.release_year}
                  {' · '}
                  {selectedMovie.genre}
                </p>


                <p className="mt-6 leading-7 text-slate-300">
                  {selectedMovie.description}
                </p>


                {/* Add */}
                <div className="mt-10">

                  <button
                    type="button"
                    className="rounded-xl bg-rose-600 px-6 py-3 font-semibold transition hover:bg-rose-500"
                  >
                    + Add to collection
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


export default DiscoverMoviesPage









































