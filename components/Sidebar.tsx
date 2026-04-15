"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard, BarChart2, BookOpen,
  Newspaper, Link2, TrendingUp, Lightbulb,
  Layers, MessageSquare, FolderGit2, Search,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeProvider";
import { LocaleToggle } from "@/components/I18nProvider";

const navSections = [
  {
    label: "Início",
    items: [
      { href: "#overview",    label: "Visão geral",       icon: LayoutDashboard },
      { href: "#progresso",   label: "Progresso",         icon: BarChart2 },
    ],
  },
  {
    label: "Aprender",
    items: [
      { href: "#checklist",   label: "Módulos",           icon: BookOpen },
      { href: "#projetos",    label: "Projetos",          icon: FolderGit2 },
      { href: "#arquitetura", label: "Arquitetura",       icon: Layers },
    ],
  },
  {
    label: "Materiais",
    items: [
      { href: "#artigos",     label: "Artigos & Vídeos",  icon: Newspaper },
      { href: "#recursos",    label: "Links curados",     icon: Link2 },
      { href: "#glossario",   label: "Glossário",         icon: BookOpen },
    ],
  },
  {
    label: "Carreira",
    items: [
      { href: "#entrevista",  label: "Entrevistas",       icon: MessageSquare },
      { href: "#mercado",     label: "Mercado",           icon: TrendingUp },
      { href: "#dicas",       label: "Dicas",             icon: Lightbulb },
    ],
  },
];

const allItems = navSections.flatMap(s => s.items);

export function Sidebar() {
  const [active, setActive] = useState("overview");

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
      className="fixed top-0 left-0 h-screen w-52 flex flex-col z-50 hidden lg:flex"
      style={{ background: "#0c0c18", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Accent bar */}
      <div className="accent-bar flex-shrink-0" />

      {/* Logo */}
      <div className="px-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2.5 mb-0.5">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
              <path d="M2 8V2l6 3-6 3z" fill="white" />
            </svg>
          </div>
          <span className="text-[13px] font-bold text-[#f0f0f8] tracking-tight">Dev Roadmap</span>
        </div>
        <p className="mono-label pl-[34px] mt-0.5" style={{ color: "#505065" }}>
          python · typescript
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto" data-tour="sidebar-modules">
        {navSections.map(section => (
          <div key={section.label} className="mb-5">
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
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs mb-0.5"
                  style={{
                    background:  isActive ? "rgba(124,58,237,0.12)" : "transparent",
                    color:       isActive ? "#c4b5fd" : "#707088",
                    borderLeft:  isActive ? "2px solid #7c3aed" : "2px solid transparent",
                    transition:  "all 0.15s ease",
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
                  <Icon size={13} strokeWidth={isActive ? 2 : 1.5}
                    color={isActive ? "#a78bfa" : "#505065"} />
                  {item.label}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2 mb-1.5">
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
        <p className="mono-label px-1" style={{ color: "#383850" }}>v3.0 · 2025</p>
      </div>
    </aside>
  );
}
