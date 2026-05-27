import {
  LayoutDashboard,
  ArrowLeftRight,
  Tag,
  Wallet,
  Target,
  ScanLine,
  BarChart3,
  User,
  PiggyBank,
  LogOut,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/transactions", label: "Giao dịch", icon: ArrowLeftRight },
  { href: "/ocr", label: "Quét hóa đơn", icon: ScanLine, highlight: true },
  { href: "/wallets", label: "Ví & Tài khoản", icon: Wallet },
  { href: "/categories", label: "Danh mục", icon: Tag },
  { href: "/budgets", label: "Ngân sách", icon: PiggyBank },
  { href: "/goals", label: "Mục tiêu", icon: Target },
  { href: "/reports", label: "Báo cáo", icon: BarChart3 },
  { href: "/profile", label: "Hồ sơ", icon: User },
];

interface SidebarProps {
  currentPath: string;
}

export default function Sidebar({ currentPath = "" }: SidebarProps) {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-white/5 bg-[#202020]/80 backdrop-blur-xl z-20">
      <div className="flex h-16 items-center gap-2.5 border-b border-white/5 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD100] to-[#FFEE32] text-[#202020] shadow-[0_0_24px_-6px_rgba(255,209,0,0.7)]">
          <Sparkles size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-tight text-white">
            Tiền Của Tôi Đâu
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#FFD100]">
            Finance Tracker
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            currentPath === item.href ||
            currentPath.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                isActive
                  ? "bg-[#FFD100]/10 text-[#FFD100] shadow-[inset_0_0_0_1px_rgba(255,209,0,0.2)]"
                  : "text-[#D6D6D6]/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{item.label}</span>
              {item.highlight && !isActive && (
                <span className="ml-auto rounded-full bg-[#FFD100]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#FFD100]">
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 p-3">
        <Link
          href="/account/logout"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#D6D6D6]/70 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} />
          <span className="font-medium">Đăng xuất</span>
        </Link>
      </div>
    </aside>
  );
}
