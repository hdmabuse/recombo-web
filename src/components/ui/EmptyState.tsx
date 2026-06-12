import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  message: string;
  action?: ReactNode;
}

export function EmptyState({ icon, message, action }: EmptyStateProps) {
  return (
    <div className="py-16 text-center">
      {icon && <div className="mb-4 flex justify-center text-zinc-300">{icon}</div>}
      <p className="mb-4 text-zinc-500">{message}</p>
      {action}
    </div>
  );
}
