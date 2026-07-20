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
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <Input
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 min-w-[150px]"
      />

      <Select value={priority} onValueChange={setPriority}>
        <SelectTrigger className="w-24" data-testid="priority-select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <SelectItem key={n} value={n.toString()}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger className="w-36" data-testid="category-select">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No category</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </SelectItem>
          ))}
          <div className="flex gap-1 p-2 border-t">
            <Input
              placeholder="New category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="h-8 text-sm"
              onClick={(e) => e.stopPropagation()}
              data-testid="new-category-input"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleCreateCategory}
              className="h-8"
              data-testid="new-category-submit"

            >
              +
            </Button>
          </div>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" type="button" className="w-40 justify-start" data-testid="due-date-trigger">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dueDate ? format(dueDate, "PP") : "Due date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={dueDate} onSelect={setDueDate} />
        </PopoverContent>
      </Popover>

      <Button type="submit">Add</Button>
    </form>
  );
}