"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Mail, Calendar, Save, Camera, LogOut } from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";
import useUpload from "@/utils/useUpload";
import { formatDateTimeVN } from "@/utils/formatDate";
import Link from "next/link";

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [upload, { loading: uploading }] = useUpload();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  useEffect(() => {
    if (data?.profile) {
      setFullName(data.profile.full_name || data.profile.auth_name || "");
      setAvatarUrl(data.profile.avatar_url || data.profile.auth_image || "");
    }
  }, [data]);

  const updateMut = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || `HTTP ${res.status}`);
      return d;
    },
    onSuccess: () => {
      toast.success("Đã cập nhật hồ sơ");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { url, error } = await upload({ file });
    if (error) {
      toast.error("Không thể tải ảnh: " + error);
      return;
    }
    if (url) {
      setAvatarUrl(url);
      updateMut.mutate({ avatar_url: url });
    }
  };

  const handleSave = () => {
    updateMut.mutate({ full_name: fullName });
  };

  const profile = data?.profile;

  return (
    <AppShell currentPath="/profile">
      <PageHeader
        title="Hồ sơ cá nhân"
        subtitle="Quản lý thông tin tài khoản của bạn"
      />

      {isLoading ? (
        <Skeleton className="h-96 rounded-2xl" />
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Avatar card */}
          <GlassCard padding="p-6" className="md:col-span-1 text-center">
            <div className="relative mx-auto inline-block">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="h-24 w-24 rounded-full object-cover ring-2 ring-[#FFD100]/40"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD100]/30 to-[#FFEE32]/10 text-[#FFD100] ring-2 ring-[#FFD100]/40">
                  <User size={36} />
                </div>
              )}
              <label className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#FFD100] text-[#202020] shadow-[0_0_20px_-4px_rgba(255,209,0,0.7)] hover:bg-[#FFEE32]">
                <Camera size={14} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              {fullName || "Chưa cập nhật tên"}
            </h3>
            <p className="text-xs text-[#D6D6D6]/60">{profile?.email}</p>
            {uploading && (
              <p className="mt-2 text-xs text-[#FFD100]">Đang tải ảnh...</p>
            )}
          </GlassCard>

          {/* Details */}
          <GlassCard padding="p-6" className="md:col-span-2 space-y-4">
            <Input
              label="Họ và tên"
              leftIcon={User}
              value={fullName}
              onChange={(e: any) => setFullName(e.target.value)}
              placeholder="Nhập họ tên của bạn"
            />
            <Input
              label="Email"
              leftIcon={Mail}
              value={profile?.email || ""}
              disabled
              hint="Email không thể thay đổi"
            />
            {profile?.created_at && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#D6D6D6]/80">
                  Ngày tạo tài khoản
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-[#D6D6D6]">
                  <Calendar size={16} className="text-[#FFD100]" />
                  {formatDateTimeVN(profile.created_at)}
                </div>
              </div>
            )}

            <div className="flex justify-between gap-2 pt-3 border-t border-white/5">
              <Link
                href="/account/logout"
                className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300 hover:bg-red-500/20"
              >
                <LogOut size={14} /> Đăng xuất
              </Link>
              <Button onClick={handleSave} loading={updateMut.isPending}>
                <Save size={16} /> Lưu thay đổi
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </AppShell>
  );
}
