import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpCircle, ArrowDownCircle, ImageIcon, X } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { formatVND } from "@/utils/formatCurrency";
import { todayISO, toDateInputValue } from "@/utils/formatDate";
import useUpload from "@/utils/useUpload";
import { toast } from "sonner";

interface TransactionFormProps {
  initial?: any;
  onSubmit: (payload: any) => void;
  onCancel?: () => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function TransactionForm({
  initial = null,
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = "Lưu giao dịch",
}: TransactionFormProps) {
  const [type, setType] = useState(initial?.type || "expense");
  const [amount, setAmount] = useState(initial?.amount || "");
  const [walletId, setWalletId] = useState(initial?.wallet_id || "");
  const [categoryId, setCategoryId] = useState(initial?.category_id || "");
  const [transactionDate, setTransactionDate] = useState(
    initial?.transaction_date
      ? toDateInputValue(initial.transaction_date)
      : todayISO()
  );
  const [merchantName, setMerchantName] = useState(
    initial?.merchant_name || ""
  );
  const [description, setDescription] = useState(initial?.description || "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url || "");
  const [error, setError] = useState<string | null>(null);

  const [upload, { loading: uploading }] = useUpload();

  const { data: catsData } = useQuery({
    queryKey: ["categories", type],
    queryFn: async () => {
      const res = await fetch(`/api/categories?type=${type}`);
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

  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Autofocus amount field on mount
    const timer = setTimeout(() => {
      amountRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-select first wallet if none selected
  useEffect(() => {
    if (!walletId && walletsData?.wallets && walletsData.wallets.length > 0) {
      setWalletId(String(walletsData.wallets[0].id));
    }
  }, [walletsData, walletId]);

  const handleAddAmount = (val: number) => {
    const current = Number(amount) || 0;
    setAmount(String(current + val));
  };

  // Reset categoryId if it doesn't match new type
  useEffect(() => {
    if (categoryId && catsData?.categories) {
      const exists = catsData.categories.find(
        (c: any) => String(c.id) === String(categoryId)
      );
      if (!exists) setCategoryId("");
    }
  }, [type, catsData, categoryId]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { url, error: upErr } = await upload({ file });
    if (upErr) {
      toast.error("Không thể tải ảnh: " + upErr);
      return;
    }
    if (url) {
      setImageUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      setError("Vui lòng nhập số tiền hợp lệ");
      return;
    }
    if (!transactionDate) {
      setError("Vui lòng chọn ngày giao dịch");
      return;
    }
    onSubmit({
      type,
      amount: amt,
      wallet_id: walletId || null,
      category_id: categoryId || null,
      transaction_date: transactionDate,
      merchant_name: merchantName || null,
      description: description || null,
      image_url: imageUrl || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type toggle */}
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/[0.04] p-1">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            type === "expense"
              ? "bg-red-500/15 text-red-300 ring-1 ring-red-500/30"
              : "text-[#D6D6D6]/60 hover:text-white"
          }`}
        >
          <ArrowDownCircle size={16} />
          Chi tiêu
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            type === "income"
              ? "bg-[#FFD100]/15 text-[#FFEE32] ring-1 ring-[#FFD100]/30"
              : "text-[#D6D6D6]/60 hover:text-white"
          }`}
        >
          <ArrowUpCircle size={16} />
          Thu nhập
        </button>
      </div>

      <div>
        <Input
          ref={amountRef}
          label="Số tiền (VND)"
          type="number"
          min="0"
          step="1000"
          value={amount}
          onChange={(e: any) => setAmount(e.target.value)}
          placeholder="0"
        />
        {/* Preset amount buttons for quick entry */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          <button
            type="button"
            onClick={() => handleAddAmount(10000)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[#D6D6D6] transition-colors"
          >
            +10k
          </button>
          <button
            type="button"
            onClick={() => handleAddAmount(20000)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[#D6D6D6] transition-colors"
          >
            +20k
          </button>
          <button
            type="button"
            onClick={() => handleAddAmount(50000)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[#D6D6D6] transition-colors"
          >
            +50k
          </button>
          <button
            type="button"
            onClick={() => handleAddAmount(100000)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[#D6D6D6] transition-colors"
          >
            +100k
          </button>
          <button
            type="button"
            onClick={() => handleAddAmount(200000)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[#D6D6D6] transition-colors"
          >
            +200k
          </button>
          <button
            type="button"
            onClick={() => handleAddAmount(500000)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[#D6D6D6] transition-colors"
          >
            +500k
          </button>
          <button
            type="button"
            onClick={() => setAmount("")}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 transition-colors"
          >
            Xóa
          </button>
        </div>
      </div>
      {amount && Number(amount) > 0 && (
        <p className="-mt-2 text-xs text-[#FFEE32]">
          {formatVND(Number(amount))}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Select
            label="Danh mục"
            value={categoryId}
            onChange={(e: any) => setCategoryId(e.target.value)}
            placeholder="Chọn danh mục"
            options={(catsData?.categories || []).map((c: any) => ({
              value: String(c.id),
              label: c.name,
            }))}
          />
          {/* Quick select category chips */}
          {(catsData?.categories || []).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(catsData?.categories || []).slice(0, 5).map((c: any) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(String(c.id))}
                  className={`px-2 py-1 text-xs font-medium rounded-lg border transition-all ${
                    String(categoryId) === String(c.id)
                      ? "bg-[#FFD100]/15 border-[#FFD100]/40 text-[#FFEE32]"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-[#D6D6D6]"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <Select
            label="Ví / Tài khoản"
            value={walletId}
            onChange={(e: any) => setWalletId(e.target.value)}
            placeholder="Chọn ví"
            options={(walletsData?.wallets || []).map((w: any) => ({
              value: String(w.id),
              label: w.name,
            }))}
          />
          {/* Quick select wallet chips */}
          {(walletsData?.wallets || []).length > 1 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(walletsData?.wallets || []).slice(0, 4).map((w: any) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWalletId(String(w.id))}
                  className={`px-2 py-1 text-xs font-medium rounded-lg border transition-all ${
                    String(walletId) === String(w.id)
                      ? "bg-[#FFD100]/15 border-[#FFD100]/40 text-[#FFEE32]"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-[#D6D6D6]"
                  }`}
                >
                  {w.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Ngày giao dịch"
          type="date"
          value={transactionDate}
          onChange={(e: any) => setTransactionDate(e.target.value)}
        />
        <Input
          label="Cửa hàng / Người nhận (tùy chọn)"
          type="text"
          value={merchantName}
          onChange={(e: any) => setMerchantName(e.target.value)}
          placeholder="Highlands Coffee, ..."
        />
      </div>

      <Textarea
        label="Ghi chú (tùy chọn)"
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
        placeholder="Mô tả giao dịch..."
        rows={2}
      />

      {/* Image upload */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-[#D6D6D6]/80">
          Ảnh hóa đơn (tùy chọn)
        </label>
        {imageUrl ? (
          <div className="relative inline-block">
            <img
              src={imageUrl}
              alt="receipt"
              className="h-32 rounded-xl border border-white/10 object-cover"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-[#D6D6D6]/60 hover:border-[#FFD100]/40 hover:bg-white/[0.04]">
            <ImageIcon size={16} />
            {uploading ? "Đang tải lên..." : "Tải lên ảnh hóa đơn"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={loading}
          >
            Hủy
          </Button>
        )}
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
