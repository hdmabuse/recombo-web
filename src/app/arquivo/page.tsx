import { ArchiveTemplate } from "@/components/templates/archive";
import { getArchiveView, normalizeArchiveQuery } from "@/content/archive";

interface Props {
  searchParams?: Record<string, string | string[] | undefined>;
}

export const metadata = {
  title: "Acervo · Re:combo",
  description: "Obras, performances e arquivos do coletivo Re:combo (Recife).",
};

export default async function ArquivoPage({ searchParams }: Props) {
  const query = normalizeArchiveQuery(searchParams ?? {});
  const view = await getArchiveView(query);

  return <ArchiveTemplate view={view} />;
}
