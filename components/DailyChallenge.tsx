"use client";

import { useState, useEffect } from "react";
import { Flame, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { quizQuestions } from "@/lib/quiz-data";
import { glossaryTerms } from "@/lib/glossary-data";

const DAILY_KEY = "roadmap_daily_v1";

type ChallengeType = "quiz" | "concept";

interface DailyState {
  date: string;
  seed: number;
  completed: boolean;
}

function getTodaySeed(): number {
  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash) + today.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function loadDaily(): DailyState {
  try {
    const saved = JSON.parse(localStorage.getItem(DAILY_KEY) || "{}");
    const today = new Date().toISOString().slice(0, 10);
    if (saved.date === today) return saved;
  } catch { /* ignore */ }
  const today = new Date().toISOString().slice(0, 10);
  return { date: today, seed: getTodaySeed(), completed: false };
}

export function DailyChallenge() {
  const [state, setState]   = useState<DailyState | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [answered, setAnswered] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => { setState(loadDaily()); }, []);

  if (!state) return null;

  const seed = state.seed;
  const challengeType: ChallengeType = seed % 3 === 0 ? "concept" : "quiz";

  // Pick today's challenge
  const quizIdx  = seed % quizQuestions.length;
  const termIdx  = seed % glossaryTerms.length;
  const quiz     = quizQuestions[quizIdx];
  const term     = glossaryTerms[termIdx];

  function markDone() {
    const next = { ...state!, completed: true };
    setState(next);
    try { localStorage.setItem(DAILY_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }

  function pickAnswer(idx: number) {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === quiz.correct) markDone();
    setTimeout(() => setShowAnswer(true), 300);
  }

  const categoryColors: Record<string, string> = {
    python: "#4db3ff", typescript: "#3178c6", sql: "#f59e0b",
    http: "#34d399", git: "#f97316", geral: "#a78bfa",
    0: "#7c6af7", 1: "#34d399", 2: "#fbbf24", 3: "#f97316", 4: "#60a5fa",
  };

  return (
    <div className="rounded-2xl border border-[#7c6af730] overflow-hidden animate-fade-in-up"
      style={{ background: "linear-gradient(135deg, #1a1530 0%, #13131a 100%)", boxShadow: "0 4px 24px rgba(124,106,247,0.08)" }}>
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        aria-expanded={expanded}
        aria-label="Desafio do dia"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#7c6af720" }}>
            <Flame size={14} className="text-[#a78bfa]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#ededf4]">Desafio do dia</p>
            <p className="text-[10px] text-[#606070]">
              {state.completed ? "✓ Concluído hoje!" : challengeType === "quiz" ? "Questão de revisão" : "Conceito do dia"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {state.completed && <CheckCircle size={14} className="text-[#34d399]" />}
          {expanded ? <ChevronUp size={14} className="text-[#606070]" /> : <ChevronDown size={14} className="text-[#606070]" />}
        </div>
      </button>

      {/* Body */}
      {expanded && (
        <div className="px-5 pb-5 animate-fade-in border-t border-[#1e1e2a]">
          {challengeType === "quiz" ? (
            <div className="pt-4">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider"
                style={{ background: (categoryColors[quiz.phase] ?? "#7c6af7") + "20", color: categoryColors[quiz.phase] ?? "#7c6af7" }}>
                Fase {quiz.phase + 1}
              </span>
              <p className="text-sm font-semibold text-[#ededf4] mt-3 mb-4 leading-relaxed">{quiz.question}</p>
              <div className="space-y-2 mb-3">
                {quiz.options.map((opt, i) => {
                  let bg = "#1a1a26", border = "#252535", color = "#a0a0b0";
                  if (answered !== null) {
                    if (i === quiz.correct) { bg = "#34d39910"; border = "#34d39940"; color = "#34d399"; }
                    else if (i === answered) { bg = "#ef444410"; border = "#ef444430"; color = "#ef4444"; }
                  }
                  return (
                    <button key={i} onClick={() => pickAnswer(i)} disabled={answered !== null}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all"
                      style={{ background: bg, border: `1px solid ${border}`, color }}>
                      <span className="font-bold mr-2">{["A","B","C","D"][i]}.</span>{opt}
                    </button>
                  );
                })}
              </div>
              {showAnswer && (
                <div className="rounded-xl p-3 text-xs text-[#a0a0b0] animate-fade-in"
                  style={{ background: "#16161e", border: "1px solid #252535" }}>
                  <span className="font-semibold text-[#c0c0d8]">Explicação: </span>{quiz.explanation}
                </div>
              )}
              {answered !== null && !state.completed && answered !== quiz.correct && (
                <button onClick={markDone} className="mt-3 text-xs text-[#606070] hover:text-[#9090b0] transition-colors">
                  Marcar como visto mesmo assim →
                </button>
              )}
            </div>
          ) : (
            <div className="pt-4">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider"
                style={{ background: (categoryColors[term.category] ?? "#7c6af7") + "20", color: categoryColors[term.category] ?? "#7c6af7" }}>
                {term.category}
              </span>
              <h3 className="text-base font-bold text-[#ededf4] mt-3 mb-1">{term.term}</h3>
              <p className="text-xs text-[#9090b0] mb-3">{term.short}</p>
              <p className="text-sm text-[#a0a0b0] leading-relaxed mb-3">{term.detail}</p>
              {term.example && (
                <pre className="text-xs rounded-lg p-3 overflow-x-auto leading-relaxed mb-4"
                  style={{ background: "#0d0d12", color: "#c0c0d8", border: "1px solid #252535" }}>
                  {term.example}
                </pre>
              )}
              {!state.completed && (
                <button onClick={markDone}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-white transition-all"
                  style={{ background: "#7c6af7" }}>
                  Entendi — marcar como lido ✓
                </button>
              )}
              {state.completed && (
                <p className="text-xs text-[#34d399] text-center font-medium">✓ Conceito do dia absorvido!</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
