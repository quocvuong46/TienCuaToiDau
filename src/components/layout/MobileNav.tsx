import { useState } from "react";
import { Menu, X, Sparkles, LogOut } from "lucide-react";
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
} from "lucide-react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/transactions", label: "Giao dịch", icon: ArrowLeftRight },
  { href: "/ocr", label: "Quét hóa đơn", icon: ScanLine },
  { href: "/wallets", label: "Ví & Tài khoản", icon: Wallet },
  { href: "/categories", label: "Danh mục", icon: Tag },
  { href: "/budgets", label: "Ngân sách", icon: PiggyBank },
  { href: "/goals", label: "Mục tiêu", icon: Target },
  { href: "/reports", label: "Báo cáo", icon: BarChart3 },
  { href: "/profile", label: "Hồ sơ", icon: User },
];

interface MobileNavProps {
  currentPath: string;
}

export default function MobileNav({ currentPath }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/5 bg-[#202020]/90 backdrop-blur-xl px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFD100] to-[#FFEE32] text-[#202020]">
            <Sparkles size={16} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold text-white">Tiền Của Tôi Đâu</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-[#D6D6D6] hover:bg-white/5"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {open && (
        <div className="md:hidden fixed inset-0 top-14 z-20 bg-[#202020]/95 backdrop-blur-2xl">
          <nav className="space-y-1 p-4">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                    isActive
                      ? "bg-[#FFD100]/10 text-[#FFD100]"
                      : "text-[#D6D6D6] hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <Link
              href="/account/logout"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
            >
              <LogOut size={18} />
              <span className="font-medium">Đăng xuất</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
