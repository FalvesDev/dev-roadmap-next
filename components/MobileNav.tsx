"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard, BarChart2, BookOpen,
  Newspaper, Link2, TrendingUp, Lightbulb,
  Layers, Menu, X, MessageSquare, FolderGit2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeProvider";

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
      { href: "#projetos",    label: "Projetos guiados",  icon: FolderGit2 },
      { href: "#arquitetura", label: "Arquitetura & Redes", icon: Layers },
    ],
  },
  {
    label: "Materiais",
    items: [
      { href: "#artigos",     label: "Artigos & Vídeos",  icon: Newspaper },
      { href: "#recursos",    label: "Links curados",     icon: Link2 },
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

export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Close on scroll (user tapped a link)
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [open]);

  // Close on anchor click
  const handleLink = () => setOpen(false);

  return (
    <>
      {/* Sticky top bar — visible only below lg */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-12"
        style={{ background: "#14141c", borderBottom: "1px solid #26263a" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#6d5ef5] flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8V2l6 3-6 3z" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#eeeef6] tracking-tight">Dev Roadmap</span>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle compact />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="p-1.5 rounded-md"
            style={{ color: "#9090b0" }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Dropdown menu */}
      {open && (
        <div
          className="lg:hidden fixed top-12 left-0 right-0 z-40 overflow-y-auto animate-fade-in"
          style={{
            background: "#14141c",
            borderBottom: "1px solid #26263a",
            maxHeight: "calc(100vh - 48px)",
          }}
        >
          <nav className="px-4 py-4">
            {navSections.map((section) => (
              <div key={section.label} className="mb-4">
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.18em] px-1 mb-1.5"
                  style={{ color: "#909098" }}
                >
                  {section.label}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={handleLink}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-xs"
                        style={{
                          background: "#1a1a26",
                          color: "#c0c0d8",
                          border: "1px solid #26263a",
                        }}
                      >
                        <Icon size={13} strokeWidth={1.5} color="#7c6af7" />
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="px-4 pb-4">
            <p className="text-[9px] text-center" style={{ color: "#484860" }}>
              v2.0 · 2025 · Python · TypeScript
            </p>
          </div>
        </div>
      )}

      {/* Spacer so content isn't hidden behind the fixed bar */}
      <div className="lg:hidden h-12" />
    </>
  );
}
