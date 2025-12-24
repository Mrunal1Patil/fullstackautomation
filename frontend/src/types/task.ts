export type TaskStatus = "TODO" | "DOING" | "DONE";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};