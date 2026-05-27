"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Wallet } from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { IconPicker, ColorPicker } from "@/components/forms/IconPicker";
import { getIcon, WALLET_TYPES } from "@/utils/categoryIcons";
import { formatVND } from "@/utils/formatCurrency";

interface WalletFormProps {
  initial: any;
  onSubmit: (payload: any) => void;
  onCancel: () => void;
  loading: boolean;
}

function WalletForm({ initial, onSubmit, onCancel, loading }: WalletFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [type, setType] = useState(initial?.type || "cash");
  const [icon, setIcon] = useState(initial?.icon || "Wallet");
  const [color, setColor] = useState(initial?.color || "#FFD100");
  const [initialBalance, setInitialBalance] = useState(
    initial?.initial_balance || ""
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Vui lòng nhập tên ví");
      return;
    }
    onSubmit({
      name: name.trim(),
      type,
      icon,
      color,
      initial_balance: Number(initialBalance) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Tên ví"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        placeholder="Ví dụ: Vietcombank"
      />
      <Select
        label="Loại ví"
        value={type}
        onChange={(e: any) => setType(e.target.value)}
        placeholder="Chọn loại"
        options={WALLET_TYPES}
      />
      <Input
        label={
          initial
            ? "Số dư ban đầu (số dư hiện tại sẽ được điều chỉnh)"
            : "Số dư ban đầu"
        }
        type="number"
        value={initialBalance}
        onChange={(e: any) => setInitialBalance(e.target.value)}
        placeholder="0"
      />
      <IconPicker value={icon} onChange={setIcon} />
      <ColorPicker value={color} onChange={setColor} />

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Hủy
        </Button>
        <Button type="submit" loading={loading}>
          {initial ? "Lưu thay đổi" : "Tạo ví"}
        </Button>
      </div>
    </form>
  );
}

export default function WalletsPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const res = await fetch("/api/wallets");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  const createMut = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/wallets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || `HTTP ${res.status}`);
      return d;
    },
    onSuccess: () => {
      toast.success("Đã tạo ví");
      setModalOpen(false);
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const updateMut = useMutation({
    mutationFn: async ({ id, payload }: { id: string | number; payload: any }) => {
      const res = await fetch(`/api/wallets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || `HTTP ${res.status}`);
      return d;
    },
    onSuccess: () => {
      toast.success("Đã cập nhật ví");
      setModalOpen(false);
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`/api/wallets/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `HTTP ${res.status}`);
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Đã xóa ví");
      setConfirmDelete(null);
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const wallets = data?.wallets || [];
  const totalBalance = wallets.reduce(
    (s: number, w: any) => s + Number(w.current_balance || 0),
    0
  );

  return (
    <AppShell currentPath="/wallets">
      <PageHeader
        title="Ví & Tài khoản"
        subtitle="Quản lý tất cả tài khoản tiền của bạn"
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            <Plus size={16} /> Thêm ví
          </Button>
        }
      />

      {/* Total card */}
      <GlassCard glow padding="p-6" className="mb-6 border-[#FFD100]/20">
        <p className="text-xs uppercase tracking-wider text-[#D6D6D6]/60">
          Tổng số dư tất cả ví
        </p>
        <p className="mt-1 text-3xl font-bold text-[#FFEE32]">
          {formatVND(totalBalance)}
        </p>
        <p className="mt-1 text-xs text-[#D6D6D6]/50">
          {wallets.length} ví đang hoạt động
        </p>
      </GlassCard>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : wallets.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="Chưa có ví"
          description="Tạo ví đầu tiên để bắt đầu theo dõi giao dịch."
          action={
            <Button onClick={() => setModalOpen(true)}>
              <Plus size={16} /> Thêm ví
            </Button>
          }
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {wallets.map((w: any) => {
            const Icon = getIcon(w.icon);
            const typeLabel =
              WALLET_TYPES.find((t) => t.value === w.type)?.label || w.type;
            return (
              <GlassCard
                key={w.id}
                padding="p-5"
                hover
                className="group relative"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${w.color}25`, color: w.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => {
                        setEditing(w);
                        setModalOpen(true);
                      }}
                      className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-white/5 hover:text-white"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(w)}
                      className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-red-500/15 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-white">
                  {w.name}
                </p>
                <p className="text-xs text-[#D6D6D6]/50">{typeLabel}</p>
                <p className="mt-3 text-xl font-bold text-[#FFEE32]">
                  {formatVND(w.current_balance)}
                </p>
              </GlassCard>
            );
          })}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        title={editing ? "Sửa ví" : "Thêm ví mới"}
      >
        <WalletForm
          initial={editing}
          onSubmit={(payload) => {
            if (editing) updateMut.mutate({ id: editing.id, payload });
            else createMut.mutate(payload);
          }}
          onCancel={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          loading={createMut.isPending || updateMut.isPending}
        />
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => deleteMut.mutate(confirmDelete.id)}
        loading={deleteMut.isPending}
        title="Xóa ví"
        message={`Xóa ví "${confirmDelete?.name}"? Các giao dịch liên quan sẽ chuyển sang "Không có ví".`}
      />
    </AppShell>
  );
}
