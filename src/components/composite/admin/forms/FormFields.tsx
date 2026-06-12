"use client";

import { useState } from "react";
import { ArtworkType } from "@prisma/client";
import { Music, Video, Image, FileText, Wrench, Play, Globe, Code } from "lucide-react";

interface TypeSelectorProps {
  value: ArtworkType | null;
  onChange: (type: ArtworkType) => void;
}

const TIPO_OPTIONS = [
  {
    type: "audio" as ArtworkType,
    icon: Music,
    label: "Áudio",
    desc: "Músicas, faixas, soundscapes",
  },
  {
    type: "video" as ArtworkType,
    icon: Video,
    label: "Vídeo",
    desc: "Performances, clipes, dokumentários",
  },
  {
    type: "image" as ArtworkType,
    icon: Image,
    label: "Imagem",
    desc: "Fotografias, ilustrações, prints",
  },
  {
    type: "text" as ArtworkType,
    icon: FileText,
    label: "Texto",
    desc: "Artigos, ensaios, manifestos",
  },
  {
    type: "installation" as ArtworkType,
    icon: Wrench,
    label: "Instalação",
    desc: "Instalações interativas",
  },
  {
    type: "performance" as ArtworkType,
    icon: Play,
    label: "Performance",
    desc: "Performances ao vivo",
  },
  { type: "website" as ArtworkType, icon: Globe, label: "Website", desc: "Sites, projetos web" },
  {
    type: "software" as ArtworkType,
    icon: Code,
    label: "Software",
    desc: "Programas, ferramentas",
  },
];

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">1. Tipo de Obra</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {TIPO_OPTIONS.map(({ type, icon: Icon, label, desc }) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={`rounded-lg border-2 p-4 text-left transition-all ${
              value === type
                ? "border-zinc-900 bg-zinc-50"
                : "border-zinc-200 hover:border-zinc-400"
            }`}
          >
            <Icon
              className={`mb-2 h-6 w-6 ${value === type ? "text-zinc-900" : "text-zinc-400"}`}
            />
            <div className={`font-medium ${value === type ? "text-zinc-900" : "text-zinc-700"}`}>
              {label}
            </div>
            <div className="mt-1 text-xs text-zinc-500">{desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

interface BasicInfoFormProps {
  title: string;
  year: number | null;
  description: string;
  onChange: (field: string, value: string | number | null) => void;
}

export function BasicInfoForm({ title, year, description, onChange }: BasicInfoFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">2. Informações Básicas</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onChange("title", e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="Nome da obra"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Ano <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={year || ""}
            onChange={(e) => onChange("year", e.target.value ? parseInt(e.target.value) : null)}
            min={1900}
            max={new Date().getFullYear()}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="2024"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={4}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          placeholder="Descreva a obra..."
        />
      </div>
    </div>
  );
}

interface ClassificationFormProps {
  medium: string;
  genres: string[];
  tags: string[];
  onChange: (field: string, value: string | string[]) => void;
}

const MEDIUM_OPTIONS: Record<string, string[]> = {
  audio: ["faixa", "álbum", "DJ set", "soundscape", "sample", "outro"],
  video: ["performance", "clipe", "documentário", "vídeo arte", "tutorial", "outro"],
  image: ["fotografia", "ilustração", "print digital", "colagem", "design", "outro"],
  text: ["artigo", "ensaio", "poema", "manifesto", "resenha", "outro"],
  installation: ["interativa", "imersiva", "imutável", "site-specific", "outro"],
  performance: ["ao vivo", "telepresença", "site-specific", "coletiva", "outro"],
  website: ["site", "webapp", "net.art", "blog", "outro"],
  software: ["ferramenta", "jogo", "experimento", "biblioteca", "outro"],
};

const COMMON_GENRES = [
  "eletrônica",
  "experimental",
  "ambient",
  "glitch",
  "noise",
  "avant-garde",
  "net.art",
  "video art",
  "sound art",
  "installation art",
  "performance",
  "remix",
  "sampling",
  "collage",
  "generative",
  "interactive",
  "manguebeat",
  "brega",
  "forró",
  "rock",
  "hip hop",
];

export function ClassificationForm({ medium, genres, tags, onChange }: ClassificationFormProps) {
  const [customGenre, setCustomGenre] = useState("");
  const [customTag, setCustomTag] = useState("");

  const addGenre = () => {
    if (customGenre && !genres.includes(customGenre)) {
      onChange("genres", [...genres, customGenre]);
      setCustomGenre("");
    }
  };

  const addTag = () => {
    if (customTag && !tags.includes(customTag)) {
      onChange("tags", [...tags, customTag]);
      setCustomTag("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">4. Classificação</h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Medium</label>
        <select
          value={medium}
          onChange={(e) => onChange("medium", e.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
        >
          <option value="">Selecione...</option>
          {COMMON_GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Gêneros</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {genres.map((g) => (
            <span
              key={g}
              className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-sm"
            >
              {g}
              <button
                type="button"
                onClick={() =>
                  onChange(
                    "genres",
                    genres.filter((x) => x !== g),
                  )
                }
                className="text-zinc-500 hover:text-zinc-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={customGenre}
            onChange={(e) => setCustomGenre(e.target.value)}
            placeholder="Adicionar gênero..."
            className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            list="genre-options"
          />
          <button
            type="button"
            onClick={addGenre}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white"
          >
            +
          </button>
        </div>
        <datalist id="genre-options">
          {COMMON_GENRES.map((g) => (
            <option key={g} value={g} />
          ))}
        </datalist>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Tags</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-sm"
            >
              {t}
              <button
                type="button"
                onClick={() =>
                  onChange(
                    "tags",
                    tags.filter((x) => x !== t),
                  )
                }
                className="text-zinc-500 hover:text-zinc-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            placeholder="Adicionar tag..."
            className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={addTag}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

interface LicenseFormProps {
  license: string;
  accessLevel: string;
  onChange: (field: string, value: string) => void;
}

const LICENSE_OPTIONS = [
  { value: "LUCR", label: "LUCR", desc: "Licença de Uso Completo Re:combo" },
  { value: "CC-BY", label: "CC BY", desc: "Atribuição" },
  { value: "CC-BY-SA", label: "CC BY-SA", desc: "Atribuição-Similar" },
  { value: "CC-BY-NC", label: "CC BY-NC", desc: "Atribuição-NãoComercial" },
  { value: "CC-BY-NC-SA", label: "CC BY-NC-SA", desc: "Atribuição-NãoComercial-Similar" },
  { value: "CC-BY-ND", label: "CC BY-ND", desc: "Atribuição-SemDerivacoes" },
  { value: "CC0", label: "CC0 / Domínio Público", desc: "Sem direitos autorais" },
];

export function LicenseForm({ license, accessLevel, onChange }: LicenseFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">6. Licenciamento</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Licença <span className="text-red-500">*</span>
          </label>
          <select
            value={license}
            onChange={(e) => onChange("license", e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            {LICENSE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} - {opt.desc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">Acesso</label>
          <select
            value={accessLevel}
            onChange={(e) => onChange("accessLevel", e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            <option value="public">Público</option>
            <option value="private">Privado</option>
            <option value="restricted">Restrito</option>
          </select>
        </div>
      </div>
    </div>
  );
}
