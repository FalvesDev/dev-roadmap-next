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
import { NotesDashboard } from "@/components/NotesDashboard";
import { TabTitle } from "@/components/TabTitle";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { GlossarySection } from "@/components/GlossarySection";
import { WeeklyGoal } from "@/components/WeeklyGoal";
import { AchievementsPanel } from "@/components/AchievementsPanel";
import { BackupRestore } from "@/components/BackupRestore";
import { QuizModal } from "@/components/QuizModal";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { ShareProfile } from "@/components/ShareProfile";
import { Certificate } from "@/components/Certificate";
import { KeyboardShortcuts, useKeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { useI18n } from "@/components/I18nProvider";
import { RightPanel } from "@/components/RightPanel";
import { RetroOverlay } from "@/components/RetroOverlay";
import { VistaOverlay } from "@/components/VistaOverlay";
import { useLayout } from "@/components/LayoutContext";
import { useSiteTheme } from "@/components/SiteThemeContext";
import { Flame, Target } from "lucide-react";

/* ── Section divider — gradient fade style ─── */
function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-12">
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#7c3aed", boxShadow: "0 0 6px #7c3aed80" }} />
        <span className="section-eyebrow">{label}</span>
      </div>
      <div className="flex-1 divider-line" />
    </div>
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
  const { leftOpen, rightOpen } = useLayout();
  const { theme } = useSiteTheme();

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

  /* Dynamic main margins based on sidebar states (desktop only) */
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const mainStyle = isDesktop ? {
    marginLeft:  leftOpen  ? "256px" : "0px",
    marginRight: rightOpen ? "256px" : "0px",
    transition:  "margin 280ms cubic-bezier(0.4,0,0.2,1)",
  } : {};

  return (
    <div className="flex min-h-screen" style={{ background: theme.bg, transition: "background 400ms ease" }}>
      <Sidebar />
      <MobileNav />
      <BottomNav />
      <StickyProgress />
      <GlobalSearch />
      <RightPanel
        onFlashcards  ={() => setShowFlashcards(true)}
        onPomodoro    ={() => setShowPomodoro(true)}
        onQuiz        ={() => setShowQuiz(true)}
        onNotes       ={() => setShowNotes(true)}
        onActivity    ={() => setShowActivity(true)}
        onShare       ={() => setShowShare(true)}
        onExport      ={() => setShowExport(true)}
        onCertificate ={() => setShowCertificate(true)}
        onBackup      ={() => setShowBackup(true)}
        onAchievements={() => setShowAchievements(true)}
        onShortcuts   ={() => setShowShortcuts(true)}
      />

      <RetroOverlay />
      <VistaOverlay />
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

      <main id="main-content" className="flex-1 w-full pb-16 lg:pb-0" style={mainStyle}>

        {/* ═══ HERO ═══════════════════════════════════════ */}
        <section id="overview" className="relative overflow-hidden" style={{ background: theme.bg }}>
          <div className="accent-bar" />
          <div className="grid-lines absolute inset-0 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `
              radial-gradient(ellipse 70% 60% at 15% 40%, rgba(124,58,237,0.11) 0%, transparent 65%),
              radial-gradient(ellipse 50% 40% at 85% 65%, rgba(245,158,11,0.05) 0%, transparent 60%),
              radial-gradient(ellipse 35% 55% at 65% 10%, rgba(59,130,246,0.06) 0%, transparent 60%)
            `
          }} />

          <div className="relative max-w-4xl mx-auto px-5 sm:px-8 md:px-10 py-14 md:py-20">

            {/* Terminal breadcrumb */}
            <div className="flex items-center gap-3 mb-10">
              <span className="mono-label" style={{ color: "#f59e0b" }}>$ dev-roadmap --year 2026</span>
              <div className="flex-1 divider-line" />
              <span className="flex items-center gap-1.5 mono-label" style={{ color: "#22c55e" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] glow-dot" />
                open source
              </span>
            </div>

            {/* Headline */}
            <div className="mb-8">
              <p
                className="mono-label mb-4"
                style={{ color: theme.textDim, letterSpacing: "0.2em" }}
              >
                trilha de aprendizado · 2026
              </p>
              <h1 className="font-black tracking-tight" style={{ lineHeight: 1 }}>
                <span
                  className="block"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.3rem)",
                    fontWeight: 300,
                    color: theme.textDim,
                    letterSpacing: "0.04em",
                    marginBottom: "0.15em",
                  }}
                >
                  do zero ao
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: "clamp(3.2rem, 7vw, 5rem)",
                    backgroundImage: `linear-gradient(130deg, ${theme.accent} 0%, ${theme.accentLight} 50%, ${theme.accentHover} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                    paddingBottom: "0.18em",
                    marginBottom: "-0.18em",
                  }}
                >
                  dev júnior
                </span>
              </h1>
              <p className="mt-5" style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: theme.textMuted, fontWeight: 400 }}>
                em 9 meses — do básico ao deploy{" "}
                <span style={{ color: theme.warning }}>⚡</span>
              </p>
            </div>

            {/* Stats glass cards */}
            <div className="flex flex-wrap gap-3 mb-9">
              {[
                { n: "95",   l: "módulos",  color: "#7c3aed" },
                { n: "5",    l: "fases",    color: "#3b82f6" },
                { n: "100%", l: "gratuito", color: "#10b981" },
                { n: "∞",    l: "conteúdo", color: "#f59e0b" },
              ].map(({ n, l, color }) => (
                <div key={l} className="stat-card rounded-xl px-4 py-3" style={{ minWidth: "84px" }}>
                  <p className="text-[1.6rem] font-black leading-none tabular-nums" style={{ color }}>{n}</p>
                  <p className="mono-label mt-1.5" style={{ color: "#404060" }}>{l}</p>
                </div>
              ))}
            </div>

            {/* CTA + status */}
            <div className="flex flex-wrap items-center gap-4">
              <HeroCTA />
              <HeroStatus />
            </div>

          </div>
        </section>

        {/* ═══ CONTEÚDO ══════════════════════════════════ */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-10 py-4">

          <Divider label={t("divModules")} />
          <ModuleSection />

          <Divider label={t("divProjects")} />
          <ProjectsSection />

          <div id="progresso">
            <Divider label={t("divProgress")} />
            <ProgressStats />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div data-tour="streak"><StreakTracker /></div>
              <div data-tour="weekly-goal"><WeeklyGoal /></div>
              <PathSelector />
            </div>
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
