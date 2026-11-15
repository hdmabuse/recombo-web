import { describe, expect, it } from "vitest";
import sharp from "sharp";
import { uploadService } from "../upload.service";

async function pngFile(): Promise<File> {
  const buffer = await sharp({
    create: { width: 40, height: 30, channels: 3, background: { r: 10, g: 10, b: 10 } },
  })
    .png()
    .toBuffer();
  return new File([buffer], "ok.png", { type: "image/png" });
}

describe("uploadService", () => {
  it("aceita imagem válida e devolve URL servível", async () => {
    const result = await uploadService.uploadFile(await pngFile());
    expect(result.url).toMatch(/^(\/api\/media\/media\/|https:\/\/)/);
    expect(result.size).toBeGreaterThan(0);
  });

  it("rejeita arquivo cujo conteúdo não é imagem", async () => {
    const fake = new File([Buffer.from("isto não é um png")], "falso.png", { type: "image/png" });
    await expect(uploadService.uploadFile(fake)).rejects.toThrow(/imagem inválid/i);
  });

  it("rejeita conteúdo que não corresponde ao tipo declarado", async () => {
    const jpeg = await sharp({
      create: { width: 20, height: 20, channels: 3, background: { r: 1, g: 2, b: 3 } },
    })
      .jpeg()
      .toBuffer();
    const mentiroso = new File([jpeg], "mentira.png", { type: "image/png" });
    await expect(uploadService.uploadFile(mentiroso)).rejects.toThrow(/não corresponde/i);
  });

  it("rejeita tipo fora da allowlist", async () => {
    const svg = new File([Buffer.from("<svg/>")], "x.svg", { type: "image/svg+xml" });
    await expect(uploadService.uploadFile(svg)).rejects.toThrow(/não permitido/i);
  });

  it("rejeita arquivo acima de 25MB", async () => {
    const grande = new File([Buffer.alloc(25 * 1024 * 1024 + 1)], "grande.png", {
      type: "image/png",
    });
    await expect(uploadService.uploadFile(grande)).rejects.toThrow(/25MB/);
  });
});
