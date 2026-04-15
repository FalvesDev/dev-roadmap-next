"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Locale, translations, type TranslationKey } from "@/lib/i18n";

const I18N_KEY = "roadmap_locale_v1";

interface I18nContext {
  locale: Locale;
  t: (key: TranslationKey) => string;
  toggleLocale: () => void;
}

const Ctx = createContext<I18nContext>({
  locale: "pt",
  t: (key) => translations.pt[key],
  toggleLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(I18N_KEY);
      if (saved === "en" || saved === "pt") setLocale(saved);
    } catch { /* ignore */ }
  }, []);

  function toggleLocale() {
    setLocale((l) => {
      const next: Locale = l === "pt" ? "en" : "pt";
      try { localStorage.setItem(I18N_KEY, next); } catch { /* ignore */ }
      return next;
    });
  }

  function t(key: TranslationKey): string {
    return translations[locale][key] as string;
  }

  return <Ctx.Provider value={{ locale, t, toggleLocale }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  return useContext(Ctx);
}

export function LocaleToggle() {
  const { t, toggleLocale, locale } = useI18n();
  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all"
      style={{ background: "#1a1a26", color: "#9090b0", border: "1px solid #252535" }}
      aria-label={`Mudar idioma para ${t("langToggle")}`}
      title={`Switch to ${t("langToggle")}`}
    >
      🌐 {locale.toUpperCase()}
    </button>
  );
}
