import { describe, expect, it } from "vitest";
import { ARTWORK_SKINS, resolveArtworkSkin } from "../index";

describe("resolveArtworkSkin", () => {
  it("usa a clássica quando nada é pedido", () => {
    expect(resolveArtworkSkin()).toBe("classic");
    expect(resolveArtworkSkin(null)).toBe("classic");
    expect(resolveArtworkSkin("")).toBe("classic");
  });

  it("aceita as skins registradas", () => {
    for (const skin of ARTWORK_SKINS) {
      expect(resolveArtworkSkin(skin)).toBe(skin);
    }
  });

  it("cai na clássica para valor desconhecido", () => {
    expect(resolveArtworkSkin("hacker")).toBe("classic");
    expect(resolveArtworkSkin("../../etc")).toBe("classic");
  });
});
