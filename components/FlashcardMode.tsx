"use client";

import { useState, useCallback, useEffect } from "react";
import { RotateCcw, X, Brain, Layers, Sparkles, Clock } from "lucide-react";
import { interviewQuestions, categoryMeta, type InterviewCategory } from "@/lib/interview-data";
import {
  loadSRS, saveSRS, getCard, applyReview, getDueCards, getNewCards,
  getSRSStats, nextReviewLabel, type SRSQuality, type CardState as SRSCardState,
} from "@/lib/srs";

const MAX_SESSION = 20;
const NEW_PER_SESSION = 5; // max new cards per session

type Screen = "menu" | "session" | "results";

interface SessionResult {
  id: string;
  quality: SRSQuality;
  nextLabel: string;
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
  const [screen, setScreen]       = useState<Screen>("menu");
  const [filterCat, setFilterCat] = useState<InterviewCategory | "all">("all");
  const [srsStates, setSrsStates] = useState<Record<string, SRSCardState>>({});
  const [queue, setQueue]         = useState<string[]>([]);   // card IDs for this session
  const [idx, setIdx]             = useState(0);
  const [flipped, setFlipped]     = useState(false);
  const [results, setResults]     = useState<SessionResult[]>([]);

  useEffect(() => { setSrsStates(loadSRS()); }, []);

  const allIds = (filterCat === "all"
    ? interviewQuestions
    : interviewQuestions.filter(q => q.category === filterCat)
  ).map(q => q.id);

  const stats = getSRSStats(allIds, srsStates);

  function buildQueue(): string[] {
    const due  = getDueCards(allIds, srsStates).map(c => c.id);
    const newC = shuffle(getNewCards(allIds, srsStates)).slice(0, NEW_PER_SESSION).map(c => c.id);
    // due cards first, then new cards, capped at MAX_SESSION
    return [...due, ...newC].slice(0, MAX_SESSION);
  }

  function startSession() {
    const q = buildQueue();
    if (q.length === 0) return;
    setQueue(q);
    setIdx(0);
    setFlipped(false);
    setResults([]);
    setScreen("session");
  }

  function startFreeSession() {
    // random shuffle regardless of SRS, useful for free practice
    const q = shuffle(allIds).slice(0, 10);
    setQueue(q);
    setIdx(0);
    setFlipped(false);
    setResults([]);
    setScreen("session");
  }

  function rate(quality: SRSQuality) {
    const id = queue[idx];
    const card = getCard(id, srsStates);
    const updated = applyReview(card, quality);
    const newStates = { ...srsStates, [id]: updated };
    setSrsStates(newStates);
    saveSRS(newStates);

    const res: SessionResult = { id, quality, nextLabel: nextReviewLabel(updated) };
    const newResults = [...results, res];
    setResults(newResults);
    setFlipped(false);

    if (idx + 1 >= queue.length) {
      setScreen("results");
    } else {
      setTimeout(() => setIdx(i => i + 1), 80);
    }
  }

  const currentCard = interviewQuestions.find(q => q.id === queue[idx]);
  const cardSRS     = currentCard ? getCard(currentCard.id, srsStates) : null;

