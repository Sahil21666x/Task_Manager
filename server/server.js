import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import authRoutes from "./src/routes/auth.js"
import taskRoutes from "./src/routes/tasks.js"

dotenv.config()

const app = express()

// Middlewares
app.use(express.json())
app.use(morgan("dev"))
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
)

// Routes
app.get("/", (req, res) => res.json({ message: "Task Manager API" }))
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

// DB and server
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI || !process.env.JWT_SECRET) {
  console.error("[Server] Missing MONGODB_URI or JWT_SECRET")
  process.exit(1)
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("[Server] MongoDB connected")
    app.listen(PORT, () => console.log(`[Server] Running on :${PORT}`))
  })
  .catch((err) => {
    console.error("[Server] MongoDB connection error:", err.message)
    process.exit(1)
  })
