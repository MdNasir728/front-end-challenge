"use client";

import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";
import { useState } from "react";

export function ToastProvider() {
  const { theme } = useTheme();
  const [mounted] = useState(() => typeof window !== "undefined");

  if (!mounted) {
    return null;
  }

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={true}
      theme={theme === "dark" ? "dark" : "light"}
      className="mt-16"
    />
  );
}

