import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Capturas — Re:combo",
  description: "Recorte público do arquivo digital do coletivo Re:combo.",
};

export default async function CapturasPublicasPage() {
  let captures: Awaited<ReturnType<typeof prisma.capture.findMany>> = [];
  let dbError = false;

  try {
    captures = await prisma.capture.findMany({
      where: { status: "published", accessLevel: "public" },
      orderBy: [{ highlight: "desc" }, { capturedAt: "desc" }],
      take: 200,
    });
  } catch {
    dbError = true;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-widest text-zinc-400">Acervo</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">Capturas</h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Páginas preservadas pelo arquivo digital do Re:combo, com a anotação de quem acompanha o
          acervo. Cada item aponta para a fonte original.
        </p>
      </header>

      {dbError && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          O acervo público ainda não foi migrado (banco sem a tabela de capturas).
        </p>
      )}

      {!dbError && captures.length === 0 && (
        <p className="text-zinc-500">Nenhuma captura publicada ainda.</p>
      )}

      <ul className="divide-y divide-zinc-200">
        {captures.map((c) => (
          <li key={c.id} className="py-6">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-zinc-900">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {c.title || c.url}
                </a>
              </h2>
              <span className="shrink-0 text-xs text-zinc-400">
                {c.capturedAt ? c.capturedAt.toLocaleDateString("pt-BR") : ""}
              </span>
            </div>
            {c.note && <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700">{c.note}</p>}
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
              <span>{c.url}</span>
              <span>·</span>
              <span>{c.license}</span>
              {c.tags
                .filter((t) => t.startsWith("obra:") || t.startsWith("fonte:"))
                .map((t) => (
                  <span key={t} className="rounded bg-zinc-100 px-2 py-0.5 text-zinc-600">
                    {t}
                  </span>
                ))}
            </div>
          </li>
        ))}
      </ul>

      <footer className="mt-16 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <Link href="/arquivo" className="underline">
          Ver o acervo completo
        </Link>
      </footer>
    </main>
  );
}
