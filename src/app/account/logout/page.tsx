"use client";

import { useAuth } from "@/utils/useAuth";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function LogoutPage() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#202020] p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#FFD100]/10 blur-[120px]" />
      </div>
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#FFD100]">
            <LogOut size={26} />
          </div>
          <h1 className="text-2xl font-bold text-white">Đăng xuất</h1>
          <p className="mt-1.5 text-sm text-[#D6D6D6]/60">
            Bạn có chắc muốn đăng xuất khỏi tài khoản?
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard"
            className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-medium text-[#D6D6D6] hover:bg-white/10"
          >
            Hủy
          </Link>
          <button
            onClick={handleSignOut}
            className="flex-1 rounded-xl bg-[#FFD100] px-4 py-3 text-sm font-semibold text-[#202020] hover:bg-[#FFEE32] shadow-[0_0_30px_-8px_rgba(255,209,0,0.7)]"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
