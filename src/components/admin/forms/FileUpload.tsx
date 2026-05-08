"use client";

import { useState, useCallback } from "react";
import { Upload, X, File, Image as ImageIcon, Music, Video, Loader2 } from "lucide-react";

interface FileUploaderProps {
  accept?: string;
  maxSize?: number; // MB
  onUpload: (file: File) => Promise<{ url: string; metadata: FileMetadata }>;
}

interface FileMetadata {
  size: number;
  type: string;
  duration?: number;
  width?: number;
  height?: number;
}

interface UploadedFile {
  file: File;
  url: string;
  metadata: FileMetadata;
  uploading: boolean;
}

export function FileUploader({ 
  accept = "*", 
  maxSize = 500, 
  onUpload 
}: FileUploaderProps) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await processFile(files[0]);
    }
  }, []);
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;
    if (files && files[0]) {
      await processFile(files[0]);
    }
  };
  
  const processFile = async (file: File) => {
    // Validate size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Arquivo muito grande. Máximo: ${maxSize}MB`);
      return;
    }
    
    // Set uploading state
    setUploadedFile({
      file,
      url: "",
      metadata: { size: file.size, type: file.type },
      uploading: true,
    });
    
    try {
      const result = await onUpload(file);
      setUploadedFile({
        file,
        url: result.url,
        metadata: result.metadata,
        uploading: false,
      });
    } catch (err) {
      setError("Erro ao fazer upload. Tente novamente.");
      setUploadedFile(null);
    }
  };
  
  const removeFile = () => {
    setUploadedFile(null);
    setError(null);
  };
  
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };
  
  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon;
    if (type.startsWith("audio/")) return Music;
    if (type.startsWith("video/")) return Video;
    return File;
  };
  
  if (uploadedFile) {
    const Icon = getFileIcon(uploadedFile.metadata.type);
    
    return (
      <div className="border border-zinc-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-zinc-500" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-zinc-900">{uploadedFile.file.name}</p>
            <p className="text-sm text-zinc-500">
              {formatSize(uploadedFile.file.size)}
              {uploadedFile.uploading && " • Enviando..."}
            </p>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="p-1 text-zinc-400 hover:text-zinc-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {uploadedFile.uploading && (
          <div className="mt-3 h-2 bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-900 animate-pulse" style={{ width: "100%" }} />
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? "border-zinc-900 bg-zinc-50" 
            : "border-zinc-300 hover:border-zinc-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
        <p className="text-zinc-600 mb-2">
          Arraste um arquivo aqui ou clique para selecionar
        </p>
        <p className="text-sm text-zinc-500">
          Tamanho máximo: {maxSize}MB
        </p>
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-block mt-4 px-4 py-2 bg-zinc-900 text-white rounded-md cursor-pointer hover:bg-zinc-800"
        >
          Selecionar Arquivo
        </label>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

interface TagInputProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export function TagInput({ label, items, onChange, placeholder }: TagInputProps) {
  const [value, setValue] = useState("");
  
  const addItem = () => {
    if (value.trim() && !items.includes(value.trim())) {
      onChange([...items, value.trim()]);
      setValue("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };
  
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 rounded-full text-sm"
          >
            {item}
            <button
              type="button"
              onClick={() => onChange(items.filter((x) => x !== item))}
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Adicionar..."}
          className="flex-1 px-3 py-2 border border-zinc-300 rounded-md text-sm"
        />
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}