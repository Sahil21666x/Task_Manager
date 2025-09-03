import React from "react";
import { useEffect, useMemo, useState } from "react"
import Header from "../components/Header.jsx"
import TaskForm from "../components/TaskForm.jsx"
import TaskList from "../components/TaskList.jsx"
import api from "../services/api.js"

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get("/api/tasks")
      setTasks(data.tasks || [])
    } catch (e) {
      alert(e.response?.data?.error || "Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function createTask(payload) {
    try {
      const { data } = await api.post("/api/tasks", payload)
      setTasks((prev) => [data.task, ...prev])
    } catch (e) {
      alert(e.response?.data?.error || "Failed to add task")
    }
  }

  async function updateTask(payload) {
    try {
      const { data } = await api.put(`/api/tasks/${editing._id}`, payload)
      setTasks((prev) => prev.map((t) => (t._id === data.task._id ? data.task : t)))
      setEditing(null)
    } catch (e) {
      alert(e.response?.data?.error || "Failed to update task")
    }
  }

  async function toggleTask(task) {
    try {
      const { data } = await api.patch(`/api/tasks/${task._id}/toggle`)
      setTasks((prev) => prev.map((t) => (t._id === data.task._id ? data.task : t)))
    } catch (e) {
      alert(e.response?.data?.error || "Failed to toggle task")
    }
  }

  async function deleteTask(task) {
    if (!confirm("Delete this task?")) return
    try {
      await api.delete(`/api/tasks/${task._id}`)
      setTasks((prev) => prev.filter((t) => t._id !== task._id))
    } catch (e) {
      alert(e.response?.data?.error || "Failed to delete task")
    }
  }

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    const pending = total - completed
    return { total, completed, pending }
  }, [tasks])

  return (
    <div className="min-h-screen bg-slate-800" >
      <Header />
      <section className="mx-auto  max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-balance text-2xl font-semibold text-white">Your Tasks</h2>
            <p className="text-sm text-white">
              Total: {stats.total} • Pending: {stats.pending} • Completed: {stats.completed}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <TaskForm initial={editing} onSubmit={editing ? updateTask : createTask} />
          </div>
          <div className="space-y-4">
            <div className="card p-4">
              <h3 className="mb-3 text-lg font-medium text-gray-900">Task List</h3>
              {loading ? (
                <p className="text-sm text-gray-600">Loading...</p>
              ) : (
                <TaskList tasks={tasks} onToggle={toggleTask} onEdit={(t) => setEditing(t)} onDelete={deleteTask} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
