"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body
        style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.5rem", textAlign: "center" }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Erro inesperado</h1>
        <p style={{ color: "#52525b", marginTop: "0.75rem" }}>
          A aplicação encontrou uma falha. Tente recarregar.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            padding: "0.5rem 1rem",
            borderRadius: 6,
            border: "1px solid #d4d4d8",
            background: "#18181b",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Recarregar
        </button>
      </body>
    </html>
  );
}
