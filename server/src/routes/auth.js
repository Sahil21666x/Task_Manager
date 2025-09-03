import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

function signToken(user) {
  return jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {}
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" })
    }

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: "Email already registered" })

    const user = await User.create({ name, email, password })
    const token = signToken(user)
    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error("[Auth] register error", err.message)
    return res.status(500).json({ error: "Server error" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: "Invalid credentials" })

    const ok = await user.comparePassword(password)
    if (!ok) return res.status(401).json({ error: "Invalid credentials" })

    const token = signToken(user)
    return res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error("[Auth] login error", err.message)
    return res.status(500).json({ error: "Server error" })
  }
})

export default router
