"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total?: number;
  showingFrom?: number;
  showingTo?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  total,
  showingFrom,
  showingTo,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3">
      <div className="text-sm text-zinc-600">
        {total && showingFrom && showingTo && (
          <span>
            Mostrando {showingFrom} a {showingTo} de {total}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded p-2 transition-colors hover:bg-zinc-100 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "rounded px-3 py-1 text-sm transition-colors",
              page === currentPage ? "bg-zinc-900 text-white" : "hover:bg-zinc-100",
            )}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="rounded p-2 transition-colors hover:bg-zinc-100 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
