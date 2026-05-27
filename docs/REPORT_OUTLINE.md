# Đề cương Báo cáo Cuối kỳ

> **Đề tài**: Tiền Của Tôi Đâu — Ứng dụng quản lý chi tiêu cá nhân tích hợp OCR hóa đơn bằng AI
> **Môn học**: Các công nghệ mới trong phát triển phần mềm

---

## 1. Trang bìa

- **Tên đề tài**: Tiền Của Tôi Đâu
- **Sinh viên thực hiện**: [Họ và tên]
- **Mã sinh viên**: [MSSV]
- **Lớp**: [Lớp]
- **Giảng viên hướng dẫn**: [Tên GV]
- **Khoa**: [Khoa CNTT]
- **Trường**: [Tên trường]
- **Năm**: 2026

---

## 2. Mục lục

(Auto-generated)

---

## 3. Giới thiệu đề tài

### 3.1 Lý do chọn đề tài
- Vấn đề quản lý chi tiêu cá nhân của giới trẻ Việt Nam
- Khảo sát: 70% sinh viên không có thói quen ghi chép chi tiêu
- Cơ hội ứng dụng AI để giảm friction trong việc nhập liệu

### 3.2 Mục tiêu đề tài
- Xây dựng ứng dụng web full-stack quản lý tài chính cá nhân
- Tích hợp OCR hóa đơn bằng Google Gemini Flash để tự động trích xuất dữ liệu
- Cung cấp dashboard trực quan với biểu đồ phân tích chuyên sâu
- Demo các công nghệ mới: Next.js App Router, Supabase, Docker, AI

### 3.3 Phạm vi đề tài
- **Trong phạm vi**: Web app responsive, OCR hóa đơn, CRUD giao dịch/ngân sách/mục tiêu, báo cáo, export
- **Ngoài phạm vi**: Mobile native app, đa người dùng/chia sẻ ví, đồng bộ với ngân hàng API

### 3.4 Đối tượng sử dụng
- Sinh viên, người đi làm muốn quản lý tài chính cá nhân
- Người có thói quen mua sắm và muốn theo dõi chi tiêu chi tiết

---

## 4. Công nghệ sử dụng

### 4.1 Frontend
- **Next.js 14 App Router**: framework React full-stack, SSR/SSG, route handlers
- **TypeScript**: type safety, giảm bug runtime
- **Tailwind CSS**: utility-first CSS framework
- **shadcn/ui**: bộ component đẹp, accessible, customizable
- **Recharts**: thư viện biểu đồ
- **React Query (TanStack Query)**: data fetching, caching, optimistic update
- **React Hook Form + Zod**: form management và validation

### 4.2 Backend
- **Next.js Server Actions & Route Handlers**: backend không cần Express
- **Supabase Auth**: authentication (email + password), Argon2 hashing
- **Supabase Database**: PostgreSQL 15 + Row Level Security (RLS)
- **Supabase Storage**: lưu ảnh hóa đơn, avatar
- **Supabase Realtime**: pub/sub đồng bộ dữ liệu

### 4.3 AI Integration
- **Google Gemini 2.5 Flash API**: mô hình LLM đa phương thức để OCR hóa đơn
- **JSON Schema Output**: ép Gemini trả về JSON chuẩn

### 4.4 DevOps
- **Docker + Docker Compose**: containerization
- **Nginx**: reverse proxy + SSL termination
- **AWS EC2**: hạ tầng cloud
- **Let's Encrypt + Certbot**: free SSL
- **GitHub Actions**: CI/CD pipeline

### 4.5 Tools AI hỗ trợ phát triển
- **ChatGPT / Claude**: viết code, debug, sinh prompt
- **GitHub Copilot**: gợi ý code real-time
- **Cursor / Anything**: AI IDE / no-code platform

---

## 5. Kiến trúc hệ thống

