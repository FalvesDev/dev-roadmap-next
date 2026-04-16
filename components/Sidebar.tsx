"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard, BarChart2, BookOpen,
  Newspaper, Link2, TrendingUp, Lightbulb,
  Layers, MessageSquare, FolderGit2, Search,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeProvider";
import { LocaleToggle } from "@/components/I18nProvider";
import { useLayout } from "@/components/LayoutContext";

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

export function Sidebar() {
  const [active, setActive] = useState("overview");
  const { leftOpen, toggleLeft } = useLayout();

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
    <aside
      className="fixed top-0 left-0 h-screen z-50 hidden lg:flex flex-col overflow-hidden"
      style={{
        width: leftOpen ? "208px" : "56px",
        background: "#0c0c18",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        transition: "width 280ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Accent bar */}
      <div className="accent-bar flex-shrink-0" />

      {/* Logo */}
      <div
        className="flex items-center gap-2.5 flex-shrink-0"
        style={{
          padding: leftOpen ? "14px 16px" : "14px 15px",
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
        <div
          className="overflow-hidden"
          style={{
            opacity: leftOpen ? 1 : 0,
            width: leftOpen ? "auto" : 0,
            transition: "opacity 200ms ease, width 280ms cubic-bezier(0.4,0,0.2,1)",
            whiteSpace: "nowrap",
          }}
        >
          <span className="text-[13px] font-bold text-[#f0f0f8] tracking-tight block">Dev Roadmap</span>
          <p className="mono-label" style={{ color: "#505065" }}>python · typescript</p>
        </div>
      </div>

      {/* Nav */}
      <nav
        className="flex-1 py-4 overflow-y-auto overflow-x-hidden"
        style={{ padding: leftOpen ? "16px 8px" : "16px 6px" }}
        data-tour="sidebar-modules"
      >
        {navSections.map(section => (
          <div key={section.label} className="mb-4">
            {leftOpen && (
              <p className="mono-label px-2 mb-1.5" style={{ color: "#505065" }}>
                {section.label}
              </p>
            )}
            {section.items.map(item => {
              const isActive = active === item.href.slice(1);
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  title={!leftOpen ? item.label : undefined}
                  className="flex items-center rounded-md text-xs mb-0.5 transition-all duration-150"
                  style={{
                    gap: leftOpen ? "10px" : 0,
                    padding: leftOpen ? "6px 10px" : "8px",
                    justifyContent: leftOpen ? "flex-start" : "center",
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
                  {leftOpen && <span className="truncate">{item.label}</span>}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "10px 8px" }}
      >
        {leftOpen && (
          <div className="flex items-center gap-2 mb-2">
            <ThemeToggle />
            <LocaleToggle />
            <button
              onClick={() => document.dispatchEvent(new CustomEvent("open-search"))}
              aria-label="Buscar (Ctrl K)"
              title="Buscar (Ctrl K)"
              className="p-1.5 rounded-md transition-colors"
              style={{ color: "#505065" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#9090b0"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#505065"}
            >
              <Search size={13} />
            </button>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={toggleLeft}
          className="flex items-center justify-center rounded-md transition-all duration-150"
          style={{
            width: "100%",
            padding: "6px",
            color: "#505065",
            background: "transparent",
          }}
          title={leftOpen ? "Colapsar sidebar" : "Expandir sidebar"}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
            (e.currentTarget as HTMLElement).style.color = "#a78bfa";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#505065";
          }}
        >
          {leftOpen
            ? <ChevronLeft  size={14} />
            : <ChevronRight size={14} />
          }
        </button>

        {leftOpen && (
          <p className="mono-label px-1 mt-1" style={{ color: "#383850" }}>v3.0 · 2025</p>
        )}
      </div>
    </aside>
  );
}
