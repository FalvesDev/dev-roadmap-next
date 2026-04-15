"use client";

import { useState, useCallback, useMemo } from "react";
import { RotateCcw, ThumbsUp, ThumbsDown, Shuffle, X } from "lucide-react";
import { interviewQuestions, categoryMeta, type InterviewCategory } from "@/lib/interview-data";

interface CardState {
  flipped: boolean;
  result: "correct" | "wrong" | null;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardMode({ onClose }: { onClose: () => void }) {
  const [filterCat, setFilterCat] = useState<InterviewCategory | "all">("all");
  const [sessionCards, setSessionCards] = useState(() =>
    shuffle(interviewQuestions).slice(0, 10)
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [cardState, setCardState] = useState<CardState>({ flipped: false, result: null });
  const [results, setResults] = useState<Array<"correct" | "wrong">>([]);
  const [done, setDone] = useState(false);

  const filtered = useMemo(() =>
    filterCat === "all" ? interviewQuestions : interviewQuestions.filter((q) => q.category === filterCat),
    [filterCat]
  );

  const startSession = useCallback((size = 10) => {
    setSessionCards(shuffle(filtered).slice(0, Math.min(size, filtered.length)));
    setCurrentIdx(0);
    setCardState({ flipped: false, result: null });
    setResults([]);
    setDone(false);
  }, [filtered]);

  const flip = () => setCardState((s) => ({ ...s, flipped: !s.flipped }));

  const answer = (correct: boolean) => {
    const result: "correct" | "wrong" = correct ? "correct" : "wrong";
    const newResults = [...results, result];
    setResults(newResults);
    setCardState({ flipped: false, result: null });

    if (currentIdx + 1 >= sessionCards.length) {
      setDone(true);
    } else {
      setTimeout(() => setCurrentIdx((i) => i + 1), 100);
    }
  };

  const card = sessionCards[currentIdx];
  const correctCount = results.filter((r) => r === "correct").length;
  const pct = sessionCards.length > 0 ? Math.round((correctCount / sessionCards.length) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-lg animate-scale-in"
        style={{ background: "#13131a", border: "1px solid #222230", borderRadius: "20px", overflow: "hidden" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e28]">
          <div>
            <h2 className="text-sm font-semibold text-[#dcdce4]">Revisão rápida</h2>
            <p className="text-[10px] text-[#909098] mt-0.5">
              {done ? "Sessão concluída" : `${currentIdx + 1} de ${sessionCards.length}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Category filter */}
            <select
              className="text-xs px-2 py-1 rounded-md"
              style={{ background: "#1e1e2a", border: "1px solid #2a2a38", color: "#a0a0b0" }}
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value as InterviewCategory | "all")}
            >
              <option value="all">Todas</option>
              {(Object.keys(categoryMeta) as InterviewCategory[]).map((cat) => (
                <option key={cat} value={cat}>{categoryMeta[cat].label}</option>
              ))}
            </select>
            <button
              onClick={() => startSession()}
              title="Novo shuffle"
              className="w-7 h-7 flex items-center justify-center rounded-md transition-colors"
              style={{ background: "#1e1e2a", color: "#707080" }}
            >
              <Shuffle size={13} />
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md transition-colors"
              style={{ background: "#1e1e2a", color: "#707080" }}
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#1a1a24]">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${sessionCards.length > 0 ? ((currentIdx + (done ? 1 : 0)) / sessionCards.length) * 100 : 0}%`,
              background: "linear-gradient(90deg, #7c6af7, #10b981)",
            }}
          />
        </div>

        <div className="p-5">
          {done ? (
            /* Results screen */
            <div className="text-center py-4 animate-fade-in">
              <div className="text-4xl mb-3">
                {pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}
              </div>
              <p className="text-xl font-bold text-[#dcdce4] mb-1">{pct}% correto</p>
              <p className="text-sm text-[#909098] mb-6">
                {correctCount} de {sessionCards.length} respostas certas
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                <div className="rounded-xl p-3" style={{ background: "#0d2b14", border: "1px solid #1a4020" }}>
                  <p className="text-xl font-bold text-[#16a34a]">{correctCount}</p>
                  <p className="text-[10px] text-[#4a8a5a]">Sabia</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: "#2a0d14", border: "1px solid #401020" }}>
                  <p className="text-xl font-bold text-[#ef4444]">{sessionCards.length - correctCount}</p>
                  <p className="text-[10px] text-[#a05050]">Revisar</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: "#1e1e2a", border: "1px solid #282838" }}>
                  <p className="text-xl font-bold text-[#7c6af7]">{sessionCards.length}</p>
                  <p className="text-[10px] text-[#7060b0]">Total</p>
                </div>
              </div>

              {pct < 80 && (
                <p className="text-xs text-[#909098] mb-4">
                  Revise as respostas erradas na seção de entrevistas antes de tentar novamente.
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => startSession()}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "#7c6af720", color: "#7c6af7", border: "1px solid #7c6af740" }}
                >
                  Novo shuffle
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "#1e1e2a", color: "#a0a0b0", border: "1px solid #2a2a38" }}
                >
                  Fechar
                </button>
              </div>
            </div>
          ) : card ? (
            /* Flashcard */
            <div>
              {/* Category + difficulty */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded"
                  style={{
                    background: `${categoryMeta[card.category].color}18`,
                    color: categoryMeta[card.category].color,
                    border: `1px solid ${categoryMeta[card.category].color}30`,
                  }}
                >
                  {categoryMeta[card.category].label}
                </span>
                <div className="flex gap-1 ml-auto">
                  {results.map((r, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: r === "correct" ? "#10b981" : "#ef4444" }}
                    />
                  ))}
                  {Array.from({ length: sessionCards.length - results.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-2 h-2 rounded-full bg-[#2a2a38]" />
                  ))}
                </div>
              </div>

              {/* Card flip area */}
              <div
                className="relative cursor-pointer select-none mb-4"
                style={{ perspective: "1000px", height: cardState.flipped ? "auto" : "160px" }}
                onClick={flip}
              >
                <div
                  className="w-full rounded-2xl transition-all duration-400"
                  style={{
                    background: cardState.flipped ? "#0f0f16" : "#1a1a26",
                    border: cardState.flipped ? "1px solid #252535" : "1px solid #2a2a3a",
                    padding: "20px",
                    minHeight: "140px",
                  }}
                >
                  {!cardState.flipped ? (
                    <div className="animate-fade-in">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#606070] mb-3">Pergunta</p>
                      <p className="text-sm font-medium text-[#d0d0d8] leading-relaxed">{card.question}</p>
                      <p className="text-[10px] text-[#484858] mt-4 text-center">clique para ver a resposta</p>
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#10b981] mb-3">Resposta</p>
                      <pre className="text-[11px] text-[#a0a0b0] leading-relaxed whitespace-pre-wrap font-mono">
                        {card.answer}
                      </pre>
                    </div>
                  )}
                </div>
              </div>

              {/* Flip hint + answer buttons */}
              {!cardState.flipped ? (
                <button
                  onClick={flip}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "#1e1e2a", color: "#a0a0b0", border: "1px solid #2a2a38" }}
                >
                  <RotateCcw size={13} className="inline mr-2" />
                  Revelar resposta
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => answer(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all"
                    style={{ background: "#2a0d14", color: "#ef4444", border: "1px solid #401020" }}
                  >
                    <ThumbsDown size={13} /> Não sabia
                  </button>
                  <button
                    onClick={() => answer(true)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all"
                    style={{ background: "#0d2b14", color: "#10b981", border: "1px solid #1a4020" }}
                  >
                    <ThumbsUp size={13} /> Sabia!
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
