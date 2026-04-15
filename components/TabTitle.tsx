"use client";

import { useEffect } from "react";

const STREAK_KEY = "roadmap_streak_v1";

export function TabTitle() {
  useEffect(() => {
    function update() {
      try {
        const data = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
        const streak: number = data.currentStreak ?? 0;
        if (streak >= 3) {
          document.title = `🔥 ${streak} dias — Dev Roadmap`;
        } else {
          document.title = "Dev Roadmap — Python & TypeScript";
        }
      } catch {
        document.title = "Dev Roadmap — Python & TypeScript";
      }
    }

    update();
    document.addEventListener("visibilitychange", update);
    const interval = setInterval(update, 60_000);
    return () => {
      document.removeEventListener("visibilitychange", update);
      clearInterval(interval);
    };
  }, []);

  return null;
}
