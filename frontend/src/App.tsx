import { useEffect, useState } from "react";
import { api } from "./api/client";
import type { Task } from "./types/task";
import { TaskItem } from "./components/TaskItem";
import { AddTaskForm } from "./components/AddTaskForm";



function App() {
  const [backendStatus, setBackendStatus] = useState<string>("checking...");

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    
    api.get("/api/health")
      .then((res) => setBackendStatus(res.data.status))
      .catch(() => setBackendStatus("backend not reachable"));
  
    api.get<Task[]>("/api/tasks")
      .then((res) => setTasks(res.data));
  }, []);
  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <h1>Task Tracker</h1>

      <p>
        Backend status: <b>{backendStatus}</b>
      </p>

      <h2>Tasks</h2>

      <AddTaskForm onCreated={(task) => setTasks((prev) => [task, ...prev])} />

      <ul>
  {tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onUpdated={(updated) =>
        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        )
      }
      onDelete={(id) =>
        setTasks((prev) => prev.filter((t) => t.id !== id))
      }
    />
  ))}
</ul>
    </div>
  );
}

export default App;