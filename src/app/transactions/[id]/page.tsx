"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Calendar,
  Wallet,
  Tag,
  Building2,
  FileText,
  DollarSign,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Skeleton from "@/components/ui/Skeleton";
import TransactionForm from "@/components/forms/TransactionForm";
import { getIcon } from "@/utils/categoryIcons";
import { formatVND } from "@/utils/formatCurrency";
import { formatDateVN } from "@/utils/formatDate";

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id;

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Fetch transaction details
  const { data, isLoading, error } = useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const res = await fetch(`/api/transactions/${id}`);
      if (!res.ok) throw new Error("Giao dịch không tồn tại hoặc lỗi tải dữ liệu");
      return res.json();
    },
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["transaction", id] });
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: ["wallets"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    queryClient.invalidateQueries({ queryKey: ["budgets"] });
  };

  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Đã cập nhật giao dịch");
      setModalOpen(false);
      invalidateAll();
    },
    onError: (err: any) => toast.error(err.message || "Không thể cập nhật"),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `HTTP ${res.status}`);
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Đã xóa giao dịch");
      router.push("/transactions");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: any) => toast.error(err.message || "Không thể xóa"),
  });

  const handleSubmit = (payload: any) => {
    updateMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <AppShell currentPath="/transactions">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-96 md:col-span-2 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </AppShell>
    );
  }

  if (error || !data?.transaction) {
    return (
      <AppShell currentPath="/transactions">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-red-400 mb-4 font-semibold">Giao dịch không tồn tại hoặc đã bị xóa</p>
          <Button onClick={() => router.push("/transactions")}>
            <ArrowLeft size={16} /> Quay lại danh sách
          </Button>
        </div>
      </AppShell>
    );
  }

  const tx = data.transaction;
  const items = data.items || [];
  const CategoryIcon = getIcon(tx.category_icon);
  const isIncome = tx.type === "income";

  return (
    <AppShell currentPath="/transactions">
      <div className="mb-6">
        <Link
          href="/transactions"
          className="inline-flex items-center gap-1 text-xs text-[#D6D6D6]/60 hover:text-[#FFEE32] transition-colors"
        >
          <ArrowLeft size={14} /> Quay lại danh sách
        </Link>
      </div>

      <PageHeader
        title={tx.merchant_name || tx.description || tx.category_name || "Chi tiết giao dịch"}
        subtitle="Thông tin chi tiết về khoản thu chi của bạn"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="md" onClick={() => setModalOpen(true)}>
              <Pencil size={16} /> Chỉnh sửa
            </Button>
            <Button variant="ghost" size="md" className="text-red-400 hover:bg-red-500/10 hover:text-red-300" onClick={() => setConfirmDelete(true)}>
              <Trash2 size={16} /> Xóa
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side: General Info Card */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard padding="p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/5 pb-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#D6D6D6]/50">Số tiền giao dịch</p>
                <p className={`text-3xl font-extrabold mt-1 ${isIncome ? "text-[#FFEE32]" : "text-white"}`}>
                  {isIncome ? "+" : "-"} {formatVND(tx.amount)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  isIncome ? "bg-[#FFEE32]/10 text-[#FFEE32]" : "bg-white/5 text-[#D6D6D6]"
                }`}>
                  {isIncome ? "Thu nhập" : "Chi tiêu"}
                </span>
                {tx.ocr_confidence && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                    AI Quét ({tx.ocr_confidence}%)
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#D6D6D6]">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#D6D6D6]/50">Ngày giao dịch</p>
                  <p className="text-sm font-medium text-white mt-0.5">{formatDateVN(tx.transaction_date)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#D6D6D6]">
                  <Wallet size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#D6D6D6]/50">Ví / Tài khoản</p>
                  <p className="text-sm font-medium text-white mt-0.5">{tx.wallet_name || "Không có ví"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${tx.category_color || "#FFD100"}15`,
                    color: tx.category_color || "#FFD100",
                  }}
                >
                  <CategoryIcon size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#D6D6D6]/50">Danh mục</p>
                  <p className="text-sm font-medium text-white mt-0.5">{tx.category_name || "Không phân loại"}</p>
                </div>
              </div>

              {tx.merchant_name && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#D6D6D6]">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#D6D6D6]/50">Cửa hàng / Người nhận</p>
                    <p className="text-sm font-medium text-white mt-0.5">{tx.merchant_name}</p>
                  </div>
                </div>
              )}
            </div>

            {tx.description && (
              <div className="mt-8 border-t border-white/5 pt-6">
                <p className="text-[10px] uppercase tracking-wider text-[#D6D6D6]/50 mb-2">Ghi chú</p>
                <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 text-sm text-[#D6D6D6]/80 leading-relaxed whitespace-pre-wrap">
                  {tx.description}
                </div>
              </div>
            )}
          </GlassCard>

          {/* Itemized receipt details (from OCR) */}
          {items.length > 0 && (
            <GlassCard padding="p-6">
              <h3 className="text-sm font-semibold text-white mb-4">
                Chi tiết sản phẩm hóa đơn
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-[#D6D6D6]">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-[#D6D6D6]/40">
                      <th className="pb-3 pl-1 font-semibold">Tên mặt hàng</th>
                      <th className="pb-3 text-right font-semibold">SL</th>
                      <th className="pb-3 text-right font-semibold">Đơn giá</th>
                      <th className="pb-3 pr-1 text-right font-semibold">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {items.map((item: any) => (
                      <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-3.5 pl-1 font-medium text-white">{item.name}</td>
                        <td className="py-3.5 text-right font-semibold text-white">
                          {Number(item.quantity)}
                        </td>
                        <td className="py-3.5 text-right text-[#D6D6D6]/80">
                          {formatVND(item.price)}
                        </td>
                        <td className="py-3.5 pr-1 text-right font-bold text-white">
                          {formatVND(Number(item.price) * Number(item.quantity))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          )}
        </div>

        {/* Right Side: Receipt Image Preview */}
        <div className="lg:col-span-1">
          {tx.image_url ? (
            <GlassCard padding="p-4" className="sticky top-6">
              <p className="text-[10px] uppercase tracking-wider text-[#D6D6D6]/50 mb-3 font-semibold">
                Ảnh hóa đơn đính kèm
              </p>
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <img
                  src={tx.image_url}
                  alt="Invoice receipt"
                  className="w-full h-auto max-h-[500px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <a
                  href={tx.image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md border border-white/20">
                    Xem ảnh gốc
                  </span>
                </a>
              </div>
            </GlassCard>
          ) : (
            <GlassCard padding="p-6" className="flex flex-col items-center justify-center text-center text-[#D6D6D6]/40 py-12 sticky top-6">
              <FileText size={40} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">Không có ảnh hóa đơn</p>
              <p className="text-xs text-[#D6D6D6]/30 mt-1 max-w-[200px]">
                Giao dịch này được tạo thủ công và không đính kèm hình ảnh.
              </p>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Chỉnh sửa giao dịch"
        size="lg"
      >
        <TransactionForm
          initial={tx}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={updateMutation.isPending}
          submitLabel="Lưu thay đổi"
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => deleteMutation.mutate()}
        loading={deleteMutation.isPending}
        title="Xóa giao dịch"
        message={`Bạn có chắc chắn muốn xóa giao dịch "${
          tx.merchant_name || tx.description || "này"
        }"? Số tiền sẽ được hoàn lại vào tài khoản.`}
      />
    </AppShell>
  );
}
