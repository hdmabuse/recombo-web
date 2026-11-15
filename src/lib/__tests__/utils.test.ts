import { describe, expect, it } from "vitest";
import { slugify } from "../utils";

describe("slugify", () => {
  it("remove acentos e normaliza espaços", () => {
    expect(slugify("Constelações em Rede")).toBe("constelacoes-em-rede");
  });

  it("remove pontuação e símbolos", () => {
    expect(slugify("Call for Noise (2002)!")).toBe("call-for-noise-2002");
  });

  it("não deixa hífen nas pontas", () => {
    expect(slugify("  --Re:combo--  ")).toBe("re-combo");
  });

  it("lida com string vazia", () => {
    expect(slugify("")).toBe("");
  });
});
