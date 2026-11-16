import Link from "next/link";
import type { ArtworkView } from "@/content/artwork";

/**
 * Skin editorial: hero em tela cheia com o título sobreposto, leitura em coluna
 * única e ficha técnica em linha. Estrutura diferente da clássica — só o
 * view-model é compartilhado.
 */
export function ArtworkEditorial({ view }: { view: ArtworkView }) {
  return (
    <article className="min-h-screen bg-[#faf8f4] text-zinc-900">
      <header className="relative flex min-h-[62vh] items-end overflow-hidden bg-zinc-900">
        {view.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={view.heroImage}
            alt={view.title}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-12 pt-24 sm:px-8">
          <Link
            href="/arquivo"
            className="mb-8 inline-block text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white"
          >
            ← Acervo
          </Link>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-amber-300">
            {view.type}
            {view.year ? ` · ${view.year}` : ""}
          </p>
          <h1 className="font-serif text-4xl leading-tight text-white sm:text-6xl">{view.title}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8">
        <p className="whitespace-pre-wrap break-words font-serif text-lg leading-8 text-zinc-800">
          {view.description}
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-zinc-300 py-6 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-widest text-zinc-500">Ano</dt>
            <dd className="mt-1 text-zinc-900">{view.year || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-zinc-500">Tipo</dt>
            <dd className="mt-1 capitalize text-zinc-900">{view.type}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-zinc-500">Duração</dt>
            <dd className="mt-1 text-zinc-900">
              {view.duration ? `${Math.floor(view.duration / 60)}h ${view.duration % 60}min` : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-zinc-500">Licença</dt>
            <dd className="mt-1 text-zinc-900">{view.license}</dd>
          </div>
        </dl>

        {view.artists.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">Artistas</h2>
            <ul className="space-y-1">
              {view.artists.map((a) => (
                <li key={a.id} className="text-zinc-800">
                  {a.name}
                  {a.role ? <span className="text-zinc-500"> — {a.role}</span> : null}
                </li>
              ))}
            </ul>
          </section>
        )}

        {view.files.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">Arquivos</h2>
            <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
              {view.files.map((f) => (
                <li key={f.id}>
                  <a
                    href={f.href}
                    className="flex items-center justify-between py-3 text-zinc-800 hover:text-amber-700"
                  >
                    <span>{f.label}</span>
                    <span aria-hidden>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {view.tags.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {view.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/arquivo?tag=${tag}`}
                  className="border border-zinc-300 px-2 py-1 text-xs text-zinc-700 hover:border-zinc-900"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </section>
        )}

        {view.related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
              Obras relacionadas
            </h2>
            <ul className="space-y-2">
              {view.related.map((rel) => (
                <li key={rel.id}>
                  <Link
                    href={`/obra/${rel.slug}`}
                    className="font-serif text-xl hover:text-amber-700"
                  >
                    {rel.title}
                  </Link>
                  {rel.year ? (
                    <span className="ml-2 text-sm text-zinc-500">({rel.year})</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
