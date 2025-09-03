import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../state/AuthContext.jsx"

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get("name")
    const email = form.get("email")
    const password = form.get("password")
    const res = await register(name, email, password)
    if (res.ok) navigate("/app", { replace: true })
    else alert(res.error)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <div className="mb-8 text-center">
        <div className="mx-auto h-10 w-10 rounded bg-brand" aria-hidden />
        <h1 className="mt-3 text-2xl font-semibold text-gray-900">Create your account</h1>
        <p className="mt-1 text-sm text-gray-600">Start organizing your tasks today</p>
      </div>
      <form onSubmit={handleSubmit} className="card p-6">
        <div className="grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
            <input name="name" className="input" placeholder="Your name" required minLength={2} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input name="email" type="email" className="input" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
          </div>
          <button disabled={loading} className="btn btn-primary">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link className="text-brand hover:underline" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  )
}
