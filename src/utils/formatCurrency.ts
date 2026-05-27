export function formatVND(value: number | string | undefined | null): string {
  const n = Number(value || 0);
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatNumber(value: number | string | undefined | null): string {
  const n = Number(value || 0);
  return new Intl.NumberFormat("vi-VN").format(n);
}

export function parseVNDInput(value: number | string | undefined | null): number {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const cleaned = String(value).replace(/[^\d.-]/g, "");
  return Number(cleaned) || 0;
}
