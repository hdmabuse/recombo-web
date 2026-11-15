"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-zinc-900">Algo falhou ao carregar esta página</h1>
      <p className="mt-3 text-zinc-600">
        O erro foi registrado. Você pode tentar novamente ou voltar ao acervo.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Tentar novamente
        </button>
        <a
          href="/arquivo"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Ir ao acervo
        </a>
      </div>
    </main>
  );
}
