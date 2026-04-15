"use client";

import { useState } from "react";
import { ChevronDown, Lightbulb } from "lucide-react";
import {
  interviewQuestions,
  categoryMeta,
  type InterviewCategory,
  type InterviewQuestion,
} from "@/lib/interview-data";

const diffMeta = {
  easy:   { label: "Fácil",   color: "#10b981" },
  medium: { label: "Médio",   color: "#f59e0b" },
  hard:   { label: "Difícil", color: "#ef4444" },
};

function renderAnswer(text: string) {
  // Very light markdown: **bold**, `code`, ```block```
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("```")) return null;
    // code block lines (between ```)
    return (
      <p key={i} className="text-xs text-[#a0a0b0] leading-relaxed mb-1 whitespace-pre-wrap font-mono">
        {line || "\u00A0"}
      </p>
    );
  });
}

function QuestionCard({ q }: { q: InterviewQuestion }) {
  const [open, setOpen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const cat = categoryMeta[q.category];
  const diff = diffMeta[q.difficulty];

  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-200"
      style={{ borderColor: open ? `${cat.color}40` : "#222228", background: "#16161e" }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded"
              style={{ background: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}30` }}
            >
              {cat.label}
            </span>
            <span
              className="text-[9px] font-semibold px-2 py-0.5 rounded"
              style={{ background: `${diff.color}15`, color: diff.color }}
            >
              {diff.label}
            </span>
          </div>
          <p className="text-sm font-medium text-[#d0d0d8] leading-snug">{q.question}</p>
        </div>
        <ChevronDown
          size={14}
          className="flex-shrink-0 mt-1 transition-transform duration-200"
          style={{ color: "#606070", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Answer */}
      {open && (
        <div className="px-4 pb-4 border-t border-[#1e1e28] animate-fade-in">
          <div
            className="mt-3 p-3 rounded-lg text-[11px] leading-relaxed"
            style={{ background: "#0f0f16", border: "1px solid #1a1a28" }}
          >
            <pre className="whitespace-pre-wrap text-[#a8a8b8] font-mono text-[11px] leading-relaxed">
              {q.answer}
            </pre>
          </div>

          {q.tip && (
            <div className="mt-3">
              <button
                onClick={(e) => { e.stopPropagation(); setShowTip((v) => !v); }}
                className="flex items-center gap-1.5 text-[10px] font-semibold transition-colors"
                style={{ color: showTip ? "#f59e0b" : "#606070" }}
              >
                <Lightbulb size={11} />
                {showTip ? "Esconder dica de entrevista" : "Ver dica de entrevista"}
              </button>
              {showTip && (
                <div
                  className="mt-2 px-3 py-2 rounded-lg text-[11px] animate-fade-in"
                  style={{ background: "#1a1500", border: "1px solid #2e2a00", color: "#d4b860" }}
                >
                  {q.tip}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function InterviewSection() {
  const [activeCategory, setActiveCategory] = useState<InterviewCategory | "all">("all");

  const categories: Array<InterviewCategory | "all"> = ["all", "python", "js", "sql", "git", "soft"];

  const filtered = activeCategory === "all"
    ? interviewQuestions
    : interviewQuestions.filter((q) => q.category === activeCategory);

  const countByCategory = (cat: InterviewCategory | "all") =>
    cat === "all" ? interviewQuestions.length : interviewQuestions.filter((q) => q.category === cat).length;

  return (
    <section id="entrevista" className="mb-16">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#ececf0] mb-1">Prep para entrevista técnica</h2>
        <p className="text-sm text-[#8f8f9a] leading-relaxed">
          {interviewQuestions.length} perguntas reais de processo seletivo júnior — com respostas completas e dicas de como impressionar.
        </p>
      </div>

      {/* Banner */}
      <div
        className="flex items-start gap-3 rounded-lg px-4 py-3 mb-6"
        style={{ background: "#0f1a10", border: "1px solid #1a3020" }}
      >
        <span className="text-base flex-shrink-0">🎯</span>
        <div>
          <p className="text-xs font-semibold text-[#6ee896] mb-0.5">Como usar esta seção</p>
          <p className="text-xs text-[#70a880] leading-relaxed">
            Não memorize as respostas — entenda o raciocínio por trás. Pratique em voz alta: simule explicar para alguém.
            Para cada resposta que você não soubesse, vá estudar o tópico no módulo correspondente antes de voltar.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const color = cat === "all" ? "#909098" : categoryMeta[cat].color;
          const label = cat === "all" ? `Todas (${countByCategory("all")})` : `${categoryMeta[cat].label} (${countByCategory(cat)})`;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-150"
              style={{
                background: isActive ? `${color}20` : "#16161e",
                color: isActive ? color : "#707080",
                border: `1px solid ${isActive ? `${color}50` : "#222228"}`,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Questions */}
      <div className="space-y-2">
        {filtered.map((q) => (
          <QuestionCard key={q.id} q={q} />
        ))}
      </div>
    </section>
  );
}
