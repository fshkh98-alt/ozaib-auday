import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6 shadow-soft transition-transform duration-150 hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}
