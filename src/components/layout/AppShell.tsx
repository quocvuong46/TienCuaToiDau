"use client";

import { useEffect } from "react";
import useUser from "@/utils/useUser";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useRouter } from "next/navigation";

interface AppShellProps {
  children: React.ReactNode;
  currentPath?: string;
}

export default function AppShell({ children, currentPath = "" }: AppShellProps) {
  const { data: user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(
        `/account/signin?callbackUrl=${encodeURIComponent(
          currentPath || "/dashboard"
        )}`
      );
    }
  }, [loading, user, currentPath, router]);

  // Initialize profile (creates default categories/wallets) once user is authenticated
  useEffect(() => {
    if (user) {
      fetch("/api/profile/init", { method: "POST" }).catch(() => {});
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#202020]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#FFD100] border-t-transparent" />
          <p className="text-sm text-[#D6D6D6]/60">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#202020] text-white">
      {/* Ambient glow background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-[#FFD100]/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-[#FFEE32]/[0.04] blur-[140px]" />
      </div>

      <Sidebar currentPath={currentPath} />
      <MobileNav currentPath={currentPath} />

      <main className="relative md:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
