"use client";

import { useState } from "react";
import {
  Terminal, GitBranch, Code2, Cpu, Layers, Globe, FlaskConical,
  Code, Braces, Server, Component, Database, Zap, Box,
  Briefcase, Flag, Play, Trophy,
  type LucideIcon,
} from "lucide-react";

interface FlowNode {
  id: string;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  duration: string;
  color: string;
  type: "start" | "step" | "checkpoint" | "end";
  tags?: string[];
}

const flow: FlowNode[] = [
  { id: "start",      Icon: Play,          title: "Começa aqui",           subtitle: "Nenhum pré-requisito. Dia zero.",                                    duration: "Dia 1",       color: "#6d5ef5", type: "start" },
  { id: "terminal",   Icon: Terminal,      title: "Terminal & Editor",     subtitle: "Instalar Python, Node, VS Code. Comandos básicos de navegação.",     duration: "Sem 1",       color: "#6366f1", type: "step",       tags: ["cd", "ls", "mkdir", "PATH", "pip", "python --version"] },
  { id: "git",        Icon: GitBranch,     title: "Git & GitHub",          subtitle: "Versionar código, criar branches, abrir pull requests.",             duration: "Sem 1–2",     color: "#f97316", type: "step",       tags: ["git init", "git commit", "git push", "branch", "PR", ".gitignore"] },
  { id: "python",     Icon: Code2,         title: "Python básico",         subtitle: "Tipos, listas, dicionários, funções, loops. Base de tudo.",          duration: "Sem 2–5",     color: "#3b82f6", type: "step",       tags: ["str", "list", "dict", "def", "for", "if/else", "input()"] },
  { id: "cp1",        Icon: Flag,          title: "Checkpoint 1",          subtitle: "Crie uma CLI de contatos ou calculadora. Publique no GitHub.",        duration: "Fim Sem 5",   color: "#16a34a", type: "checkpoint" },
  { id: "logic",      Icon: Cpu,           title: "Lógica & Algoritmos",   subtitle: "Recursão, complexidade O(n), estruturas de dados.",                  duration: "Sem 6–8",     color: "#8b5cf6", type: "step",       tags: ["recursão", "O(n)", "stack", "queue", "binary search", "hash map"] },
  { id: "oop",        Icon: Layers,        title: "OOP — Classes",         subtitle: "Classes, herança, polimorfismo. Essencial para entrevistas.",         duration: "Sem 8–10",    color: "#a78bfa", type: "step",       tags: ["class", "__init__", "self", "herança", "@property", "@dataclass"] },
  { id: "http",       Icon: Globe,         title: "HTTP & APIs REST",      subtitle: "Como a web funciona. GET/POST, status codes, JSON.",                  duration: "Sem 10–12",   color: "#06b6d4", type: "step",       tags: ["GET", "POST", "200 OK", "404", "JSON", "requests.get()"] },
  { id: "tests",      Icon: FlaskConical,  title: "Testes com pytest",     subtitle: "Unit tests, fixtures, mocks. Confiança para alterar código.",         duration: "Sem 12–14",   color: "#22c55e", type: "step",       tags: ["assert", "def test_", "fixture", "mock", "TDD", "coverage"] },
  { id: "cp2",        Icon: Flag,          title: "Checkpoint 2",          subtitle: "Script Python consumindo API externa. Com testes unitários.",         duration: "Fim Sem 14",  color: "#16a34a", type: "checkpoint" },
  { id: "js",         Icon: Code,          title: "JavaScript",            subtitle: "let/const, arrays, objetos, async/await. Base obrigatória para TS.", duration: "Sem 15–17",   color: "#eab308", type: "step",       tags: ["let", "const", "arrow fn", "Array.map", "Promise", "async/await"] },
  { id: "typescript", Icon: Braces,        title: "TypeScript",            subtitle: "Tipos, interfaces, generics. JavaScript com segurança de tipos.",    duration: "Sem 17–20",   color: "#7c6af7", type: "step",       tags: ["interface", "type", "generics<T>", "strict mode", "tsconfig.json"] },
  { id: "node",       Icon: Server,        title: "Node.js & npm",         subtitle: "Runtime JS no servidor. Event loop, módulos built-in.",               duration: "Sem 20–21",   color: "#4ade80", type: "step",       tags: ["npm install", "fs", "path", "http", "package.json"] },
  { id: "react",      Icon: Component,     title: "React + TypeScript",    subtitle: "Componentes, props, hooks. Frontend moderno e tipado.",               duration: "Sem 22–26",   color: "#38bdf8", type: "step",       tags: ["JSX", "props", "useState", "useEffect", "fetch", "Tailwind"] },
  { id: "cp3",        Icon: Flag,          title: "Checkpoint 3",          subtitle: "App React consumindo API pública. Deploy na Vercel.",                 duration: "Fim Sem 26",  color: "#16a34a", type: "checkpoint" },
  { id: "sql",        Icon: Database,      title: "SQL & PostgreSQL",      subtitle: "SELECT, INSERT, JOIN, modelagem relacional.",                         duration: "Sem 27–29",   color: "#f59e0b", type: "step",       tags: ["SELECT * FROM", "JOIN", "FK", "PK", "ORM", "migrations"] },
  { id: "fastapi",    Icon: Zap,           title: "FastAPI + JWT",         subtitle: "Rotas, Pydantic, autenticação JWT. API pronta para produção.",        duration: "Sem 29–33",   color: "#34d399", type: "step",       tags: ["@app.post", "Pydantic", "JWT", "Depends()", "CORS"] },
  { id: "docker",     Icon: Box,           title: "Docker & Deploy",       subtitle: "Containerizar app e banco. Deploy no Railway ou Render.",             duration: "Sem 33–36",   color: "#60a5fa", type: "step",       tags: ["Dockerfile", "docker-compose", "Railway", "env vars"] },
  { id: "cp4",        Icon: Flag,          title: "Checkpoint 4",          subtitle: "API + frontend integrados, deployados, README profissional.",         duration: "Fim Sem 36",  color: "#16a34a", type: "checkpoint" },
  { id: "end",        Icon: Trophy,        title: "Dev júnior pronto",     subtitle: "3 projetos no GitHub · LeetCode concluído · LinkedIn atualizado.",   duration: "Mês 9+",      color: "#f59e0b", type: "end" },
];

