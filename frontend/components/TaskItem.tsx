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

function getPriorityStyles(priority: number) {
  if (priority >= 8) return "text-red-400 bg-red-400/10 border-red-400/20";
  if (priority >= 5) return "text-orange-400 bg-orange-400/10 border-orange-400/20";
  return "text-zinc-400 bg-zinc-400/10 border-zinc-600";
}

export function TaskItem({ task, onToggleDone, onDelete }: TaskItemProps) {
  return (
    <div
      data-testid={`task-item-${task.id}`}
      className={`group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
        task.done
          ? "opacity-60"
          : "hover:bg-zinc-800/60"
      }`}
    >
      <Checkbox
        checked={task.done}
        onCheckedChange={(checked) => onToggleDone(task.id, checked === true)}
        className="border-zinc-600 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:text-zinc-950"
      />

      <div className="min-w-0 flex-1">
        <span
          className={`block text-sm font-medium ${
            task.done ? "line-through text-gray-400" : "text-zinc-100"
          }`}
        >
          {task.title}
        </span>
        {(task.category || task.due_date) && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {task.category && (
              <Badge
                variant="outline"
                className="border-zinc-700 bg-zinc-800/80 font-normal text-zinc-400"
              >
                {task.category.name}
              </Badge>
            )}
            {task.due_date && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 border-zinc-700 bg-zinc-800/80 font-normal text-zinc-400"
              >
                <CalendarIcon className="h-3 w-3" />
                {format(new Date(task.due_date), "PP")}
              </Badge>
            )}
          </div>
        )}
      </div>

      <Badge
        variant="secondary"
        className={`shrink-0 border font-mono text-xs tabular-nums ${getPriorityStyles(task.priority)}`}
      >
        Priority: {task.priority}
      </Badge>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="size-8 shrink-0 text-zinc-600 hover:bg-red-500/10 hover:text-red-400"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
