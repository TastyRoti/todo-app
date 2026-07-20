import { Task, TaskCreate, TaskUpdate, Category, StatusFilter, SortField, SortOrder } from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function getTasks(
  status: StatusFilter = "all",
  search: string = "",
  sort: SortField = "created_at",
  order: SortOrder = "asc",
  categoryId?: number | null
): Promise<Task[]> {
  const params = new URLSearchParams({ status, search, sort, order });
  if (categoryId) params.append("category_id", categoryId.toString());

  const res = await fetch(`${API_URL}/tasks/?${params}`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(task: TaskCreate): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(id: number, update: TaskUpdate): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories/`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function createCategory(name: string): Promise<Category> {
  const res = await fetch(`${API_URL}/categories/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete category");
}