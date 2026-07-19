"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/api";
import { Task } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Connection test</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(tasks, null, 2)}
      </pre>
    </div>
  );
}