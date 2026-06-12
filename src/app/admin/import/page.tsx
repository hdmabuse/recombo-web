"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, FileText, Download, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

interface ImportResult {
  success: number;
  failed: number;
  errors: { row: number; error: string }[];
}

export default function ImportPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      if (files[0].name.endsWith(".csv")) {
        setFile(files[0]);
        setResult(null);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      if (files[0].name.endsWith(".csv")) {
        setFile(files[0]);
        setResult(null);
      }
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/import", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: 0,
        failed: 1,
        errors: [{ row: 0, error: "Erro ao processar arquivo" }],
      });
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const csv = [
      "title,type,year,description,medium,genres,tags,license,status",
      "Minha Obra,audio,2004,Descrição da obra,faixa,eletrônica;experimental,recife;coletivo,LUCR,published",
      "Outra Obra,video,2005,Descrição em vídeo,performance,net.art,performance,CC-BY,draft",
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modelo-importacao.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/artworks"
              className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">Importar Obras</h1>
              <p className="mt-1 text-sm text-zinc-500">Importe obras de um arquivo CSV</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Arquivo CSV</h2>
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
            >
              <Download className="h-4 w-4" />
              Baixar modelo
            </button>
          </div>

          {!file ? (
            <div
              className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                dragActive ? "border-zinc-900 bg-zinc-50" : "border-zinc-300 hover:border-zinc-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto mb-3 h-10 w-10 text-zinc-400" />
              <p className="mb-2 text-zinc-600">
                Arraste um arquivo CSV aqui ou clique para selecionar
              </p>
              <p className="text-sm text-zinc-500">O arquivo deve ter extensão .csv</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="mt-4 inline-block cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
              >
                Selecionar Arquivo
              </label>
            </div>
          ) : (
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-zinc-400" />
                <div className="flex-1">
                  <p className="font-medium text-zinc-900">{file.name}</p>
                  <p className="text-sm text-zinc-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setResult(null);
                  }}
                  className="text-zinc-400 hover:text-zinc-600"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {file && (
          <div className="flex justify-end">
            <button
              onClick={handleImport}
              disabled={importing}
              className="flex items-center gap-2 rounded-md bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800 disabled:opacity-50"
            >
              {importing ? (
                <>Importando...</>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Importar
                </>
              )}
            </button>
          </div>
        )}

        {result && (
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Resultado da Importação</h2>

            <div className="mb-4 flex gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-700">
                  {result.success} importados com sucesso
                </span>
              </div>
              {result.failed > 0 && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-700">{result.failed} falhas</span>
                </div>
              )}
            </div>

            {result.errors.length > 0 && (
              <div className="mt-4">
                <h3 className="mb-2 text-sm font-medium text-zinc-700">Erros:</h3>
                <div className="max-h-48 space-y-1 overflow-y-auto">
                  {result.errors.map((error, i) => (
                    <div key={i} className="rounded bg-zinc-50 p-2 text-sm text-zinc-600">
                      <span className="font-medium">Linha {error.row}:</span> {error.error}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Formato do CSV</h2>
          <div className="space-y-2 text-sm text-zinc-600">
            <p>
              <strong>Colunas obrigatórias:</strong>
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>title - Título da obra</li>
              <li>
                type - Tipo (audio, video, image, text, installation, performance, website,
                software)
              </li>
            </ul>
            <p className="mt-4">
              <strong>Colunas opcionais:</strong>
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>year - Ano de criação</li>
              <li>description - Descrição</li>
              <li>medium - Meio/técnica</li>
              <li>genres - Gêneros (separados por ;)</li>
              <li>tags - Tags (separadas por ;)</li>
              <li>license - Licença (LUCR, CC-BY, etc)</li>
              <li>status - Status (draft, published, archived)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
