import React from "react";
import StatusBadge from "./StatusBadge.jsx"

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <li className="card p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <input
              id={`t-${task._id}`}
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
              className="h-4 w-4 accent-brand"
              aria-label="Toggle completed"
            />
            <label
              htmlFor={`t-${task._id}`}
              className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
            >
              {task.title}
            </label>
            <StatusBadge completed={task.completed} />
          </div>
          {task.description && <p className="mt-2 text-sm text-gray-600">{task.description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={() => onDelete(task)}>
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}
