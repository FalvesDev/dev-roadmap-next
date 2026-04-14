import {
  Terminal, GitBranch, Code2, Layers, Cpu, FlaskConical, Zap as ZapIcon,
  Code, Braces, Server, Component, Database, Box, Rocket,
  Globe, Link, Puzzle, Lock, type LucideIcon,
} from "lucide-react";

interface Skill {
  id: string;
  Icon: LucideIcon;
  label: string;
  color: string;
  optional?: boolean;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  main: Skill[];
  extras?: Skill[];
}

const paths: LearningPath[] = [
  {
    id: "python",
    title: "Trilha Python / Backend",
    description: "Do zero ao backend com API real e banco de dados",
    main: [
      { id: "terminal", Icon: Terminal,     label: "Terminal",      color: "#6366f1" },
      { id: "git",      Icon: GitBranch,    label: "Git",           color: "#f97316" },
      { id: "pybasic",  Icon: Code2,        label: "Python básico", color: "#3b82f6" },
      { id: "oop",      Icon: Layers,       label: "OOP",           color: "#8b5cf6" },
      { id: "algos",    Icon: Cpu,          label: "Algoritmos",    color: "#7c6af7" },
      { id: "tests",    Icon: FlaskConical, label: "pytest",        color: "#22c55e" },
      { id: "fastapi",  Icon: ZapIcon,      label: "FastAPI",       color: "#34d399" },
      { id: "db",       Icon: Database,     label: "PostgreSQL",    color: "#f59e0b" },
      { id: "docker",   Icon: Box,          label: "Docker",        color: "#60a5fa" },
    ],
    extras: [
      { id: "async",      Icon: ZapIcon,    label: "Asyncio",        color: "#8a8a96", optional: true },
      { id: "decorators", Icon: Puzzle,     label: "Decorators",     color: "#8a8a96", optional: true },
      { id: "deploy",     Icon: Rocket,     label: "Deploy",         color: "#8a8a96", optional: true },
    ],
  },
  {
    id: "typescript",
    title: "Trilha TypeScript / Frontend",
    description: "Do JavaScript ao React com tipagem forte",
    main: [
      { id: "js",       Icon: Code,         label: "JavaScript",    color: "#eab308" },
      { id: "ts",       Icon: Braces,       label: "TypeScript",    color: "#7c6af7" },
      { id: "node",     Icon: Server,       label: "Node.js",       color: "#22c55e" },
      { id: "react",    Icon: Component,    label: "React",         color: "#38bdf8" },
    ],
    extras: [
      { id: "nextjs",   Icon: Code2,        label: "Next.js",       color: "#8a8a96", optional: true },
      { id: "state",    Icon: Puzzle,       label: "Zustand",       color: "#8a8a96", optional: true },
      { id: "rq",       Icon: Link,         label: "React Query",   color: "#8a8a96", optional: true },
    ],
  },
  {
    id: "infra",
    title: "Trilha Web & Infraestrutura",
    description: "HTTP, banco de dados, autenticação e deploy",
    main: [
      { id: "http",     Icon: Globe,        label: "HTTP & REST",   color: "#06b6d4" },
      { id: "sql",      Icon: Database,     label: "SQL",           color: "#f59e0b" },
      { id: "orm",      Icon: Link,         label: "ORM",           color: "#fbbf24" },
      { id: "jwt",      Icon: Lock,         label: "Auth JWT",      color: "#34d399" },
      { id: "docker2",  Icon: Box,          label: "Docker",        color: "#60a5fa" },
      { id: "deploy2",  Icon: Rocket,       label: "Deploy",        color: "#a78bfa" },
    ],
    extras: [
      { id: "ci",       Icon: Puzzle,       label: "CI/CD",         color: "#8a8a96", optional: true },
      { id: "monitor",  Icon: ZapIcon,      label: "Monitoring",    color: "#8a8a96", optional: true },
    ],
  },
];

export function DependencyTree() {
  return (
    <section id="deptree" className="mb-12">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-[#ededf0]">Trilhas de aprendizado</h2>
      </div>
      <p className="text-sm text-[#6b6b75] mb-8 leading-relaxed">
        Cada trilha mostra a ordem ideal. Siga da esquerda para a direita — não pule etapas.
      </p>

      <div className="space-y-4">
        {paths.map((path) => (
          <div key={path.id} className="bg-[#16161a] border border-[#242428] rounded-xl p-5">
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-[#ededf0]">{path.title}</h3>
                <p className="text-xs text-[#6b6b75] mt-0.5">{path.description}</p>
              </div>
              <span className="text-[10px] text-[#545460] flex-shrink-0">{path.main.length} etapas</span>
            </div>

            {/* Main chain */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              {path.main.map((skill, i) => {
                const Icon = skill.Icon;
                return (
                  <div key={skill.id} className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#333338] bg-[#1e1e23]">
                      <Icon size={12} style={{ color: skill.color }} strokeWidth={1.5} />
                      <span className="text-[11px] font-medium text-[#b0b0ba]">{skill.label}</span>
                    </div>
                    {i < path.main.length - 1 && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-[#2e2e35] flex-shrink-0">
                        <path d="M1 4h6M5 2l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Optional extras */}
            {path.extras && path.extras.length > 0 && (
              <div className="pt-3 border-t border-[#222226]">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-[#2e2e35] mb-2">
                  Opcional — para depois
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {path.extras.map((skill) => {
                    const Icon = skill.Icon;
                    return (
                      <div
                        key={skill.id}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#242428] bg-[#141419] opacity-50"
                      >
                        <Icon size={11} color="#6b6b75" strokeWidth={1.5} />
                        <span className="text-[11px] text-[#6b6b75]">{skill.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
