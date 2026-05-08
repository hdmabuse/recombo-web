import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "RE:COMBO - O arquivo como semente",
  description: "Arquivo digital do coletivo Re:combo (2001-2008). Pioneirismo em produção artística colaborativa via internet.",
  keywords: ["Re:combo", "Manguebeat", "Net.art", "Arte digital", "Coletivo", "Recife"],
  authors: [{ name: "RE:COMBO" }],
  openGraph: {
    title: "RE:COMBO - O arquivo como semente",
    description: "Arquivo digital do coletivo Re:combo (2001-2008)",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}