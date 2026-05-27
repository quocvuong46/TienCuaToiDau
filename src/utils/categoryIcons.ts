import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  Film,
  HeartPulse,
  GraduationCap,
  Home,
  Briefcase,
  Tag,
  Wallet,
  CreditCard,
  Landmark,
  Smartphone,
  PiggyBank,
  Gift,
  Plane,
  Coffee,
  Fuel,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Banknote,
} from "lucide-react";

export const ICON_MAP: Record<string, React.ComponentType<any>> = {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  Film,
  HeartPulse,
  GraduationCap,
  Home,
  Briefcase,
  Tag,
  Wallet,
  CreditCard,
  Landmark,
  Smartphone,
  PiggyBank,
  Gift,
  Plane,
  Coffee,
  Fuel,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Banknote,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);

export function getIcon(name: string): React.ComponentType<any> {
  return ICON_MAP[name] || Tag;
}

export const DEFAULT_CATEGORIES = [
  {
    name: "Ăn uống",
    icon: "UtensilsCrossed",
    color: "#FB923C",
    type: "expense",
  },
  { name: "Di chuyển", icon: "Car", color: "#3B82F6", type: "expense" },
  { name: "Mua sắm", icon: "ShoppingBag", color: "#EC4899", type: "expense" },
  { name: "Hóa đơn", icon: "Receipt", color: "#EF4444", type: "expense" },
  { name: "Giải trí", icon: "Film", color: "#8B5CF6", type: "expense" },
  { name: "Sức khỏe", icon: "HeartPulse", color: "#22C55E", type: "expense" },
  {
    name: "Giáo dục",
    icon: "GraduationCap",
    color: "#06B6D4",
    type: "expense",
  },
  { name: "Nhà cửa", icon: "Home", color: "#F59E0B", type: "expense" },
  { name: "Khác", icon: "Tag", color: "#D6D6D6", type: "expense" },
  { name: "Lương", icon: "Banknote", color: "#FFD100", type: "income" },
  { name: "Thưởng", icon: "Gift", color: "#FFEE32", type: "income" },
  { name: "Đầu tư", icon: "TrendingUp", color: "#10B981", type: "income" },
];

export const DEFAULT_WALLETS = [
  { name: "Tiền mặt", icon: "Wallet", color: "#FFD100", type: "cash" },
  { name: "Ngân hàng", icon: "Landmark", color: "#3B82F6", type: "bank" },
];

export const WALLET_TYPES = [
  { value: "cash", label: "Tiền mặt" },
  { value: "bank", label: "Ngân hàng" },
  { value: "ewallet", label: "Ví điện tử" },
  { value: "credit", label: "Thẻ tín dụng" },
  { value: "savings", label: "Tiết kiệm" },
];
