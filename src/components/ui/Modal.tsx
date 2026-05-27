import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full ${widths[size]} max-h-[90vh] overflow-hidden rounded-2xl border border-white/15 bg-[#202020]/95 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7),0_0_60px_-20px_rgba(255,209,0,0.3)]`}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="max-h-[calc(90vh-8rem)] overflow-y-auto p-6">
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4 bg-black/20">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
