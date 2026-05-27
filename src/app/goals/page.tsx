"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Target, Calendar } from "lucide-react";
import { toast } from "sonner";
import { differenceInDays, parseISO } from "date-fns";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { formatVND } from "@/utils/formatCurrency";
import { formatDateVN, toDateInputValue } from "@/utils/formatDate";

interface GoalFormProps {
  initial: any;
  onSubmit: (payload: any) => void;
  onCancel: () => void;
  loading: boolean;
}

function GoalForm({ initial, onSubmit, onCancel, loading }: GoalFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [targetAmount, setTargetAmount] = useState(initial?.target_amount || "");
  const [currentAmount, setCurrentAmount] = useState(initial?.current_amount || "");
  const [deadline, setDeadline] = useState(
    initial?.deadline ? toDateInputValue(initial.deadline) : ""
  );
  const [description, setDescription] = useState(initial?.description || "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Vui lòng nhập tên mục tiêu");
      return;
    }
    const target = Number(targetAmount);
    if (!target || target <= 0) {
      setError("Số tiền mục tiêu không hợp lệ");
      return;
    }
    onSubmit({
      name: name.trim(),
      target_amount: target,
      current_amount: Number(currentAmount) || 0,
      deadline: deadline || null,
      description: description || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Tên mục tiêu"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        placeholder="Ví dụ: Mua laptop mới"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Số tiền mục tiêu (VND)"
          type="number"
          value={targetAmount}
          onChange={(e: any) => setTargetAmount(e.target.value)}
          placeholder="0"
        />
        <Input
          label="Đã có (VND)"
          type="number"
          value={currentAmount}
          onChange={(e: any) => setCurrentAmount(e.target.value)}
          placeholder="0"
        />
      </div>
      <Input
        label="Hạn chót (tùy chọn)"
        type="date"
        value={deadline}
        onChange={(e: any) => setDeadline(e.target.value)}
      />
      <Textarea
        label="Mô tả (tùy chọn)"
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
        rows={2}
        placeholder="Lý do, ghi chú thêm..."
      />

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
          {initial ? "Lưu thay đổi" : "Tạo mục tiêu"}
        </Button>
      </div>
    </form>
  );
}

export default function GoalsPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const res = await fetch("/api/goals");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  const createMut = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || `HTTP ${res.status}`);
      return d;
    },
    onSuccess: () => {
      toast.success("Đã tạo mục tiêu");
      setModalOpen(false);
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const updateMut = useMutation({
    mutationFn: async ({ id, payload }: { id: string | number; payload: any }) => {
      const res = await fetch(`/api/goals/${id}`, {
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
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`/api/goals/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `HTTP ${res.status}`);
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Đã xóa");
      setConfirmDelete(null);
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const goals = data?.goals || [];

  return (
    <AppShell currentPath="/goals">
      <PageHeader
        title="Mục tiêu tiết kiệm"
        subtitle="Đặt mục tiêu và theo dõi tiến độ tài chính"
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            <Plus size={16} /> Thêm mục tiêu
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      ) : goals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="Chưa có mục tiêu nào"
          description="Đặt mục tiêu tiết kiệm để có động lực quản lý chi tiêu."
          action={
            <Button onClick={() => setModalOpen(true)}>
              <Plus size={16} /> Tạo mục tiêu
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {goals.map((g: any) => {
            const current = Number(g.current_amount) || 0;
            const target = Number(g.target_amount) || 1;
            const pct = Math.round((current / target) * 100);
            const remaining = Math.max(target - current, 0);
            let monthsLeft: number | null = null;
            let monthlyNeeded: number | null = null;
            if (g.deadline) {
              const days = differenceInDays(parseISO(g.deadline), new Date());
              monthsLeft = Math.max(Math.ceil(days / 30), 0);
              monthlyNeeded =
                monthsLeft > 0 ? remaining / monthsLeft : remaining;
            }
            const completed = pct >= 100;
            return (
              <GlassCard
                key={g.id}
                padding="p-6"
                hover
                glow={completed}
                className={`group ${completed ? "border-[#FFD100]/30" : ""}`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD100]/20 to-[#FFEE32]/10 text-[#FFD100] ring-1 ring-[#FFD100]/20">
                        <Target size={16} />
                      </div>
                      <h3 className="text-base font-semibold text-white">
                        {g.name}
                      </h3>
                    </div>
                    {g.description && (
                      <p className="mt-2 text-xs text-[#D6D6D6]/60 line-clamp-2">
                        {g.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => {
                        setEditing(g);
                        setModalOpen(true);
                      }}
                      className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-white/5 hover:text-white"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(g)}
                      className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-red-500/15 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-[#FFEE32]">
                    {formatVND(current)}
                  </span>
                  <span className="text-sm text-[#D6D6D6]/60">
                    / {formatVND(target)}
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FFD100] to-[#FFEE32] transition-all"
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-[#D6D6D6]/50">Hoàn thành</p>
                    <p className="font-semibold text-white">{pct}%</p>
                  </div>
                  <div>
                    <p className="text-[#D6D6D6]/50">Còn cần</p>
                    <p className="font-semibold text-white">
                      {formatVND(remaining)}
                    </p>
                  </div>
                </div>

                {g.deadline && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs">
                    <Calendar size={13} className="text-[#FFD100]" />
                    <span className="text-[#D6D6D6]/70">Hạn:</span>
                    <span className="font-medium text-white">
                      {formatDateVN(g.deadline)}
                    </span>
                    {monthsLeft !== null &&
                      monthsLeft > 0 &&
                      monthlyNeeded !== null &&
                      monthlyNeeded > 0 &&
                      !completed && (
                        <span className="ml-auto text-[#FFEE32]">
                          ~{formatVND(monthlyNeeded)}/tháng
                        </span>
                      )}
                  </div>
                )}

                {completed && (
                  <p className="mt-3 rounded-lg bg-[#FFD100]/15 px-3 py-1.5 text-xs font-medium text-[#FFEE32]">
                    🎉 Chúc mừng! Bạn đã đạt mục tiêu này.
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
        title={editing ? "Sửa mục tiêu" : "Thêm mục tiêu mới"}
      >
        <GoalForm
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
        title="Xóa mục tiêu"
        message={`Xóa mục tiêu "${confirmDelete?.name}"?`}
      />
    </AppShell>
  );
}
