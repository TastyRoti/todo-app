"use client";

import { Task } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface TaskItemProps {
  task: Task;
  onToggleDone: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggleDone, onDelete }: TaskItemProps) {
  return (
    <div
      data-testid={`task-item-${task.id}`}
      className="flex items-center gap-3 p-3 border rounded-lg bg-white"
    >
      <Checkbox
        checked={task.done}
        onCheckedChange={(checked) => onToggleDone(task.id, checked === true)}
      />
      <div className="flex-1">
        <span className={task.done ? "line-through text-gray-400" : ""}>
          {task.title}
        </span>
        <div className="flex gap-2 mt-1">
          {task.category && (
            <Badge variant="outline">{task.category.name}</Badge>
          )}
          {task.due_date && (
            <Badge variant="outline" className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              {format(new Date(task.due_date), "PP")}
            </Badge>
          )}
        </div>
      </div>
      <Badge variant="secondary">Priority: {task.priority}</Badge>
      <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}