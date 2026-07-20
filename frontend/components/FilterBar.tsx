"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusFilter, SortField, SortOrder } from "@/types/task";
import { Search } from "lucide-react";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  sort: SortField;
  onSortChange: (value: SortField) => void;
  order: SortOrder;
  onOrderChange: (value: SortOrder) => void;
}

const fieldClass =
  "h-9 border-zinc-700 bg-zinc-900 text-zinc-100 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/20";

export function FilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  order,
  onOrderChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`${fieldClass} pl-9 placeholder:text-zinc-600`}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={status} onValueChange={(v) => onStatusChange(v as StatusFilter)}>
          <SelectTrigger className={`${fieldClass} w-full min-w-[7rem] sm:w-28`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-zinc-700 bg-zinc-900 text-zinc-100">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="undone">Undone</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => onSortChange(v as SortField)}>
          <SelectTrigger className={`${fieldClass} w-full min-w-[9rem] sm:w-36`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-zinc-700 bg-zinc-900 text-zinc-100">
            <SelectItem value="created_at">Sort: Date</SelectItem>
            <SelectItem value="priority">Sort: Priority</SelectItem>
          </SelectContent>
        </Select>

        <Select value={order} onValueChange={(v) => onOrderChange(v as SortOrder)}>
          <SelectTrigger className={`${fieldClass} w-full min-w-[8rem] sm:w-32`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-zinc-700 bg-zinc-900 text-zinc-100">
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
