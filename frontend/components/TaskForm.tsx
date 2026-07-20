"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories, createCategory } from "@/lib/api";
import { Category } from "@/types/task";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface TaskFormProps {
  onAdd: (title: string, priority: number, categoryId: number | null, dueDate: string | null) => void;
}

const fieldClass =
  "h-9 border-zinc-700 bg-zinc-900 text-zinc-100 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/20";

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("1");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>("none");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  async function handleCreateCategory() {
    if (!newCategoryName.trim()) return;
    const created = await createCategory(newCategoryName);
    setCategories((prev) => [...prev, created]);
    setCategoryId(created.id.toString());
    setNewCategoryName("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(
      title,
      parseInt(priority),
      categoryId === "none" ? null : parseInt(categoryId),
      dueDate ? dueDate.toISOString() : null
    );
    setTitle("");
    setPriority("1");
    setCategoryId("none");
    setDueDate(undefined);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`${fieldClass} h-10 text-base placeholder:text-zinc-600`}
      />

      <div className="flex flex-wrap gap-2">
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className={`${fieldClass} w-20`} data-testid="priority-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-zinc-700 bg-zinc-900 text-zinc-100">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className={`${fieldClass} w-36`} data-testid="category-select">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="border-zinc-700 bg-zinc-900 text-zinc-100">
            <SelectItem value="none">No category</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </SelectItem>
            ))}
            <div className="flex gap-1 border-t border-zinc-800 p-2">
              <Input
                placeholder="New category"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className={`${fieldClass} h-8 text-sm placeholder:text-zinc-600`}
                onClick={(e) => e.stopPropagation()}
                data-testid="new-category-input"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleCreateCategory}
                className="h-8 bg-orange-500 text-zinc-950 hover:bg-orange-400"
                data-testid="new-category-submit"
              >
                +
              </Button>
            </div>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className={`${fieldClass} w-40 justify-start font-normal hover:bg-zinc-800 hover:text-zinc-100`}
              data-testid="due-date-trigger"
            >
              <CalendarIcon className="mr-2 size-4 text-orange-400" />
              {dueDate ? format(dueDate, "PP") : "Due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto border-zinc-700 bg-zinc-900 p-0 text-zinc-100">
            <Calendar mode="single" selected={dueDate} onSelect={setDueDate} />
          </PopoverContent>
        </Popover>

        <Button
          type="submit"
          className="h-9 bg-orange-500 px-5 font-semibold text-zinc-950 hover:bg-orange-400"
        >
          Add
        </Button>
      </div>
    </form>
  );
}
