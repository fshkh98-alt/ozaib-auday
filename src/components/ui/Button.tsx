import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-accent text-bg hover:opacity-90",
  secondary: "bg-surface-2 text-text border border-border hover:bg-surface",
  ghost: "bg-transparent text-text hover:bg-surface-2",
};

// Same visual styles as <Button>, but as a plain class string so it can be
// applied to a <Link> (or any element) instead of a real <button>.
export function buttonClasses(variant: Variant = "primary", className = "") {
  return cn(
    "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-[background-color,opacity] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
    variantStyles[variant],
    className
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-[background-color,opacity] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
