"use client";

import { useEffect, useState, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/api";
import { Task, StatusFilter, SortField, SortOrder } from "@/types/task";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { FilterBar } from "@/components/FilterBar";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortField>("created_at");
  const [order, setOrder] = useState<SortOrder>("asc");

  const loadTasks = useCallback(() => {
    getTasks(status, search, sort, order)
      .then(setTasks)
      .catch((err) => console.error(err));
  }, [status, search, sort, order]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleAdd(title: string, priority: number) {
    await createTask({ title, priority });
    loadTasks();
  }

  async function handleToggleDone(id: number, done: boolean) {
    await updateTask(id, { done });
    loadTasks();
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    loadTasks();
  }

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">TODO App</h1>

      <TaskForm onAdd={handleAdd} />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        sort={sort}
        onSortChange={setSort}
        order={order}
        onOrderChange={setOrder}
      />

      <TaskList tasks={tasks} onToggleDone={handleToggleDone} onDelete={handleDelete} />
    </div>
  );
}