### 5.1 Sơ đồ tổng quan
```
┌─────────────────┐
│   Browser       │
│  (Next.js SSR)  │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐       ┌─────────────────┐
│   Nginx Proxy   │──────►│  Docker Network │
│  + SSL (Cert)   │       │                 │
└─────────────────┘       │  ┌───────────┐  │
                          │  │  Next.js  │  │
                          │  │  App      │  │
                          │  └─────┬─────┘  │
                          └────────┼────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
       │  Supabase   │      │  Supabase   │      │  Google     │
       │  Postgres   │      │  Storage    │      │  Gemini API │
       │  + RLS      │      │  (S3-like)  │      │  (OCR)      │
       └─────────────┘      └─────────────┘      └─────────────┘
```

### 5.2 Luồng dữ liệu OCR
1. User upload ảnh hóa đơn từ frontend
2. Ảnh được upload lên Supabase Storage (bucket `receipts/<user_id>/`)
3. Frontend gọi `/api/ocr/scan` với URL ảnh
4. Server Action gửi prompt + ảnh sang Gemini Flash
5. Gemini trả JSON theo schema đã định nghĩa
6. Server tự match `suggested_category` với category của user
7. Trả JSON về frontend → user review & sửa → bấm "Lưu giao dịch"
8. Frontend gọi `/api/transactions` → DB insert → trigger update `wallets.current_balance`

