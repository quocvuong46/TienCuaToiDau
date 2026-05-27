import { format, parseISO, isValid } from "date-fns";
import { vi } from "date-fns/locale";

export function formatDateVN(date: string | Date | undefined | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "";
  return format(d, "dd/MM/yyyy", { locale: vi });
}

export function formatDateTimeVN(date: string | Date | undefined | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "";
  return format(d, "dd/MM/yyyy HH:mm", { locale: vi });
}

export function formatMonthYearVN(date: string | Date | undefined | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "";
  return format(d, "MMMM yyyy", { locale: vi });
}

export function toDateInputValue(date: string | Date | undefined | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "";
  return format(d, "yyyy-MM-dd");
}

export function todayISO(): string {
  return format(new Date(), "yyyy-MM-dd");
}
