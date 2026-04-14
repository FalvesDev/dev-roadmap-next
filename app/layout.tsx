import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Roadmap — Python & TypeScript",
  description: "Roadmap completo para se tornar um desenvolvedor júnior em Python e TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0a0a0a] text-[#e5e5e5] min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
