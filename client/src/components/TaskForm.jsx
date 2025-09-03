import React from "react";
import { useEffect, useState } from "react"

export default function TaskForm({ onSubmit, initial }) {
  const [title, setTitle] = useState(initial?.title || "")
  const [description, setDescription] = useState(initial?.description || "")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setTitle(initial?.title || "")
    setDescription(initial?.description || "")
  }, [initial])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await onSubmit({ title, description })
    setSubmitting(false)
    if (!initial) {
      setTitle("")
      setDescription("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <div className="grid gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
          <input
            className="input"
            placeholder="e.g. Write project proposal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={200}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="input min-h-[96px]"
            placeholder="Optional details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          {initial && (
            <button
              type="button"
              onClick={() => {
                setTitle(initial?.title || "")
                setDescription(initial?.description || "")
              }}
              className="btn btn-outline"
            >
              Reset
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Saving..." : initial ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </form>
  )
}
