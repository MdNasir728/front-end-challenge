"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

const publicRoutes = ["/login"];

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for Clerk to finish loading auth state
    if (!isLoaded) return;

    const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route));

    // Redirect signed-in users away from public routes (e.g., /login)
    if (isSignedIn && isPublicRoute) {
      router.replace("/dashboard");
      return;
    }

    // Redirect unauthenticated users to login
    if (!isSignedIn && !isPublicRoute) {
      router.replace("/login");
      return;
    }
  }, [isLoaded, isSignedIn, pathname, router]);

  // Show loading state while Clerk checks authentication
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
