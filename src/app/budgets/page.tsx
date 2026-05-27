"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Pencil,
  Trash2,
  PiggyBank,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { getIcon } from "@/utils/categoryIcons";
import { formatVND } from "@/utils/formatCurrency";

interface BudgetFormProps {
  initial: any;
  categories: any[];
  month: number;
  year: number;
  onSubmit: (payload: any) => void;
  onCancel: () => void;
  loading: boolean;
}

function BudgetForm({
  initial,
  categories,
  month,
  year,
  onSubmit,
  onCancel,
  loading,
}: BudgetFormProps) {
  const [categoryId, setCategoryId] = useState(initial?.category_id || "");
  const [limitAmount, setLimitAmount] = useState(initial?.limit_amount || "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(limitAmount);
    if (!categoryId) {
      setError("Vui lòng chọn danh mục");
      return;
    }
    if (!amt || amt <= 0) {
      setError("Số tiền không hợp lệ");
      return;
    }
    onSubmit({
      category_id: categoryId,
      month,
      year,
      limit_amount: amt,
    });
  };

  const expenseCats = categories.filter(
    (c) => c.type === "expense" || c.type === "both"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Danh mục"
        value={categoryId}
        onChange={(e: any) => setCategoryId(e.target.value)}
        placeholder="Chọn danh mục chi tiêu"
        options={expenseCats.map((c) => ({ value: String(c.id), label: c.name }))}
        disabled={!!initial}
      />
      <Input
        label="Hạn mức (VND)"
        type="number"
        value={limitAmount}
        onChange={(e: any) => setLimitAmount(e.target.value)}
        placeholder="0"
      />
      {limitAmount && Number(limitAmount) > 0 && (
        <p className="-mt-2 text-xs text-[#FFEE32]">
          {formatVND(Number(limitAmount))}
        </p>
      )}

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
          {initial ? "Lưu thay đổi" : "Tạo ngân sách"}
        </Button>
      </div>
    </form>
  );
}

export default function BudgetsPage() {
  const queryClient = useQueryClient();
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["budgets", month, year],
    queryFn: async () => {
      const res = await fetch(`/api/budgets?month=${month}&year=${year}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });
  const { data: catsData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  const createMut = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || `HTTP ${res.status}`);
      return d;
    },
    onSuccess: () => {
      toast.success("Đã tạo ngân sách");
      setModalOpen(false);
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const updateMut = useMutation({
    mutationFn: async ({ id, payload }: { id: string | number; payload: any }) => {
      const res = await fetch(`/api/budgets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || `HTTP ${res.status}`);
      return d;
    },
    onSuccess: () => {
      toast.success("Đã cập nhật");
      setModalOpen(false);
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`/api/budgets/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `HTTP ${res.status}`);
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Đã xóa");
      setConfirmDelete(null);
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const goPrev = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else setMonth(month - 1);
  };
  const goNext = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else setMonth(month + 1);
  };

  const budgets = data?.budgets || [];
  const totalLimit = budgets.reduce((s: number, b: any) => s + Number(b.limit_amount), 0);
  const totalSpent = budgets.reduce(
    (s: number, b: any) => s + Number(b.spent_amount || 0),
    0
  );

  return (
    <AppShell currentPath="/budgets">
      <PageHeader
        title="Ngân sách"
        subtitle="Đặt giới hạn chi tiêu cho từng danh mục"
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            <Plus size={16} /> Tạo ngân sách
          </Button>
        }
      />

      {/* Month switcher */}
      <GlassCard padding="p-4" className="mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={goPrev}
            className="rounded-lg p-2 text-[#D6D6D6] hover:bg-white/5"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-[#D6D6D6]/50">
              Tháng
            </p>
            <p className="text-lg font-bold text-white">
              {String(month).padStart(2, "0")} / {year}
            </p>
            <p className="mt-1 text-xs text-[#D6D6D6]/60">
              {formatVND(totalSpent)} / {formatVND(totalLimit)}
            </p>
          </div>
          <button
            onClick={goNext}
            className="rounded-lg p-2 text-[#D6D6D6] hover:bg-white/5"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </GlassCard>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      ) : budgets.length === 0 ? (
        <EmptyState
          icon={PiggyBank}
          title="Chưa có ngân sách tháng này"
          description="Tạo ngân sách để theo dõi chi tiêu theo danh mục."
          action={
            <Button onClick={() => setModalOpen(true)}>
              <Plus size={16} /> Tạo ngân sách
            </Button>
          }
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {budgets.map((b: any) => {
            const Icon = getIcon(b.category_icon);
            const spent = Number(b.spent_amount) || 0;
            const limit = Number(b.limit_amount) || 1;
            const pct = Math.round((spent / limit) * 100);
            const over = pct >= 100;
            const warning = pct >= 80 && !over;
            return (
              <GlassCard key={b.id} padding="p-5" hover className="group">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${b.category_color || "#FFD100"}25`,
                        color: b.category_color || "#FFD100",
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {b.category_name}
                      </p>
                      <p className="text-xs text-[#D6D6D6]/50">
                        {formatVND(limit)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => {
                        setEditing(b);
                        setModalOpen(true);
                      }}
                      className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-white/5 hover:text-white"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(b)}
                      className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-red-500/15 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#D6D6D6]/70">Đã dùng</span>
                    <span
                      className={
                        over
                          ? "text-red-400"
                          : warning
                            ? "text-orange-300"
                            : "text-[#FFEE32]"
                      }
                    >
                      {pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full transition-all ${
                        over
                          ? "bg-red-500"
                          : warning
                            ? "bg-orange-400"
                            : "bg-gradient-to-r from-[#FFD100] to-[#FFEE32]"
                      }`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#D6D6D6]/60">
                    <span>{formatVND(spent)}</span>
                    <span>{formatVND(limit - spent)} còn lại</span>
                  </div>
                </div>

                {over && (
                  <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs text-red-300">
                    ⚠ Đã vượt ngân sách {formatVND(spent - limit)}
                  </p>
                )}
                {warning && (
                  <p className="mt-3 rounded-lg bg-orange-500/10 px-3 py-1.5 text-xs text-orange-300">
                    ⚠ Sắp đạt giới hạn
                  </p>
                )}
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
        title={editing ? "Sửa ngân sách" : `Ngân sách tháng ${month}/${year}`}
      >
        <BudgetForm
          initial={editing}
          categories={catsData?.categories || []}
          month={month}
          year={year}
          onSubmit={(payload) => {
            if (editing)
              updateMut.mutate({
                id: editing.id,
                payload: { limit_amount: payload.limit_amount },
              });
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
        title="Xóa ngân sách"
        message={`Xóa ngân sách "${confirmDelete?.category_name}" tháng này?`}
      />
    </AppShell>
  );
}
