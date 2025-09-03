"use client"

import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import api from "../services/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const json = localStorage.getItem("tm_user")
    return json ? JSON.parse(json) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem("tm_token"))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) localStorage.setItem("tm_user", JSON.stringify(user))
    else localStorage.removeItem("tm_user")
  }, [user])

  useEffect(() => {
    if (token) localStorage.setItem("tm_token", token)
    else localStorage.removeItem("tm_token")
  }, [token])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post("/api/auth/login", { email, password })
      setUser(data.user)
      setToken(data.token)
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e.response?.data?.error || "Login failed" }
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post("/api/auth/register", { name, email, password })
      setUser(data.user)
      setToken(data.token)
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e.response?.data?.error || "Registration failed" }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  const value = useMemo(() => ({ user, token, login, register, logout, loading }), [user, token, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
