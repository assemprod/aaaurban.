"use client";

import { useEffect, type ReactNode } from "react";

export default function ServiceMotion({ children }: { children: ReactNode }) {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-service-reveal]"));
    if (!items.length) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      items.forEach((item) => item.classList.add("service-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("service-inview");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return children;
}
