"use client";

/**
 * VistaOverlay — rendered only for vista-dark and vista-light themes.
 *
 * Recreates the Windows Vista "Aero Glass" atmosphere:
 *   1. Top ambient glow — the signature blue radial bloom at the top edge
 *   2. Subtle horizontal reflection lines — mimics Aero glass streaks
 *   3. Light vignette at corners — depth without CRT heaviness
 */

import { useSiteTheme } from "@/components/SiteThemeContext";

export function VistaOverlay() {
  const { themeId } = useSiteTheme();
  if (!themeId.startsWith("vista")) return null;

  const isDark = themeId === "vista-dark";

  return (
    <>
      {/* 1. Top ambient Aero bloom */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9993,
          pointerEvents: "none",
          background: isDark
            ? "radial-gradient(ellipse 90% 35% at 50% -2%, rgba(74,158,255,0.18) 0%, transparent 70%)"
            : "radial-gradient(ellipse 90% 35% at 50% -2%, rgba(0,102,204,0.10) 0%, transparent 70%)",
        }}
      />

      {/* 2. Horizontal glass reflection lines */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9994,
          pointerEvents: "none",
          background: isDark
            ? "repeating-linear-gradient(0deg, transparent 0px, transparent 6px, rgba(74,158,255,0.018) 6px, rgba(74,158,255,0.018) 7px)"
            : "repeating-linear-gradient(0deg, transparent 0px, transparent 6px, rgba(0,80,180,0.025) 6px, rgba(0,80,180,0.025) 7px)",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />

      {/* 3. Corner vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9995,
          pointerEvents: "none",
          background: isDark
            ? "radial-gradient(ellipse 130% 130% at 50% 50%, transparent 55%, rgba(3,6,24,0.55) 100%)"
            : "radial-gradient(ellipse 130% 130% at 50% 50%, transparent 60%, rgba(0,30,80,0.20) 100%)",
        }}
      />
    </>
  );
}
