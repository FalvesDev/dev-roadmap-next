"use client";

import { useEffect, useState, useRef } from "react";
import { phases } from "@/lib/roadmap-data";
import { X, ArrowRight, Trophy } from "lucide-react";

const CHECKS_KEY     = "roadmap_checks_v1";
const CELEBRATED_KEY = "roadmap_celebrated_v1";
const PHASE_COLORS   = ["#7c6af7","#3b82f6","#8b5cf6","#10b981","#f59e0b"];

function getCelebrated(): string[] {
  try { return JSON.parse(localStorage.getItem(CELEBRATED_KEY) || "[]"); }
  catch { return []; }
}
function addCelebrated(id: string) {
  const list = [...getCelebrated(), id];
  localStorage.setItem(CELEBRATED_KEY, JSON.stringify(list));
}

interface CompletedPhase { idx: number; title: string; color: string; isLast: boolean; nextTitle?: string; }

export function PhaseCompleteModal() {
  const [completed, setCompleted] = useState<CompletedPhase | null>(null);
  const prevPcts = useRef<number[]>([]);

  useEffect(() => {
    function check() {
      let checks: Record<string, boolean> = {};
      try { checks = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}"); } catch {}
      const celebrated = getCelebrated();

      for (let i = 0; i < phases.length; i++) {
        const items = phases[i].cards.flatMap(c => c.items);
        const done  = items.filter(it => checks[it.id]).length;
        const pct   = items.length > 0 ? done / items.length : 0;
        const prev  = prevPcts.current[i] ?? 0;

        if (pct === 1 && prev < 1 && !celebrated.includes(phases[i].id)) {
          addCelebrated(phases[i].id);
          setCompleted({
            idx: i,
            title: phases[i].title.replace(/^\S+\s/, ""),
            color: PHASE_COLORS[i],
            isLast: i === phases.length - 1,
            nextTitle: i < phases.length - 1 ? phases[i + 1].title.replace(/^\S+\s/, "") : undefined,
          });
          break;
        }
        prevPcts.current[i] = pct;
      }
    }
    check();
    const interval = setInterval(check, 1500);
    return () => clearInterval(interval);
  }, []);

  if (!completed) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)" }}
      onClick={() => setCompleted(null)}
    >
      <div
        className="w-full max-w-sm text-center animate-scale-in"
        style={{ background: "#13131a", border: `1px solid ${completed.color}30`, borderRadius: "20px", padding: "32px 24px" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setCompleted(null)}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full"
          style={{ background: "#1e1e2a", color: "#606070" }}
        >
          <X size={13} />
        </button>

        {/* Trophy */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: `${completed.color}20`, border: `2px solid ${completed.color}40`, boxShadow: `0 0 40px ${completed.color}30` }}
        >
          <Trophy size={28} color={completed.color} strokeWidth={1.5} />
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: completed.color }}>
          Fase concluída!
        </p>
        <h2 className="text-xl font-bold text-[#ededf4] mb-2">{completed.title}</h2>
        <p className="text-sm text-[#909098] mb-6 leading-relaxed">
          {completed.isLast
            ? "Você completou o roadmap inteiro. Está pronto para se candidatar a vagas de desenvolvedor júnior."
            : `Excelente trabalho. Você já domina os fundamentos desta fase. Hora de avançar para a próxima etapa.`
          }
        </p>

        {/* Stars decoration */}
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-lg" style={{ color: completed.color, animationDelay: `${i * 0.1}s` }}>★</span>
          ))}
        </div>

        <div className="space-y-2">
          {!completed.isLast && completed.nextTitle && (
            <a
              href="#checklist"
              onClick={() => setCompleted(null)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold"
              style={{ background: `${completed.color}20`, color: completed.color, border: `1px solid ${completed.color}40` }}
            >
              Ir para {completed.nextTitle}
              <ArrowRight size={14} />
            </a>
          )}
          <button
            onClick={() => setCompleted(null)}
            className="w-full py-2.5 rounded-xl text-sm font-medium"
            style={{ background: "#1e1e2a", color: "#909098", border: "1px solid #252535" }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