### 5.3 Bảo mật
- HTTPS everywhere (Let's Encrypt SSL)
- Row Level Security tại tầng DB: user chỉ truy cập được data của mình
- Service Role Key chỉ dùng server-side, không expose ra browser
- Argon2 password hashing
- Input validation bằng Zod cả frontend và server

---

## 6. Thiết kế database (ERD/Schema)

### 6.1 ERD
```
auth.users (Supabase managed)
    │
    ├──< profiles
    ├──< categories
    ├──< wallets ──< transactions >── categories
    │                    │
    │                    └──< receipt_items
    ├──< budgets >── categories
    ├──< saving_goals
    └──< ai_prompt_logs
```

### 6.2 Mô tả bảng
| Bảng | Mục đích | Số trường chính |
|---|---|---|
| `profiles` | Mở rộng `auth.users` với full_name, avatar | 4 |
| `categories` | Phân loại giao dịch (10+ default) | 7 |
| `wallets` | Ví/tài khoản tiền của user | 8 |
| `transactions` | Giao dịch thu/chi | 12 |
| `receipt_items` | Sản phẩm trong hóa đơn (OCR) | 5 |
| `budgets` | Ngân sách theo tháng + danh mục | 6 |
| `saving_goals` | Mục tiêu tiết kiệm | 7 |
| `ai_prompt_logs` | Log prompt AI để audit | 5 |

### 6.3 Triggers & Functions
- `handle_new_user()`: tự tạo profile khi có user mới
- `update_wallet_balance()`: tự sync số dư ví khi transaction thay đổi

(Xem chi tiết tại `docs/schema.sql`)

---

## 7. Phân tích chức năng

### 7.1 Use Case Diagram
- Actor: **User** (đã đăng nhập)
- Use cases:
  - Đăng ký / Đăng nhập / Đăng xuất
  - Quản lý giao dịch (CRUD + filter + search)
  - Quản lý danh mục
  - Quản lý ví
  - Quản lý ngân sách
  - Quản lý mục tiêu tiết kiệm
  - Quét hóa đơn bằng AI
  - Xem dashboard
  - Xem báo cáo & export

### 7.2 User Flow chính
1. **Onboarding**: Landing → Đăng ký → Dashboard (đã có default categories + wallets)
2. **Thêm giao dịch**: Dashboard → Thêm giao dịch / Quét hóa đơn → Lưu → Dashboard update
3. **Đặt ngân sách**: Sidebar → Ngân sách → Tạo theo tháng → Cảnh báo khi vượt

### 7.3 Wireframes chính
- Landing page (luxury dark)
- Dashboard (4 stat cards + 3 charts + recent transactions)
- OCR scan flow (2-step: upload → review)
- Reports (filters + 3 charts + table)

---

## 8. AI trong phát triển phần mềm

### 8.1 Vai trò AI trong dự án
- **Trong sản phẩm**: Gemini Flash OCR hóa đơn — core feature
- **Trong quá trình dev**: ChatGPT/Claude hỗ trợ viết code, design DB, debug, sinh prompt

### 8.2 Các prompt đã sử dụng
Xem chi tiết tại `docs/AI_PROMPTS_APPENDIX.md`.

### 8.3 Bài học kinh nghiệm
- AI giúp giảm 60-70% thời gian boilerplate
- Cần kiểm tra kỹ output AI, đặc biệt SQL và logic phức tạp
- Prompt rõ ràng, kèm ví dụ → output chất lượng cao hơn
- AI tốt cho code generation, không tốt cho architectural decisions

---

## 9. Docker & Deployment

### 9.1 Multi-stage Dockerfile
- Stage 1 `deps`: cài node_modules
- Stage 2 `builder`: build Next.js standalone
- Stage 3 `runner`: image production tối thiểu (node:20-alpine, ~150MB)

### 9.2 Docker Compose
- Service `app`: Next.js app
- Service `nginx`: reverse proxy
- Network `tien-net` bridge

### 9.3 Quy trình deploy
1. SSH vào EC2
2. `git pull origin main`
3. `docker compose up -d --build`
4. (Optional) GitHub Actions auto-deploy khi push lên main

### 9.4 SSL & Domain
- Trỏ A record về EC2 IP
- Certbot tự cấp SSL từ Let's Encrypt
- Auto-renew mỗi 60 ngày

---

## 10. Kết luận, hạn chế, hướng phát triển

### 10.1 Kết quả đạt được
- ✅ App full-stack chạy ổn định trên Docker
- ✅ Đầy đủ 11 tính năng chính theo yêu cầu
- ✅ UI luxury dark đẹp, responsive
- ✅ OCR hóa đơn hoạt động với độ chính xác ~85% trên hóa đơn rõ
- ✅ Deploy thành công lên AWS EC2 + SSL + domain

### 10.2 Hạn chế
- OCR chưa chính xác 100% với hóa đơn mờ/nhăn
- Chưa có chức năng đa người dùng (chia sẻ ví gia đình)
- Chưa có mobile native app
- Chưa kết nối API ngân hàng để auto-sync giao dịch

### 10.3 Hướng phát triển
- 🚀 Mobile app dùng React Native / Expo
- 🚀 Tích hợp Open Banking API (MB Bank, Techcombank, VPBank)
- 🚀 AI Financial Advisor chat: tư vấn tài chính theo dữ liệu cá nhân
- 🚀 Multi-user / Family budget với quyền truy cập phân cấp
- 🚀 Investment tracking (chứng khoán, vàng, crypto)
- 🚀 Bill reminder tự động bằng push notification

---

## 11. Tài liệu tham khảo

1. **Next.js Documentation** — https://nextjs.org/docs
2. **Supabase Documentation** — https://supabase.com/docs
3. **Google Gemini API** — https://ai.google.dev/docs
4. **Tailwind CSS** — https://tailwindcss.com/docs
5. **Recharts** — https://recharts.org
6. **OWASP Authentication Cheat Sheet** — https://cheatsheetseries.owasp.org
7. **Argon2 RFC 9106** — https://datatracker.ietf.org/doc/html/rfc9106
8. **Docker Best Practices** — https://docs.docker.com/develop/dev-best-practices/
9. **Let's Encrypt Documentation** — https://letsencrypt.org/docs
10. Tài liệu môn học và các bài giảng được cung cấp.

---

## 12. Phụ lục

- **A**: Sơ đồ ERD chi tiết
- **B**: Source code SQL schema (`docs/schema.sql`)
- **C**: AI Prompts đã sử dụng (`docs/AI_PROMPTS_APPENDIX.md`)
- **D**: Dockerfile + docker-compose.yml
- **E**: Hướng dẫn deploy AWS (`docs/DEPLOY_AWS.md`)
- **F**: Screenshots các trang chính
