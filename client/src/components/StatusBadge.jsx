import React from "react";

export default function StatusBadge({ completed }) {
  return (
    <span className={`badge ${completed ? "badge-green" : "badge-gray"}`}>{completed ? "Completed" : "Pending"}</span>
  )
}
