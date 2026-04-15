"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";
const STORAGE_KEY = "roadmap_theme_v1";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  if (compact) {
    return (
      <button
        onClick={toggle}
        title={isDark ? "Modo claro" : "Modo escuro"}
        className="w-7 h-7 flex items-center justify-center rounded-md transition-all duration-150"
        style={{ background: "#1e1e2a", border: "1px solid #26263a", color: "#9090b0" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#c0c0d8"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#9090b0"; }}
      >
        {isDark ? <Sun size={13} strokeWidth={1.5} /> : <Moon size={13} strokeWidth={1.5} />}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 text-xs w-full px-2 py-1.5 rounded-md transition-all duration-150"
      style={{ color: "#9090b0" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#c0c0d8";
        (e.currentTarget as HTMLElement).style.background = "#1e1e2a";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#9090b0";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {isDark
        ? <><Sun size={13} strokeWidth={1.5} /> <span>Modo claro</span></>
        : <><Moon size={13} strokeWidth={1.5} /> <span>Modo escuro</span></>
      }
    </button>
  );
}
