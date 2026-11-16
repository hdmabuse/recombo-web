import { notFound } from "next/navigation";
import { getArtworkMeta, getArtworkView } from "@/content/artwork";
import { ArtworkTemplate, resolveArtworkSkin } from "@/components/templates/artwork";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
  searchParams?: { skin?: string };
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

export default async function ArtworkPage({ params, searchParams }: Props) {
  const view = await getArtworkView(params.slug);
  if (!view) notFound();

  // apresentação escolhida na URL (?skin=editorial) ou no ambiente
  const skin = resolveArtworkSkin(searchParams?.skin ?? process.env.ARTWORK_SKIN);

  return <ArtworkTemplate view={view} skin={skin} />;
}
