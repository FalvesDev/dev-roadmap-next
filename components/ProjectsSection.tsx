"use client";

import { useState, useEffect } from "react";
import { ChevronDown, CheckCircle2, Circle, Zap, ExternalLink } from "lucide-react";
import { guidedProjects, type GuidedProject } from "@/lib/projects-data";

const STORAGE_KEY = "roadmap_projects_v1";

function loadProjectChecks(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function saveProjectChecks(c: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}

export function ProjectsSection() {
  const [activePhase, setActivePhase] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setChecks(loadProjectChecks());
  }, []);

  function toggle(id: string) {
    const next = { ...checks, [id]: !checks[id] };
    setChecks(next);
    saveProjectChecks(next);
  }

  const project = guidedProjects[activePhase];

  return (
    <section id="projetos" className="mb-16">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#ececf0] mb-1">Projetos guiados por fase</h2>
        <p className="text-sm text-[#8f8f9a] leading-relaxed">
          Um projeto concreto por fase, com requisitos mínimos e dicas de README para o portfólio.
          Complete os entregáveis antes de avançar para a próxima fase.
        </p>
      </div>

      {/* Phase tabs */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        {guidedProjects.map((p, i) => {
          const done = p.deliverables.filter((d) => checks[d.id]).length;
          const total = p.deliverables.length;
          const pct = Math.round((done / total) * 100);
          const isActive = activePhase === i;
          return (
            <button
              key={p.phase}
              onClick={() => setActivePhase(i)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-200"
              style={{
                background: isActive ? "#1e1e2c" : "transparent",
                borderColor: isActive ? "#2e2e3c" : "#1e1e24",
                color: isActive ? "#ececf0" : "#909098",
                boxShadow: isActive ? `0 0 0 1px ${p.phaseColor}22` : "none",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: isActive ? p.phaseColor : "#383840", boxShadow: isActive ? `0 0 6px ${p.phaseColor}` : "none" }}
              />
              <span className="hidden sm:inline">Fase {p.phase}</span>
              <span className="sm:hidden">F{p.phase}</span>
              {pct > 0 && (
                <span className="text-[9px] font-semibold tabular-nums" style={{ color: isActive ? p.phaseColor : "#484850" }}>
                  {pct}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      <ProjectCard project={project} checks={checks} onToggle={toggle} />
    </section>
  );
}

function ProjectCard({
  project, checks, onToggle,
}: {
  project: GuidedProject;
  checks: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const [showReadme, setShowReadme] = useState(false);
  const [showStretch, setShowStretch] = useState(false);

  const done = project.deliverables.filter((d) => checks[d.id]).length;
  const total = project.deliverables.length;
  const pct = Math.round((done / total) * 100);
  const isComplete = pct === 100;

  return (
    <div
      className="rounded-xl border overflow-hidden animate-fade-in-up"
      style={{
        background: isComplete ? "#121a15" : "#16161e",
        borderColor: isComplete ? "#1e2e24" : "#222228",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 border-b"
        style={{
          borderColor: "#1e1e28",
          background: `linear-gradient(135deg, ${project.phaseColor}08 0%, transparent 60%)`,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-md"
                style={{ background: `${project.phaseColor}20`, color: project.phaseColor, border: `1px solid ${project.phaseColor}30` }}
              >
                Fase {project.phase}
              </span>
              <span className="text-[9px] text-[#909098] px-2 py-0.5 rounded" style={{ background: "#1a1a28", border: "1px solid #252535" }}>
                ⏱ {project.duration}
              </span>
              {isComplete && (
                <span className="text-[9px] font-semibold text-[#16a34a] px-2 py-0.5 rounded" style={{ background: "#0d2b14" }}>
                  ✓ Concluído
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-[#dcdce4] mb-1">{project.title}</h3>
            <p className="text-xs text-[#9898a8] leading-relaxed">{project.subtitle}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-bold tabular-nums" style={{ color: project.phaseColor }}>{pct}%</p>
            <p className="text-[10px] text-[#909098]">{done}/{total}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-[#1e1e28] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: isComplete ? "#16a34a" : `linear-gradient(90deg, ${project.phaseColor}, ${project.phaseColor}cc)`,
              boxShadow: pct > 0 ? `0 0 8px ${isComplete ? "#16a34a60" : `${project.phaseColor}60`}` : "none",
            }}
          />
        </div>
      </div>

      {/* Goal */}
      <div className="px-6 py-4 border-b border-[#1e1e28]">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#9090a0] mb-1.5">Objetivo</p>
        <p className="text-sm text-[#a8a8b4] leading-relaxed">{project.goal}</p>
      </div>

      {/* Stack */}
      <div className="px-6 py-4 border-b border-[#1e1e28]">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#9090a0] mb-2">Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-[10px] font-medium px-2.5 py-1 rounded-md"
              style={{ background: "#1a1a28", border: "1px solid #252535", color: "#a0a0b0" }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Deliverables checklist */}
      <div className="border-b border-[#1e1e28]">
        <div className="px-6 py-3">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-[#9090a0]">Entregáveis mínimos</p>
        </div>
        {project.deliverables.map((task) => {
          const isDone = !!checks[task.id];
          return (
            <DeliverableRow key={task.id} task={task} isDone={isDone} onToggle={() => onToggle(task.id)} phaseColor={project.phaseColor} />
          );
        })}
      </div>

      {/* README template */}
      <div className="border-b border-[#1e1e28]">
        <button
          onClick={() => setShowReadme((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-3.5 text-left transition-colors hover:bg-[#1a1a24]"
        >
          <span className="text-xs font-semibold text-[#c0c0cc]">📄 Template de README</span>
          <ChevronDown size={13} color="#606070" style={{ transform: showReadme ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
        </button>
        {showReadme && (
          <div className="px-6 pb-4 animate-fade-in">
            <pre
              className="text-[11px] text-[#93c5fd] rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono"
              style={{ background: "#090f1c", border: "1px solid #1a2840" }}
            >
              {project.readmeTips[0]}
            </pre>
          </div>
        )}
      </div>

      {/* Stretch goals */}
      <div>
        <button
          onClick={() => setShowStretch((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-3.5 text-left transition-colors hover:bg-[#1a1a24]"
        >
          <div className="flex items-center gap-2">
            <Zap size={12} color="#f59e0b" strokeWidth={1.5} />
            <span className="text-xs font-semibold text-[#c0c0cc]">Objetivos extras (opcional)</span>
          </div>
          <ChevronDown size={13} color="#606070" style={{ transform: showStretch ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
        </button>
        {showStretch && (
          <div className="px-6 pb-4 space-y-2 animate-fade-in">
            {project.stretchGoals.map((g, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-[9px] font-semibold mt-0.5 flex-shrink-0" style={{ color: "#f59e0b" }}>→</span>
                <p className="text-xs text-[#9898a8] leading-relaxed">{g}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DeliverableRow({
  task, isDone, onToggle, phaseColor,
}: {
  task: { id: string; label: string; hint?: string };
  isDone: boolean;
  onToggle: () => void;
  phaseColor: string;
}) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="border-b border-[#1a1a22] last:border-0">
      <div className="flex items-start gap-3 px-6 py-3 hover:bg-[#1a1a24] transition-colors">
        <button
          onClick={onToggle}
          className="mt-0.5 flex-shrink-0 transition-all duration-150"
        >
          {isDone
            ? <CheckCircle2 size={18} color="#16a34a" strokeWidth={2} />
            : <Circle size={18} color="#383840" strokeWidth={1.5} />}
        </button>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm leading-snug transition-colors"
            style={{ color: isDone ? "#404050" : "#d0d0d8", textDecoration: isDone ? "line-through" : "none" }}
          >
            {task.label}
          </p>
          {task.hint && showHint && (
            <p className="text-[11px] text-[#909098] mt-1 leading-relaxed animate-fade-in">{task.hint}</p>
          )}
        </div>
        {task.hint && (
          <button
            onClick={() => setShowHint((v) => !v)}
            className="text-[10px] px-2 py-0.5 rounded transition-all flex-shrink-0 mt-0.5"
            style={{ color: showHint ? phaseColor : "#606070", background: showHint ? `${phaseColor}18` : "#1a1a28" }}
          >
            {showHint ? "esconder" : "dica"}
          </button>
        )}
      </div>
    </div>
  );
}
