"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ArtworkForm } from "@/components/admin/forms/ArtworkForm";

export default function NewArtworkPage() {
  const router = useRouter();
  
  const handleSubmit = async (data: any) => {
    // Simular envio
    console.log("Enviando dados:", data);
    
    // Aqui faria a chamada à API
    // await fetch("/api/admin/artworks", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    
    alert("Obra salva com sucesso! (Simulação)");
    router.push("/admin/artworks");
  };
  
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/artworks"
              className="p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-md"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">Nova Obra</h1>
              <p className="text-sm text-zinc-500 mt-1">
                Adicione uma nova obra ao acervo
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-zinc-200 p-6 md:p-8">
          <ArtworkForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}