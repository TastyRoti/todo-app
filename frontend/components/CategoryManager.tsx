"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCategories, createCategory, deleteCategory } from "@/lib/api";
import { Category } from "@/types/task";
import { X } from "lucide-react";

const controlClass =
  "box-border h-9 min-h-9 max-h-9 rounded-lg border border-zinc-700 bg-zinc-900 py-0 text-sm leading-none text-zinc-100 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/20";

interface CategoryManagerProps {
  onCategoriesChange?: () => void;
}

export function CategoryManager({ onCategoriesChange }: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");

  function refresh() {
    getCategories().then(setCategories);
    onCategoriesChange?.();
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    await createCategory(newName);
    setNewName("");
    refresh();
  }

  async function handleDelete(id: number) {
    await deleteCategory(id);
    refresh();
  }

  return (
    <form onSubmit={handleAdd} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Categories
        </span>
        <div className="flex items-end gap-2">
          <Input
            placeholder="New category name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={`${controlClass} flex-1 placeholder:text-zinc-600`}
          />
          <Button
            type="submit"
            size="lg"
            className={`${controlClass} bg-orange-500 px-5 font-semibold text-zinc-950 hover:bg-orange-400`}
          >
            Add
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.length === 0 && (
          <p className="text-sm text-zinc-600">No categories yet</p>
        )}
        {categories.map((cat) => (
          <Badge
            key={cat.id}
            variant="outline"
            className="flex items-center gap-1 border-zinc-700 py-1 pl-2.5 pr-1 text-zinc-200"
          >
            {cat.name}
            <button
              type="button"
              onClick={() => handleDelete(cat.id)}
              className="rounded-full p-0.5 hover:bg-zinc-800"
              aria-label={`Delete ${cat.name}`}
            >
              <X className="size-3 text-zinc-500 hover:text-orange-400" />
            </button>
          </Badge>
        ))}
      </div>
    </form>
  );
}