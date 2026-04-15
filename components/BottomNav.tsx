"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard, BookOpen, FolderGit2,
  MessageSquare, BarChart2,
} from "lucide-react";

const tabs = [
  { href: "#overview",    label: "Início",     icon: LayoutDashboard },
  { href: "#checklist",   label: "Módulos",    icon: BookOpen },
  { href: "#projetos",    label: "Projetos",   icon: FolderGit2 },
  { href: "#entrevista",  label: "Entrevista", icon: MessageSquare },
  { href: "#progresso",   label: "Progresso",  icon: BarChart2 },
];

const allHrefs = tabs.map(t => t.href.slice(1));

export function BottomNav() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const handler = () => {
      let current = allHrefs[0];
      for (const id of allHrefs) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch"
      style={{
        background: "#14141c",
        borderTop: "1px solid #26263a",
        height: "56px",
      }}
    >
      {tabs.map(({ href, label, icon: Icon }) => {
        const isActive = active === href.slice(1);
        return (
          <a
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all"
            style={{ color: isActive ? "#7c6af7" : "#505060" }}
          >
            <Icon
              size={isActive ? 19 : 18}
              strokeWidth={isActive ? 2.2 : 1.5}
            />
            <span
              className="text-[9px] font-semibold tracking-wide"
              style={{ color: isActive ? "#a78bfa" : "#404050" }}
            >
              {label}
            </span>
            {isActive && (
              <span
                className="absolute bottom-0 rounded-t-full"
                style={{
                  width: "24px",
                  height: "2px",
                  background: "#7c6af7",
                }}
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
