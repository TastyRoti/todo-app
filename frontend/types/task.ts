export interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: number;
  created_at: string;
}

export interface TaskCreate {
  title: string;
  priority?: number;
}

export interface TaskUpdate {
  title?: string;
  done?: boolean;
  priority?: number;
}

export type StatusFilter = "all" | "done" | "undone";
export type SortField = "priority" | "created_at";
export type SortOrder = "asc" | "desc";