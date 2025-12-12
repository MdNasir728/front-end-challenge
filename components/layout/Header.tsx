"use client";

import { UserButton } from "@clerk/nextjs";
import { Search, Bell, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

const roles = ["Admin", "Manager", "Member"];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative w-full max-w-md">
          <Input
            type="search"
            placeholder="Search"
            className="h-10 pl-10 pr-3 bg-gray-50 dark:bg-black border-gray-200 dark:border-gray-800"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
        <Button className="h-10 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700">
          Search
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <RoleSelect />
        <IconButton icon={LayoutGrid} ariaLabel="Apps" />
        <IconButton icon={Bell} ariaLabel="Notifications" />
        <ThemeToggle />
        <UserButton afterSignOutUrl="/login" />
      </div>
    </header>
  );
}

function RoleSelect() {
  return (
    <select
      className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 shadow-sm transition hover:border-gray-300 dark:border-gray-800 dark:bg-black dark:text-gray-200"
      defaultValue="Admin"
    >
      {roles.map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
}

function IconButton({
  icon: Icon,
  ariaLabel,
}: {
  icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        "flex h-10 w-10 items-center justify-center text-gray-700 transition",
        "hover:bg-gray-100 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

