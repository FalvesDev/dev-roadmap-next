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

// ── Selector — always compact inline pills ───────────────
export function PathSelector() {
  const { path, setPath } = useLearningPath();
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl p-4 animate-fade-in" style={{ background: "#0e0e1c", border: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="mono-label" style={{ color: "#404060" }}>Foco de aprendizado</p>
        {path && !open && (
          <button
            onClick={() => setOpen(true)}
            className="mono-label transition-colors"
            style={{ color: "#404060" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#8070b0"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#404060"}
          >
            mudar
          </button>
        )}
      </div>

      {/* If path selected and not editing: show compact pill */}
      {path && !open ? (
        (() => {
          const meta = pathMeta[path];
          const Icon = meta.icon;
          return (
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30`, color: meta.color }}
              >
                <Icon size={11} strokeWidth={1.5} />
                {meta.label}
              </div>
              <p className="text-[11px]" style={{ color: "#505068" }}>{meta.desc}</p>
            </div>
          );
        })()
      ) : (
        /* Pills for each path */
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(pathMeta) as [LearningPath, PathInfo][]).map(([key, meta]) => {
            const Icon = meta.icon;
            const isSelected = path === key;
            return (
              <button
                key={key}
                onClick={() => { setPath(key); setOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={{
                  background: isSelected ? `${meta.color}18` : "rgba(255,255,255,0.03)",
                  border:     `1px solid ${isSelected ? `${meta.color}40` : "rgba(255,255,255,0.07)"}`,
                  color:      isSelected ? meta.color : "#707080",
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLElement).style.color = "#a0a0b8";
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.color = "#707080";
                  }
                }}
              >
                <Icon size={11} strokeWidth={1.5} />
                {meta.label}
              </button>
            );
          })}
        </div>
      )}
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
