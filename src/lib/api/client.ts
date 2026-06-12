export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    if (res.status === 404) throw new ApiError("Não encontrado", 404);
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error || "Erro na requisição", res.status);
  }

  return res.json();
}
