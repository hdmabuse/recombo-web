import type { ArchiveView } from "@/content/archive";
import { ArchiveClassic } from "./classic";

export function ArchiveTemplate({ view }: { view: ArchiveView }) {
  return <ArchiveClassic view={view} />;
}
