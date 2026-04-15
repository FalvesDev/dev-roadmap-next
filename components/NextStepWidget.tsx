"use client";

import { useEffect, useState } from "react";
import { ArrowRight, PartyPopper, CheckCircle2 } from "lucide-react";
import { phases } from "@/lib/roadmap-data";

const CHECKS_KEY = "roadmap_checks_v1";

interface NextStep {
  itemLabel: string;
  itemId: string;
  cardTitle: string;
  phaseNumber: string;
  phaseColor: string;
  phaseIdx: number;
}

interface PhaseStatus {
  idx: number;
  title: string;
  color: string;
  pct: number;
}

export function NextStepWidget() {
  const [next, setNext] = useState<NextStep | null>(null);
  const [allDone, setAllDone] = useState(false);
  const [justFinishedPhase, setJustFinishedPhase] = useState<PhaseStatus | null>(null);

  useEffect(() => {
    function compute() {
      let checks: Record<string, boolean> = {};
      try { checks = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}"); } catch {}

      const total = phases.flatMap(p => p.cards.flatMap(c => c.items)).length;
      const done  = phases.flatMap(p => p.cards.flatMap(c => c.items)).filter(i => checks[i.id]).length;
      if (done === total && total > 0) { setAllDone(true); return; }

      // Find next unchecked item
      const PHASE_COLORS = ["#7c6af7","#3b82f6","#8b5cf6","#10b981","#f59e0b"];
      for (let pi = 0; pi < phases.length; pi++) {
        const phase = phases[pi];
        const phaseItems = phase.cards.flatMap(c => c.items);
        const phaseDone  = phaseItems.filter(i => checks[i.id]).length;

        // Phase just completed?
        if (phaseDone === phaseItems.length && phaseDone > 0 && pi < phases.length - 1) {
          const nextPhase = phases[pi + 1];
          const nextPhaseItems = nextPhase.cards.flatMap(c => c.items);
          const nextPhaseDone  = nextPhaseItems.filter(i => checks[i.id]).length;
          if (nextPhaseDone === 0) {
            setJustFinishedPhase({ idx: pi, title: phase.title.replace(/^\S+\s/,""), color: PHASE_COLORS[pi], pct: 100 });
            setNext({
              itemLabel: nextPhaseItems[0].label,
              itemId: nextPhaseItems[0].id,
              cardTitle: nextPhase.cards[0].title.replace(/^\S+\s/,""),
              phaseNumber: nextPhase.number,
              phaseColor: PHASE_COLORS[pi + 1],
              phaseIdx: pi + 1,
            });
            return;
          }
        }
        setJustFinishedPhase(null);

        // Find next unchecked in this phase
        for (const card of phase.cards) {
          for (const item of card.items) {
            if (!checks[item.id]) {
              setNext({
                itemLabel: item.label,
                itemId: item.id,
                cardTitle: card.title.replace(/^\S+\s/,""),
                phaseNumber: phase.number,
                phaseColor: PHASE_COLORS[pi],
                phaseIdx: pi,
              });
              return;
            }
          }
        }
      }
    }
    compute();
    const interval = setInterval(compute, 2000);
    return () => clearInterval(interval);
  }, []);

  if (allDone) {
    return (
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl animate-fade-in"
        style={{ background: "#0d2b14", border: "1px solid #1a4020" }}
      >
        <PartyPopper size={16} color="#16a34a" strokeWidth={1.5} />
        <div>
          <p className="text-xs font-semibold text-[#16a34a]">Roadmap completo! 🎉</p>
          <p className="text-[10px] text-[#4a8a5a]">Você completou todos os módulos. Hora de aplicar para vagas.</p>
        </div>
      </div>
    );
  }

  if (!next) return null;

  return (
    <div className="space-y-2">
      {justFinishedPhase && (
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl animate-fade-in"
          style={{ background: `${justFinishedPhase.color}10`, border: `1px solid ${justFinishedPhase.color}30` }}
        >
          <CheckCircle2 size={14} color={justFinishedPhase.color} strokeWidth={2} />
          <p className="text-xs font-semibold" style={{ color: justFinishedPhase.color }}>
            {justFinishedPhase.title} concluída! Avançando para a próxima fase →
          </p>
        </div>
      )}

      <a
        href="#checklist"
        className="flex items-center gap-3 px-4 py-3 rounded-xl group transition-all duration-150"
        style={{ background: "#1a1a26", border: "1px solid #252535" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${next.phaseColor}50`;
          (e.currentTarget as HTMLElement).style.background = `${next.phaseColor}08`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#252535";
          (e.currentTarget as HTMLElement).style.background = "#1a1a26";
        }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${next.phaseColor}20`, border: `1px solid ${next.phaseColor}30` }}
        >
          <ArrowRight size={13} color={next.phaseColor} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-0.5" style={{ color: next.phaseColor }}>
            Próximo passo · {next.phaseNumber}
          </p>
          <p className="text-xs text-[#c0c0d0] truncate leading-snug">{next.itemLabel}</p>
          <p className="text-[10px] text-[#606070] truncate">{next.cardTitle}</p>
        </div>
        <ArrowRight size={12} color="#484858" className="flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
