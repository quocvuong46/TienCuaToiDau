import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD100] focus-visible:ring-offset-2 focus-visible:ring-offset-[#202020]";

  const variants = {
    primary:
      "bg-[#FFD100] text-[#202020] hover:bg-[#FFEE32] shadow-[0_0_24px_-8px_rgba(255,209,0,0.6)] hover:shadow-[0_0_32px_-6px_rgba(255,209,0,0.8)]",
    secondary:
      "bg-white/5 border border-white/15 text-[#D6D6D6] hover:bg-white/10 hover:border-white/25",
    ghost: "text-[#D6D6D6] hover:bg-white/5",
    danger:
      "bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500/25",
    outline: "border border-[#FFD100]/40 text-[#FFD100] hover:bg-[#FFD100]/10",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {loading && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
