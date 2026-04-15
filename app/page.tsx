"use client";

import { useState, useCallback } from "react";
import { Sidebar } from "@/components/Sidebar";
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
import { SearchTrigger } from "@/components/SearchTrigger";
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
} from "lucide-react";

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

      <main id="main-content" className="flex-1 lg:ml-52 px-5 md:px-10 py-10 max-w-5xl mx-auto w-full">

        {/* ── HERO ── */}
        <section id="overview" className="relative border border-[#222230] rounded-2xl overflow-hidden mb-10 animate-fade-in-up"
          style={{ boxShadow: "0 4px 40px rgba(109,94,245,0.10)" }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.06]"
              style={{ background: "radial-gradient(circle, #7c6af7, transparent)" }} />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-[0.04]"
              style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />
          </div>

          <div className="relative p-8 md:p-10 bg-[#13131a]">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#909098]">
                    {t("heroTag")}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: "#34d39915", color: "#34d399", border: "1px solid #34d39930" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] glow-dot" />
                    Grátis & Open Source
                  </span>
                </div>

                <h1 className="text-2xl md:text-[2rem] font-extrabold text-[#ededf4] mb-3 leading-tight tracking-tight">
                  {t("heroTitle1")}<br />
                  <span style={{
                    background: "linear-gradient(135deg, #7c6af7 0%, #a78bfa 50%, #7c6af7 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer 4s linear infinite",
                  }}>
                    {t("heroTitle2")}
                  </span>
                </h1>

                <p className="text-sm text-[#a0a0b0] max-w-md leading-relaxed mb-5">
                  {t("heroDesc")}
                </p>

                <HeroCTA />

                {/* Quick actions row 1 */}
                <div className="flex flex-wrap gap-2 mb-2" data-tour="quick-actions">
                  {[
                    { label: t("actionFlashcard"), icon: Brain,        onClick: () => setShowFlashcards(true) },
                    { label: t("actionPomodoro"),  icon: Timer,        onClick: () => setShowPomodoro(true) },
                    { label: t("actionQuiz"),      icon: HelpCircle,   onClick: () => setShowQuiz(true) },
                    { label: t("actionNotes"),     icon: PenLine,      onClick: () => setShowNotes(true) },
                    { label: t("actionActivity"),  icon: CalendarDays, onClick: () => setShowActivity(true) },
                  ].map(({ label, icon: Icon, onClick }) => (
                    <ActionBtn key={label} label={label} icon={Icon} onClick={onClick} />
                  ))}
                </div>

                {/* Quick actions row 2 */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { label: t("actionShare"),  icon: Share2,         onClick: () => setShowShare(true) },
                    { label: t("actionExport"), icon: GraduationCap,  onClick: () => setShowExport(true) },
                    { label: t("actionCert"),   icon: Award,          onClick: () => setShowCertificate(true) },
                    { label: t("actionBackup"), icon: DatabaseBackup, onClick: () => setShowBackup(true) },
                  ].map(({ label, icon: Icon, onClick }) => (
                    <ActionBtn key={label} label={label} icon={Icon} onClick={onClick} />
                  ))}
                  <AchievementsBadge onClick={() => setShowAchievements(true)} />
                  <ActionBtn label="Atalhos" icon={Keyboard} onClick={() => setShowShortcuts(true)} />
                  <StudyReminder />
                  <OnboardingTour />
                  <LocaleToggle />
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Python", "TypeScript", "FastAPI", "React", "Docker", "PostgreSQL"].map((tag) => (
                    <span key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-[#252535] bg-[#1a1a24] text-[#909098]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="md:w-64 flex-shrink-0 space-y-3">
                <SearchTrigger />
                <div data-tour="daily-challenge"><DailyChallenge /></div>
                <div data-tour="next-step"><NextStepWidget /></div>
                <div data-tour="weekly-goal"><WeeklyGoal /></div>
                <PathSelector />
                <div data-tour="streak"><StreakTracker /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MODULES ── */}
        <Divider label={t("divModules")} />
        <ModuleSection />

        {/* ── PROJECTS ── */}
        <Divider label={t("divProjects")} />
        <ProjectsSection />

        {/* ── PROGRESS ── */}
        <Divider label={t("divProgress")} />
        <ProgressStats />
        <ProgressCharts />

        {/* ── ARCHITECTURE ── */}
        <Divider label={t("divArch")} />
        <ArchitectureSection />

        {/* ── MATERIALS ── */}
        <Divider label={t("divMaterials")} />
        <ArticlesSection />
        <ResourceGrid />

        {/* ── GLOSSARY ── */}
        <Divider label={t("divGlossary")} />
        <GlossarySection />

        {/* ── INTERVIEW PREP ── */}
        <Divider label={t("divInterview")} />
        <InterviewSection />

        {/* ── CAREER ── */}
        <Divider label={t("divCareer")} />
        <CareerSection />

        {/* ── TIPS ── */}
        <Divider label={t("divTips")} />
        <TipsSection />

        <footer className="border-t border-[#1a1a22] pt-6 mt-8 text-center" role="contentinfo">
          <p className="text-xs text-[#303038]">{t("footer")}</p>
          <p className="text-[10px] text-[#252530] mt-1">
            Pressione <kbd className="text-[10px] px-1 py-0.5 rounded" style={{ background: "#1e1e2a", border: "1px solid #303040" }}>?</kbd> para atalhos ·{" "}
            <button onClick={() => document.dispatchEvent(new CustomEvent("start-tour"))}
              className="underline hover:text-[#404050] transition-colors">Tour</button>
          </p>
        </footer>
      </main>
    </div>
  );
}

function ActionBtn({ label, icon: Icon, onClick }: { label: string; icon: React.ElementType; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
      style={{ background: "#1a1a28", color: "#9090b0", border: "1px solid #252535" }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "#c0c0d8"; el.style.borderColor = "#7c6af740"; el.style.background = "#1e1a30";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "#9090b0"; el.style.borderColor = "#252535"; el.style.background = "#1a1a28";
      }}
    >
      <Icon size={12} /> {label}
    </button>
  );
}
