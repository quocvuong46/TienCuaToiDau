import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | null;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className = "", rows = 3, ...rest },
  ref
) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-medium text-[#D6D6D6]/80">
          {label}
        </label>
      )}
      <div
        className={`overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors focus-within:border-[#FFD100]/60 ${
          error ? "border-red-500/50" : ""
        }`}
      >
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full resize-none bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-[#D6D6D6]/40 outline-none ${className}`}
          {...rest}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
});

export default Textarea;
