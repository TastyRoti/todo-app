"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusFilter, SortField, SortOrder } from "@/types/task";
import { ArrowDown, ArrowUp, Search } from "lucide-react";

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

const controlClass =
  "box-border h-9 min-h-9 max-h-9 rounded-lg border border-zinc-700 bg-zinc-900 py-0 text-sm leading-none text-zinc-100 shadow-none focus-visible:border-orange-500 focus-visible:ring-orange-500/20";

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
  function toggleOrder() {
    onOrderChange(order === "asc" ? "desc" : "asc");
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`${controlClass} pl-9 placeholder:text-zinc-600`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={status} onValueChange={(v) => onStatusChange(v as StatusFilter)}>
          <SelectTrigger className={`${controlClass} w-full min-w-[7rem] data-[size=default]:!h-9 sm:w-28`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-zinc-700 bg-zinc-900 text-zinc-100">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="undone">Undone</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => onSortChange(v as SortField)}>
          <SelectTrigger className={`${controlClass} w-full min-w-[9rem] data-[size=default]:!h-9 sm:w-36`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-zinc-700 bg-zinc-900 text-zinc-100">
            <SelectItem value="created_at">Sort: Date</SelectItem>
            <SelectItem value="priority">Sort: Priority</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={toggleOrder}
          aria-label={order === "asc" ? "Sort ascending" : "Sort descending"}
          title={order === "asc" ? "Ascending — click to switch" : "Descending — click to switch"}
          className={`${controlClass} gap-1.5 px-2.5 font-normal hover:bg-zinc-800 hover:text-zinc-100`}
        >
          {order === "asc" ? (
            <>
              <ArrowUp className="size-4 text-orange-400" />
              <span className="text-zinc-400">Asc</span>
            </>
          ) : (
            <>
              <ArrowDown className="size-4 text-orange-400" />
              <span className="text-zinc-400">Desc</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
