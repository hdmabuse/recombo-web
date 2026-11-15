import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-widest text-zinc-400">404</p>
      <h1 className="mt-2 text-2xl font-bold text-zinc-900">Página não encontrada</h1>
      <p className="mt-3 text-zinc-600">
        O endereço pode ter mudado ou o item ainda não faz parte do acervo.
      </p>
      <Link
        href="/arquivo"
        className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Ver o acervo
      </Link>
    </main>
  );
}
