import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer",
          {
            "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105":
              variant === "primary",
            "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm":
              variant === "secondary",
            "border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10":
              variant === "outline",
            "text-gray-300 hover:text-white hover:bg-white/10":
              variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-2.5 text-sm": size === "md",
            "px-8 py-3 text-base": size === "lg",
            "px-10 py-4 text-lg": size === "xl",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
