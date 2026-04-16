"use client";

/**
 * RetroOverlay — rendered only for retro-dark and retro-light themes.
 *
 * retro-dark: warm screen-blend (rgb(160,80,8)) + CRT scanlines + vignette
 * retro-light: very light warm tint + faint scanlines (paper feel)
 */

import { useSiteTheme } from "@/components/SiteThemeContext";

export function RetroOverlay() {
  const { themeId } = useSiteTheme();
  if (!themeId.startsWith("retro")) return null;

  const isDark = themeId === "retro-dark";

  return (
    <>
      {/* Warm screen-blend layer */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9993,
          pointerEvents: "none",
          background: isDark ? "rgb(160, 80, 8)" : "rgb(200, 150, 60)",
          mixBlendMode: "screen",
          opacity: isDark ? 0.28 : 0.08,
        }}
      />

      {/* CRT scanlines + barrel-vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: "none",
          background: [
            isDark
              ? "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 52%, rgba(3,1,0,0.70) 100%)"
              : "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 60%, rgba(80,40,10,0.25) 100%)",
            `repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,${isDark ? "0.22" : "0.06"}) 2px, rgba(0,0,0,${isDark ? "0.22" : "0.06"}) 3px)`,
          ].join(", "),
        }}
      />
    </>
  );
}
