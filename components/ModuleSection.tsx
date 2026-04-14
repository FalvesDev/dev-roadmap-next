"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown, CheckCircle2, Circle,
  ExternalLink, BookOpen, Play, FileText,
  Wrench, GraduationCap, BookMarked,
} from "lucide-react";
import { phases } from "@/lib/roadmap-data";
import { articles } from "@/lib/articles-data";
import { descriptions } from "@/lib/topic-descriptions";
import type { CheckItem } from "@/lib/roadmap-data";
import type { Article, ArticleType } from "@/lib/articles-data";

const STORAGE_KEY = "roadmap_checks_v1";

function loadChecks(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function saveChecks(c: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}

function clean(s: string) {
  return s.replace(/^\S+\s/, "");
}

const CARD_META: Record<string, { week: string; objective: string }> = {
  "Terminal & Ambiente": {
    week: "Sem 1–2",
    objective: "Python e Node instalados, VSCode configurado, navegar pelo terminal com fluência.",
  },
  "Git & GitHub": {
    week: "Sem 2–3",
    objective: "Primeiro repositório no GitHub, saber criar branches e abrir pull requests.",
  },
  "Python — Básico": {
    week: "Sem 3–6",
    objective: "Escrever scripts funcionais com variáveis, listas, dicionários, funções e loops.",
  },
  "Lógica de Programação": {
    week: "Sem 6–8",
    objective: "Quebrar problemas em partes menores, entender recursão e complexidade básica.",
  },
  "OOP — Orientação a Objetos": {
    week: "Sem 9–11",
    objective: "Criar classes com herança, polimorfismo e encapsulamento num programa real.",
  },
  "Testes": {
    week: "Sem 11–13",
    objective: "Escrever testes com pytest e ter confiança para modificar código sem medo.",
  },
  "Async & Concorrência": {
    week: "Sem 13–14",
    objective: "Usar async/await corretamente em Python e JavaScript.",
  },
  "HTTP & APIs REST": {
    week: "Sem 15–16",
    objective: "Consumir qualquer API externa e entender headers, status codes e JSON.",
  },
  "TypeScript Core": {
    week: "Sem 17–20",
    objective: "Tipar código TypeScript com interfaces, generics e strict mode.",
  },
  "Node.js & npm/pnpm": {
    week: "Sem 20–21",
    objective: "Criar servidor básico com Node.js e gerenciar dependências com npm.",
  },
  "HTML & CSS (mínimo necessário)": {
    week: "Sem 21–22",
    objective: "Criar página responsiva com flexbox e grid.",
  },
  "React — Primeiro contato": {
    week: "Sem 22–26",
    objective: "Criar componentes com estado, buscar dados de uma API e fazer deploy na Vercel.",
  },
  "FastAPI (Python Backend)": {
    week: "Sem 27–30",
    objective: "API completa com rotas, validação Pydantic e autenticação JWT.",
  },
  "Banco de Dados": {
    week: "Sem 27–30",
    objective: "PostgreSQL rodando, ORM configurado, CRUD completo com migrations.",
  },
  "Docker & Deploy Básico": {
    week: "Sem 30–33",
    objective: "App containerizado com docker-compose e deployado em produção.",
  },
  "Segurança Básica": {
    week: "Sem 33–36",
    objective: "API protegida contra OWASP Top 10, senhas com bcrypt, secrets em .env.",
  },
  "Portfólio no GitHub": {
    week: "Sem 33–36",
    objective: "Três projetos deployados com READMEs profissionais no GitHub.",
  },
  "Entrevistas Técnicas": {
    week: "Sem 34–36",
    objective: "Preparado para desafios de código no LeetCode e perguntas comportamentais.",
  },
  "Clean Code": {
    week: "Sem 35–36",
    objective: "Código legível, linters configurados, sem duplicação desnecessária.",
  },
  "Soft Skills que Importam": {
    week: "Sem 36",
    objective: "Comunicar-se como dev profissional, documentar bem e dar bons feedbacks.",
  },
};

// Article IDs relevant to each module
const ARTICLE_MAP: Record<string, string[]> = {
  "Terminal & Ambiente":         ["term-1", "term-2", "term-3"],
  "Git & GitHub":                ["git-1", "git-2", "git-3", "git-5", "git-4"],
  "Python — Básico":             ["py-1", "py-2", "py-8", "py-10"],
  "Lógica de Programação":       ["alg-1", "alg-3", "alg-4", "alg-5", "alg-6", "alg-7", "alg-8", "py-11"],
  "OOP — Orientação a Objetos":  ["py-3", "clean-2", "arch-4"],
  "Testes":                      ["py-7", "clean-1"],
  "Async & Concorrência":        ["py-4", "async-1", "async-2", "js-7"],
  "HTTP & APIs REST":            ["rest-3", "rest-1", "rest-2", "net-2", "tool-1"],
  "TypeScript Core":             ["ts-1", "ts-2", "ts-3", "ts-7", "ts-8"],
  "Node.js & npm/pnpm":          ["node-1", "node-2", "async-1", "js-5"],
  "HTML & CSS (mínimo necessário)": ["css-1", "css-2", "css-3", "css-4", "css-5", "css-6"],
  "React — Primeiro contato":    ["react-1", "react-2", "react-3", "react-4", "react-5"],
  "FastAPI (Python Backend)":    ["py-6", "py-5", "rest-2", "arch-6"],
  "Banco de Dados":              ["sql-1", "sql-2", "sql-3", "sql-4"],
  "Docker & Deploy Básico":      ["docker-2", "docker-1", "docker-3", "arch-6", "tool-2"],
  "Segurança Básica":            ["sec-1", "sec-2", "net-4"],
  "Portfólio no GitHub":         ["career-2", "career-1", "career-4"],
  "Entrevistas Técnicas":        ["career-3", "alg-2", "alg-5", "alg-9"],
  "Clean Code":                  ["clean-1", "clean-2", "clean-3", "arch-4"],
  "Soft Skills que Importam":    ["career-3", "career-1"],
};

// Build a lookup by id for fast access
const articleById = Object.fromEntries(articles.map((a) => [a.id, a]));

const PHASE_COLORS = ["#7c6af7", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

function typeIcon(type: ArticleType) {
  switch (type) {
    case "video":  return Play;
    case "docs":   return BookOpen;
    case "book":   return BookMarked;
    case "course": return GraduationCap;
    case "tool":   return Wrench;
    default:       return FileText;
  }
}

const typeMeta: Record<ArticleType, { label: string; color: string }> = {
  video:   { label: "Vídeo",  color: "#ef4444" },
  docs:    { label: "Docs",   color: "#3b82f6" },
  book:    { label: "Livro",  color: "#f59e0b" },
  course:  { label: "Curso",  color: "#8b5cf6" },
  tool:    { label: "Tool",   color: "#10b981" },
  article: { label: "Artigo", color: "#6d5ef5" },
};

export function ModuleSection() {
  const [activePhase, setActivePhase] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = () => setChecks(loadChecks());
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  function toggle(id: string) {
    const next = { ...checks, [id]: !checks[id] };
    setChecks(next);
    saveChecks(next);
  }

  const phase = phases[activePhase];
  const phaseColor = PHASE_COLORS[activePhase];

  return (
    <section id="checklist" className="mb-16">
      <div className="mb-6 animate-fade-in-up">
        <h2 className="text-xl font-semibold text-[#ececf0] mb-1">Módulos de aprendizado</h2>
        <p className="text-sm text-[#8f8f9a] leading-relaxed">
          Cada módulo tem um objetivo claro, checklist de tópicos e recursos selecionados.
          Clique nos itens para ler as explicações. Marque ao concluir.
        </p>
      </div>

      {/* Phase tabs */}
      <div className="flex gap-1.5 mb-8 flex-wrap animate-fade-in-up stagger-1">
        {phases.map((p, i) => {
          const items = p.cards.flatMap((c) => c.items);
          const done = items.filter((it) => checks[it.id]).length;
          const pct = items.length > 0 ? Math.round((done / items.length) * 100) : 0;
          const color = PHASE_COLORS[i];
          const isActive = activePhase === i;
          return (
            <button
              key={p.id}
              onClick={() => setActivePhase(i)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                isActive
                  ? "border-[#2e2e3c] bg-[#1e1e2c] text-[#ececf0]"
                  : "border-[#1e1e24] bg-transparent text-[#909098] hover:text-[#a8a8b8] hover:border-[#28282e] hover:bg-[#16161e]"
              }`}
              style={isActive ? { boxShadow: `0 0 0 1px ${color}22, 0 4px 12px ${color}10` } : {}}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
                style={{ background: isActive ? color : "#383840", boxShadow: isActive ? `0 0 6px ${color}` : "none" }}
              />
              <span className="hidden sm:inline">{clean(p.title)}</span>
              <span className="sm:hidden">F{i + 1}</span>
              {pct > 0 && (
                <span
                  className="text-[9px] font-semibold tabular-nums"
                  style={{ color: isActive ? color : "#484850" }}
                >
                  {pct}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Phase header */}
      <div
        className="flex items-start justify-between gap-4 mb-8 pb-6 border-b border-[#1e1e24] animate-fade-in"
        key={`header-${activePhase}`}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-1 h-5 rounded-full"
              style={{ background: phaseColor, boxShadow: `0 0 8px ${phaseColor}80` }}
            />
            <h3 className="text-lg font-semibold text-[#ececf0]">{clean(phase.title)}</h3>
          </div>
          <p className="text-sm text-[#8f8f9a] leading-relaxed max-w-2xl">{phase.description}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[10px] text-[#909098] font-medium uppercase tracking-wider">duração</p>
          <p className="text-sm font-semibold text-[#c0c0c8] mt-0.5">{phase.duration}</p>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-3" key={`modules-${activePhase}`}>
        {phase.cards.map((card, ci) => {
          const cardClean = clean(card.title);
          const meta = CARD_META[cardClean];
          const totalItems = card.items.length;
          const doneItems = card.items.filter((it) => checks[it.id]).length;
          const cardPct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;
          const isComplete = cardPct === 100;
          const inProgress = cardPct > 0 && cardPct < 100;
          const moduleArticles = (ARTICLE_MAP[cardClean] ?? [])
            .map((id) => articleById[id])
            .filter(Boolean) as Article[];

          return (
            <ModuleCard
              key={card.title}
              title={cardClean}
              subtitle={card.subtitle}
              week={meta?.week ?? `Módulo ${ci + 1}`}
              objective={meta?.objective ?? ""}
              items={card.items}
              checks={checks}
              onToggle={toggle}
              phaseColor={phaseColor}
              doneItems={doneItems}
              totalItems={totalItems}
              cardPct={cardPct}
              isComplete={isComplete}
              inProgress={inProgress}
              defaultOpen={ci === 0 && activePhase === 0}
              moduleArticles={moduleArticles}
              animDelay={ci * 0.06}
            />
          );
        })}
      </div>
    </section>
  );
}

function ModuleCard({
  title, subtitle, week, objective, items, checks, onToggle,
  phaseColor, doneItems, totalItems, cardPct, isComplete, inProgress,
  defaultOpen, moduleArticles, animDelay,
}: {
  title: string;
  subtitle: string;
  week: string;
  objective: string;
  items: CheckItem[];
  checks: Record<string, boolean>;
  onToggle: (id: string) => void;
  phaseColor: string;
  doneItems: number;
  totalItems: number;
  cardPct: number;
  isComplete: boolean;
  inProgress: boolean;
  defaultOpen: boolean;
  moduleArticles: Article[];
  animDelay: number;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const borderColor = isComplete ? "#1e2e24" : "#222228";
  const bgColor = isComplete ? "#121a15" : "#16161e";

  return (
    <div
      className="rounded-xl border overflow-hidden card-hover animate-fade-in-up"
      style={{
        borderColor,
        background: bgColor,
        animationDelay: `${animDelay}s`,
      }}
    >
      {/* Module header */}
      <button
        className="w-full flex items-start gap-4 px-5 py-4 text-left transition-colors duration-150"
        style={{ background: "transparent" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a1a24"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        onClick={() => setOpen(!open)}
      >
        {/* Status icon */}
        <div className="mt-0.5 flex-shrink-0">
          {isComplete ? (
            <CheckCircle2 size={18} color="#16a34a" strokeWidth={2} />
          ) : inProgress ? (
            <div
              className="w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center"
              style={{ borderColor: phaseColor }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: phaseColor }} />
            </div>
          ) : (
            <Circle size={16} color="#383840" strokeWidth={1.5} className="mt-0.5" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="text-[9px] font-semibold px-2 py-0.5 rounded-md"
              style={{ background: `${phaseColor}18`, color: phaseColor }}
            >
              {week}
            </span>
            {isComplete && (
              <span className="text-[9px] font-semibold text-[#16a34a] bg-[#0d2b14] px-2 py-0.5 rounded-md">
                Concluído
              </span>
            )}
            {moduleArticles.length > 0 && (
              <span className="text-[9px] font-medium text-[#909098] bg-[#1a1a28] px-2 py-0.5 rounded-md border border-[#252530]">
                {moduleArticles.length} recursos
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-[#dcdce4]">{title}</p>
          <p className="text-xs text-[#9898a8] mt-0.5 leading-relaxed">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-[#909098] tabular-nums hidden sm:block">
            {doneItems}/{totalItems}
          </span>
          <ChevronDown
            size={14}
            color="#404050"
            className="transition-transform duration-250"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>

      {/* Progress bar */}
      <div className="h-[2px] bg-[#1e1e26]">
        {cardPct > 0 && (
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{
              width: `${cardPct}%`,
              background: isComplete
                ? "#16a34a"
                : `linear-gradient(90deg, ${phaseColor}, ${phaseColor}cc)`,
              boxShadow: isComplete ? "0 0 6px #16a34a60" : `0 0 6px ${phaseColor}60`,
            }}
          />
        )}
      </div>

      {/* Expanded content */}
      {open && (
        <div className="animate-fade-in">
          {/* Objective */}
          {objective && (
            <div className="px-5 pt-4 pb-3">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-[#9090a0] mb-1.5">
                Ao final deste módulo
              </p>
              <p className="text-sm text-[#9898a8] leading-relaxed">{objective}</p>
            </div>
          )}

          {/* Resources */}
          {moduleArticles.length > 0 && (
            <div className="px-5 pb-4">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-[#9090a0] mb-3">
                Recursos para este módulo
              </p>
              <div className="flex flex-col gap-2">
                {moduleArticles.map((art) => {
                  const Icon = typeIcon(art.type);
                  const meta = typeMeta[art.type];
                  return (
                    <a
                      key={art.id}
                      href={art.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg border border-[#1e1e2c] bg-[#111118] group transition-all duration-150 hover:border-[#2a2a3a] hover:bg-[#141420]"
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-150"
                        style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}20` }}
                      >
                        <Icon size={11} style={{ color: meta.color }} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium text-[#c0c0cc] group-hover:text-[#d8d8e4] transition-colors truncate">
                            {art.title}
                          </p>
                          {!art.free && (
                            <span className="text-[8px] font-semibold text-[#f59e0b] bg-[#2a2010] px-1.5 py-0.5 rounded flex-shrink-0">
                              pago
                            </span>
                          )}
                          {art.lang === "pt" && (
                            <span className="text-[8px] font-semibold text-[#10b981] bg-[#0d2b1e] px-1.5 py-0.5 rounded flex-shrink-0">
                              PT
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#9898a8] mt-0.5 leading-relaxed line-clamp-2">
                          {art.description}
                        </p>
                      </div>
                      <ExternalLink size={11} className="flex-shrink-0 mt-1" style={{ color: "#9090a8" }} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Checklist */}
          <div className="border-t border-[#1e1e26]">
            {items.map((item) => (
              <CheckRow
                key={item.id}
                item={item}
                checked={!!checks[item.id]}
                onToggle={() => onToggle(item.id)}
                phaseColor={phaseColor}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CheckRow({
  item, checked, onToggle, phaseColor,
}: {
  item: CheckItem;
  checked: boolean;
  onToggle: () => void;
  phaseColor: string;
}) {
  const [open, setOpen] = useState(false);
  const desc = descriptions[item.id];

  const diffColor: Record<string, string> = {
    easy:   "#3a7a50",
    medium: "#7a6030",
    hard:   "#7a3838",
  };
  const diffLabel: Record<string, string> = {
    easy:   "fácil",
    medium: "médio",
    hard:   "difícil",
  };

  return (
    <div className="border-b border-[#1a1a22] last:border-0">
      <div className="flex items-start gap-3 px-5 py-3 group hover:bg-[#1a1a24] transition-colors duration-100">
        {/* Checkbox */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="mt-0.5 w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all duration-150"
          style={{
            borderColor: checked ? "#16a34a" : "#30303a",
            background: checked ? "#16a34a" : "transparent",
          }}
          onMouseEnter={(e) => { if (!checked) (e.currentTarget as HTMLElement).style.borderColor = "#505060"; }}
          onMouseLeave={(e) => { if (!checked) (e.currentTarget as HTMLElement).style.borderColor = "#30303a"; }}
        >
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
              <path d="M1.5 5L4 7.5L8.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Text */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => desc && setOpen(!open)}>
          <p
            className="text-sm leading-snug transition-colors duration-150"
            style={{ color: checked ? "#404050" : "#d0d0d8", textDecoration: checked ? "line-through" : "none" }}
          >
            {item.label}
          </p>
          <p className="text-[11px] text-[#909098] mt-0.5 leading-relaxed">{item.meta}</p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
          <span
            className="text-[9px] font-medium px-1.5 py-0.5 rounded"
            style={{ color: diffColor[item.difficulty], background: `${diffColor[item.difficulty]}20` }}
          >
            {diffLabel[item.difficulty]}
          </span>
          {desc && (
            <button
              onClick={() => setOpen(!open)}
              className="w-5 h-5 flex items-center justify-center rounded transition-all duration-150 text-[#808090] hover:text-[#8080a0] hover:bg-[#22222c]"
            >
              <ChevronDown
                size={12}
                strokeWidth={2}
                style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }}
              />
            </button>
          )}
        </div>
      </div>

      {/* Description panel */}
      {open && desc && (
        <div className="px-5 pb-5 pt-2 bg-[#111118] border-t border-[#1a1a22] animate-fade-in">
          <div className="pt-3 space-y-4">
            <DescBlock color="#7c6af7" label="O que é" text={desc.what} />
            <DescBlock color="#ca8a04" label="Por que importa" text={desc.why} />
            <DescBlock color="#16a34a" label="Como funciona" text={desc.how} />
            {desc.example && (
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3b82f6] mb-2">Exemplo</p>
                <pre className="text-[11px] text-[#93c5fd] bg-[#090f1c] border border-[#1a2840] rounded-lg p-3 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono">
                  {desc.example}
                </pre>
              </div>
            )}
            {desc.tip && (
              <div className="flex gap-3 bg-[#120f08] border border-[#2a2010] rounded-lg px-3 py-2.5">
                <span className="text-[10px] font-semibold text-[#ca8a04] flex-shrink-0 mt-px">Dica</span>
                <p className="text-xs text-[#a09060] leading-relaxed">{desc.tip}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DescBlock({ label, color, text }: { label: string; color: string; text: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5" style={{ color }}>
        {label}
      </p>
      <p className="text-sm text-[#b0b0bc] leading-relaxed">{text}</p>
    </div>
  );
}
