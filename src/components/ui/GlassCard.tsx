import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: string;
}

export default function GlassCard({
  children,
  className = "",
  hover = false,
  glow = false,
  padding = "p-6",
}: GlassCardProps) {
  const hoverClass = hover
    ? "hover:border-[#FFD100]/40 hover:bg-white/[0.04] transition-all duration-200"
    : "";
  const glowClass = glow ? "shadow-[0_0_40px_-15px_rgba(255,209,0,0.35)]" : "";
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl ${padding} ${hoverClass} ${glowClass} ${className}`}
      style={{
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {children}
    </div>
  );
}
