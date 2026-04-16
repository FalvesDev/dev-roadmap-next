"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, BarChart2, BookOpen,
  Newspaper, Link2, TrendingUp, Lightbulb,
  Layers, MessageSquare, FolderGit2, Search,
  ChevronLeft, ChevronRight, Sun, Moon,
} from "lucide-react";
import { LocaleToggle } from "@/components/I18nProvider";
import { useLayout } from "@/components/LayoutContext";
import { useSiteTheme, getThemeFamily } from "@/components/SiteThemeContext";
import {
  type ThemeFamily,
  toThemeId, familyAccentColor,
} from "@/lib/themes";

const navSections = [
  {
    label: "Início",
    items: [
      { href: "#overview",    label: "Visão geral",      icon: LayoutDashboard },
      { href: "#progresso",   label: "Progresso",        icon: BarChart2 },
    ],
  },
  {
    label: "Aprender",
    items: [
      { href: "#checklist",   label: "Módulos",          icon: BookOpen },
      { href: "#projetos",    label: "Projetos",         icon: FolderGit2 },
      { href: "#arquitetura", label: "Arquitetura",      icon: Layers },
    ],
  },
  {
    label: "Materiais",
    items: [
      { href: "#artigos",     label: "Artigos & Vídeos", icon: Newspaper },
      { href: "#recursos",    label: "Links curados",    icon: Link2 },
      { href: "#glossario",   label: "Glossário",        icon: BookOpen },
    ],
  },
  {
    label: "Carreira",
    items: [
      { href: "#entrevista",  label: "Entrevistas",      icon: MessageSquare },
      { href: "#mercado",     label: "Mercado",          icon: TrendingUp },
      { href: "#dicas",       label: "Dicas",            icon: Lightbulb },
    ],
  },
];

const allItems = navSections.flatMap(s => s.items);

const PANEL_W = 256;

const FAMILIES: { id: ThemeFamily; label: string }[] = [
  { id: "default", label: "Padrão" },
  { id: "retro",   label: "Retro"  },
  { id: "vista",   label: "Vista"  },
];

