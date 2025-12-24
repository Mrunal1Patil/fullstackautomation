import { api } from "../api/client";
import type { Task, TaskStatus } from "../types/task";

type Props = {
  task: Task;
  onUpdated: (task: Task) => void;
  onDelete: (id: string) => void;
};

function nextStatus(current: TaskStatus): TaskStatus {
  if (current === "TODO") return "DOING";
  if (current === "DOING") return "DONE";
  return "TODO";
}

export function TaskItem({ task, onUpdated, onDelete }: Props) {
  async function handleNext() {
    const next = nextStatus(task.status);

    const res = await api.put<Task>(`/api/tasks/${task.id}`, {
      status: next,
    });

    onUpdated(res.data);
  }

  return (
    <li style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ flex: 1 }}>
        <b>{task.title}</b> — {task.status}
      </div>

      <button onClick={handleNext}>Next</button>

      <button
  onClick={async () => {
    await api.delete(`/api/tasks/${task.id}`);
    onDelete(task.id);
  }}
>
  Delete
</button>
    </li>
  );
}