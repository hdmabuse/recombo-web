import { describe, expect, it } from "vitest";
import { toArtworkView, type ArtworkRecord } from "../artwork";

const base: ArtworkRecord = {
  slug: "obra-x",
  title: "Obra X",
  year: 2003,
  description: "linha 1\nlinha 2",
  type: "audio",
  duration: 125,
  license: "LUCR",
  fileUrl: null,
  thumbnail: "/img/thumb.jpg",
  files: [{ id: "f1", filename: "capa.jpg", url: "/uploads/capa.jpg" }],
  artists: [{ id: "a1", role: "voz", artist: { name: "Fulana" } }],
  tags: ["recife", "vanguarda"],
  related: [{ id: "r1", related: { slug: "obra-y", title: "Obra Y", year: 1999 } }],
};

describe("toArtworkView", () => {
  it("mapeia os campos de apresentação", () => {
    const v = toArtworkView(base);
    expect(v.title).toBe("Obra X");
    expect(v.year).toBe(2003);
    expect(v.type).toBe("audio");
    expect(v.license).toBe("LUCR");
  });

  it("preserva quebras de linha da descrição", () => {
    expect(toArtworkView(base).description).toContain("\n");
  });

  it("usa thumbnail quando não há fileUrl", () => {
    expect(toArtworkView(base).heroImage).toBe("/img/thumb.jpg");
  });

  it("prefere fileUrl à thumbnail", () => {
    expect(toArtworkView({ ...base, fileUrl: "/uploads/full.jpg" }).heroImage).toBe(
      "/uploads/full.jpg",
    );
  });

  it("achata artista, arquivo e relação para o template", () => {
    const v = toArtworkView(base);
    expect(v.artists[0]).toEqual({ id: "a1", name: "Fulana", role: "voz" });
    expect(v.files[0]).toEqual({ id: "f1", label: "capa.jpg", href: "/uploads/capa.jpg" });
    expect(v.related[0]).toEqual({ id: "r1", slug: "obra-y", title: "Obra Y", year: 1999 });
  });

  it("normaliza descrição nula para string vazia", () => {
    expect(toArtworkView({ ...base, description: null }).description).toBe("");
  });
});
