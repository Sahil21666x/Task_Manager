import React from "react";
import { useMemo, useState } from "react"
import TaskItem from "./TaskItem.jsx"

const tabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
]

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const [active, setActive] = useState("all")

  const filtered = useMemo(() => {
    if (active === "pending") return tasks.filter((t) => !t.completed)
    if (active === "completed") return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, active])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`btn ${active === t.key ? "btn-primary" : "btn-outline"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul className="grid gap-3">
        {filtered.length === 0 ? (
          <li className="text-sm text-gray-600">No tasks to show.</li>
        ) : (
          filtered.map((task) => (
            <TaskItem key={task._id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </ul>
    </div>
  )
}
