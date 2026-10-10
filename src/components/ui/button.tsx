import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2",
          variant === "default" && "bg-[#D3A373] text-white hover:bg-[#b08558]",
          variant === "outline" && "border border-[#D3A373] text-[#D3A373] hover:bg-[#FEF9E1]",
          variant === "ghost" && "hover:bg-black/5",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"