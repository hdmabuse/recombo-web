import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acervo · Re:combo",
  description:
    "Obras, performances e arquivos do coletivo Re:combo (2001–2008): áudio, vídeo, imagem, texto e instalações.",
  openGraph: {
    title: "Acervo · Re:combo",
    description: "Obras, performances e arquivos do coletivo Re:combo.",
    type: "website",
  },
};

export default function ArquivoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
