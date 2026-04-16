"use client";

import {
  Brain, Timer, HelpCircle, PenLine, CalendarDays,
  Share2, GraduationCap, Award, DatabaseBackup, Keyboard,
  ChevronRight, ChevronLeft, X,
} from "lucide-react";
import { useLayout } from "@/components/LayoutContext";
import { NextStepWidget } from "@/components/NextStepWidget";
import { DailyChallenge } from "@/components/DailyChallenge";
import { AchievementsBadge } from "@/components/AchievementsPanel";
import { StudyReminder } from "@/components/StudyReminder";
import { OnboardingTour } from "@/components/OnboardingTour";

interface RightPanelProps {
  onFlashcards:   () => void;
  onPomodoro:     () => void;
  onQuiz:         () => void;
  onNotes:        () => void;
  onActivity:     () => void;
  onShare:        () => void;
  onExport:       () => void;
  onCertificate:  () => void;
  onBackup:       () => void;
  onAchievements: () => void;
  onShortcuts:    () => void;
}

const PANEL_W = 256;

export function RightPanel(props: RightPanelProps) {
  const { rightOpen, toggleRight } = useLayout();

  const tools = [
    { label: "Flashcards",   icon: Brain,          onClick: props.onFlashcards },
    { label: "Pomodoro",     icon: Timer,          onClick: props.onPomodoro },
    { label: "Quiz",         icon: HelpCircle,     onClick: props.onQuiz },
    { label: "Notas",        icon: PenLine,        onClick: props.onNotes },
    { label: "Histórico",    icon: CalendarDays,   onClick: props.onActivity },
    { label: "Compartilhar", icon: Share2,         onClick: props.onShare },
    { label: "Exportar PDF", icon: GraduationCap,  onClick: props.onExport },
    { label: "Certificado",  icon: Award,          onClick: props.onCertificate },
    { label: "Backup",       icon: DatabaseBackup, onClick: props.onBackup },
    { label: "Atalhos",      icon: Keyboard,       onClick: props.onShortcuts },
  ];

  return (
    <>
      {/* ── Panel itself ── */}
      <aside
        className="fixed top-0 right-0 h-screen z-50 hidden lg:flex flex-col overflow-hidden"
        style={{
          width: rightOpen ? `${PANEL_W}px` : "0px",
          background: "#0c0c18",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          transition: "width 280ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Inner container — fixed width so content doesn't squish during animation */}
        <div
          className="flex flex-col h-full overflow-y-auto overflow-x-hidden"
          style={{ width: `${PANEL_W}px` }}
        >
          {/* Accent bar */}
          <div className="accent-bar flex-shrink-0" />

          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", minHeight: "56px" }}
          >
            <span className="section-eyebrow">&gt;_ ferramentas</span>
            <button
              onClick={toggleRight}
              className="p-1 rounded-md transition-colors"
              style={{ color: "#505065" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a0a0c0"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#505065"}
              title="Fechar painel"
            >
              <X size={13} />
            </button>
          </div>

          {/* Next step */}
          <div className="px-3 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="mono-label mb-2" style={{ color: "#404060" }}>próximo passo</p>
            <NextStepWidget />
          </div>

          {/* Daily challenge */}
          <div className="px-3 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <DailyChallenge />
          </div>

          {/* Tool list */}
          <div className="px-3 py-3 flex-1">
            <p className="mono-label mb-2" style={{ color: "#404060" }}>ações</p>
            <div className="flex flex-col gap-0.5">
              {tools.map(({ label, icon: Icon, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-150 text-left w-full"
                  style={{ color: "#707088", background: "transparent" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "#c4b5fd";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#707088";
                  }}
                >
                  <Icon size={13} strokeWidth={1.5} />
                  {label}
                </button>
              ))}
              <div className="mt-1 flex gap-1">
                <AchievementsBadge onClick={props.onAchievements} />
              </div>
              <div className="flex gap-1 mt-0.5">
                <StudyReminder />
                <OnboardingTour />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Tab button when panel is closed (desktop only) ── */}
      {!rightOpen && (
        <button
          onClick={toggleRight}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center transition-all duration-150"
          style={{
            width: "20px",
            height: "56px",
            background: "#0c0c18",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRight: "none",
            borderRadius: "6px 0 0 6px",
            color: "#505065",
          }}
          title="Abrir painel de ferramentas"
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#141428";
            (e.currentTarget as HTMLElement).style.color = "#a78bfa";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "#0c0c18";
            (e.currentTarget as HTMLElement).style.color = "#505065";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          <ChevronLeft size={11} />
        </button>
      )}
    </>
  );
}
