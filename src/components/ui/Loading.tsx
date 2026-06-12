import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className, count = 6 }: LoadingProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-zinc-100" />
      ))}
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
    </div>
  );
}
