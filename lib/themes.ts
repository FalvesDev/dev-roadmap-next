export type SiteThemeId =
  | "default-dark" | "default-light"
  | "retro-dark"   | "retro-light"
  | "vista-dark"   | "vista-light";

export type ThemeFamily = "default" | "retro" | "vista";

export function getThemeFamily(id: SiteThemeId): ThemeFamily {
  return id.split("-")[0] as ThemeFamily;
}
export function isThemeDark(id: SiteThemeId): boolean {
  return id.endsWith("-dark");
}
export function toThemeId(family: ThemeFamily, dark: boolean): SiteThemeId {
  return `${family}-${dark ? "dark" : "light"}` as SiteThemeId;
}

export interface SiteThemeColors {
  bg: string;
  bgPanel: string;
  accent: string;
  accentLight: string;
  accentHover: string;
  accentDim: string;
  accentBorder: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textDim: string;
  success: string;
  warning: string;
  gradientAccent: string;
  gradientBar: string;
  glowColor: string;
  coral?: string;
  // Meta
  label: string;
  familyLabel: string;
  description: string;
  previewDots: string[];
}

export const siteThemes: Record<SiteThemeId, SiteThemeColors> = {

  /* ── Default ───────────────────────────────────────────────── */
  "default-dark": {
    label: "Padrão Escuro",
    familyLabel: "Padrão",
    description: "dark purple · moderno",
    previewDots: ["#7c3aed", "#a855f7", "#060610"],
    bg: "#060610",
    bgPanel: "#0c0c18",
    accent: "#7c3aed",
    accentLight: "#a855f7",
    accentHover: "#c4b5fd",
    accentDim: "rgba(124,58,237,0.12)",
    accentBorder: "rgba(124,58,237,0.30)",
    border: "rgba(255,255,255,0.06)",
    borderStrong: "rgba(255,255,255,0.12)",
    textPrimary: "#f0f0f8",
    textSecondary: "#c0c0d8",
    textMuted: "#8080a0",
    textDim: "#505070",
    success: "#22c55e",
    warning: "#f59e0b",
    gradientAccent: "linear-gradient(90deg, #6d28d9, #7c3aed, #a855f7)",
    gradientBar: "linear-gradient(90deg, #7c3aed 0%, #f59e0b 35%, #7c3aed 65%, #f59e0b 100%)",
    glowColor: "rgba(124,58,237,0.7)",
  },
  "default-light": {
    label: "Padrão Claro",
    familyLabel: "Padrão",
    description: "light purple · limpo",
    previewDots: ["#6d28d9", "#7c3aed", "#f0f0fa"],
    bg: "#f0f0fa",
    bgPanel: "#e6e6f4",
    accent: "#6d28d9",
    accentLight: "#7c3aed",
    accentHover: "#9333ea",
    accentDim: "rgba(109,40,217,0.08)",
    accentBorder: "rgba(109,40,217,0.22)",
    border: "rgba(0,0,0,0.07)",
    borderStrong: "rgba(0,0,0,0.14)",
    textPrimary: "#1a1a2e",
    textSecondary: "#3a3a60",
    textMuted: "#5a5a80",
    textDim: "#8888aa",
    success: "#16a34a",
    warning: "#d97706",
    gradientAccent: "linear-gradient(90deg, #5b21b6, #6d28d9, #7c3aed)",
    gradientBar: "linear-gradient(90deg, #6d28d9 0%, #d97706 35%, #6d28d9 65%, #d97706 100%)",
    glowColor: "rgba(109,40,217,0.4)",
  },

  /* ── Retro ─────────────────────────────────────────────────── */
  "retro-dark": {
    label: "Retro Escuro",
    familyLabel: "Retro",
    description: "CRT vintage · nostalgia",
    previewDots: ["#7dd4c8", "#e87878", "#221608"],
    bg: "#221608",
    bgPanel: "#2e1e10",
    accent: "#7dd4c8",
    accentLight: "#9ee8e0",
    accentHover: "#c8f4f0",
    accentDim: "rgba(125,212,200,0.15)",
    accentBorder: "rgba(125,212,200,0.40)",
    border: "rgba(240,220,180,0.10)",
    borderStrong: "rgba(240,220,180,0.20)",
    textPrimary: "#f5e8d0",
    textSecondary: "#d4b888",
    textMuted: "#a07848",
    textDim: "#6a4e30",
    success: "#5ad464",
    warning: "#e8c060",
    gradientAccent: "linear-gradient(90deg, #5bbfb5, #7dd4c8, #9ee8e0)",
    gradientBar: "linear-gradient(90deg, #5bbfb5 0%, #e87878 35%, #5bbfb5 65%, #e87878 100%)",
    glowColor: "rgba(125,212,200,0.65)",
    coral: "#e87878",
  },
  "retro-light": {
    label: "Retro Claro",
    familyLabel: "Retro",
    description: "parchment · vintage paper",
    previewDots: ["#5bbfb5", "#c05820", "#f5e8d0"],
    bg: "#f5e8d0",
    bgPanel: "#ede0c4",
    accent: "#5bbfb5",
    accentLight: "#7dd4c8",
    accentHover: "#9ee8e0",
    accentDim: "rgba(91,191,181,0.12)",
    accentBorder: "rgba(91,191,181,0.35)",
    border: "rgba(100,60,20,0.10)",
    borderStrong: "rgba(100,60,20,0.18)",
    textPrimary: "#2e1808",
    textSecondary: "#5a3018",
    textMuted: "#7a5030",
    textDim: "#9a7050",
    success: "#2d8a5a",
    warning: "#b87820",
    gradientAccent: "linear-gradient(90deg, #3aafa4, #5bbfb5, #7dd4c8)",
    gradientBar: "linear-gradient(90deg, #5bbfb5 0%, #c05820 35%, #5bbfb5 65%, #c05820 100%)",
    glowColor: "rgba(91,191,181,0.55)",
    coral: "#c05820",
  },

  /* ── Vista ─────────────────────────────────────────────────── */
  "vista-dark": {
    label: "Vista Escuro",
    familyLabel: "Vista",
    description: "Aero glass · Windows era",
    previewDots: ["#4a9eff", "#80c0ff", "#06091a"],
    bg: "#06091a",
    bgPanel: "#0a0e22",
    accent: "#4a9eff",
    accentLight: "#80c0ff",
    accentHover: "#bddeff",
    accentDim: "rgba(74,158,255,0.12)",
    accentBorder: "rgba(74,158,255,0.30)",
    border: "rgba(74,158,255,0.08)",
    borderStrong: "rgba(74,158,255,0.16)",
    textPrimary: "#ccddf5",
    textSecondary: "#8899cc",
    textMuted: "#5566aa",
    textDim: "#334477",
    success: "#22d3ee",
    warning: "#fbbf24",
    gradientAccent: "linear-gradient(90deg, #2563eb, #4a9eff, #80c0ff)",
    gradientBar: "linear-gradient(90deg, #2563eb 0%, #4a9eff 35%, #38bdf8 65%, #4a9eff 100%)",
    glowColor: "rgba(74,158,255,0.65)",
  },
  "vista-light": {
    label: "Vista Claro",
    familyLabel: "Vista",
    description: "Aero glass · sky blue",
    previewDots: ["#0066cc", "#4a9eff", "#dae6f4"],
    bg: "#dae6f4",
    bgPanel: "#ccddf0",
    accent: "#0066cc",
    accentLight: "#3389e0",
    accentHover: "#66aaee",
    accentDim: "rgba(0,102,204,0.10)",
    accentBorder: "rgba(0,102,204,0.28)",
    border: "rgba(0,60,140,0.10)",
    borderStrong: "rgba(0,60,140,0.20)",
    textPrimary: "#08172a",
    textSecondary: "#1a3050",
    textMuted: "#3a5070",
    textDim: "#6080a0",
    success: "#059669",
    warning: "#d97706",
    gradientAccent: "linear-gradient(90deg, #0044aa, #0066cc, #3389e0)",
    gradientBar: "linear-gradient(90deg, #0066cc 0%, #38bdf8 35%, #0066cc 65%, #38bdf8 100%)",
    glowColor: "rgba(0,102,204,0.45)",
  },
};

/* Accent dot colors shown in the family selector */
export const familyAccentColor: Record<ThemeFamily, string> = {
  default: "#7c3aed",
  retro:   "#7dd4c8",
  vista:   "#4a9eff",
};
