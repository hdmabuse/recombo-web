import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linha do tempo · Re:combo",
  description:
    "Sete anos de produção colaborativa do Re:combo (2001–2008), do Abril Pro Rock ao encerramento do coletivo.",
};

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
