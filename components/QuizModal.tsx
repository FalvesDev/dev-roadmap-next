"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, XCircle, ChevronRight, Lock } from "lucide-react";
import { quizQuestions, phaseTitles } from "@/lib/quiz-data";

const CHECKS_KEY = "roadmap_checks_v1";
const PHASE_SIZES = [16, 18, 22, 21, 18];

function getPhaseProgress(phase: number): number {
  try {
    const checks: Record<string, boolean> = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}");
    const size = PHASE_SIZES[phase];
    let offset = PHASE_SIZES.slice(0, phase).reduce((a, b) => a + b, 0);
    let done = 0;
    for (let i = offset; i < offset + size; i++) {
      if (checks[`check-${i}`]) done++;
    }
    return done / size;
  } catch {
    return 0;
  }
}

const UNLOCK_THRESHOLD = 0.8;

interface Answer { chosen: number; correct: boolean }

export function QuizModal({ onClose }: { onClose: () => void }) {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [phaseProgress, setPhaseProgress] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState(quizQuestions.filter(q => q.phase === 0));

  useEffect(() => {
    setPhaseProgress(PHASE_SIZES.map((_, i) => getPhaseProgress(i)));
  }, []);

  function startPhase(phase: number) {
    const qs = quizQuestions.filter(q => q.phase === phase);
    setQuestions(qs);
    setSelectedPhase(phase);
    setCurrent(0);
    setAnswers([]);
    setChosen(null);
    setShowResult(false);
  }

  function pick(idx: number) {
    if (chosen !== null) return;
    setChosen(idx);
  }

  function next() {
    if (chosen === null) return;
    const q = questions[current];
    const newAnswers = [...answers, { chosen, correct: chosen === q.correct }];
    setAnswers(newAnswers);

    if (current + 1 >= questions.length) {
      setShowResult(true);
    } else {
      setCurrent(current + 1);
      setChosen(null);
    }
  }

  const score = answers.filter(a => a.correct).length;
  const q = selectedPhase !== null ? questions[current] : null;

  // Phase selection screen
  if (selectedPhase === null) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
        <div className="relative w-full max-w-md rounded-2xl border border-[#222230] p-6 animate-fade-in-up" style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
          <button onClick={onClose} className="absolute top-4 right-4 text-[#404050] hover:text-[#9090b0] transition-colors" aria-label="Fechar quiz">
            <X size={18} />
          </button>
          <h2 className="text-sm font-bold text-[#ededf4] mb-1">Quiz por fase</h2>
          <p className="text-xs text-[#606070] mb-5">Complete 80% de uma fase para desbloquear seu quiz.</p>

          <div className="space-y-2">
            {phaseTitles.map((title, i) => {
              const pct = phaseProgress[i] ?? 0;
              const unlocked = pct >= UNLOCK_THRESHOLD;
              const qCount = quizQuestions.filter(q => q.phase === i).length;
              return (
                <button
                  key={i}
                  onClick={() => unlocked && startPhase(i)}
                  disabled={!unlocked}
                  className="w-full flex items-center gap-3 rounded-xl px-4 py-3 border text-left transition-all"
                  style={{
                    background: unlocked ? "#16161e" : "#111118",
                    borderColor: unlocked ? "#7c6af740" : "#1e1e2a",
                    opacity: unlocked ? 1 : 0.5,
                    cursor: unlocked ? "pointer" : "default",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#c0c0d8]">{title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1 rounded-full bg-[#1e1e2a] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, background: pct >= 1 ? "#34d399" : "#7c6af7" }} />
                      </div>
                      <span className="text-[10px] text-[#606070]">{Math.round(pct * 100)}%</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {unlocked
                      ? <span className="text-[10px] text-[#a78bfa]">{qCount} questões →</span>
                      : <Lock size={13} className="text-[#404050]" />
                    }
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResult) {
    const pct = score / questions.length;
    const color = pct >= 0.8 ? "#34d399" : pct >= 0.5 ? "#fbbf24" : "#ef4444";
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
        <div className="relative w-full max-w-sm rounded-2xl border border-[#222230] p-6 text-center animate-fade-in-up" style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
          <div className="text-5xl mb-4">{pct >= 0.8 ? "🏆" : pct >= 0.5 ? "📚" : "💪"}</div>
          <h2 className="text-xl font-bold mb-1" style={{ color }}>{score}/{questions.length} corretas</h2>
          <p className="text-sm text-[#909098] mb-6">
            {pct >= 0.8 ? "Excelente! Você domina este conteúdo." : pct >= 0.5 ? "Bom progresso! Revise os erros." : "Continue estudando e tente novamente."}
          </p>
          <div className="space-y-2 text-left mb-6 max-h-48 overflow-y-auto">
            {questions.map((q, i) => {
              const a = answers[i];
              return (
                <div key={q.id} className="flex items-start gap-2 text-xs rounded-lg px-3 py-2"
                  style={{ background: a?.correct ? "#34d39910" : "#ef444410", border: `1px solid ${a?.correct ? "#34d39930" : "#ef444430"}` }}>
                  {a?.correct ? <CheckCircle size={13} className="text-[#34d399] mt-0.5 shrink-0" /> : <XCircle size={13} className="text-[#ef4444] mt-0.5 shrink-0" />}
                  <span className="text-[#a0a0b0] leading-relaxed">{q.question}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button onClick={() => startPhase(selectedPhase)} className="flex-1 py-2 rounded-xl text-xs font-semibold text-[#9090b0] transition-all"
              style={{ background: "#1a1a26", border: "1px solid #252535" }}>
              Tentar novamente
            </button>
            <button onClick={() => setSelectedPhase(null)} className="flex-1 py-2 rounded-xl text-xs font-semibold text-white transition-all"
              style={{ background: "#7c6af7" }}>
              Outras fases
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative w-full max-w-lg rounded-2xl border border-[#222230] p-6 animate-fade-in-up" style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-semibold text-[#606070]">{phaseTitles[selectedPhase]} · {current + 1}/{questions.length}</span>
          <button onClick={onClose} className="text-[#404050] hover:text-[#9090b0] transition-colors" aria-label="Fechar quiz">
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-[#1e1e2a] mb-5 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${((current) / questions.length) * 100}%`, background: "#7c6af7" }} />
        </div>

        <p className="text-sm font-semibold text-[#ededf4] mb-5 leading-relaxed">{q?.question}</p>

        <div className="space-y-2 mb-5">
          {q?.options.map((opt, i) => {
            let bg = "#1a1a26", border = "#252535", color = "#a0a0b0";
            if (chosen !== null) {
              if (i === q.correct) { bg = "#34d39910"; border = "#34d39940"; color = "#34d399"; }
              else if (i === chosen && chosen !== q.correct) { bg = "#ef444410"; border = "#ef444440"; color = "#ef4444"; }
            } else if (chosen === i) { bg = "#7c6af720"; border = "#7c6af750"; color = "#c0c0d8"; }
            return (
              <button key={i} onClick={() => pick(i)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                style={{ background: bg, border: `1px solid ${border}`, color }}>
                <span className="font-semibold mr-2">{["A", "B", "C", "D"][i]}.</span>{opt}
              </button>
            );
          })}
        </div>

        {chosen !== null && (
          <div className="rounded-xl p-3 mb-4 text-xs text-[#a0a0b0] leading-relaxed animate-fade-in"
            style={{ background: "#16161e", border: "1px solid #252535" }}>
            <span className="font-semibold text-[#c0c0d8]">Explicação: </span>{q?.explanation}
          </div>
        )}

        <button onClick={next} disabled={chosen === null}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: chosen !== null ? "#7c6af7" : "#252535", color: chosen !== null ? "#fff" : "#404050" }}>
          {current + 1 >= questions.length ? "Ver resultado" : "Próxima"} <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
