"use client";

import { useRole } from "@/contexts/RoleContext";

export default function HomePage() {
  const { role } = useRole();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Home
        </h1>
      </div>
      
      <div className="rounded-xl bg-white dark:bg-gray-800 p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Welcome, {role}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is the home page. You can navigate to different sections using the sidebar menu.
          </p>
          
          {role === "Manager" && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                As a Manager, you have access to the Dashboard and all features.
              </p>
            </div>
          )}
          
          {role === "Store Keeper" && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                As a Store Keeper, you can manage products and view inventory.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

