"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  ScanLine,
  UploadCloud,
  Sparkles,
  X,
  Plus,
  Trash2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import useUpload from "@/utils/useUpload";
import { formatVND } from "@/utils/formatCurrency";
import { todayISO } from "@/utils/formatDate";

export default function OCRPage() {
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState("");
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [step, setStep] = useState<"upload" | "review" | "done">("upload");

  // Editable form state (populated from OCR)
  const [merchantName, setMerchantName] = useState("");
  const [transactionDate, setTransactionDate] = useState(todayISO());
  const [totalAmount, setTotalAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [walletId, setWalletId] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [note, setNote] = useState("");

  const [upload, { loading: uploading }] = useUpload();

  const { data: catsData } = useQuery({
    queryKey: ["categories", "expense"],
    queryFn: async () => {
      const res = await fetch("/api/categories?type=expense");
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

  // Auto-select first wallet if none selected
  useEffect(() => {
    if (!walletId && walletsData?.wallets && walletsData.wallets.length > 0) {
      setWalletId(String(walletsData.wallets[0].id));
    }
  }, [walletsData, walletId]);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const { url, error } = await upload({ file });
    if (error) {
      toast.error("Không thể tải ảnh: " + error);
      return;
    }
    if (url) {
      setImageUrl(url);
      toast.success("Đã tải ảnh — sẵn sàng quét");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const scanMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/ocr/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: imageUrl }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || `HTTP ${res.status}`);
      return d;
    },
    onSuccess: (data) => {
      const r = data.result;
      setOcrResult(r);
      setMerchantName(r.merchant_name || "");
      setTransactionDate(r.transaction_date || todayISO());
      setTotalAmount(String(r.total_amount || ""));
      setItems(r.items || []);
      setNote(r.note || "");
      setCategoryId(String(data.matched_category_id || ""));
      setStep("review");
      toast.success(
        `AI đã đọc hóa đơn (độ tin cậy ${Math.round((r.confidence || 0) * 100)}%)`
      );
    },
    onError: (err: any) => {
      toast.error(err.message || "Lỗi khi quét hóa đơn");
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        type: "expense",
        amount: Number(totalAmount),
        wallet_id: walletId || null,
        category_id: categoryId || null,
        transaction_date: transactionDate,
        merchant_name: merchantName || null,
        description: note || null,
        image_url: imageUrl,
        ocr_confidence: ocrResult?.confidence
          ? Math.round(ocrResult.confidence * 100)
          : null,
        receipt_items: items.filter((it) => it.name),
      };
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || `HTTP ${res.status}`);
      return d;
    },
    onSuccess: () => {
      toast.success("Đã lưu giao dịch từ hóa đơn");
      setStep("done");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleSave = () => {
    if (!walletId) {
      toast.error("Vui lòng chọn ví/tài khoản");
      return;
    }
    if (!categoryId) {
      toast.error("Vui lòng chọn danh mục");
      return;
    }
    if (!totalAmount || Number(totalAmount) <= 0) {
      toast.error("Số tiền không hợp lệ");
      return;
    }
    saveMutation.mutate();
  };

  const resetAll = () => {
    setImageUrl("");
    setOcrResult(null);
    setStep("upload");
    setMerchantName("");
    setTransactionDate(todayISO());
    setTotalAmount("");
    setCategoryId("");
    setWalletId("");
    setItems([]);
    setNote("");
  };

  const updateItem = (i: number, field: string, value: any) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setItems(next);
  };
  const addItem = () =>
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  if (step === "done") {
    return (
      <AppShell currentPath="/ocr">
        <div className="mx-auto max-w-xl">
          <GlassCard padding="p-10" glow className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFD100] to-[#FFEE32] text-[#202020] shadow-[0_0_30px_-5px_rgba(255,209,0,0.7)]">
              <CheckCircle2 size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Đã lưu thành công!
            </h2>
            <p className="mt-2 text-sm text-[#D6D6D6]/70">
              Giao dịch đã được tạo từ hóa đơn của bạn và ví đã được cập nhật.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="secondary" onClick={resetAll}>
                <ScanLine size={16} /> Quét hóa đơn khác
              </Button>
              <Button onClick={() => (window.location.href = "/transactions")}>
                Xem giao dịch <ArrowRight size={16} />
              </Button>
            </div>
          </GlassCard>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell currentPath="/ocr">
      <PageHeader
        title="Quét hóa đơn bằng AI"
        subtitle="Tải lên ảnh hóa đơn — OpenCode DeepSeek sẽ tự động trích xuất dữ liệu"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload / Preview */}
        <GlassCard padding="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFD100]/15 text-[#FFD100]">
              <UploadCloud size={16} />
            </div>
            <h3 className="text-base font-semibold text-white">
              1. Tải ảnh hóa đơn
            </h3>
          </div>

          {!imageUrl ? (
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] text-center transition-all hover:border-[#FFD100]/40 hover:bg-white/[0.04]"
            >
              <div className="mb-3 rounded-2xl bg-[#FFD100]/10 p-3 text-[#FFD100]">
                <UploadCloud size={28} />
              </div>
              <p className="text-sm font-medium text-white">
                {uploading
                  ? "Đang tải lên..."
                  : "Kéo & thả ảnh hoặc click để chọn"}
              </p>
              <p className="mt-1 text-xs text-[#D6D6D6]/50">
                JPG, PNG, HEIC — tối đa 10MB
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <img
                src={imageUrl}
                alt="receipt"
                className="w-full max-h-[420px] object-contain"
              />
              <button
                onClick={resetAll}
                className="absolute top-3 right-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {imageUrl && step === "upload" && (
            <div className="mt-4">
              <Button
                size="lg"
                className="w-full"
                onClick={() => scanMutation.mutate()}
                loading={scanMutation.isPending}
              >
                <Sparkles size={16} />
                {scanMutation.isPending
                  ? "AI đang đọc hóa đơn..."
                  : "Quét hóa đơn bằng AI"}
              </Button>
              {scanMutation.isPending && (
                <p className="mt-3 text-center text-xs text-[#D6D6D6]/60">
                  Vui lòng chờ — OpenCode DeepSeek đang phân tích...
                </p>
              )}
            </div>
          )}
        </GlassCard>

        {/* OCR Result form */}
        <GlassCard padding="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFD100]/15 text-[#FFD100]">
                <Sparkles size={16} />
              </div>
              <h3 className="text-base font-semibold text-white">
                2. Xác nhận dữ liệu
              </h3>
            </div>
            {ocrResult && (
              <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 text-[10px] font-medium text-green-400">
                ● {Math.round((ocrResult.confidence || 0) * 100)}% chính xác
              </span>
            )}
          </div>

          {!ocrResult ? (
            <div className="flex h-72 flex-col items-center justify-center text-center text-sm text-[#D6D6D6]/40">
              <ScanLine size={32} className="mb-3 text-[#D6D6D6]/30" />
              <p>Chưa có dữ liệu</p>
              <p className="mt-1 text-xs">
                Tải ảnh và bấm "Quét hóa đơn bằng AI"
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                label="Cửa hàng"
                value={merchantName}
                onChange={(e: any) => setMerchantName(e.target.value)}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Ngày giao dịch"
                  type="date"
                  value={transactionDate}
                  onChange={(e: any) => setTransactionDate(e.target.value)}
                />
                <Input
                  label="Tổng tiền (VND)"
                  type="number"
                  value={totalAmount}
                  onChange={(e: any) => setTotalAmount(e.target.value)}
                />
              </div>
              {totalAmount && Number(totalAmount) > 0 && (
                <p className="-mt-1 text-xs text-[#FFEE32]">
                  {formatVND(Number(totalAmount))}
                </p>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <Select
                  label="Danh mục"
                  value={categoryId}
                  onChange={(e: any) => setCategoryId(e.target.value)}
                  placeholder="Chọn"
                  options={(catsData?.categories || []).map((c: any) => ({
                    value: String(c.id),
                    label: c.name,
                  }))}
                />
                <Select
                  label="Ví"
                  value={walletId}
                  onChange={(e: any) => setWalletId(e.target.value)}
                  placeholder="Chọn"
                  options={(walletsData?.wallets || []).map((w: any) => ({
                    value: String(w.id),
                    label: w.name,
                  }))}
                />
              </div>

              {/* Items */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-medium text-[#D6D6D6]/80">
                    Sản phẩm trong hóa đơn ({items.length})
                  </label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="rounded-lg p-1 text-[#FFD100] hover:bg-white/5"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                {items.length === 0 ? (
                  <p className="text-xs text-[#D6D6D6]/40">
                    Không có sản phẩm nào
                  </p>
                ) : (
                  <div className="max-h-48 space-y-1.5 overflow-y-auto">
                    {items.map((it, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2"
                      >
                        <input
                          value={it.name}
                          onChange={(e) =>
                            updateItem(i, "name", e.target.value)
                          }
                          placeholder="Tên"
                          className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-[#D6D6D6]/40"
                        />
                        <input
                          type="number"
                          value={it.quantity}
                          onChange={(e) =>
                            updateItem(i, "quantity", Number(e.target.value))
                          }
                          className="w-12 bg-transparent text-xs text-white outline-none text-center"
                        />
                        <input
                          type="number"
                          value={it.price}
                          onChange={(e) =>
                            updateItem(i, "price", Number(e.target.value))
                          }
                          placeholder="Giá"
                          className="w-24 bg-transparent text-xs text-white outline-none text-right"
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(i)}
                          className="rounded p-0.5 text-[#D6D6D6]/50 hover:text-red-400"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Textarea
                label="Ghi chú"
                value={note}
                onChange={(e: any) => setNote(e.target.value)}
                rows={2}
                placeholder="Ghi chú thêm..."
              />

              <div className="flex gap-2 pt-2">
                <Button variant="ghost" onClick={resetAll} className="flex-1">
                  Hủy
                </Button>
                <Button
                  onClick={handleSave}
                  loading={saveMutation.isPending}
                  className="flex-1"
                >
                  Lưu giao dịch
                </Button>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </AppShell>
  );
}
