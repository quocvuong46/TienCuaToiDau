# Tiền Của Tôi Đâu — Ứng dụng quản lý chi tiêu cá nhân

> **Quản lý từng đồng. Hiểu rõ từng khoản. Làm chủ tài chính cá nhân.**

Ứng dụng web full-stack quản lý chi tiêu cá nhân tích hợp **OCR hóa đơn bằng Google Gemini Flash AI**. Giao diện luxury dark finance với glassmorphism, dashboard trực quan, biểu đồ phân tích chuyên sâu, và hệ thống ngân sách/mục tiêu tiết kiệm thông minh.

---

## 📋 Mục lục

- [Tech Stack](#-tech-stack)
- [Tính năng chính](#-tính-năng-chính)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Hướng dẫn chạy local](#-hướng-dẫn-chạy-local)
- [Cấu hình Supabase](#-cấu-hình-supabase)
- [Lấy Google Gemini API key](#-lấy-google-gemini-api-key)
- [Chạy bằng Docker](#-chạy-bằng-docker)
- [Triển khai lên AWS/VPS](#-triển-khai-lên-awsvps)
- [Tài khoản demo](#-tài-khoản-demo)

---

## 🛠 Tech Stack

| Lớp | Công nghệ |
|---|---|
| **Frontend** | Next.js 14 App Router, React 18, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui, Glassmorphism |
| **Backend** | Next.js Server Actions, Route Handlers |
| **Database** | Supabase (PostgreSQL 15) + Row Level Security |
| **Auth** | Supabase Auth (Email + Password, hashed bằng Argon2) |
| **Storage** | Supabase Storage (ảnh hóa đơn, avatar) |
| **AI / OCR** | Google Gemini 2.5 Flash API |
| **Charts** | Recharts |
| **Form** | React Hook Form + Zod validation |
| **Realtime** | Supabase Realtime channels |
| **Deploy** | Docker + Docker Compose + AWS EC2 + Nginx |
| **CI/CD** | GitHub Actions |

---

## ✨ Tính năng chính

### 🔐 Authentication
- Đăng ký / đăng nhập bằng email + mật khẩu
- Bảo vệ route dashboard bằng middleware
- Mật khẩu được hash bằng Argon2

### 📊 Dashboard tổng quan
- Tổng thu/chi tháng, số dư hiện tại, tỷ lệ tiết kiệm
- Chi tiêu hôm nay, tuần này
- Cảnh báo ngân sách vượt 80%/100%
- Top danh mục chi nhiều nhất
- Biểu đồ thu/chi theo ngày (bar chart)
- Donut chart phân bổ danh mục
- Line chart xu hướng số dư lũy kế
- AI insight tự động: "Tháng này bạn chi ăn uống cao hơn 25% so với tháng trước"

### 💸 Quản lý giao dịch
- CRUD đầy đủ (thêm, sửa, xóa, xem)
- Tìm kiếm theo cửa hàng/mô tả
- Lọc theo: loại, danh mục, ví, ngày, khoảng tiền
- Gắn ảnh hóa đơn (Supabase Storage)
- Tự động cập nhật số dư ví khi thêm/sửa/xóa

### 🏷 Danh mục chi tiêu
- 10+ danh mục mặc định: Ăn uống, Di chuyển, Mua sắm, Hóa đơn, Giải trí, Sức khỏe, Giáo dục, Nhà cửa, Lương, Thưởng, Đầu tư
- Tạo danh mục riêng với icon Lucide + màu tùy chỉnh

### 💰 Ví & Tài khoản
- 5 loại ví: Tiền mặt, Ngân hàng, Ví điện tử, Thẻ tín dụng, Tiết kiệm
- Số dư ban đầu + số dư hiện tại được sync tự động qua DB trigger

### 🎯 Ngân sách tháng
- Tạo ngân sách theo tháng + danh mục
- Progress bar theo palette vàng/cam/đỏ
- Cảnh báo khi đạt 80% và khi vượt 100%

### 🏆 Mục tiêu tiết kiệm
- Đặt mục tiêu + deadline + mô tả
- Gợi ý số tiền cần tiết kiệm mỗi tháng để đạt mục tiêu đúng hạn

### 🤖 OCR hóa đơn bằng Gemini Flash
- Drag & drop upload ảnh hóa đơn lên Supabase Storage
- Gemini Flash trích xuất: tên cửa hàng, ngày, tổng tiền, danh sách sản phẩm, gợi ý danh mục
- Trả JSON chuẩn schema, user xem & sửa trước khi lưu
- Log toàn bộ vào bảng `ai_prompt_logs`

### 📈 Báo cáo & Thống kê
- Bộ lọc thời gian: hôm nay, tuần, tháng, năm, tùy chỉnh
- So sánh với kỳ trước
- Top giao dịch lớn nhất
- Export CSV (Excel) và Print to PDF

### ⚡ Realtime
- Supabase Realtime sync dashboard, transactions, wallets, budgets
- Toast thông báo khi có thay đổi

---

## 📁 Cấu trúc thư mục

```
.
├── app/                           # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx                   # Landing
│   ├── account/{signin,signup,logout}/page.tsx
│   ├── dashboard/page.tsx
│   ├── transactions/page.tsx
│   ├── categories/page.tsx
│   ├── wallets/page.tsx
│   ├── budgets/page.tsx
│   ├── goals/page.tsx
│   ├── ocr/page.tsx
│   ├── reports/page.tsx
│   ├── profile/page.tsx
│   └── api/
│       ├── profile/route.ts
│       ├── transactions/[id]/route.ts
│       ├── categories/[id]/route.ts
│       ├── wallets/[id]/route.ts
│       ├── budgets/[id]/route.ts
│       ├── goals/[id]/route.ts
│       ├── dashboard/stats/route.ts
│       ├── reports/route.ts
│       └── ocr/scan/route.ts
├── components/{ui,layout,dashboard,charts,forms,ocr}
├── lib/{supabase,actions,gemini.ts,utils.ts,validations.ts,constants.ts}
├── supabase/{schema.sql,seed.sql,storage-policies.sql}
├── docs/{README.md,DEPLOY_AWS.md,REPORT_OUTLINE.md,AI_PROMPTS_APPENDIX.md,SUPABASE_SETUP.md}
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── package.json
```

---

## 🚀 Hướng dẫn chạy local

```bash
git clone https://github.com/your-name/tien-cua-toi-dau.git
cd tien-cua-toi-dau
npm install
cp .env.example .env.local
# Điền giá trị thật vào .env.local
npm run dev
# Mở http://localhost:3000
```

---

## ⚙️ Cấu hình Supabase

Xem chi tiết tại **`docs/SUPABASE_SETUP.md`**. Tóm tắt:

1. Tạo project Supabase mới
2. SQL Editor → paste `supabase/schema.sql` → Run
3. SQL Editor → paste `supabase/storage-policies.sql` → Run
4. Tạo 2 storage bucket: `receipts` và `avatars` (private)
5. Copy `Project URL`, `anon key`, `service_role key` vào `.env.local`

---

## 🤖 Lấy Google Gemini API key

1. Truy cập https://aistudio.google.com/app/apikey
2. Đăng nhập bằng tài khoản Google
3. Click **"Create API Key"**
4. Copy key vào `GOOGLE_GEMINI_API_KEY` trong `.env.local`

> **Free tier**: 15 RPM, đủ cho ứng dụng cá nhân và demo.

---

## 🐳 Chạy bằng Docker

```bash
docker compose up --build           # build + chạy foreground
docker compose up -d --build        # background
docker compose down                 # stop
docker compose logs -f app          # xem logs
```

App chạy tại `http://localhost:3000`.

---

## ☁️ Triển khai lên AWS/VPS

Xem chi tiết tại **`docs/DEPLOY_AWS.md`**.

---

## 👤 Tài khoản demo

```
Email: demo@tiencuatoidau.app
Mật khẩu: Demo@1234
```

---

## 📸 Screenshots

```
docs/screenshots/landing.png
docs/screenshots/dashboard.png
docs/screenshots/ocr.png
docs/screenshots/reports.png
```

---

## 📄 License

MIT © 2026 — Đề tài cuối kỳ môn "Các công nghệ mới trong phát triển phần mềm"