export function LearningFlow() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="flow" className="mb-12">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-[#ededf0]">Jornada de aprendizado</h2>
      </div>
      <p className="text-sm text-[#6b6b75] mb-8 leading-relaxed">
        Siga na sequência. Cada bloco depende do anterior. Clique para ver os conceitos de cada etapa.
      </p>

      <div className="max-w-2xl mx-auto">
        {flow.map((node, i) => (
          <FlowRow
            key={node.id}
            node={node}
            isLast={i === flow.length - 1}
            expanded={expanded === node.id}
            onToggle={() => setExpanded(expanded === node.id ? null : node.id)}
          />
        ))}
      </div>
    </section>
  );
}

function FlowRow({
  node,
  isLast,
  expanded,
  onToggle,
}: {
  node: FlowNode;
  isLast: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const isCheckpoint = node.type === "checkpoint";
  const isStart = node.type === "start";
  const isEnd = node.type === "end";
  const Icon = node.Icon;

  return (
    <div className="flex gap-0">
      {/* Timeline column */}
      <div className="flex flex-col items-center w-11 flex-shrink-0">
        {/* Marker */}
        {(isStart || isEnd) && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
            style={{ background: `${node.color}18`, border: `1px solid ${node.color}35` }}
          >
            <Icon size={14} color={node.color} strokeWidth={2} />
          </div>
        )}
        {isCheckpoint && (
          <div
            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-3 border"
            style={{ background: `${node.color}12`, borderColor: `${node.color}35` }}
          >
            <Icon size={11} color={node.color} strokeWidth={2} />
          </div>
        )}
        {!isStart && !isEnd && !isCheckpoint && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-2.5 border"
            style={{ borderColor: "#242428", background: "#16161a" }}
          >
            <Icon size={13} color={node.color} strokeWidth={1.5} />
          </div>
        )}

        {/* Connector */}
        {!isLast && (
          <div className="w-px flex-1 mt-1 min-h-4 bg-[#242428]" />
        )}
      </div>

      {/* Content column */}
      <div className="flex-1 pl-3 pb-4">
        {isStart && <StartCard node={node} Icon={Icon} />}
        {isEnd && <EndCard node={node} Icon={Icon} />}
        {isCheckpoint && <CheckpointCard node={node} />}
        {!isStart && !isEnd && !isCheckpoint && (
          <StepCard node={node} expanded={expanded} onToggle={onToggle} />
        )}
      </div>
    </div>
  );
}

function StartCard({ node }: { node: FlowNode; Icon: LucideIcon }) {
  return (
    <div className="rounded-xl border border-[#242428] bg-[#16161a] px-5 py-4 mt-1">
      <p className="text-sm font-semibold text-[#ededf0]">{node.title}</p>
      <p className="text-xs text-[#6b6b75] mt-0.5">{node.subtitle}</p>
    </div>
  );
}

function EndCard({ node }: { node: FlowNode; Icon: LucideIcon }) {
  return (
    <div
      className="rounded-xl border px-5 py-4 mt-1"
      style={{ borderColor: `${node.color}30`, background: `${node.color}08` }}
    >
      <p className="text-sm font-semibold" style={{ color: node.color }}>{node.title}</p>
      <p className="text-xs text-[#6b6b75] mt-0.5 leading-relaxed">{node.subtitle}</p>
      <p className="text-[10px] mt-2 font-medium text-[#545460]">{node.duration}</p>
    </div>
  );
}

function CheckpointCard({ node }: { node: FlowNode }) {
  return (
    <div
      className="rounded-lg px-4 py-2.5 border mt-2 flex items-center justify-between gap-4"
      style={{ borderColor: `${node.color}25`, background: `${node.color}08` }}
    >
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: node.color }}>
          {node.title}
        </p>
        <p className="text-xs text-[#6b6b75] mt-0.5 leading-snug">{node.subtitle}</p>
      </div>
      <span className="text-[10px] text-[#545460] flex-shrink-0">{node.duration}</span>
    </div>
  );
}

function StepCard({
  node,
  expanded,
  onToggle,
}: {
  node: FlowNode;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-xl border overflow-hidden cursor-pointer transition-colors duration-150 mt-1 ${
        expanded ? "border-[#2e2e35]" : "border-[#242428] hover:border-[#333338]"
      }`}
      style={{ background: expanded ? "#17171c" : "#16161a" }}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-[#ededf0]">{node.title}</span>
            <span className="text-[10px] text-[#545460]">{node.duration}</span>
          </div>
          <p className="text-xs text-[#6b6b75] mt-0.5 leading-snug">{node.subtitle}</p>
        </div>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`flex-shrink-0 text-[#545460] transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {expanded && node.tags && (
        <div className="px-4 pb-4 pt-2 border-t border-[#222226]">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-[#545460] mb-2">
            Conceitos
          </p>
          <div className="flex flex-wrap gap-1.5">
            {node.tags.map((tag) => (
              <code
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md font-mono bg-[#222226] text-[#b0b0ba] border border-[#333338]"
              >
                {tag}
              </code>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
