"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  type SiteThemeId,
  siteThemes,
  type SiteThemeColors,
  getThemeFamily,
  isThemeDark,
} from "@/lib/themes";

const STORAGE_KEY = "roadmap_site_theme_v1";

interface SiteThemeCtx {
  themeId: SiteThemeId;
  theme: SiteThemeColors;
  setTheme: (id: SiteThemeId) => void;
}

const Ctx = createContext<SiteThemeCtx>({
  themeId: "default-dark",
  theme: siteThemes["default-dark"],
  setTheme: () => {},
});

/* Normalise legacy keys stored before the -dark/-light split */
function normalise(stored: string | null): SiteThemeId {
  if (stored === "default") return "default-dark";
  if (stored === "retro")   return "retro-dark";
  const valid: SiteThemeId[] = [
    "default-dark","default-light",
    "retro-dark","retro-light",
    "vista-dark","vista-light",
  ];
  return valid.includes(stored as SiteThemeId) ? (stored as SiteThemeId) : "default-dark";
}

/* CSS variables injected into :root so any component using var(--accent) etc. updates automatically */
const CSS_VARS: Record<SiteThemeId, Record<string, string>> = {
  "default-dark": {
    "--background":  "#080812",
    "--foreground":  "#f0f0f8",
    "--c-sidebar":   "#0c0c18",
    "--c-card":      "#0f0f1e",
    "--c-surface":   "#111120",
    "--c-inner":     "#0a0a14",
    "--c-border":    "rgba(255,255,255,0.07)",
    "--c-border-s":  "rgba(255,255,255,0.04)",
    "--c-text-1":    "#f0f0f8",
    "--c-text-2":    "#a0a0c0",
    "--c-text-3":    "#8080a0",
    "--c-text-4":    "#505070",
    "--accent":      "#7c3aed",
    "--accent-2":    "#f59e0b",
  },
  "default-light": {
    "--background":  "#f0f0fa",
    "--foreground":  "#1a1a2e",
    "--c-sidebar":   "#e6e6f4",
    "--c-card":      "#ffffff",
    "--c-surface":   "#f5f5fd",
    "--c-inner":     "#ebebf7",
    "--c-border":    "rgba(0,0,0,0.07)",
    "--c-border-s":  "rgba(0,0,0,0.04)",
    "--c-text-1":    "#1a1a2e",
    "--c-text-2":    "#3a3a60",
    "--c-text-3":    "#5a5a80",
    "--c-text-4":    "#8888aa",
    "--accent":      "#6d28d9",
    "--accent-2":    "#d97706",
  },
  "retro-dark": {
    "--background":  "#221608",
    "--foreground":  "#f5e8d0",
    "--c-sidebar":   "#2e1e10",
    "--c-card":      "#321e0e",
    "--c-surface":   "#2a1c0e",
    "--c-inner":     "#261808",
    "--c-border":    "rgba(240,220,180,0.10)",
    "--c-border-s":  "rgba(240,220,180,0.05)",
    "--c-text-1":    "#f5e8d0",
    "--c-text-2":    "#d4b888",
    "--c-text-3":    "#a07848",
    "--c-text-4":    "#6a4e30",
    "--accent":      "#7dd4c8",
    "--accent-2":    "#e8c060",
  },
  "retro-light": {
    "--background":  "#f5e8d0",
    "--foreground":  "#2e1808",
    "--c-sidebar":   "#ede0c4",
    "--c-card":      "#fff8ee",
    "--c-surface":   "#f7eedd",
    "--c-inner":     "#ede4ce",
    "--c-border":    "rgba(100,60,20,0.10)",
    "--c-border-s":  "rgba(100,60,20,0.06)",
    "--c-text-1":    "#2e1808",
    "--c-text-2":    "#5a3018",
    "--c-text-3":    "#7a5030",
    "--c-text-4":    "#9a7050",
    "--accent":      "#5bbfb5",
    "--accent-2":    "#c05820",
  },
  "vista-dark": {
    "--background":  "#06091a",
    "--foreground":  "#ccddf5",
    "--c-sidebar":   "#0a0e22",
    "--c-card":      "#0d1430",
    "--c-surface":   "#0f1535",
    "--c-inner":     "#080c1c",
    "--c-border":    "rgba(74,158,255,0.08)",
    "--c-border-s":  "rgba(74,158,255,0.04)",
    "--c-text-1":    "#ccddf5",
    "--c-text-2":    "#8899cc",
    "--c-text-3":    "#5566aa",
    "--c-text-4":    "#334477",
    "--accent":      "#4a9eff",
    "--accent-2":    "#fbbf24",
  },
  "vista-light": {
    "--background":  "#dae6f4",
    "--foreground":  "#08172a",
    "--c-sidebar":   "#ccddf0",
    "--c-card":      "#eaf3fc",
    "--c-surface":   "#e0eef8",
    "--c-inner":     "#d4e8f5",
    "--c-border":    "rgba(0,60,140,0.10)",
    "--c-border-s":  "rgba(0,60,140,0.05)",
    "--c-text-1":    "#08172a",
    "--c-text-2":    "#1a3050",
    "--c-text-3":    "#3a5070",
    "--c-text-4":    "#6080a0",
    "--accent":      "#0066cc",
    "--accent-2":    "#d97706",
  },
};

function applyCSSVars(id: SiteThemeId) {
  const vars = CSS_VARS[id];
  Object.entries(vars).forEach(([key, val]) => {
    document.documentElement.style.setProperty(key, val);
  });
}

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<SiteThemeId>("default-dark");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const initial = normalise(stored);
      setThemeId(initial);
      document.documentElement.setAttribute("data-site-theme", initial);
      applyCSSVars(initial);
    } catch { /* ignore */ }
  }, []);

  const setTheme = (id: SiteThemeId) => {
    setThemeId(id);
    try { localStorage.setItem(STORAGE_KEY, id); } catch { /* ignore */ }
    document.documentElement.setAttribute("data-site-theme", id);
    applyCSSVars(id);
  };

  return (
    <Ctx.Provider value={{ themeId, theme: siteThemes[themeId], setTheme }}>
      {children}
    </Ctx.Provider>
  );
}

export const useSiteTheme = () => useContext(Ctx);
export { getThemeFamily, isThemeDark };
