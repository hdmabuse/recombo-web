"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArtworkType, AccessLevel, ArtworkStatus } from "@prisma/client";
import { TypeSelector, BasicInfoForm, ClassificationForm, LicenseForm } from "./FormFields";
import { TagInput } from "./FileUpload";
import { Save, Loader2 } from "lucide-react";

interface ArtworkFormData {
  type: ArtworkType | null;
  title: string;
  year: number | null;
  description: string;
  medium: string;
  genres: string[];
  tags: string[];
  license: string;
  accessLevel: AccessLevel;
  status: ArtworkStatus;
}

const initialFormData: ArtworkFormData = {
  type: null,
  title: "",
  year: null,
  description: "",
  medium: "",
  genres: [],
  tags: [],
  license: "LUCR",
  accessLevel: "public",
  status: "draft",
};

interface ArtworkFormProps {
  artwork?: ArtworkFormData;
  onSubmit: (data: ArtworkFormData) => Promise<void>;
  isLoading?: boolean;
}

export function ArtworkForm({ artwork, onSubmit, isLoading }: ArtworkFormProps) {
  const [formData, setFormData] = useState<ArtworkFormData>(artwork || initialFormData);
  const router = useRouter();

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.type) {
      alert("Selecione o tipo de obra");
      return;
    }

    if (!formData.title.trim()) {
      alert("Título é obrigatório");
      return;
    }

    await onSubmit(formData);
  };

  const isValid = formData.type && formData.title.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Step 1: Type */}
      <TypeSelector value={formData.type} onChange={(type) => updateField("type", type)} />

      {/* Step 2: Basic Info */}
      <BasicInfoForm
        title={formData.title}
        year={formData.year}
        description={formData.description}
        onChange={updateField}
      />

      {/* Step 3: File Upload */}
      {formData.type && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">3. Arquivo</h2>
          <div className="rounded-lg border border-zinc-200 p-6 text-center text-zinc-500">
            <p>Componente de upload será implementado</p>
            <p className="text-sm">(requer configuração de storage)</p>
          </div>
        </div>
      )}

      {/* Step 4: Classification */}
      {formData.type && (
        <ClassificationForm
          medium={formData.medium}
          genres={formData.genres}
          tags={formData.tags}
          onChange={updateField}
        />
      )}

      {/* Step 5: Artists (placeholder) */}
      {formData.type && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">5. Vínculos</h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Artistas</label>
            <TagInput label="" items={[]} onChange={() => {}} placeholder="Adicionar artista..." />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Eventos</label>
            <TagInput label="" items={[]} onChange={() => {}} placeholder="Vincular a evento..." />
          </div>
        </div>
      )}

      {/* Step 6: License */}
      <LicenseForm
        license={formData.license}
        accessLevel={formData.accessLevel}
        onChange={updateField}
      />

      {/* Actions */}
      <div className="flex justify-end gap-4 border-t border-zinc-200 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-zinc-300 px-6 py-2 text-zinc-700 hover:bg-zinc-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="flex items-center gap-2 rounded-md bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Rascunho
            </>
          )}
        </button>
        <button
          type="submit"
          disabled={!isValid || isLoading}
          onClick={() => updateField("status", "published")}
          className="flex items-center gap-2 rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
