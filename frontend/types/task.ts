export interface Category {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: number;
  due_date: string | null;
  category_id: number | null;
  category: Category | null;
  created_at: string;
}

export interface TaskCreate {
  title: string;
  priority?: number;
  due_date?: string | null;
  category_id?: number | null;
}

export interface TaskUpdate {
  title?: string;
  done?: boolean;
  priority?: number;
  due_date?: string | null;
  category_id?: number | null;
}

export type StatusFilter = "all" | "done" | "undone";
export type SortField = "priority" | "created_at";
export type SortOrder = "asc" | "desc";