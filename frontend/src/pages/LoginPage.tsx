import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import AuthLayout from '../components/AuthLayout'
import api from '../services/api'
import type { LoginData, TokenResponse } from '../types/user'


function LoginPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await api.post<TokenResponse>(
        '/auth/login',
        formData,
      )

      localStorage.setItem(
        'access_token',
        response.data.access_token,
      )

      navigate('/movies')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            'Login failed',
        )
      } else {
        setError('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <AuthLayout showShowcase>

      <div>

        <div className="mb-10">

          <h2 className="text-4xl font-bold">
            Welcome back
          </h2>

          <p className="mt-3 text-base text-slate-400">
            Sign in to continue tracking your movies.
          </p>

        </div>


        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}


        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  email: event.target.value,
                })
              }
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-4 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />

          </div>


          <div>

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  password: event.target.value,
                })
              }
              required
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-4 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />

          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-rose-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? 'Signing in...'
              : 'Sign in'}
          </button>

        </form>


        <p className="mt-8 text-base text-slate-400">
          New to MovieTracker?{' '}

          <Link
            to="/register"
            className="font-semibold text-rose-400 transition hover:text-rose-300"
          >
            Create an account
          </Link>
        </p>

      </div>

    </AuthLayout>
  )
}


export default LoginPage


























