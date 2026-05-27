"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
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
import { getIcon } from "@/utils/categoryIcons";

interface CategoryFormProps {
  initial: any;
  onSubmit: (payload: any) => void;
  onCancel: () => void;
  loading: boolean;
}

function CategoryForm({ initial, onSubmit, onCancel, loading }: CategoryFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [icon, setIcon] = useState(initial?.icon || "Tag");
  const [color, setColor] = useState(initial?.color || "#FFD100");
  const [type, setType] = useState(initial?.type || "expense");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Vui lòng nhập tên danh mục");
      return;
    }
    setError(null);
    onSubmit({ name: name.trim(), icon, color, type });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Tên danh mục"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        placeholder="Ví dụ: Cà phê"
      />
      <Select
        label="Loại"
        value={type}
        onChange={(e: any) => setType(e.target.value)}
        placeholder="Chọn loại"
        options={[
          { value: "expense", label: "Chi tiêu" },
          { value: "income", label: "Thu nhập" },
          { value: "both", label: "Cả hai" },
        ]}
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
          {initial ? "Lưu thay đổi" : "Tạo danh mục"}
        </Button>
      </div>
    </form>
  );
}

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  const createMut = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || `HTTP ${res.status}`);
      return d;
    },
    onSuccess: () => {
      toast.success("Đã tạo danh mục");
      setModalOpen(false);
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const updateMut = useMutation({
    mutationFn: async ({ id, payload }: { id: string | number; payload: any }) => {
      const res = await fetch(`/api/categories/${id}`, {
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
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `HTTP ${res.status}`);
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Đã xóa danh mục");
      setConfirmDelete(null);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleSubmit = (payload: any) => {
    if (editing) updateMut.mutate({ id: editing.id, payload });
    else createMut.mutate(payload);
  };

  const categories = data?.categories || [];
  const expenseCats = categories.filter(
    (c: any) => c.type === "expense" || c.type === "both"
  );
  const incomeCats = categories.filter(
    (c: any) => c.type === "income" || c.type === "both"
  );

  return (
    <AppShell currentPath="/categories">
      <PageHeader
        title="Danh mục"
        subtitle="Phân loại giao dịch để theo dõi chi tiết hơn"
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            <Plus size={16} /> Thêm danh mục
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="Chưa có danh mục"
          description="Tạo danh mục đầu tiên để phân loại giao dịch."
          action={
            <Button
              onClick={() => {
                setEditing(null);
                setModalOpen(true);
              }}
            >
              <Plus size={16} /> Thêm danh mục
            </Button>
          }
        />
      ) : (
        <div className="space-y-6">
          <Section
            title="Danh mục chi tiêu"
            items={expenseCats}
            onEdit={(c) => {
              setEditing(c);
              setModalOpen(true);
            }}
            onDelete={setConfirmDelete}
          />
          <Section
            title="Danh mục thu nhập"
            items={incomeCats}
            onEdit={(c) => {
              setEditing(c);
              setModalOpen(true);
            }}
            onDelete={setConfirmDelete}
          />
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        title={editing ? "Sửa danh mục" : "Thêm danh mục"}
      >
        <CategoryForm
          initial={editing}
          onSubmit={handleSubmit}
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
        title="Xóa danh mục"
        message={`Xóa danh mục "${confirmDelete?.name}"? Các giao dịch sẽ chuyển sang "Không phân loại".`}
      />
    </AppShell>
  );
}

interface SectionProps {
  title: string;
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

function Section({ title, items, onEdit, onDelete }: SectionProps) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#D6D6D6]/50">
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => {
          const Icon = getIcon(c.icon);
          return (
            <GlassCard key={c.id} padding="p-4" hover>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${c.color}25`, color: c.color }}
                >
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {c.name}
                  </p>
                  <p className="text-xs text-[#D6D6D6]/50">
                    {c.is_default ? "Mặc định" : "Tùy chỉnh"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(c)}
                    className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-white/5 hover:text-white"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(c)}
                    className="rounded-lg p-1.5 text-[#D6D6D6]/60 hover:bg-red-500/15 hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
