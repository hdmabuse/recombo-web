import { notFound } from "next/navigation";
import { getArtworkMeta, getArtworkView } from "@/content/artwork";
import { ArtworkTemplate } from "@/components/templates/ArtworkTemplate";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const meta = await getArtworkMeta(params.slug);

  if (!meta) return { title: "Obra não encontrada · Re:combo" };

  return {
    title: `${meta.title}${meta.year ? ` (${meta.year})` : ""} · Re:combo`,
    description: meta.description,
    openGraph: {
      title: `${meta.title} · Re:combo`,
      description: meta.description,
      images: meta.image ? [meta.image] : undefined,
      type: "article" as const,
    },
  };
}

export default async function ArtworkPage({ params }: Props) {
  const view = await getArtworkView(params.slug);
  if (!view) notFound();

  return <ArtworkTemplate view={view} />;
}
