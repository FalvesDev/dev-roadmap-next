"use client";

import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { Code2, Database, Globe, BarChart2, X } from "lucide-react";

export type LearningPath = "fullstack" | "backend" | "frontend" | "data";

interface PathInfo {
  label: string;
  icon: typeof Code2;
  color: string;
  desc: string;
  focus: string[];
}

export const pathMeta: Record<LearningPath, PathInfo> = {
  fullstack: {
    label: "Fullstack",
    icon: Code2,
    color: "#7c6af7",
    desc: "Python no back, React+TS no front. A trilha mais completa e empregável.",
    focus: ["Python", "FastAPI", "TypeScript", "React", "PostgreSQL", "Docker"],
  },
  backend: {
    label: "Backend",
    icon: Database,
    color: "#3b82f6",
    desc: "APIs, bancos, infra. Ideal se prefere lógica de servidor a UI.",
    focus: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "SQL"],
  },
  frontend: {
    label: "Frontend",
    icon: Globe,
    color: "#10b981",
    desc: "Interfaces, UX e performance. React+TypeScript como foco principal.",
    focus: ["TypeScript", "React", "CSS", "Acessibilidade", "Performance"],
  },
  data: {
    label: "Data / IA",
    icon: BarChart2,
    color: "#f59e0b",
    desc: "Python científico, análise de dados, machine learning introdutório.",
    focus: ["Python", "Pandas", "SQL", "Matplotlib", "APIs de IA"],
  },
};

// ── Context ──────────────────────────────────────────────
const PathContext = createContext<{
  path: LearningPath | null;
  setPath: (p: LearningPath | null) => void;
}>({ path: null, setPath: () => {} });

const STORAGE_KEY = "roadmap_path_v1";

export function PathProvider({ children }: { children: ReactNode }) {
  const [path, setPathState] = useState<LearningPath | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as LearningPath | null;
    if (stored && pathMeta[stored]) setPathState(stored);
  }, []);

  const setPath = (p: LearningPath | null) => {
    setPathState(p);
    if (p) localStorage.setItem(STORAGE_KEY, p);
    else localStorage.removeItem(STORAGE_KEY);
  };

  return <PathContext.Provider value={{ path, setPath }}>{children}</PathContext.Provider>;
}

export function useLearningPath() {
  return useContext(PathContext);
}

// ── Selector card (shown in hero when no path set) ───────
export function PathSelector() {
  const { path, setPath } = useLearningPath();
  const [open, setOpen] = useState(false);

  if (path && !open) {
    const meta = pathMeta[path];
    const Icon = meta.icon;
    return (
      <div className="flex items-center gap-2 text-xs">
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
          style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30`, color: meta.color }}
        >
          <Icon size={11} strokeWidth={1.5} />
          <span className="font-semibold">{meta.label}</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-[#606070] hover:text-[#909098] transition-colors"
        >
          Mudar trilha
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {path && (
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-[#d0d0d8]">Escolher trilha</p>
          <button onClick={() => setOpen(false)} className="text-[#606070]">
            <X size={13} />
          </button>
        </div>
      )}
      {!path && (
        <p className="text-xs text-[#909098] mb-3">
          <span className="font-semibold text-[#c0c0d0]">Qual é seu foco?</span> Ajusta as recomendações em todo o site.
        </p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {(Object.entries(pathMeta) as [LearningPath, PathInfo][]).map(([key, meta]) => {
          const Icon = meta.icon;
          const isSelected = path === key;
          return (
            <button
              key={key}
              onClick={() => { setPath(key); setOpen(false); }}
              className="flex flex-col items-start gap-1 p-3 rounded-xl text-left transition-all duration-150"
              style={{
                background: isSelected ? `${meta.color}18` : "#111118",
                border: `1px solid ${isSelected ? `${meta.color}50` : "#1e1e28"}`,
              }}
            >
              <div className="flex items-center gap-1.5">
                <Icon size={12} color={meta.color} strokeWidth={1.5} />
                <span className="text-xs font-semibold" style={{ color: isSelected ? meta.color : "#c0c0d0" }}>
                  {meta.label}
                </span>
              </div>
              <p className="text-[10px] text-[#707080] leading-snug">{meta.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Inline badge used inside ModuleSection ───────────────
export function PathBadge({ topics }: { topics: string[] }) {
  const { path } = useLearningPath();
  if (!path) return null;

  const focus = pathMeta[path].focus;
  const match = topics.some((t) =>
    focus.some((f) => t.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(t.toLowerCase()))
  );

  if (!match) return null;
  const meta = pathMeta[path];
  return (
    <span
      className="text-[9px] font-bold px-1.5 py-0.5 rounded"
      style={{ background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}30` }}
    >
      ✓ {meta.label}
    </span>
  );
}
