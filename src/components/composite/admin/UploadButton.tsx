"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  onUpload: (url: string) => void;
  accept: string;
}

export function UploadButton({ onUpload, accept }: UploadButtonProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onUpload(data.url);
      }
    } catch (error) {
      alert("Erro ao enviar arquivo");
    }
    setUploading(false);
  };

  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-zinc-700 transition-colors hover:bg-zinc-200">
      <Upload className="h-4 w-4" />
      <input
        type="file"
        accept={accept}
        onChange={handleUpload}
        className="hidden"
        disabled={uploading}
      />
      {uploading ? "Enviando..." : "Upload"}
    </label>
  );
}
