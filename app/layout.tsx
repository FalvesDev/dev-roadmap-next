import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PathProvider } from "@/components/PathSelector";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/components/I18nProvider";
import { LayoutProvider } from "@/components/LayoutContext";

export const metadata: Metadata = {
  title: "Dev Roadmap — Python & TypeScript",
  description: "Roadmap completo para se tornar um desenvolvedor júnior em Python e TypeScript",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Dev Roadmap" },
};

export const viewport: Viewport = {
  themeColor: "#7c6af7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0a0a0a] text-[#e5e5e5] min-h-full antialiased">
        <a href="#main-content" className="skip-to-content">Ir para o conteúdo</a>
        <I18nProvider>
          <ThemeProvider>
            <PathProvider>
              <LayoutProvider>
                {children}
              </LayoutProvider>
            </PathProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
