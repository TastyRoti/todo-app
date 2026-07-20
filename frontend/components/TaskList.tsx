import { Task } from "@/types/task";
import { TaskItem } from "@/components/TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleDone: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export function TaskList({ tasks, onToggleDone, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="py-14 text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
          <span className="text-lg text-zinc-600">—</span>
        </div>
        <p className="text-sm font-medium text-zinc-400">No tasks found</p>
        <p className="mt-1 text-xs text-zinc-600">
          Add a task above or change your filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Tasks
        </h2>
        <span className="text-xs tabular-nums text-zinc-600">
          {tasks.length} {tasks.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-800">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleDone={onToggleDone}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
