import { Task } from "@/types/task";
import { TaskItem } from "@/components/TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleDone: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export function TaskList({ tasks, onToggleDone, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-gray-400 text-center py-8">No tasks found</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}