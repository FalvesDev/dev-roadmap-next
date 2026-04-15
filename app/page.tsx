"use client";

import { useState } from "react";
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
import { Brain, Share2, PenLine, Timer, DatabaseBackup } from "lucide-react";

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
  const [showFlashcards,   setShowFlashcards]   = useState(false);
  const [showExport,       setShowExport]       = useState(false);
  const [showNotes,        setShowNotes]        = useState(false);
  const [showPomodoro,     setShowPomodoro]     = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showBackup,       setShowBackup]       = useState(false);

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

      <main className="flex-1 lg:ml-52 px-5 md:px-10 py-10 max-w-5xl mx-auto w-full">

        {/* ── HERO ── */}
        <section id="overview" className="border border-[#222230] rounded-2xl p-8 md:p-10 mb-10 bg-[#13131a] animate-fade-in-up" style={{ boxShadow: "0 4px 32px rgba(109,94,245,0.06), 0 1px 0 #2a2a38 inset" }}>
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#909098] mb-4">
                Roadmap 2025 · Python & TypeScript
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-[#ededf4] mb-3 leading-tight tracking-tight">
                Do zero ao dev júnior<br />
                <span className="text-[#7c6af7]">em 9 meses.</span>
              </h1>
              <p className="text-sm text-[#a0a0b0] max-w-md leading-relaxed mb-5">
                Módulos semana a semana, checklist interativo com explicações completas,
                110+ recursos curados e trilha de carreira. Tudo que precisa, na ordem certa.
              </p>

              <HeroCTA />

              {/* Quick actions */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { label: "Revisão rápida",    icon: Brain,         onClick: () => setShowFlashcards(true) },
                  { label: "Pomodoro",           icon: Timer,         onClick: () => setShowPomodoro(true) },
                  { label: "Minhas notas",       icon: PenLine,       onClick: () => setShowNotes(true) },
                  { label: "Exportar imagem",    icon: Share2,        onClick: () => setShowExport(true) },
                  { label: "Backup / Restore",   icon: DatabaseBackup, onClick: () => setShowBackup(true) },
                ].map(({ label, icon: Icon, onClick }) => (
                  <button
                    key={label}
                    onClick={onClick}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                    style={{ background: "#1a1a28", color: "#9090b0", border: "1px solid #252535" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#c0c0d8"; (e.currentTarget as HTMLElement).style.borderColor = "#7c6af740"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#9090b0"; (e.currentTarget as HTMLElement).style.borderColor = "#252535"; }}
                  >
                    <Icon size={12} /> {label}
                  </button>
                ))}
                <AchievementsBadge onClick={() => setShowAchievements(true)} />
              </div>

              <div className="flex flex-wrap gap-2">
                {["Python", "TypeScript", "FastAPI", "React", "Docker", "PostgreSQL"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-[#252535] bg-[#1a1a24] text-[#909098]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-64 flex-shrink-0 space-y-4">
              <SearchTrigger />
              <NextStepWidget />
              <WeeklyGoal />
              <PathSelector />
              <StreakTracker />
            </div>
          </div>
        </section>

        {/* ── MODULES ── */}
        <Divider label="Módulos de aprendizado" />
        <ModuleSection />

        {/* ── PROJECTS ── */}
        <Divider label="Projetos guiados" />
        <ProjectsSection />

        {/* ── PROGRESS ── */}
        <Divider label="Seu progresso" />
        <ProgressStats />
        <ProgressCharts />

        {/* ── ARCHITECTURE ── */}
        <Divider label="Arquitetura, redes & lógica" />
        <ArchitectureSection />

        {/* ── MATERIALS ── */}
        <Divider label="Materiais de estudo" />
        <ArticlesSection />
        <ResourceGrid />

        {/* ── GLOSSARY ── */}
        <Divider label="Glossário técnico" />
        <GlossarySection />

        {/* ── INTERVIEW PREP ── */}
        <Divider label="Prep para entrevista" />
        <InterviewSection />

        {/* ── CAREER ── */}
        <Divider label="Mercado de trabalho" />
        <CareerSection />

        {/* ── TIPS ── */}
        <Divider label="Dicas e referência" />
        <TipsSection />

        {/* Footer */}
        <footer className="border-t border-[#1a1a22] pt-6 mt-8 text-center">
          <p className="text-xs text-[#303038]">
            Dev Roadmap · Python 3.12 · TypeScript 5 · Node 20 · 2025
          </p>
        </footer>
      </main>
    </div>
  );
}
