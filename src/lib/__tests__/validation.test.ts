import { describe, expect, it } from "vitest";
import {
  artworkCreateSchema,
  eventCreateSchema,
  fieldDefinitionCreateSchema,
  tagCreateSchema,
} from "../validation/admin";

describe("artworkCreateSchema", () => {
  it("aceita obra mínima", () => {
    const r = artworkCreateSchema.safeParse({ title: "Obra", type: "audio" });
    expect(r.success).toBe(true);
  });

  it("rejeita sem título", () => {
    expect(artworkCreateSchema.safeParse({ type: "audio" }).success).toBe(false);
  });

  it("rejeita tipo inválido", () => {
    expect(artworkCreateSchema.safeParse({ title: "X", type: "holograma" }).success).toBe(false);
  });

  it("descarta campos desconhecidos (mass assignment)", () => {
    const r = artworkCreateSchema.parse({ title: "X", type: "text", id: "hack", createdBy: "eu" });
    expect(r).not.toHaveProperty("id");
    expect(r).not.toHaveProperty("createdBy");
  });
});

describe("eventCreateSchema", () => {
  it("converte data ISO em Date", () => {
    const r = eventCreateSchema.parse({
      name: "Mostra",
      type: "exposicao",
      dateStart: "2026-03-10T12:00:00.000Z",
    });
    expect(r.dateStart).toBeInstanceOf(Date);
  });

  it("rejeita data inválida", () => {
    expect(
      eventCreateSchema.safeParse({ name: "X", type: "exposicao", dateStart: "ontem" }).success,
    ).toBe(false);
  });
});

describe("tagCreateSchema e fieldDefinitionCreateSchema", () => {
  it("tag exige nome", () => {
    expect(tagCreateSchema.safeParse({ name: "" }).success).toBe(false);
  });

  it("campo customizado exige entidade, nome, label e tipo", () => {
    expect(
      fieldDefinitionCreateSchema.safeParse({
        entity: "Artwork",
        name: "x",
        label: "X",
        type: "text",
      }).success,
    ).toBe(true);
    expect(fieldDefinitionCreateSchema.safeParse({ entity: "Artwork" }).success).toBe(false);
  });
});
