"use client";

import { useState, useCallback } from "react";
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
  GraduationCap, CalendarDays, Award, HelpCircle, Keyboard, Map,
} from "lucide-react";

/* ── Divider ─────────────────────────────────── */
function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-12 animate-fade-in">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #1e1e26)" }} />
      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#484858] whitespace-nowrap px-2">
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #1e1e26)" }} />
    </div>
  );
}

/* ── ToolBtn: compact icon + label button ─────── */
function ToolBtn({
  label, icon: Icon, onClick, accent,
}: {
  label: string; icon: React.ElementType; onClick: () => void; accent?: string;
}) {
  const base = accent ?? "#7c6af7";
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl text-center transition-all duration-150 flex-shrink-0"
      style={{ background: "#16161e", color: "#9090b0", border: "1px solid #1e1e2a", minWidth: "60px" }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = `${base}12`;
        el.style.borderColor = `${base}40`;
        el.style.color = base;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "#16161e";
        el.style.borderColor = "#1e1e2a";
        el.style.color = "#9090b0";
      }}
    >
      <Icon size={15} />
      <span className="text-[9px] font-semibold tracking-wide whitespace-nowrap">{label}</span>
    </button>
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

  const openSearch = useCallback(() => {
    document.dispatchEvent(new CustomEvent("open-search"));
  }, []);

  useKeyboardShortcuts({
    onSearch:     openSearch,
    onPomodoro:   () => setShowPomodoro(v => !v),
    onFlashcards: () => setShowFlashcards(v => !v),
    onNotes:      () => setShowNotes(v => !v),
    onQuiz:       () => setShowQuiz(v => !v),
    onShortcuts:  () => setShowShortcuts(v => !v),
    onClose:      closeAll,
  });

  return (
    <div className="flex min-h-screen bg-[#0d0d12]">
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

      <main
        id="main-content"
        className="flex-1 lg:ml-52 w-full pb-16 lg:pb-0"
      >

        {/* ══════════════════════════════════════════
            HERO — dashboard de progresso
        ══════════════════════════════════════════ */}
        <section
          id="overview"
          className="relative animate-fade-in-up"
          style={{ background: "#0f0f16", borderBottom: "1px solid #1a1a22" }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.05]"
              style={{ background: "radial-gradient(circle, #7c6af7, transparent)" }}
            />
          </div>

          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 md:px-10">

            {/* ── Title band ── */}
            <div className="pt-8 pb-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#505060]">
                    {t("heroTag")}
                  </span>
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: "#34d39910", color: "#34d399", border: "1px solid #34d39925" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] glow-dot" />
                    Open Source
                  </span>
                </div>
                <h1 className="text-2xl sm:text-[1.7rem] font-extrabold text-[#ededf4] leading-tight tracking-tight">
                  {t("heroTitle1")}{" "}
                  <span style={{
                    background: "linear-gradient(135deg, #7c6af7 0%, #a78bfa 60%, #7c6af7 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer 4s linear infinite",
                  }}>
                    {t("heroTitle2")}
                  </span>
                </h1>
                <p className="text-[13px] text-[#606070] mt-1.5 max-w-md leading-relaxed">
                  {t("heroDesc")}
                </p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2">
                <HeroCTA />
              </div>
            </div>

            {/* ── Widget grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">

              {/* Col 1: Daily challenge */}
              <div data-tour="daily-challenge">
                <DailyChallenge />
              </div>

              {/* Col 2: Next step + weekly goal */}
              <div className="flex flex-col gap-4">
                <div data-tour="next-step"><NextStepWidget /></div>
                <div data-tour="weekly-goal"><WeeklyGoal /></div>
              </div>

              {/* Col 3: Streak + path selector */}
              <div className="flex flex-col gap-4">
                <div data-tour="streak"><StreakTracker /></div>
                <PathSelector />
              </div>
            </div>

            {/* ── Tools strip ── */}
            <div className="pb-6" data-tour="quick-actions">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#404050]">
                  Ferramentas
                </span>
                <div className="flex-1 h-px" style={{ background: "#1a1a22" }} />
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
                <ToolBtn label="Flashcards" icon={Brain}         onClick={() => setShowFlashcards(true)} />
                <ToolBtn label="Pomodoro"   icon={Timer}         onClick={() => setShowPomodoro(true)} />
                <ToolBtn label="Quiz"       icon={HelpCircle}    onClick={() => setShowQuiz(true)} />
                <ToolBtn label="Notas"      icon={PenLine}       onClick={() => setShowNotes(true)} />
                <ToolBtn label="Histórico"  icon={CalendarDays}  onClick={() => setShowActivity(true)} />
                <ToolBtn label="Compartilhar" icon={Share2}      onClick={() => setShowShare(true)} />
                <ToolBtn label="Exportar"   icon={GraduationCap} onClick={() => setShowExport(true)} />
                <ToolBtn label="Certificado" icon={Award}        onClick={() => setShowCertificate(true)} />
                <ToolBtn label="Backup"     icon={DatabaseBackup} onClick={() => setShowBackup(true)} />
                <AchievementsBadge onClick={() => setShowAchievements(true)} />
                <ToolBtn label="Atalhos"    icon={Keyboard}      onClick={() => setShowShortcuts(true)} />
                <StudyReminder />
                <OnboardingTour />
                <LocaleToggle />
              </div>
            </div>

          </div>
        </section>

        {/* ── CONTENT SECTIONS ── */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10 py-4">

          <Divider label={t("divModules")} />
          <ModuleSection />

          <Divider label={t("divProjects")} />
          <ProjectsSection />

          <div id="progresso">
            <Divider label={t("divProgress")} />
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

          <footer className="border-t border-[#1a1a22] pt-6 mt-8 mb-4 text-center" role="contentinfo">
            <p className="text-xs text-[#303038]">{t("footer")}</p>
            <p className="text-[10px] text-[#252530] mt-1">
              <kbd className="text-[10px] px-1 py-0.5 rounded" style={{ background: "#1e1e2a", border: "1px solid #303040" }}>?</kbd>{" "}
              atalhos ·{" "}
              <button
                onClick={() => document.dispatchEvent(new CustomEvent("start-tour"))}
                className="underline hover:text-[#606070] transition-colors"
              >
                <Map size={10} className="inline mr-0.5" />Tour
              </button>
            </p>
          </footer>
        </div>

      </main>
    </div>
  );
}
