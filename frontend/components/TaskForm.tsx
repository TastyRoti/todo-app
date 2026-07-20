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

const controlClass =
  "box-border h-9 min-h-9 max-h-9 rounded-lg border border-zinc-700 bg-zinc-900 py-0 text-sm leading-none text-zinc-100 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/20";

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
        className={`${controlClass} h-10 min-h-10 max-h-10 text-base placeholder:text-zinc-600`}
      />

      <div className="flex flex-wrap items-end gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Priority
          </span>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className={`${controlClass} w-20 data-[size=default]:!h-9`} data-testid="priority-select">
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
        </div>

        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className={`${controlClass} w-36 data-[size=default]:!h-9`} data-testid="category-select">
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
                className={`${controlClass} text-sm placeholder:text-zinc-600`}
                onClick={(e) => e.stopPropagation()}
                data-testid="new-category-input"
              />
              <Button
                type="button"
                size="lg"
                onClick={handleCreateCategory}
                className={`${controlClass} bg-orange-500 px-2.5 text-zinc-950 hover:bg-orange-400`}
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
              size="lg"
              className={`${controlClass} w-40 justify-start px-2.5 font-normal hover:bg-zinc-800 hover:text-zinc-100`}
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
          size="lg"
          className={`${controlClass} px-5 font-semibold bg-orange-500 text-zinc-950 hover:bg-orange-400`}
        >
          Add
        </Button>
      </div>
    </form>
  );
}
