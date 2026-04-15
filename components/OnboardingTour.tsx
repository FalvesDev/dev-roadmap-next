"use client";

import { useEffect, useRef, useState } from "react";
import { Map } from "lucide-react";

const TOUR_KEY = "roadmap_tour_v1";

function hasDoneTour(): boolean {
  try { return !!localStorage.getItem(TOUR_KEY); } catch { return false; }
}
function markTourDone() {
  try { localStorage.setItem(TOUR_KEY, "1"); } catch { /* ignore */ }
}

export function OnboardingTour() {
  const [ready, setReady]     = useState(false);
  const [running, setRunning] = useState(false);
  const driverRef = useRef<import("driver.js").Driver | null>(null);

  useEffect(() => {
    // Small delay to let the DOM settle
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  async function startTour(auto = false) {
    if (running) return;
    setRunning(true);

    const { driver } = await import("driver.js");
    await import("driver.js/dist/driver.css");

    const d = driver({
      animate: true,
      showProgress: true,
      progressText: "{{current}} de {{total}}",
      nextBtnText: "Próximo →",
      prevBtnText: "← Anterior",
      doneBtnText: "Entendido! 🚀",
      overlayColor: "#000",
      overlayOpacity: 0.7,
      popoverClass: "dv-popover",
      onDestroyed: () => {
        markTourDone();
        setRunning(false);
      },
      steps: [
        {
          element: "#overview",
          popover: {
            title: "👋 Bem-vindo ao Dev Roadmap",
            description: "Sua plataforma completa para se tornar desenvolvedor júnior em 9 meses. Tudo gratuito, sem conta, tudo salvo aqui no seu browser.",
            side: "bottom", align: "start",
          },
        },
        {
          element: "[data-tour='daily-challenge']",
          popover: {
            title: "🔥 Desafio do dia",
            description: "Todo dia um novo conceito ou questão para revisar. Abre aqui e veja se consegue responder sem olhar. Pequenos passos diários = grande evolução.",
            side: "left",
          },
        },
        {
          element: "[data-tour='next-step']",
          popover: {
            title: "🎯 Próximo passo",
            description: "Sempre mostra exatamente o que estudar agora. Sem ficar perdido perguntando 'por onde começo?'",
            side: "left",
          },
        },
        {
          element: "[data-tour='weekly-goal']",
          popover: {
            title: "📅 Meta semanal",
            description: "Configure quantas horas por semana você quer estudar. Cada dia que você estuda aparece marcado aqui.",
            side: "left",
          },
        },
        {
          element: "[data-tour='streak']",
          popover: {
            title: "🔥 Streak de estudos",
            description: "Marque 'Estudei hoje' sempre que abrir qualquer material. O heatmap mostra todos os seus dias de estudo. 7 dias = badge desbloqueado!",
            side: "left",
          },
        },
        {
          element: "#checklist",
          popover: {
            title: "✅ Módulos de aprendizado",
            description: "95 itens organizados em 5 fases. Cada item tem uma explicação completa. Marque conforme estudar. Você pode adicionar notas e flags de revisão em qualquer item.",
            side: "top", align: "start",
          },
        },
        {
          element: "[data-tour='quick-actions']",
          popover: {
            title: "⚡ Ações rápidas",
            description: "Acesso rápido ao Pomodoro, Quiz, Flashcards, Notas, Conquistas e mais. Pressione ? a qualquer hora para ver todos os atalhos de teclado.",
            side: "bottom", align: "start",
          },
        },
        {
          element: "[data-tour='sidebar-modules']",
          popover: {
            title: "📌 Navegação lateral",
            description: "Use a sidebar para pular para qualquer seção: Módulos, Projetos, Glossário, Entrevistas, Carreira. Está tudo aqui.",
            side: "right",
          },
        },
      ],
    });

    driverRef.current = d;
    d.drive();
  }

  // Auto-start for brand new users (who haven't done the tour AND have no progress)
  useEffect(() => {
    if (!ready) return;
    if (hasDoneTour()) return;
    try {
      const checks = JSON.parse(localStorage.getItem("roadmap_checks_v1") || "{}");
      const done = Object.values(checks).filter(Boolean).length;
      if (done === 0) {
        // slight extra delay to not conflict with onboarding modal
        setTimeout(() => startTour(true), 3000);
      }
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <>
      <button
        onClick={() => startTour(false)}
        aria-label="Iniciar tour interativo"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
        style={{ background: "#1a1a28", color: "#9090b0", border: "1px solid #252535" }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.color = "#c0c0d8";
          el.style.borderColor = "#7c6af740";
          el.style.background = "#1e1a30";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.color = "#9090b0";
          el.style.borderColor = "#252535";
          el.style.background = "#1a1a28";
        }}
      >
        <Map size={12} /> Tour
      </button>

      <style>{`
        .dv-popover {
          background: #1a1a26 !important;
          border: 1px solid #7c6af740 !important;
          border-radius: 14px !important;
          box-shadow: 0 8px 40px rgba(0,0,0,0.6) !important;
          font-family: inherit !important;
          max-width: 320px !important;
        }
        .dv-popover .driver-popover-title {
          color: #ededf4 !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          margin-bottom: 6px !important;
        }
        .dv-popover .driver-popover-description {
          color: #a0a0b0 !important;
          font-size: 12px !important;
          line-height: 1.6 !important;
        }
        .dv-popover .driver-popover-progress-text {
          color: #606070 !important;
          font-size: 10px !important;
        }
        .dv-popover .driver-popover-prev-btn,
        .dv-popover .driver-popover-next-btn,
        .dv-popover .driver-popover-done-btn {
          background: #7c6af7 !important;
          color: #fff !important;
          border: none !important;
          border-radius: 8px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          padding: 6px 12px !important;
          cursor: pointer !important;
        }
        .dv-popover .driver-popover-prev-btn {
          background: #252535 !important;
          color: #9090b0 !important;
        }
        .dv-popover .driver-popover-close-btn {
          color: #606070 !important;
          background: transparent !important;
          font-size: 16px !important;
        }
        .driver-overlay { background: rgba(0,0,0,0.7) !important; }
      `}</style>
    </>
  );
}
