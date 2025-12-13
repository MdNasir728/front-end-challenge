import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to detect when footer is visible in viewport
 * Returns a ref to attach to footer element and visibility state
 */
export function useFooterVisibility() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return { footerRef, isVisible };
}

