"use client";

import {
  Brain, Timer, HelpCircle, PenLine, CalendarDays,
  Share2, GraduationCap, Award, DatabaseBackup, Keyboard,
  ChevronLeft, X, User, Lock,
} from "lucide-react";
import { useLayout } from "@/components/LayoutContext";
import { useSiteTheme } from "@/components/SiteThemeContext";
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
  const { theme } = useSiteTheme();

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
          background: theme.bgPanel,
          borderLeft: `1px solid ${theme.border}`,
          transition: "width 280ms cubic-bezier(0.4,0,0.2,1), background 400ms ease, border-color 400ms ease",
        }}
      >
        {/* Inner container — fixed width so content doesn't squish */}
        <div
          className="flex flex-col h-full overflow-y-auto overflow-x-hidden"
          style={{ width: `${PANEL_W}px` }}
        >
          {/* Accent bar */}
          <div className="accent-bar flex-shrink-0" />

          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5 flex-shrink-0"
            style={{ borderBottom: `1px solid ${theme.border}`, minHeight: "56px" }}
          >
            <span className="section-eyebrow">&gt;_ ferramentas</span>
            <button
              onClick={toggleRight}
              className="p-1 rounded-md transition-colors"
              style={{ color: theme.textDim }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = theme.textSecondary}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = theme.textDim}
              title="Fechar painel"
            >
              <X size={13} />
            </button>
          </div>

          {/* Next step */}
          <div className="px-3 py-3" style={{ borderBottom: `1px solid ${theme.border}` }}>
            <p className="mono-label mb-2" style={{ color: theme.textDim }}>próximo passo</p>
            <NextStepWidget />
          </div>

          {/* Daily challenge */}
          <div className="px-3 py-3" style={{ borderBottom: `1px solid ${theme.border}` }}>
            <DailyChallenge />
          </div>

          {/* Tool list */}
          <div className="px-3 py-3 flex-1">
            <p className="mono-label mb-2" style={{ color: theme.textDim }}>ações</p>
            <div className="flex flex-col gap-0.5">
              {tools.map(({ label, icon: Icon, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-150 text-left w-full"
                  style={{ color: theme.textMuted, background: "transparent" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = theme.accentDim;
                    (e.currentTarget as HTMLElement).style.color = theme.accentHover;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = theme.textMuted;
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

          {/* ── Profile ── */}
          <div
            className="flex-shrink-0 px-3 py-3"
            style={{ borderTop: `1px solid ${theme.border}` }}
          >

            {/* Profile card */}
            <div
              className="flex items-center gap-2.5 p-2.5 rounded-xl"
              style={{
                background: theme.accentDim,
                border: `1px solid ${theme.accentBorder}`,
              }}
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
                  boxShadow: `0 0 10px ${theme.glowColor}`,
                }}
              >
                <User size={14} strokeWidth={1.5} color={theme.bg} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold truncate" style={{ color: theme.textPrimary }}>
                  Usuário
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Lock size={8} color={theme.textDim} />
                  <span className="mono-label" style={{ color: theme.textDim }}>
                    login em breve
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Tab button when panel is closed ── */}
      {!rightOpen && (
        <button
          onClick={toggleRight}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center transition-all duration-150"
          style={{
            width: "20px",
            height: "56px",
            background: theme.bgPanel,
            border: `1px solid ${theme.border}`,
            borderRight: "none",
            borderRadius: "6px 0 0 6px",
            color: theme.textDim,
          }}
          title="Abrir painel de ferramentas"
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = theme.accentDim;
            (e.currentTarget as HTMLElement).style.color = theme.accentLight;
            (e.currentTarget as HTMLElement).style.borderColor = theme.accentBorder;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = theme.bgPanel;
            (e.currentTarget as HTMLElement).style.color = theme.textDim;
            (e.currentTarget as HTMLElement).style.borderColor = theme.border;
          }}
        >
          <ChevronLeft size={11} />
        </button>
      )}
    </>
  );
}
