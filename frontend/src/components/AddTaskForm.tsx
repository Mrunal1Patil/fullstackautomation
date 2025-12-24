import { useState } from "react";
import { api } from "../api/client";
import type { Task } from "../types/task";

type Props = {
  onCreated: (task: Task) => void;
};

export function AddTaskForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      const res = await api.post<Task>("/api/tasks", { title: trimmed });
      onCreated(res.data);
      setTitle("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task title..."
        disabled={loading}
        style={{ flex: 1, padding: 8 }}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}