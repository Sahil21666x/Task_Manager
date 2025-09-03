import express from "express"
import Task from "../models/Task.js"
import { authRequired } from "../middleware/auth.js"

const router = express.Router()

// All routes require auth
router.use(authRequired)

// GET /api/tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json({ tasks })
  } catch (err) {
    console.error("[Tasks] list error", err.message)
    res.status(500).json({ error: "Server error" })
  }
})

// POST /api/tasks
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body || {}
    if (!title) return res.status(400).json({ error: "Title is required" })
    const task = await Task.create({
      title,
      description: description || "",
      user: req.user.id,
    })
    res.status(201).json({ task })
  } catch (err) {
    console.error("[Tasks] create error", err.message)
    res.status(500).json({ error: "Server error" })
  }
})

// PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body || {}
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: { title, description, completed } },
      { new: true },
    )
    if (!task) return res.status(404).json({ error: "Task not found" })
    res.json({ task })
  } catch (err) {
    console.error("[Tasks] update error", err.message)
    res.status(500).json({ error: "Server error" })
  }
})

// PATCH /api/tasks/:id/toggle
router.patch("/:id/toggle", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id })
    if (!task) return res.status(404).json({ error: "Task not found" })
    task.completed = !task.completed
    await task.save()
    res.json({ task })
  } catch (err) {
    console.error("[Tasks] toggle error", err.message)
    res.status(500).json({ error: "Server error" })
  }
})

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    if (!task) return res.status(404).json({ error: "Task not found" })
    res.json({ success: true })
  } catch (err) {
    console.error("[Tasks] delete error", err.message)
    res.status(500).json({ error: "Server error" })
  }
})

export default router