  // ─── MENU ────────────────────────────────────────────────────────────────
  if (screen === "menu") {
    const hasDue = stats.due > 0;
    const hasNew = stats.newCards > 0;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}>
        <div className="w-full max-w-sm rounded-2xl border border-[#222230] overflow-hidden animate-scale-in"
          style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e28]">
            <div className="flex items-center gap-2">
              <Brain size={15} className="text-[#7c6af7]" />
              <h2 className="text-sm font-semibold text-[#dcdce4]">Revisão com SRS</h2>
            </div>
            <button onClick={onClose} aria-label="Fechar" className="text-[#404050] hover:text-[#9090b0] transition-colors"><X size={16} /></button>
          </div>

          <div className="p-5">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 mb-5">
              {[
                { label: "Total",      value: stats.total,    color: "#9090b0" },
                { label: "Hoje",       value: stats.due,      color: stats.due > 0 ? "#f97316" : "#404050" },
                { label: "Novas",      value: stats.newCards, color: stats.newCards > 0 ? "#60a5fa" : "#404050" },
                { label: "Maduras",    value: stats.mature,   color: "#34d399" },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center rounded-xl py-2.5 border border-[#1e1e2a]" style={{ background: "#16161e" }}>
                  <p className="text-base font-bold" style={{ color }}>{value}</p>
                  <p className="text-[9px] text-[#505060]">{label}</p>
                </div>
              ))}
            </div>

            {/* Category filter */}
            <div className="mb-4">
              <label className="block text-[10px] font-semibold text-[#606070] uppercase tracking-wider mb-1.5">Filtrar categoria</label>
              <select
                className="w-full text-xs px-3 py-2 rounded-lg"
                style={{ background: "#16161e", border: "1px solid #252535", color: "#a0a0b0" }}
                value={filterCat}
                onChange={e => setFilterCat(e.target.value as InterviewCategory | "all")}
                aria-label="Filtrar por categoria"
              >
                <option value="all">Todas as categorias</option>
                {(Object.keys(categoryMeta) as InterviewCategory[]).map(cat => (
                  <option key={cat} value={cat}>{categoryMeta[cat].label}</option>
                ))}
              </select>
            </div>

            {/* SRS session button */}
            <button
              onClick={startSession}
              disabled={!hasDue && !hasNew}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold mb-2 transition-all"
              style={{
                background: (hasDue || hasNew) ? "linear-gradient(135deg, #7c6af720, #1a1530)" : "#16161e",
                color: (hasDue || hasNew) ? "#c0b0ff" : "#404050",
                border: `1px solid ${(hasDue || hasNew) ? "#7c6af740" : "#1e1e2a"}`,
              }}
            >
              <span className="flex items-center gap-2">
                <Layers size={14} />
                Sessão SRS
                {stats.due > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold"
                    style={{ background: "#f9731620", color: "#f97316" }}>{stats.due} pendentes</span>
                )}
                {stats.due === 0 && stats.newCards > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold"
                    style={{ background: "#60a5fa20", color: "#60a5fa" }}>{stats.newCards} novas</span>
                )}
              </span>
              <span className="text-xs text-[#606070]">recomendado</span>
            </button>

            <button
              onClick={startFreeSession}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{ background: "#16161e", color: "#9090b0", border: "1px solid #1e1e2a" }}
            >
              <Sparkles size={14} />
              Prática livre (10 aleatórias)
            </button>

            {!hasDue && !hasNew && (
              <p className="text-center text-xs text-[#34d399] mt-4">
                ✓ Tudo revisado! Volte amanhã para os próximos cards.
              </p>
            )}

            <div className="mt-4 p-3 rounded-lg text-[10px] text-[#505060] leading-relaxed"
              style={{ background: "#111118", border: "1px solid #1a1a22" }}>
              <strong className="text-[#7c6af7]">Como funciona o SRS:</strong> cada card tem um intervalo crescente baseado no seu desempenho.
              "Sabia!" = mais dias até ver de novo. "Difícil" ou "Não sabia" = volta em 1 dia.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULTS ─────────────────────────────────────────────────────────────
  if (screen === "results") {
    const knew   = results.filter(r => r.quality === 4).length;
    const hard   = results.filter(r => r.quality === 2).length;
    const forgot = results.filter(r => r.quality === 0).length;
    const pct    = Math.round((knew / results.length) * 100);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}>
        <div className="w-full max-w-md rounded-2xl border border-[#222230] overflow-hidden animate-scale-in"
          style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
          <div className="px-5 py-4 border-b border-[#1e1e28]">
            <h2 className="text-sm font-semibold text-[#dcdce4]">Sessão concluída</h2>
          </div>
          <div className="p-5">
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}</div>
              <p className="text-2xl font-bold text-[#ededf4]">{pct}%</p>
              <p className="text-xs text-[#606070] mt-1">{results.length} cards revisados</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { label: "Sabia",   value: knew,   bg: "#0d2b14", border: "#1a4020", color: "#34d399" },
                { label: "Difícil", value: hard,   bg: "#1a1510", border: "#2a2510", color: "#fbbf24" },
                { label: "Errei",   value: forgot, bg: "#2a0d14", border: "#401020", color: "#ef4444" },
              ].map(({ label, value, bg, border, color }) => (
                <div key={label} className="text-center rounded-xl py-3" style={{ background: bg, border: `1px solid ${border}` }}>
                  <p className="text-xl font-bold" style={{ color }}>{value}</p>
                  <p className="text-[10px]" style={{ color }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Next review preview */}
            {results.filter(r => r.quality < 3).length > 0 && (
              <div className="mb-4 p-3 rounded-xl border border-[#252535]" style={{ background: "#16161e" }}>
                <p className="text-[10px] font-semibold text-[#606070] uppercase tracking-wider mb-2">Cards para revisar amanhã</p>
                <div className="space-y-1">
                  {results.filter(r => r.quality < 3).slice(0, 3).map(r => {
                    const q = interviewQuestions.find(q => q.id === r.id);
                    return q ? (
                      <p key={r.id} className="text-[11px] text-[#909098] truncate">· {q.question}</p>
                    ) : null;
                  })}
                  {results.filter(r => r.quality < 3).length > 3 && (
                    <p className="text-[11px] text-[#404050]">+{results.filter(r => r.quality < 3).length - 3} mais…</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => { setScreen("menu"); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: "#7c6af720", color: "#a78bfa", border: "1px solid #7c6af740" }}>
                Mais cards
              </button>
              <button onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: "#1e1e2a", color: "#a0a0b0", border: "1px solid #2a2a38" }}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── SESSION ─────────────────────────────────────────────────────────────
  if (!currentCard) return null;

  const isNew    = (cardSRS?.totalReviews ?? 0) === 0;
  const catColor = categoryMeta[currentCard.category].color;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}>
      <div className="w-full max-w-lg rounded-2xl border border-[#222230] overflow-hidden animate-scale-in"
        style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e28]">
          <div>
            <p className="text-xs font-semibold text-[#dcdce4]">
              {idx + 1} <span className="text-[#404050]">/ {queue.length}</span>
            </p>
            <p className="text-[10px] text-[#606070] mt-0.5">
              {results.filter(r => r.quality === 4).length} sabia · {results.filter(r => r.quality < 3).length} errou
            </p>
          </div>
          <div className="flex items-center gap-2">
            {cardSRS && cardSRS.totalReviews > 0 && (
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md"
                style={{ background: "#1e1e2a", color: "#606070" }}>
                <Clock size={10} /> intervalo {cardSRS.interval}d
              </span>
            )}
            {isNew && (
              <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
                style={{ background: "#60a5fa15", color: "#60a5fa", border: "1px solid #60a5fa30" }}>Novo</span>
            )}
            <button onClick={onClose} aria-label="Fechar" className="text-[#404050] hover:text-[#9090b0] transition-colors"><X size={15} /></button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#1a1a24]">
          <div className="h-full transition-all duration-500"
            style={{ width: `${(idx / queue.length) * 100}%`, background: "linear-gradient(90deg, #7c6af7, #34d399)" }} />
        </div>

        <div className="p-5">
          {/* Category badge + dot trail */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ background: catColor + "18", color: catColor, border: `1px solid ${catColor}30` }}>
              {categoryMeta[currentCard.category].label}
            </span>
            <div className="flex gap-1">
              {results.map((r, i) => (
                <div key={i} className="w-2 h-2 rounded-full"
                  style={{ background: r.quality === 4 ? "#34d399" : r.quality === 2 ? "#fbbf24" : "#ef4444" }} />
              ))}
              {Array.from({ length: queue.length - results.length }).map((_, i) => (
                <div key={`e-${i}`} className="w-2 h-2 rounded-full bg-[#252530]" />
              ))}
            </div>
          </div>

          {/* Card */}
          <div
            className="relative cursor-pointer select-none mb-4 rounded-2xl transition-all duration-300"
            style={{
              background: flipped ? "#111118" : "#1a1a26",
              border: `1px solid ${flipped ? "#252535" : "#2a2a3a"}`,
              padding: "20px",
              minHeight: "140px",
            }}
            onClick={() => !flipped && setFlipped(true)}
          >
            {!flipped ? (
              <div className="animate-fade-in">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#606070] mb-3">Pergunta</p>
                <p className="text-sm font-medium text-[#d0d0d8] leading-relaxed">{currentCard.question}</p>
                <p className="text-[10px] text-[#404050] mt-4 text-center">clique para ver a resposta</p>
              </div>
            ) : (
              <div className="animate-fade-in">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#34d399] mb-3">Resposta</p>
                <pre className="text-[11px] text-[#a0a0b0] leading-relaxed whitespace-pre-wrap font-mono">
                  {currentCard.answer}
                </pre>
                {currentCard.tip && (
                  <div className="mt-3 p-2 rounded-lg text-[10px] text-[#909060] leading-relaxed"
                    style={{ background: "#16140a", border: "1px solid #2a2810" }}>
                    💡 {currentCard.tip}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          {!flipped ? (
            <button onClick={() => setFlipped(true)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "#1e1e2a", color: "#a0a0b0", border: "1px solid #2a2a38" }}>
              <RotateCcw size={13} className="inline mr-2" /> Revelar resposta
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => rate(0)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: "#2a0d14", color: "#ef4444", border: "1px solid #401020" }}>
                Não sabia
              </button>
              <button onClick={() => rate(2)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: "#1a1205", color: "#fbbf24", border: "1px solid #2a2010" }}>
                Difícil
              </button>
              <button onClick={() => rate(4)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: "#0d2b14", color: "#34d399", border: "1px solid #1a4020" }}>
                Sabia! ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
