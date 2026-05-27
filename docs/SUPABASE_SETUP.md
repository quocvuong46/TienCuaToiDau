# Hướng dẫn cấu hình Supabase

## 1) Tạo project Supabase

1. Truy cập https://supabase.com → đăng nhập
2. Click **"New Project"**
3. Điền:
   - **Name**: `tien-cua-toi-dau`
   - **Database password**: tạo password mạnh (lưu lại)
   - **Region**: Singapore (`ap-southeast-1`)
   - **Plan**: Free
4. Bấm **Create new project** → đợi ~2 phút

## 2) Chạy SQL Schema

1. Vào **SQL Editor** → **+ New query**
2. Mở `docs/schema.sql` → copy toàn bộ → paste vào editor → **Run**
3. Kiểm tra **Database → Tables**: 8 bảng đã được tạo

## 3) Bật Authentication

1. **Authentication → Providers** → bật **Email**
2. **Authentication → URL Configuration**:
   - **Site URL**: `http://localhost:3000` (local) hoặc domain production
   - **Redirect URLs**: thêm `http://localhost:3000/**`

## 4) Tạo Storage Buckets

1. **Storage** → **New bucket**:
   - Tên: `receipts`, Public: ❌
2. Lặp lại cho `avatars` (private)
3. **SQL Editor** → paste `docs/storage-policies.sql` → Run

## 5) Lấy API Keys

**Project Settings → API**, copy vào `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

> ⚠️ **`SUPABASE_SERVICE_ROLE_KEY`** bypass RLS — chỉ dùng trong server-side.

## 6) Realtime

Đã enable trong `schema.sql`. Kiểm tra tại **Database → Replication → Publications**.

## Troubleshooting

| Lỗi | Cách fix |
|---|---|
| `JWT expired` | Đăng nhập lại |
| `permission denied for table` | RLS chưa bật — chạy lại schema |
| OCR API 401 | Check `GOOGLE_GEMINI_API_KEY` |
| Storage upload fail | Bucket chưa tồn tại hoặc thiếu policies |
