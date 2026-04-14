"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard, BarChart2, BookOpen,
  Newspaper, Link2, TrendingUp, Lightbulb,
  Layers, Zap,
} from "lucide-react";

const navSections = [
  {
    label: "Início",
    items: [
      { href: "#overview",     label: "Visão geral",    icon: LayoutDashboard },
      { href: "#progresso",    label: "Progresso",      icon: BarChart2 },
    ],
  },
  {
    label: "Aprender",
    items: [
      { href: "#checklist",    label: "Módulos",            icon: BookOpen },
      { href: "#arquitetura",  label: "Arquitetura & Redes", icon: Layers },
    ],
  },
  {
    label: "Materiais",
    items: [
      { href: "#artigos",      label: "Artigos & Vídeos", icon: Newspaper },
      { href: "#recursos",     label: "Links curados",    icon: Link2 },
    ],
  },
  {
    label: "Carreira",
    items: [
      { href: "#mercado",      label: "Mercado de trabalho", icon: TrendingUp },
      { href: "#dicas",        label: "Dicas & Referência",  icon: Lightbulb },
    ],
  },
];

const allItems = navSections.flatMap((s) => s.items);

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
    <aside className="fixed top-0 left-0 h-screen w-52 flex flex-col z-50 hidden lg:flex"
      style={{ background: "#14141c", borderRight: "1px solid #26263a" }}
    >
      {/* Logo */}
      <div className="px-4 py-5" style={{ borderBottom: "1px solid #26263a" }}>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-5 h-5 rounded bg-[#6d5ef5] flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8V2l6 3-6 3z" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#eeeef6] tracking-tight">Dev Roadmap</span>
        </div>
        <p className="text-[10px] pl-7" style={{ color: "#8080a0" }}>Python · TypeScript · 2025</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label} className="mb-5">
            <p
              className="text-[9px] font-bold uppercase tracking-[0.18em] px-2 mb-1.5"
              style={{ color: "#909098" }}
            >
              {section.label}
            </p>
            {section.items.map((item) => {
              const isActive = active === item.href.slice(1);
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs mb-0.5"
                  style={{
                    background: isActive ? "#1e1e30" : "transparent",
                    color: isActive ? "#ddddf0" : "#9090b0",
                    borderLeft: isActive ? "2px solid #6d5ef5" : "2px solid transparent",
                    transition: "background 0.15s ease, color 0.15s ease, border-color 0.15s ease",
                    boxShadow: isActive ? "inset 0 0 20px #6d5ef508" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#c8c8e4";
                      (e.currentTarget as HTMLElement).style.background = "#18182a";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#9090b0";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  <Icon
                    size={13}
                    strokeWidth={isActive ? 2 : 1.5}
                    color={isActive ? "#7c6af7" : "#606080"}
                  />
                  {item.label}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-4 py-3" style={{ borderTop: "1px solid #20202e" }}>
        <p className="text-[9px]" style={{ color: "#484860" }}>v2.0 · 2025</p>
      </div>
    </aside>
  );
}
