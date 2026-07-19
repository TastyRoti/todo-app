"use client";

import { Task } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggleDone: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggleDone, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-white">
      <Checkbox
        checked={task.done}
        onCheckedChange={(checked) => onToggleDone(task.id, checked === true)}
      />
      <span className={`flex-1 ${task.done ? "line-through text-gray-400" : ""}`}>
        {task.title}
      </span>
      <Badge variant="secondary">Priority: {task.priority}</Badge>
      <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}