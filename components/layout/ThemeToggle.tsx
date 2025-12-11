"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted] = useState(() => typeof window !== "undefined");

  if (!mounted) {
    return (
      <div className="w-20 h-10 rounded-full bg-gray-200 dark:bg-gray-800" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-20 h-10 rounded-full transition-all duration-300 ease-in-out",
        "bg-gray-200 dark:bg-gray-800",
        "border-2 border-gray-300 dark:border-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
        "hover:bg-gray-300 dark:hover:bg-gray-700"
      )}
      aria-label="Toggle theme"
    >
      {/* Toggle indicator */}
      <div
        className={cn(
          "absolute top-1 left-1 w-8 h-8 rounded-full",
          "bg-white dark:bg-gray-900",
          "shadow-lg transition-transform duration-300 ease-in-out",
          "flex items-center justify-center",
          isDark ? "translate-x-10" : "translate-x-0"
        )}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-purple-600" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </div>
      
      {/* Icons in background */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Sun className={cn(
          "w-4 h-4 transition-opacity duration-300",
          isDark ? "opacity-30" : "opacity-100 text-yellow-500"
        )} />
        <Moon className={cn(
          "w-4 h-4 transition-opacity duration-300",
          isDark ? "opacity-100 text-purple-400" : "opacity-30"
        )} />
      </div>
    </button>
  );
}
