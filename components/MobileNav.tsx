"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard, BarChart2, BookOpen,
  Newspaper, Link2, TrendingUp, Lightbulb,
  Layers, Menu, X, MessageSquare, FolderGit2, Search,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeProvider";

const navSections = [
  {
    label: "Início",
    items: [
      { href: "#overview",    label: "Visão geral",         icon: LayoutDashboard },
      { href: "#progresso",   label: "Progresso",           icon: BarChart2 },
    ],
  },
  {
    label: "Aprender",
    items: [
      { href: "#checklist",   label: "Módulos",             icon: BookOpen },
      { href: "#projetos",    label: "Projetos guiados",    icon: FolderGit2 },
      { href: "#arquitetura", label: "Arquitetura & Redes", icon: Layers },
    ],
  },
  {
    label: "Materiais",
    items: [
      { href: "#artigos",     label: "Artigos & Vídeos",    icon: Newspaper },
      { href: "#recursos",    label: "Links curados",       icon: Link2 },
    ],
  },
  {
    label: "Carreira",
    items: [
      { href: "#entrevista",  label: "Prep entrevista",     icon: MessageSquare },
      { href: "#mercado",     label: "Mercado de trabalho", icon: TrendingUp },
      { href: "#dicas",       label: "Dicas & Referência",  icon: Lightbulb },
    ],
  },
];

function openSearch() {
  document.dispatchEvent(new CustomEvent("open-search"));
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [open]);

  const handleLink = () => setOpen(false);

  return (
    <>
      {/* Sticky top bar — visible only below lg */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ background: "#14141c", borderBottom: "1px solid #26263a" }}
      >
        {/* Logo */}
        <a href="#overview" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#6d5ef5] flex items-center justify-center flex-shrink-0">
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
              <path d="M2 8V2l6 3-6 3z" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#eeeef6] tracking-tight">Dev Roadmap</span>
        </a>

        <div className="flex items-center gap-1">
          {/* Search button */}
          <button
            onClick={openSearch}
            aria-label="Buscar"
            className="p-2 rounded-md transition-colors"
            style={{ color: "#9090b0" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#c0c0d8"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#9090b0"}
          >
            <Search size={17} />
          </button>
          <ThemeToggle compact />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="p-2 rounded-md transition-colors"
            style={{ color: "#9090b0" }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Dropdown menu */}
      {open && (
        <div
          className="lg:hidden fixed top-14 left-0 right-0 z-40 overflow-y-auto animate-fade-in"
          style={{
            background: "#14141c",
            borderBottom: "1px solid #26263a",
            maxHeight: "calc(100vh - 56px)",
          }}
        >
          {/* Inline search bar */}
          <div className="px-4 pt-4 pb-2">
            <button
              onClick={() => { handleLink(); openSearch(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors"
              style={{ background: "#111118", border: "1px solid #1e1e2a", color: "#606070" }}
            >
              <Search size={14} />
              <span className="flex-1 text-left text-sm">Buscar tópico...</span>
              <kbd className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "#1a1a24", border: "1px solid #252535", color: "#3a3a4a" }}>
                ⌃K
              </kbd>
            </button>
          </div>

          <nav className="px-4 py-2 pb-4">
            {navSections.map((section) => (
              <div key={section.label} className="mb-4">
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.18em] px-1 mb-2"
                  style={{ color: "#909098" }}
                >
                  {section.label}
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={handleLink}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background: "#1a1a26",
                          color: "#c0c0d8",
                          border: "1px solid #26263a",
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "#1e1e30";
                          el.style.borderColor = "#7c6af740";
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "#1a1a26";
                          el.style.borderColor = "#26263a";
                        }}
                      >
                        <Icon size={13} strokeWidth={1.5} color="#7c6af7" />
                        <span className="truncate">{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="px-4 pb-4">
            <p className="text-[9px] text-center" style={{ color: "#484860" }}>
              v3.0 · 2025 · Python · TypeScript
            </p>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="lg:hidden h-14" />
    </>
  );
}
