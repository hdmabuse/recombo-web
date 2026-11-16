import type { ArtworkView } from "@/content/artwork";
import { ArtworkClassic } from "./classic";
import { ArtworkEditorial } from "./editorial";

export const ARTWORK_SKINS = ["classic", "editorial"] as const;
export type ArtworkSkin = (typeof ARTWORK_SKINS)[number];

/** Resolve a skin pedida (query/env) com fallback seguro para a clássica. */
export function resolveArtworkSkin(value?: string | null): ArtworkSkin {
  return ARTWORK_SKINS.includes(value as ArtworkSkin) ? (value as ArtworkSkin) : "classic";
}

/**
 * Único ponto de decisão de apresentação. Para criar um layout novo basta
 * acrescentar o arquivo da skin e registrá-lo aqui — nada de banco ou serviço.
 */
export function ArtworkTemplate({ view, skin }: { view: ArtworkView; skin?: ArtworkSkin }) {
  switch (skin ?? "classic") {
    case "editorial":
      return <ArtworkEditorial view={view} />;
    default:
      return <ArtworkClassic view={view} />;
  }
}
