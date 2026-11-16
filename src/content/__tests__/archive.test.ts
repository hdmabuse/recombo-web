import { describe, expect, it } from "vitest";
import { normalizeArchiveQuery } from "../archive";

describe("normalizeArchiveQuery", () => {
  it("usa página 1 sem parâmetros", () => {
    expect(normalizeArchiveQuery({})).toEqual({ page: 1 });
  });

  it("limita a página a valores válidos", () => {
    expect(normalizeArchiveQuery({ page: "0" }).page).toBe(1);
    expect(normalizeArchiveQuery({ page: "-3" }).page).toBe(1);
    expect(normalizeArchiveQuery({ page: "abc" }).page).toBe(1);
    expect(normalizeArchiveQuery({ page: "9999" }).page).toBe(500);
  });

  it("apara e descarta busca vazia", () => {
    expect(normalizeArchiveQuery({ q: "  frevo  " }).q).toBe("frevo");
    expect(normalizeArchiveQuery({ q: "   " }).q).toBeUndefined();
  });

  it("aceita type, tag e ano válido", () => {
    expect(normalizeArchiveQuery({ type: "audio", tag: "manguebeat", year: "1999" })).toEqual({
      type: "audio",
      tag: "manguebeat",
      year: 1999,
      page: 1,
    });
  });

  it("descarta ano absurdo", () => {
    expect(normalizeArchiveQuery({ year: "12" }).year).toBeUndefined();
    expect(normalizeArchiveQuery({ year: "3020" }).year).toBeUndefined();
  });

  it("aceita search como apelido de q", () => {
    expect(normalizeArchiveQuery({ search: "chico" }).q).toBe("chico");
  });

  it("usa o primeiro valor quando vem array", () => {
    expect(normalizeArchiveQuery({ q: ["a", "b"] }).q).toBe("a");
  });
});
