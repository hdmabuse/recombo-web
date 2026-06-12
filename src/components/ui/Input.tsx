import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative">
          <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400">
            {icon}
          </div>
          <input
            ref={ref}
            className={cn(
              "w-full rounded-md border border-zinc-300 py-2 pl-9 pr-4 text-sm",
              "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900",
              "placeholder:text-zinc-400",
              className,
            )}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-md border border-zinc-300 px-3 py-2 text-sm",
          "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900",
          "placeholder:text-zinc-400",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
