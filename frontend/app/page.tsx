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

  async function handleAdd(title: string, priority: number, categoryId: number | null, dueDate: string | null) {
  await createTask({ title, priority, category_id: categoryId, due_date: dueDate });
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

  const doneCount = tasks.filter((t) => t.done).length;
  const pendingCount = tasks.length - doneCount;

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-zinc-800 bg-zinc-950/80">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
              Done<span className="text-orange-400">.</span>
            </h1>
            <p className="mt-0.5 text-sm text-zinc-500">Your task workspace</p>
          </div>
          {tasks.length > 0 && (
            <div className="hidden items-center gap-4 text-sm sm:flex">
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Pending</p>
                <p className="font-semibold tabular-nums text-orange-400">{pendingCount}</p>
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Done</p>
                <p className="font-semibold tabular-nums text-zinc-300">{doneCount}</p>
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Total</p>
                <p className="font-semibold tabular-nums text-zinc-100">{tasks.length}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-2xl shadow-black/40">
          <section className="border-b border-zinc-800 p-5 sm:p-6">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Add task
            </h2>
            <TaskForm onAdd={handleAdd} />
          </section>

          <section className="border-b border-zinc-800 p-5 sm:p-6">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Search & filter
            </h2>
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
          </section>

          <section className="p-5 sm:p-6">
            <TaskList tasks={tasks} onToggleDone={handleToggleDone} onDelete={handleDelete} />
          </section>
        </div>
      </main>
    </div>
  );
}
