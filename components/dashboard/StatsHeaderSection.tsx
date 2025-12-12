"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit } from "lucide-react";

export const StatsHeaderSection = () => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      {/* Left side: Stats title and dropdowns */}
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Stats</h2>
        <Select defaultValue="Years">
          <SelectTrigger className="h-9 w-32 bg-white dark:bg-gray-800 text-sm border-gray-200 dark:border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Years">Years</SelectItem>
            <SelectItem value="Months">Months</SelectItem>
            <SelectItem value="Days">Days</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="Aug 20th - Dec 4th">
          <SelectTrigger className="h-9 w-48 bg-white dark:bg-gray-800 text-sm border-gray-200 dark:border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Aug 20th - Dec 4th">Aug 20th - Dec 4th</SelectItem>
            <SelectItem value="Jan 1st - Mar 31st">Jan 1st - Mar 31st</SelectItem>
            <SelectItem value="Apr 1st - Jun 30th">Apr 1st - Jun 30th</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Compared to</span>
          <Select defaultValue="Previous">
            <SelectTrigger className="h-9 w-40 bg-white dark:bg-gray-800 text-sm border-gray-200 dark:border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Previous">Previous</SelectItem>
              <SelectItem value="Last Year">Last Year</SelectItem>
              <SelectItem value="Average">Average</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select defaultValue="2024">
          <SelectTrigger className="h-9 w-24 bg-white dark:bg-gray-800 text-sm border-gray-200 dark:border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Right side: Add and Edit buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="h-9 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
        <Button
          variant="outline"
          className="h-9 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
    </div>
  );
};

