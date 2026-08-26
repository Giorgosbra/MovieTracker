import {
  useEffect,
  useState,
  type ReactNode,
} from 'react'

interface AuthLayoutProps {
  children: ReactNode
  showShowcase?: boolean
}

const slides = [
  {
    image: '/auth-posters/interstellar.jpg',
    title: 'Track your favorite films',
    subtitle: 'Build your own personal movie universe.',
  },
  {
    image: '/auth-posters/inception.jpg',
    title: 'Rate what you watch',
    subtitle: 'Keep your personal ratings in one place.',
  },
  {
    image: '/auth-posters/the_dark_knight.jpg',
    title: 'Build your watchlist',
    subtitle: 'Never forget what you want to watch next.',
  },
  {
  image: '/auth-posters/project_hail_mary.jpg',
  title: 'Explore something new',
  subtitle: 'Keep track of every movie that catches your attention.',
  },
  {
    image: '/auth-posters/odyssey.jpg',
    title: 'Discover your next movie',
    subtitle: 'Your collection keeps growing with you.',
  },
  {
    image: '/auth-posters/spiderman_brand_new_day.jpg',
    title: 'Your movies, your story',
    subtitle: 'Create a collection that feels personal.',
  },
]

function AuthLayout({
  children,
  showShowcase = false,
}: AuthLayoutProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!showShowcase) {
      return
    }

    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [showShowcase])

  const current = slides[currentSlide]

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className={
          showShowcase
            ? 'grid min-h-screen lg:grid-cols-[48%_52%]'
            : 'flex min-h-screen items-center justify-center'
        }
      >
        {/* Left side */}
        <div className="relative flex items-center justify-center overflow-hidden px-8 py-12 lg:px-20">
          {/* stronger red glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(225,29,72,0.24),_transparent_38%)]" />
          <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-rose-600/18 blur-3xl" />
          <div className="absolute bottom-[-160px] left-[-100px] h-80 w-80 rounded-full bg-violet-700/10 blur-3xl" />

          <div className="relative z-10 w-full max-w-lg">
            <div className="mb-12">
              <h1 className="text-5xl font-black tracking-tight lg:text-6xl">
                Movie
                <span className="text-rose-500">Tracker</span>
              </h1>

              <p className="mt-4 text-base text-slate-400">
                Your movies. Your ratings. Your watchlist.
              </p>
            </div>

            {children}
          </div>
        </div>

        {/* Right showcase */}
        {showShowcase && (
          <div className="relative hidden min-h-screen overflow-hidden lg:block">
            {/* blurred background slideshow */}
            {slides.map((slide, index) => (
              <div
                key={`bg-${slide.image}`}
                className={`absolute inset-0 scale-110 bg-cover bg-center transition-opacity duration-[2600ms] ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  filter: 'blur(34px)',
                }}
              />
            ))}

            {/* dark overlays */}
            <div className="absolute inset-0 bg-slate-950/55" />
            <div className="absolute inset-y-0 left-0 z-10 w-56 bg-gradient-to-r from-slate-950 via-slate-950/72 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_25%,_rgba(2,6,23,0.45)_100%)]" />

            {/* content layout */}
            <div className="relative z-20 flex min-h-screen flex-col">
              {/* poster zone */}
              <div className="flex flex-1 items-center justify-center px-10 pt-8">
                <div className="relative flex h-[72vh] w-full max-w-[620px] items-center justify-center">
                  {slides.map((slide, index) => (
                    <img
                      key={slide.image}
                      src={slide.image}
                      alt=""
                      className={`absolute max-h-full max-w-full object-contain transition-all duration-[2600ms] ease-in-out ${
                        index === currentSlide
                          ? 'scale-100 opacity-100 blur-0'
                          : 'scale-95 opacity-0 blur-sm'
                      }`}
                      style={{
                        WebkitMaskImage:
                          'radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.96) 74%, rgba(0,0,0,0.75) 84%, transparent 100%)',
                        maskImage:
                          'radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.96) 74%, rgba(0,0,0,0.75) 84%, transparent 100%)',
                        filter:
                          index === currentSlide
                            ? 'drop-shadow(0 18px 50px rgba(0,0,0,0.45))'
                            : 'drop-shadow(0 12px 36px rgba(0,0,0,0.25))',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* text zone below poster */}
              <div className="px-16 pb-12">
                <div
                  key={current.title}
                  className="transition-all duration-700 ease-out"
                >
                  <h2 className="max-w-2xl text-4xl font-black leading-tight lg:text-5xl">
                    {current.title}
                  </h2>

                  <p className="mt-3 max-w-xl text-base text-slate-300">
                    {current.subtitle}
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Movie slide ${index + 1}`}
                      className={
                        index === currentSlide
                          ? 'h-2 w-9 rounded-full bg-rose-500 transition-all duration-500'
                          : 'h-2 w-2 rounded-full bg-white/30 transition-all duration-500 hover:bg-white/60'
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthLayout





