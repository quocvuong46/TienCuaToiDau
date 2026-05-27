import { ICON_OPTIONS, getIcon } from "@/utils/categoryIcons";
import { ICON_COLORS } from "@/utils/colors";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[#D6D6D6]/80">
        Icon
      </label>
      <div className="grid grid-cols-8 gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        {ICON_OPTIONS.map((name) => {
          const Icon = getIcon(name);
          const active = value === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
                active
                  ? "bg-[#FFD100]/20 text-[#FFD100] ring-1 ring-[#FFD100]/40"
                  : "text-[#D6D6D6]/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[#D6D6D6]/80">
        Màu sắc
      </label>
      <div className="flex flex-wrap gap-2">
        {ICON_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={`h-8 w-8 rounded-lg transition-all ${
              value === c
                ? "ring-2 ring-white ring-offset-2 ring-offset-[#202020] scale-110"
                : "hover:scale-105"
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}
