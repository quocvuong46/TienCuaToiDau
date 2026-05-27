import { forwardRef, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | null;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    error,
    options = [],
    placeholder = "Chọn...",
    className = "",
    ...rest
  },
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
        className={`relative flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors focus-within:border-[#FFD100]/60 ${
          error ? "border-red-500/50" : ""
        }`}
      >
        <select
          ref={ref}
          className={`w-full appearance-none bg-transparent px-4 py-2.5 pr-9 text-sm text-white outline-none ${className}`}
          {...rest}
        >
          <option value="" className="bg-[#202020]">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#202020]">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 text-[#D6D6D6]/50"
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
});

export default Select;
