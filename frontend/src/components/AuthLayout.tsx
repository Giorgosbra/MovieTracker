import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(225,29,72,0.18),_transparent_40%)]" />

      <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-rose-600/10 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-100px] h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight">
            Movie<span className="text-rose-500">Tracker</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Your movies. Your ratings. Your watchlist.
          </p>
        </div>

        {children}
      </div>
    </div>
  )
}

export default AuthLayout





