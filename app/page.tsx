"use client";

import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { BottomNav } from "@/components/BottomNav";
import { StickyProgress } from "@/components/StickyProgress";
import { ProgressStats } from "@/components/ProgressStats";
import { ProgressCharts } from "@/components/ProgressCharts";
import { ModuleSection } from "@/components/ModuleSection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { ResourceGrid } from "@/components/ResourceGrid";
import { CareerSection } from "@/components/CareerSection";
import { TipsSection } from "@/components/TipsSection";
import { GlobalSearch } from "@/components/GlobalSearch";
import { MobileNav } from "@/components/MobileNav";
import { HeroCTA } from "@/components/HeroCTA";
import { PathSelector } from "@/components/PathSelector";
import { StreakTracker } from "@/components/StreakTracker";
import { InterviewSection } from "@/components/InterviewSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { FlashcardMode } from "@/components/FlashcardMode";
import { ExportProgress } from "@/components/ExportProgress";
import { OnboardingModal } from "@/components/OnboardingModal";
import { PhaseCompleteModal } from "@/components/PhaseCompleteModal";
import { NextStepWidget } from "@/components/NextStepWidget";
import { NotesDashboard } from "@/components/NotesDashboard";
import { TabTitle } from "@/components/TabTitle";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { GlossarySection } from "@/components/GlossarySection";
import { WeeklyGoal } from "@/components/WeeklyGoal";
import { AchievementsPanel, AchievementsBadge } from "@/components/AchievementsPanel";
import { BackupRestore } from "@/components/BackupRestore";
import { QuizModal } from "@/components/QuizModal";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { ShareProfile } from "@/components/ShareProfile";
import { Certificate } from "@/components/Certificate";
import { DailyChallenge } from "@/components/DailyChallenge";
import { KeyboardShortcuts, useKeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { StudyReminder } from "@/components/StudyReminder";
import { OnboardingTour } from "@/components/OnboardingTour";
import { LocaleToggle, useI18n } from "@/components/I18nProvider";
import {
  Brain, Share2, PenLine, Timer, DatabaseBackup,
  GraduationCap, CalendarDays, Award, HelpCircle, Keyboard,
  Flame, Target,
} from "lucide-react";

/* ── Section divider — retro style ─────────── */
function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-10">
      <span className="mono-label" style={{ color: "#7c3aed" }}>//</span>
      <span className="mono-label" style={{ color: "#505065" }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

/* ── Tool button — retro style ──────────────── */
function ToolBtn({ label, icon: Icon, onClick }: { label: string; icon: React.ElementType; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 whitespace-nowrap flex-shrink-0 mono-label"
      style={{ background: "transparent", color: "#606070", border: "1px solid rgba(255,255,255,0.07)" }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(124,58,237,0.12)";
        el.style.borderColor = "rgba(124,58,237,0.4)";
        el.style.color = "#c4b5fd";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "transparent";
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.color = "#606070";
      }}
    >
      <Icon size={12} /> {label}
    </button>
  );
}

/* ── Inline status (reads localStorage) ────── */
function HeroStatus() {
  const [streak, setStreak] = useState(0);
  const [pct,    setPct]    = useState(0);

  useEffect(() => {
    try {
      const s  = JSON.parse(localStorage.getItem("roadmap_streak_v1") || "{}");
      const ch = JSON.parse(localStorage.getItem("roadmap_checks_v1") || "{}");
      setStreak(s.currentStreak ?? 0);
      setPct(Math.round((Object.values(ch).filter(Boolean).length / 95) * 100));
    } catch { /* ignore */ }
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="flex items-center gap-1.5 mono-label" style={{ color: streak > 0 ? "#f59e0b" : "#505065" }}>
        <Flame size={11} /> {streak} dia{streak !== 1 ? "s" : ""} de streak
      </span>
      <span className="flex items-center gap-1.5 mono-label" style={{ color: pct > 0 ? "#7c3aed" : "#505065" }}>
        <Target size={11} /> {pct}% completo
      </span>
    </div>
  );
}

/* ── Main page ───────────────────────────────── */
export default function Home() {
  const { t } = useI18n();

  const [showFlashcards,   setShowFlashcards]   = useState(false);
  const [showExport,       setShowExport]       = useState(false);
  const [showNotes,        setShowNotes]        = useState(false);
  const [showPomodoro,     setShowPomodoro]     = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showBackup,       setShowBackup]       = useState(false);
  const [showQuiz,         setShowQuiz]         = useState(false);
  const [showActivity,     setShowActivity]     = useState(false);
  const [showShare,        setShowShare]        = useState(false);
  const [showCertificate,  setShowCertificate]  = useState(false);
  const [showShortcuts,    setShowShortcuts]    = useState(false);

  const closeAll = useCallback(() => {
    setShowFlashcards(false); setShowExport(false); setShowNotes(false);
    setShowPomodoro(false); setShowAchievements(false); setShowBackup(false);
    setShowQuiz(false); setShowActivity(false); setShowShare(false);
    setShowCertificate(false); setShowShortcuts(false);
  }, []);

  useKeyboardShortcuts({
    onSearch:     () => document.dispatchEvent(new CustomEvent("open-search")),
    onPomodoro:   () => setShowPomodoro(v => !v),
    onFlashcards: () => setShowFlashcards(v => !v),
    onNotes:      () => setShowNotes(v => !v),
    onQuiz:       () => setShowQuiz(v => !v),
    onShortcuts:  () => setShowShortcuts(v => !v),
    onClose:      closeAll,
  });

  return (
    <div className="flex min-h-screen" style={{ background: "#080812" }}>
      <Sidebar />
      <MobileNav />
      <BottomNav />
      <StickyProgress />
      <GlobalSearch />

      <TabTitle />
      <OnboardingModal />
      <PhaseCompleteModal />
      {showFlashcards   && <FlashcardMode     onClose={() => setShowFlashcards(false)} />}
      {showExport       && <ExportProgress    onClose={() => setShowExport(false)} />}
      {showNotes        && <NotesDashboard    onClose={() => setShowNotes(false)} />}
      {showPomodoro     && <PomodoroTimer     onClose={() => setShowPomodoro(false)} />}
      {showAchievements && <AchievementsPanel onClose={() => setShowAchievements(false)} />}
      {showBackup       && <BackupRestore     onClose={() => setShowBackup(false)} />}
      {showQuiz         && <QuizModal         onClose={() => setShowQuiz(false)} />}
      {showActivity     && <ActivityTimeline  onClose={() => setShowActivity(false)} />}
      {showShare        && <ShareProfile      onClose={() => setShowShare(false)} />}
      {showCertificate  && <Certificate       onClose={() => setShowCertificate(false)} />}
      {showShortcuts    && <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />}

      <main id="main-content" className="flex-1 lg:ml-52 w-full pb-16 lg:pb-0">

        {/* ════════════════════════════════════════
            HERO — Dev Retro
        ════════════════════════════════════════ */}
        <section id="overview" className="relative overflow-hidden" style={{ background: "#080812" }}>

          {/* Accent bar top */}
          <div className="accent-bar" />

          {/* Dot grid overlay */}
          <div className="dot-grid absolute inset-0 pointer-events-none" />

          {/* Radial purple bloom */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(124,58,237,0.07) 0%, transparent 70%)" }} />

          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 md:px-10 py-14 md:py-16">

            {/* ── Terminal label ── */}
            <div className="flex items-center gap-3 mb-6">
              <span className="mono-label" style={{ color: "#f59e0b" }}>
                $ dev-roadmap --year 2025
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
              <span className="flex items-center gap-1.5 mono-label" style={{ color: "#22c55e" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] glow-dot" />
                open source
              </span>
            </div>

            {/* ── Headline ── */}
            <h1 className="font-black leading-none tracking-tight mb-2"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#f0f0f8" }}>
              Do zero ao{" "}
              <span style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                dev júnior
              </span>
            </h1>
            <p className="font-semibold mb-6" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", color: "#505065" }}>
              em 9 meses. <span style={{ color: "#f59e0b" }}>⚡</span>
            </p>

            {/* ── Stats strip ── */}
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { n: "95",   l: "módulos" },
                { n: "5",    l: "fases" },
                { n: "100%", l: "gratuito" },
                { n: "∞",    l: "conteúdo" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="text-2xl font-black" style={{ color: "#f0f0f8", lineHeight: 1 }}>{n}</p>
                  <p className="mono-label mt-1" style={{ color: "#505065" }}>{l}</p>
                </div>
              ))}
            </div>

            {/* ── CTA + status ── */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <HeroCTA />
              <HeroStatus />
            </div>

            {/* ── Widget cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div data-tour="daily-challenge">
                <DailyChallenge />
              </div>
              <div data-tour="next-step">
                <NextStepWidget />
              </div>
            </div>

            {/* ── Tools ── */}
            <div data-tour="quick-actions">
              <div className="flex items-center gap-3 mb-3">
                <span className="mono-label" style={{ color: "#7c3aed" }}>&gt;_</span>
                <span className="mono-label" style={{ color: "#505065" }}>ferramentas</span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
                <ToolBtn label="Flashcards"   icon={Brain}          onClick={() => setShowFlashcards(true)} />
                <ToolBtn label="Pomodoro"     icon={Timer}          onClick={() => setShowPomodoro(true)} />
                <ToolBtn label="Quiz"         icon={HelpCircle}     onClick={() => setShowQuiz(true)} />
                <ToolBtn label="Notas"        icon={PenLine}        onClick={() => setShowNotes(true)} />
                <ToolBtn label="Histórico"    icon={CalendarDays}   onClick={() => setShowActivity(true)} />
                <ToolBtn label="Compartilhar" icon={Share2}         onClick={() => setShowShare(true)} />
                <ToolBtn label="Exportar"     icon={GraduationCap}  onClick={() => setShowExport(true)} />
                <ToolBtn label="Certificado"  icon={Award}          onClick={() => setShowCertificate(true)} />
                <ToolBtn label="Backup"       icon={DatabaseBackup} onClick={() => setShowBackup(true)} />
                <AchievementsBadge onClick={() => setShowAchievements(true)} />
                <ToolBtn label="Atalhos"      icon={Keyboard}       onClick={() => setShowShortcuts(true)} />
                <StudyReminder />
                <OnboardingTour />
                <LocaleToggle />
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════
            CONTEÚDO
        ════════════════════════════════════════ */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10 py-4">

          <Divider label={t("divModules")} />
          <ModuleSection />

          <Divider label={t("divProjects")} />
          <ProjectsSection />

          <div id="progresso">
            <Divider label={t("divProgress")} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div data-tour="streak"><StreakTracker /></div>
              <div className="flex flex-col gap-4">
                <div data-tour="weekly-goal"><WeeklyGoal /></div>
                <PathSelector />
              </div>
            </div>
            <ProgressStats />
            <ProgressCharts />
          </div>

          <Divider label={t("divArch")} />
          <ArchitectureSection />

          <Divider label={t("divMaterials")} />
          <ArticlesSection />
          <ResourceGrid />

          <Divider label={t("divGlossary")} />
          <GlossarySection />

          <Divider label={t("divInterview")} />
          <InterviewSection />

          <Divider label={t("divCareer")} />
          <CareerSection />

          <Divider label={t("divTips")} />
          <TipsSection />

          <footer className="pt-8 mt-8 mb-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="mono-label" style={{ color: "#383850" }}>{t("footer")}</p>
            <p className="mono-label mt-2" style={{ color: "#303045" }}>
              pressione{" "}
              <kbd className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.08)", color: "#7c3aed" }}>?</kbd>
              {" "}para atalhos ·{" "}
              <button
                onClick={() => document.dispatchEvent(new CustomEvent("start-tour"))}
                className="underline transition-colors"
                style={{ color: "#383850" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#7c3aed"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#383850"}
              >
                tour
              </button>
            </p>
          </footer>
        </div>

      </main>
    </div>
  );
}
