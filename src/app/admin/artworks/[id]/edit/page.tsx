"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { ArtworkType, AccessLevel, ArtworkStatus } from "@prisma/client";

// Simulated artwork data
const MOCK_ARTWORK = {
  id: "1",
  title: "Call for Noise",
  slug: "call-for-noise",
  description: "Performance de 6 horas durante o Abril Pro Rock em 2002, onde membros do coletivo se alternavam dentro de uma \"gaiola\", recebendo convidados em uma performance caótica.",
  type: "performance" as ArtworkType,
  year: 2002,
  medium: "performance ao vivo",
  genres: ["net.art", "experimental"],
  tags: ["performance", "abril pro rock", "improvisação"],
  license: "LUCR",
  accessLevel: "public" as AccessLevel,
  status: "published" as ArtworkStatus,
  artists: [
    { id: "1", name: "H.D. Mabuse", role: "criador" },
    { id: "2", name: "Haidée Lima", role: "criador" },
  ],
};

interface TabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function Tab({ active, onClick, children }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium border-b-2 ${
        active
          ? "border-zinc-900 text-zinc-900"
          : "border-transparent text-zinc-500 hover:text-zinc-700"
      }`}
    >
      {children}
    </button>
  );
}

export default function EditArtworkPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("geral");
  
  const [formData, setFormData] = useState(MOCK_ARTWORK);
  
  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    alert("Obra atualizada com sucesso!");
    setIsLoading(false);
    router.push("/admin/artworks");
  };
  
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/artworks"
                className="p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-md"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-zinc-900">Editar: {formData.title}</h1>
                <p className="text-sm text-zinc-500 mt-1">
                  Última atualização: 15/01/2025
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/obra/${formData.slug}`}
                target="_blank"
                className="px-4 py-2 border border-zinc-300 rounded-md text-zinc-700 hover:bg-zinc-50"
              >
                Ver
              </Link>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-zinc-200 bg-white">
        <div className="flex gap-2">
          <Tab active={activeTab === "geral"} onClick={() => setActiveTab("geral")}>
            Geral
          </Tab>
          <Tab active={activeTab === "arquivo"} onClick={() => setActiveTab("arquivo")}>
            Arquivo
          </Tab>
          <Tab active={activeTab === "classificacao"} onClick={() => setActiveTab("classificacao")}>
            Classificação
          </Tab>
          <Tab active={activeTab === "vinculos"} onClick={() => setActiveTab("vinculos")}>
            Vínculos
          </Tab>
          <Tab active={activeTab === "licenca"} onClick={() => setActiveTab("licenca")}>
            Licença
          </Tab>
        </div>
      </div>
      
      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          {activeTab === "geral" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md bg-zinc-50"
                    disabled
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Tipo
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => updateField("type", e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  >
                    <option value="audio">Áudio</option>
                    <option value="video">Vídeo</option>
                    <option value="image">Imagem</option>
                    <option value="text">Texto</option>
                    <option value="installation">Instalação</option>
                    <option value="performance">Performance</option>
                    <option value="website">Website</option>
                    <option value="software">Software</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Ano
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => updateField("year", parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => updateField("status", e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                    <option value="archived">Arquivado</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "arquivo" && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-zinc-300 rounded-lg p-12 text-center">
                <p className="text-zinc-500">Nenhum arquivouploadado</p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-zinc-900 text-white rounded-md"
                >
                  Enviar Arquivo
                </button>
              </div>
              
              <div className="bg-zinc-50 rounded-lg p-4">
                <h3 className="font-medium text-zinc-700 mb-3">Arquivos Adicionais</h3>
                <p className="text-sm text-zinc-500">Nenhum arquivo adicional</p>
                <button
                  type="button"
                  className="mt-2 text-sm text-zinc-700 hover:underline"
                >
                  + Adicionar arquivo
                </button>
              </div>
            </div>
          )}
          
          {activeTab === "classificacao" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Medium
                </label>
                <input
                  type="text"
                  value={formData.medium}
                  onChange={(e) => updateField("medium", e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  placeholder="ex: performance ao vivo, vídeo digital"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Gêneros
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.genres.map((g) => (
                    <span
                      key={g}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 rounded-full text-sm"
                    >
                      {g}
                      <button
                        type="button"
                        onClick={() => updateField("genres", formData.genres.filter((x) => x !== g))}
                        className="text-zinc-500 hover:text-zinc-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 rounded-full text-sm"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => updateField("tags", formData.tags.filter((x) => x !== t))}
                        className="text-zinc-500 hover:text-zinc-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "vinculos" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Artistas Vinculados
                </label>
                {formData.artists.map((artist, index) => (
                  <div
                    key={artist.id}
                    className="flex items-center gap-2 mb-2 p-2 bg-zinc-50 rounded"
                  >
                    <span className="text-sm flex-1">{artist.name}</span>
                    <select
                      value={artist.role}
                      onChange={(e) => {
                        const newArtists = [...formData.artists];
                        newArtists[index].role = e.target.value;
                        updateField("artists", newArtists);
                      }}
                      className="text-sm px-2 py-1 border border-zinc-300 rounded"
                    >
                      <option value="criador">Criador</option>
                      <option value="colaborador">Colaborador</option>
                      <option value="participante">Participante</option>
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          "artists",
                          formData.artists.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-sm text-zinc-700 hover:underline"
                >
                  + Adicionar artista
                </button>
              </div>
            </div>
          )}
          
          {activeTab === "licenca" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Licença
                  </label>
                  <select
                    value={formData.license}
                    onChange={(e) => updateField("license", e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  >
                    <option value="LUCR">LUCR - Licença de Uso Completo Re:combo</option>
                    <option value="CC-BY">CC BY - Atribuição</option>
                    <option value="CC-BY-SA">CC BY-SA - Atribuição-Similar</option>
                    <option value="CC-BY-NC">CC BY-NC - Atribuição-NãoComercial</option>
                    <option value="CC0">CC0 - Domínio Público</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Nível de Acesso
                  </label>
                  <select
                    value={formData.accessLevel}
                    onChange={(e) => updateField("accessLevel", e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  >
                    <option value="public">Público</option>
                    <option value="private">Privado</option>
                    <option value="restricted">Restrito</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}