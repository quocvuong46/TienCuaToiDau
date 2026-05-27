"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Search,
  Filter,
  X,
  Pencil,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  ImageIcon,
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
import TransactionForm from "@/components/forms/TransactionForm";
import { getIcon } from "@/utils/categoryIcons";
import { formatVND } from "@/utils/formatCurrency";
import { formatDateVN } from "@/utils/formatDate";

export default function TransactionsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterWallet, setFilterWallet] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<any | null>(null);

  // Open modal if URL has ?new=1
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("new") === "1") {
        setModalOpen(true);
      }
    }
  }, []);


  const buildQueryString = () => {
    const p = new URLSearchParams();
    if (search) p.set("search", search);
    if (filterType) p.set("type", filterType);
    if (filterCategory) p.set("category_id", filterCategory);
    if (filterWallet) p.set("wallet_id", filterWallet);
    if (dateFrom) p.set("date_from", dateFrom);
    if (dateTo) p.set("date_to", dateTo);
    if (minAmount) p.set("min_amount", minAmount);
    if (maxAmount) p.set("max_amount", maxAmount);
    return p.toString();
  };

  const { data: txData, isLoading } = useQuery({
    queryKey: [
      "transactions",
      search,
      filterType,
      filterCategory,
      filterWallet,
      dateFrom,
      dateTo,
      minAmount,
      maxAmount,
    ],
    queryFn: async () => {
      const res = await fetch(`/api/transactions?${buildQueryString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  const txs = txData?.transactions || [];

  // Open edit modal if URL has ?focus=id
  useEffect(() => {
    if (typeof window !== "undefined" && txs.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const focusId = params.get("focus");
      if (focusId) {
        const found = txs.find((t: any) => String(t.id) === String(focusId));
        if (found) {
          setEditingTx(found);
          setModalOpen(true);
          
          // Clear the focus parameter from the URL bar without reloading
          const url = new URL(window.location.href);
          url.searchParams.delete("focus");
          window.history.replaceState({}, document.title, url.pathname + url.search);
        }
      }
    }
  }, [txs]);

  const { data: catsData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });
  const { data: walletsData } = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const res = await fetch("/api/wallets");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: ["wallets"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    queryClient.invalidateQueries({ queryKey: ["budgets"] });
  };

  const createMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Đã tạo giao dịch mới");
      setModalOpen(false);
      setEditingTx(null);
      invalidateAll();
    },
    onError: (err: any) => toast.error(err.message || "Không thể tạo giao dịch"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string | number; payload: any }) => {
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
      setEditingTx(null);
      invalidateAll();
    },
    onError: (err: any) => toast.error(err.message || "Không thể cập nhật"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `HTTP ${res.status}`);
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Đã xóa giao dịch");
      setConfirmDelete(null);
      invalidateAll();
    },
    onError: (err: any) => toast.error(err.message || "Không thể xóa"),
  });

  const handleSubmit = (payload: any) => {
    if (editingTx) {
      updateMutation.mutate({ id: editingTx.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setFilterType("");
    setFilterCategory("");
    setFilterWallet("");
    setDateFrom("");
    setDateTo("");
    setMinAmount("");
    setMaxAmount("");
  };

  const hasFilters =
    !!filterType ||
    !!filterCategory ||
    !!filterWallet ||
    !!dateFrom ||
    !!dateTo ||
    !!minAmount ||
    !!maxAmount;

  const totalIncome = txs
    .filter((t: any) => t.type === "income")
    .reduce((s: number, t: any) => s + Number(t.amount), 0);
  const totalExpense = txs
    .filter((t: any) => t.type === "expense")
    .reduce((s: number, t: any) => s + Number(t.amount), 0);

  return (
    <AppShell currentPath="/transactions">
      <PageHeader
        title="Giao dịch"
        subtitle="Quản lý tất cả thu chi của bạn"
        actions={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Bộ lọc
              {hasFilters && (
                <span className="ml-1 rounded-full bg-[#FFD100] px-1.5 text-[9px] font-bold text-[#202020]">
                  ●
                </span>
              )}
            </Button>
            <Button
              size="md"
              onClick={() => {
                setEditingTx(null);
                setModalOpen(true);
              }}
            >
              <Plus size={16} /> Thêm giao dịch
            </Button>
          </div>
        }
      />

      {/* Search & summary row */}
      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <Input
            leftIcon={Search}
            placeholder="Tìm theo cửa hàng, mô tả..."
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </div>
        <GlassCard padding="p-3" className="border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-[#D6D6D6]/50">
            Tổng thu (lọc)
          </p>
          <p className="text-lg font-bold text-[#FFEE32]">
            {formatVND(totalIncome)}
          </p>
        </GlassCard>
        <GlassCard padding="p-3" className="border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-[#D6D6D6]/50">
            Tổng chi (lọc)
          </p>
          <p className="text-lg font-bold text-white">
            {formatVND(totalExpense)}
          </p>
        </GlassCard>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <GlassCard padding="p-5" className="mb-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Select
              label="Loại"
              value={filterType}
              onChange={(e: any) => setFilterType(e.target.value)}
              placeholder="Tất cả"
              options={[
                { value: "income", label: "Thu nhập" },
                { value: "expense", label: "Chi tiêu" },
              ]}
            />
            <Select
              label="Danh mục"
              value={filterCategory}
              onChange={(e: any) => setFilterCategory(e.target.value)}
              placeholder="Tất cả"
              options={(catsData?.categories || []).map((c: any) => ({
                value: String(c.id),
                label: c.name,
              }))}
            />
            <Select
              label="Ví"
              value={filterWallet}
              onChange={(e: any) => setFilterWallet(e.target.value)}
              placeholder="Tất cả"
              options={(walletsData?.wallets || []).map((w: any) => ({
                value: String(w.id),
                label: w.name,
              }))}
            />
            <Input
              label="Từ ngày"
              type="date"
              value={dateFrom}
              onChange={(e: any) => setDateFrom(e.target.value)}
            />
            <Input
              label="Đến ngày"
              type="date"
              value={dateTo}
              onChange={(e: any) => setDateTo(e.target.value)}
            />
            <Input
              label="Số tiền tối thiểu"
              type="number"
              value={minAmount}
              onChange={(e: any) => setMinAmount(e.target.value)}
              placeholder="0"
            />
            <Input
              label="Số tiền tối đa"
              type="number"
              value={maxAmount}
              onChange={(e: any) => setMaxAmount(e.target.value)}
              placeholder="0"
            />
            <div className="flex items-end">
              <Button variant="ghost" onClick={resetFilters} className="w-full">
                <X size={14} /> Xóa lọc
              </Button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Transaction list */}
      <GlassCard padding="p-0">
        {isLoading ? (
          <div className="space-y-3 p-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        ) : txs.length === 0 ? (
          <EmptyState
            icon={ArrowLeftRight}
            title="Chưa có giao dịch"
            description={
              hasFilters || search
                ? "Không tìm thấy giao dịch khớp với bộ lọc."
                : "Hãy thêm giao dịch đầu tiên hoặc quét hóa đơn."
            }
            action={
              <Button
                onClick={() => {
                  setEditingTx(null);
                  setModalOpen(true);
                }}
              >
                <Plus size={16} /> Thêm giao dịch
              </Button>
            }
          />
        ) : (
          <div className="divide-y divide-white/5">
            {txs.map((tx: any) => {
              const Icon = getIcon(tx.category_icon);
              const isIncome = tx.type === "income";
              return (
                <div
                  key={tx.id}
                  className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${tx.category_color || "#FFD100"}25`,
                      color: tx.category_color || "#FFD100",
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-white">
                        {tx.merchant_name ||
                          tx.description ||
                          tx.category_name ||
                          "Giao dịch"}
                      </p>
                      {tx.image_url && (
                        <ImageIcon size={12} className="text-[#FFD100]/60" />
                      )}
                    </div>
                    <p className="truncate text-xs text-[#D6D6D6]/50">
                      {tx.category_name || "Không phân loại"}
                      {tx.wallet_name && ` • ${tx.wallet_name}`}
                      {" • "}
                      {formatDateVN(tx.transaction_date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex items-center gap-1 text-sm font-semibold ${
                        isIncome ? "text-[#FFEE32]" : "text-white"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpRight size={14} className="text-[#FFEE32]" />
                      ) : (
                        <ArrowDownRight size={14} className="text-red-400" />
                      )}
                      {isIncome ? "+" : "-"}
                      {formatVND(tx.amount)}
                    </span>
                    <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setEditingTx(tx);
                          setModalOpen(true);
                        }}
                        className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-white/5 hover:text-white"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(tx)}
                        className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-red-500/15 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTx(null);
        }}
        title={editingTx ? "Sửa giao dịch" : "Thêm giao dịch mới"}
        size="lg"
      >
        <TransactionForm
          initial={editingTx}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalOpen(false);
            setEditingTx(null);
          }}
          loading={createMutation.isPending || updateMutation.isPending}
          submitLabel={editingTx ? "Lưu thay đổi" : "Lưu giao dịch"}
        />
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => deleteMutation.mutate(confirmDelete.id)}
        loading={deleteMutation.isPending}
        title="Xóa giao dịch"
        message={`Bạn có chắc muốn xóa giao dịch "${
          confirmDelete?.merchant_name || confirmDelete?.description || "này"
        }"? Số dư ví sẽ được hoàn lại.`}
      />
    </AppShell>
  );
}