function ThemeSwitcher() {
  const { themeId, theme, setTheme } = useSiteTheme();
  const currentFamily = getThemeFamily(themeId);

  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("roadmap_light_mode") === "1";
    setIsLight(stored);
    document.documentElement.classList.toggle("light-mode", stored);
  }, []);

  const toggleLight = useCallback(() => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light-mode", next);
    localStorage.setItem("roadmap_light_mode", next ? "1" : "0");
  }, [isLight]);

  return (
    <div
      className="flex-shrink-0"
      style={{ borderTop: `1px solid ${theme.border}`, padding: "10px 8px 8px" }}
    >
      <p className="mono-label px-2 mb-2" style={{ color: theme.textDim }}>Aparência</p>

      {/* Family row */}
      <div className="flex gap-1 mb-2">
        {FAMILIES.map(({ id, label }) => {
          const isActive = currentFamily === id;
          const dot      = familyAccentColor[id];
          return (
            <button
              key={id}
              onClick={() => setTheme(toThemeId(id, true))}
              title={label}
              className="flex-1 flex flex-col items-center gap-1.5 py-2 rounded-lg transition-all duration-150"
              style={{
                background: isActive ? theme.accentDim    : "transparent",
                border:     `1px solid ${isActive ? theme.accentBorder : theme.border}`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  background: dot,
                  boxShadow: isActive ? `0 0 6px ${dot}80` : "none",
                }}
              />
              <span
                className="mono-label"
                style={{ color: isActive ? theme.accentLight : theme.textDim, letterSpacing: "0.08em" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Light / Dark toggle */}
      <div
        className="flex rounded-lg overflow-hidden"
        style={{ border: `1px solid ${theme.border}` }}
      >
        <button
          onClick={toggleLight}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 transition-colors duration-150"
          style={{
            background: isLight ? theme.accentDim : "transparent",
            color:      isLight ? theme.accentLight : theme.textDim,
            fontSize: "10px", fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em",
          }}
        >
          <Sun size={10} /> Claro
        </button>
        <div style={{ width: "1px", background: theme.border }} />
        <button
          onClick={toggleLight}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 transition-colors duration-150"
          style={{
            background: !isLight ? theme.accentDim : "transparent",
            color:      !isLight ? theme.accentLight : theme.textDim,
            fontSize: "10px", fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em",
          }}
        >
          <Moon size={10} /> Escuro
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [active, setActive] = useState("overview");
  const { leftOpen, toggleLeft } = useLayout();
  const { theme } = useSiteTheme();

  useEffect(() => {
    const handler = () => {
      let current = allItems[0].href.slice(1);
      for (const item of allItems) {
        const el = document.getElementById(item.href.slice(1));
        if (el && window.scrollY >= el.offsetTop - 120) current = item.href.slice(1);
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* ── Panel itself ── */}
      <aside
        className="fixed top-0 left-0 h-screen z-50 hidden lg:flex flex-col overflow-hidden"
        style={{
          width: leftOpen ? `${PANEL_W}px` : "0px",
          background: theme.bgPanel,
          borderRight: `1px solid ${theme.border}`,
          transition: "width 280ms cubic-bezier(0.4,0,0.2,1), background 400ms ease, border-color 400ms ease",
        }}
      >
        {/* Inner container — fixed width so content doesn't squish during animation */}
        <div
          className="flex flex-col h-full overflow-y-auto overflow-x-hidden"
          style={{ width: `${PANEL_W}px` }}
        >
          {/* Accent bar */}
          <div className="accent-bar flex-shrink-0" />

          {/* Logo */}
          <div
            className="flex items-center gap-3 flex-shrink-0"
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              minHeight: "56px",
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
            >
              <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                <path d="M2 8V2l6 3-6 3z" fill="white" />
              </svg>
            </div>
            <div className="overflow-hidden" style={{ whiteSpace: "nowrap" }}>
              <span className="text-[13px] font-bold text-[#f0f0f8] tracking-tight block">Dev Roadmap</span>
              <p className="mono-label" style={{ color: "#505065" }}>python · typescript</p>
            </div>
            {/* Close button */}
            <button
              onClick={toggleLeft}
              className="ml-auto p-1 rounded-md transition-colors flex-shrink-0"
              style={{ color: "#505065" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a0a0c0"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#505065"}
              title="Colapsar sidebar"
            >
              <ChevronLeft size={13} />
            </button>
          </div>

          {/* Nav */}
          <nav
            className="flex-1 py-4 overflow-y-auto overflow-x-hidden"
            style={{ padding: "16px 8px" }}
            data-tour="sidebar-modules"
          >
            {navSections.map(section => (
              <div key={section.label} className="mb-4">
                <p className="mono-label px-2 mb-1.5" style={{ color: "#505065" }}>
                  {section.label}
                </p>
                {section.items.map(item => {
                  const isActive = active === item.href.slice(1);
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2.5 rounded-md text-xs mb-0.5 transition-all duration-150"
                      style={{
                        padding: "6px 10px",
                        background:  isActive ? "rgba(124,58,237,0.12)" : "transparent",
                        color:       isActive ? "#c4b5fd" : "#707088",
                        borderLeft:  isActive ? "2px solid #7c3aed" : "2px solid transparent",
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          const el = e.currentTarget as HTMLElement;
                          el.style.color = "#c0c0e0";
                          el.style.background = "rgba(255,255,255,0.04)";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          const el = e.currentTarget as HTMLElement;
                          el.style.color = "#707088";
                          el.style.background = "transparent";
                        }
                      }}
                    >
                      <Icon size={13} strokeWidth={isActive ? 2 : 1.5} color={isActive ? "#a78bfa" : "#505065"} />
                      <span className="truncate">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* ── Theme switcher ── */}
          <ThemeSwitcher />

          {/* Footer */}
          <div
            className="flex-shrink-0"
            style={{ borderTop: `1px solid ${theme.border}`, padding: "8px 8px" }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <LocaleToggle />
              <button
                onClick={() => document.dispatchEvent(new CustomEvent("open-search"))}
                aria-label="Buscar (Ctrl K)"
                title="Buscar (Ctrl K)"
                className="p-1.5 rounded-md transition-colors"
                style={{ color: theme.textDim }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = theme.textMuted}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = theme.textDim}
              >
                <Search size={13} />
              </button>
            </div>
            <p className="mono-label px-1" style={{ color: theme.textDim }}>v3.0 · 2026</p>
          </div>
        </div>
      </aside>

      {/* ── Tab button when panel is closed (desktop only) ── */}
      {!leftOpen && (
        <button
          onClick={toggleLeft}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center transition-all duration-150"
          style={{
            width: "20px",
            height: "56px",
            background: theme.bgPanel,
            border: `1px solid ${theme.border}`,
            borderLeft: "none",
            borderRadius: "0 6px 6px 0",
            color: theme.textDim,
          }}
          title="Abrir sidebar"
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
          <ChevronRight size={11} />
        </button>
      )}
    </>
  );
}
