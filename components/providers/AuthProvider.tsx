"use client";

import { useEffect, useState } from "react";
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route));

    // If user is signed in and on a public route (like /login), redirect to dashboard
    if (isSignedIn && isPublicRoute) {
      router.replace("/dashboard");
      setTimeout(() => setIsReady(true), 0);
      return;
    }

    // If user is not signed in and not on a public route, redirect to login
    if (!isSignedIn && !isPublicRoute) {
      router.replace("/login");
      setTimeout(() => setIsReady(true), 0);
      return;
    }

    // Allow access - no redirect needed
    setTimeout(() => setIsReady(true), 0);
  }, [isLoaded, isSignedIn, pathname, router]);

  // Show loading state while checking authentication
  if (!isLoaded || !isReady) {
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

