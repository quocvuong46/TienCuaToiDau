import { forwardRef, InputHTMLAttributes, ComponentType } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  hint?: string | null;
  leftIcon?: ComponentType<any>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, leftIcon: LeftIcon, className = "", ...rest },
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
        suppressHydrationWarning
        className={`flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors focus-within:border-[#FFD100]/60 focus-within:bg-white/[0.06] ${
          error ? "border-red-500/50" : ""
        }`}
      >
        {LeftIcon && (
          <span className="pl-3 text-[#D6D6D6]/50">
            <LeftIcon size={16} />
          </span>
        )}
        <input
          ref={ref}
          suppressHydrationWarning
          className={`w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-[#D6D6D6]/40 outline-none ${className}`}
          {...rest}
        />
      </div>
      {hint && !error && <p className="text-xs text-[#D6D6D6]/50">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
});

export default Input;
