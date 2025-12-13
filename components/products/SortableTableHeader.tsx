"use client";

import { ArrowUpDown } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { SortField } from "@/types/product";

interface SortableTableHeaderProps {
  field: SortField;
  label: string;
  sortField: SortField | null;
  sortOrder: "asc" | "desc";
  onSort: (field: SortField) => void;
}

export const SortableTableHeader = ({
  field,
  label,
  onSort,
}: SortableTableHeaderProps) => {
  return (
    <TableHead className="text-gray-600 dark:text-gray-400">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 p-0 font-medium hover:bg-transparent text-gray-600 dark:text-gray-400"
        onClick={() => onSort(field)}
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );
};

