# Phụ lục: AI Prompts đã sử dụng trong quá trình phát triển

> Bộ sưu tập các prompt đã dùng với các công cụ AI (ChatGPT, Claude, Gemini) trong suốt vòng đời dự án **Tiền Của Tôi Đâu**. Mỗi prompt đi kèm mục đích, nội dung, kết quả mong muốn và lý do chọn.

---

## Prompt #1 — Tạo kiến trúc hệ thống tổng quan

**🎯 Mục đích**: Phác thảo kiến trúc full-stack cho ứng dụng quản lý chi tiêu cá nhân trước khi viết dòng code đầu tiên.

**📝 Prompt sử dụng**:
```
Bạn là Senior Solution Architect. Tôi muốn xây dựng web app quản lý chi tiêu cá nhân tích hợp OCR hóa đơn bằng AI. Hãy:
1. Đề xuất tech stack hiện đại nhất 2026 (frontend, backend, DB, AI, deploy)
2. Vẽ sơ đồ kiến trúc ASCII gồm: browser, reverse proxy, app server, database, storage, AI service
3. Liệt kê các luồng dữ liệu chính (auth, transaction CRUD, OCR scan)
4. Đề xuất chiến lược bảo mật: RLS, password hashing, secret management
5. Ước tính chi phí hosting hàng tháng
```

**✅ Kết quả mong muốn**: Một bản design document có sơ đồ kiến trúc, justification từng lựa chọn công nghệ, và list các trade-offs.

**🧠 Lý do**: Bắt đầu dự án bằng việc làm rõ "what" và "why" trước khi bắt tay vào "how" sẽ giảm thiểu việc viết code thừa và refactor sau này.

---

## Prompt #2 — Thiết kế database schema

**🎯 Mục đích**: Sinh ra database schema PostgreSQL hoàn chỉnh với RLS, triggers, indexes.

**📝 Prompt sử dụng**:
```
Bạn là Database Architect chuyên về PostgreSQL và Supabase. Hãy thiết kế schema cho ứng dụng quản lý chi tiêu cá nhân với các bảng: profiles, categories, wallets, transactions, receipt_items, budgets, saving_goals, ai_prompt_logs.

Yêu cầu:
- Dùng UUID cho primary key (gen_random_uuid())
- Mọi bảng đều có user_id REFERENCES auth.users(id) ON DELETE CASCADE
- Bật Row Level Security với policy "user chỉ truy cập được data của mình"
- Tự động tạo profile khi user mới đăng ký (trigger trên auth.users)
- Trigger tự cập nhật wallets.current_balance khi transactions thay đổi (INSERT/UPDATE/DELETE)
- Có CHECK constraint cho type ('income','expense','both'), month BETWEEN 1 AND 12
- UNIQUE constraint cho budgets (user_id, category_id, month, year)
- Index cho cột thường query: user_id, transaction_date
- Enable Realtime cho transactions, wallets, budgets, saving_goals

Trả về SQL hoàn chỉnh, có comment tiếng Việt giải thích từng phần.
```

**✅ Kết quả mong muốn**: File SQL ~250 dòng, chạy thẳng được trên Supabase SQL Editor không cần sửa.

**🧠 Lý do**: AI rất giỏi sinh SQL boilerplate. Việc nêu rõ constraints, indexes, triggers ngay từ đầu giúp tránh migration phức tạp sau này.

---

## Prompt #3 — Tạo UI Dashboard luxury dark finance

**🎯 Mục đích**: Sinh ra component dashboard Next.js + Tailwind với phong cách luxury dark finance.

**📝 Prompt sử dụng**:
```
Bạn là Senior UI/UX Designer + React Engineer. Hãy tạo trang Dashboard cho app finance tracker với:

STYLE:
- Background: #202020 và #333533 (dark premium)
- Accent: #FFD100 (vàng), #FFEE32 (highlight)
- Text: #D6D6D6
- Glassmorphism: card có border xám nhẹ, backdrop-blur, không drop shadow ở trạng thái nghỉ
- Glow vàng mờ ở các CTA quan trọng
- Font: Inter

LAYOUT:
- Sidebar trái 256px với 8 mục: Tổng quan, Giao dịch, Quét hóa đơn, Ví, Danh mục, Ngân sách, Mục tiêu, Báo cáo, Hồ sơ
- Top: 4 stat cards (số dư, thu tháng, chi tháng, tỷ lệ tiết kiệm)
- Middle: 2 card lớn — AI insight + budget warning
- Charts: Bar (thu/chi theo ngày), Donut (danh mục), Line (xu hướng số dư)
- Bottom: Recent transactions list

THƯ VIỆN:
- Tailwind CSS + shadcn/ui
- Recharts cho biểu đồ
- Lucide-react cho icons
- @tanstack/react-query cho data fetching
- sonner cho toast

Code Next.js App Router, file path: app/dashboard/page.tsx. Toàn bộ text tiếng Việt.
```

**✅ Kết quả mong muốn**: Code Next.js page hoàn chỉnh, đẹp, responsive, có loading skeleton và empty state.

**🧠 Lý do**: Nêu rõ palette + layout cụ thể giúp AI không "tự sáng tạo" UI generic. Việc liệt kê các thư viện cụ thể tránh trùng pattern.

---

## Prompt #4 — Tạo OCR flow với Gemini Flash

**🎯 Mục đích**: Sinh ra full-stack flow để user upload ảnh hóa đơn → AI đọc → user review → lưu giao dịch.

**📝 Prompt sử dụng**:
```
Hãy implement OCR hóa đơn flow trong Next.js App Router + Supabase + Google Gemini Flash.

YÊU CẦU:
1. Frontend (`app/ocr/page.tsx`):
   - Drag & drop area upload ảnh
   - Preview ảnh sau khi upload xong
   - Button "Quét hóa đơn bằng AI" với loading state đẹp
   - Khi có kết quả, hiện form chỉnh sửa ở panel bên phải
   - Cho phép sửa: merchant_name, transaction_date, total_amount, category, wallet, items[]
   - Button "Lưu giao dịch" để confirm

2. Backend (`app/api/ocr/scan/route.ts`):
   - Nhận body { image_url } từ Supabase Storage
   - Gửi request đến Gemini Flash với system prompt force JSON output
   - Schema JSON: { merchant_name, transaction_date YYYY-MM-DD, total_amount integer VND, currency, items[], suggested_category, confidence, note }
   - Strip markdown code fences nếu Gemini trả ```json ...```
   - Match suggested_category với categories của user (case-insensitive)
   - Log toàn bộ vào ai_prompt_logs (feature='ocr_receipt')
   - Trả về { result, matched_category_id }
   - Handle lỗi: ảnh không đọc được → trả fallback structure với confidence thấp

3. KHÔNG được tự lưu giao dịch sau OCR — phải để user confirm trước.

Trả lời với cả frontend code và backend code, dùng TypeScript, comment tiếng Việt.
```

**✅ Kết quả mong muốn**: 2 file hoàn chỉnh: page + route handler. Có loading, error handling, toast notification.

**🧠 Lý do**: OCR là feature core của app — flow phải UX tốt và bảo mật. Việc bắt AI strip markdown fences và sanitize JSON là chi tiết quan trọng dễ bỏ sót.

---

## Prompt #5 — Tối ưu Row Level Security policies

**🎯 Mục đích**: Audit và tối ưu lại RLS policies để đảm bảo an toàn và performance.

**📝 Prompt sử dụng**:
```
Bạn là chuyên gia bảo mật PostgreSQL & Supabase. Hãy review schema sau và:

1. Xác định các bảng có thể bị "RLS bypass" (ví dụ join từ bảng có RLS sang bảng không RLS)
2. Đề xuất composite policy nếu cần (ví dụ: receipt_items.user phải verify qua transactions.user_id)
3. Kiểm tra xem có cột nào quên CHECK constraint
4. Tối ưu policy bằng cách dùng (auth.uid() = user_id) thay vì subquery khi có thể
5. Đề xuất index nào cần thêm để policy chạy nhanh
6. Cảnh báo các pattern dễ bị lỗi: missing INSERT policy, conflicting SELECT/UPDATE policies

Schema:
[paste schema.sql]
```

**✅ Kết quả mong muốn**: Báo cáo audit có severity (high/medium/low) cho từng vấn đề, kèm SQL fix.

**🧠 Lý do**: RLS dễ viết sai. Một audit pass bởi AI có thể phát hiện các lỗ hổng thông thường trước khi deploy lên production.

---

## Prompt #6 — Viết Dockerfile multi-stage production-ready

**🎯 Mục đích**: Sinh ra Dockerfile tối ưu cho Next.js 14 standalone build.

**📝 Prompt sử dụng**:
```
Tạo Dockerfile multi-stage cho ứng dụng Next.js 14 (App Router) với các yêu cầu:

- 3 stages: deps, builder, runner
- Base: node:20-alpine
- Stage deps: cài node_modules với npm ci --legacy-peer-deps
- Stage builder: copy deps + source, build với NEXT_TELEMETRY_DISABLED=1, output là standalone
- Stage runner: minimal image, chạy với user non-root (nextjs:nodejs uid 1001)
- Hỗ trợ NEXT_PUBLIC_* vars qua ARG (build time) và ENV (runtime)
- Copy đúng các file standalone: server.js, public/, .next/static/
- EXPOSE 3000, ENV HOSTNAME="0.0.0.0"
- Health check cho docker-compose

Cũng tạo file docker-compose.yml gồm 2 service: app và nginx (reverse proxy), network bridge, restart unless-stopped.

Lưu ý: Cần config next.config.js để bật output: 'standalone'.
```

**✅ Kết quả mong muốn**: Dockerfile + docker-compose.yml + cập nhật next.config.js, image size dưới 200MB.

**🧠 Lý do**: Tối ưu Docker image cho production rất quan trọng cho deploy nhanh và tiết kiệm storage. Multi-stage build giúp loại bỏ devDependencies khỏi image cuối.

---

## Prompt #7 — Kiểm tra bảo mật toàn diện (Security Audit)

**🎯 Mục đích**: Phát hiện lỗ hổng bảo mật trong codebase trước khi deploy production.

**📝 Prompt sử dụng**:
```
Bạn là chuyên gia application security (OWASP Top 10). Hãy audit codebase Next.js + Supabase sau đây và liệt kê các lỗ hổng tiềm ẩn theo categories:

1. **Authentication & Session**:
   - Mật khẩu được hash chưa? Bằng thuật toán gì?
   - JWT có expiration và refresh không?
   - Có rate limit cho /api/auth/* không?

2. **Authorization**:
   - Mọi route /api/* đã verify session chưa?
   - Có endpoint nào leak data của user khác qua predictable ID không?
   - RLS đã enable trên TẤT CẢ bảng chứa data người dùng chưa?

3. **Input Validation**:
   - Form input có validate bằng Zod trước khi gửi DB không?
   - SQL injection được prevent qua parameterized query?
   - XSS: dangerouslySetInnerHTML được dùng ở đâu?

4. **Secrets**:
   - .env.local có lọt vào git history không?
   - SUPABASE_SERVICE_ROLE_KEY có bị expose ra client không?
   - GOOGLE_GEMINI_API_KEY có gọi từ client không?

5. **File Upload**:
   - Có check MIME type và size limit không?
   - Bucket policies có verify user_id qua folder name không?

6. **OWASP Top 10 2021 checklist**:
   - A01 Broken Access Control
   - A02 Cryptographic Failures
   - A03 Injection
   - A07 Identification & Authentication Failures

Trả về báo cáo dạng bảng có severity, mô tả, file:line, fix recommendation.

Code:
[paste relevant files]
```

**✅ Kết quả mong muốn**: Báo cáo audit dạng bảng với 10-20 finding, mỗi finding có severity rõ ràng và đề xuất fix.

**🧠 Lý do**: Security audit thủ công tốn nhiều thời gian. AI có thể quét nhanh các pattern phổ biến của OWASP Top 10 và đưa ra cảnh báo sớm.

---

## Prompt #8 — Viết báo cáo cuối kỳ

**🎯 Mục đích**: Sinh đề cương báo cáo cuối kỳ chuẩn cấu trúc đồ án CNTT.

**📝 Prompt sử dụng**:
```
Bạn là giảng viên hướng dẫn đồ án CNTT. Hãy soạn đề cương báo cáo cuối kỳ cho đề tài "Tiền Của Tôi Đâu — Ứng dụng quản lý chi tiêu cá nhân tích hợp OCR hóa đơn bằng AI" với các yêu cầu:

CẤU TRÚC:
1. Trang bìa
2. Mục lục
3. Giới thiệu đề tài (lý do chọn, mục tiêu, phạm vi, đối tượng)
4. Công nghệ sử dụng (frontend, backend, AI, devops)
5. Kiến trúc hệ thống (sơ đồ tổng quan, luồng dữ liệu OCR, bảo mật)
6. Thiết kế database (ERD, mô tả bảng, triggers)
7. Phân tích chức năng (use case, user flow, wireframe)
8. AI trong phát triển phần mềm (vai trò AI, prompts dùng, bài học)
9. Docker & Deployment
10. Kết luận, hạn chế, hướng phát triển
11. Tài liệu tham khảo
12. Phụ lục

YÊU CẦU:
- Mỗi mục có sub-section chi tiết
- Tone học thuật nhưng dễ đọc
- Có sơ đồ ASCII minh họa kiến trúc
- Bảng so sánh công nghệ khi cần
- Đề xuất 5-7 hướng phát triển cụ thể, khả thi
- Tiếng Việt 100%
```

**✅ Kết quả mong muốn**: File markdown ~300 dòng, đầy đủ các mục, format đẹp, có thể copy thẳng vào Word.

**🧠 Lý do**: AI giúp đảm bảo cấu trúc báo cáo đầy đủ và đúng chuẩn, không bị thiếu mục quan trọng.

---

## Prompt #9 — Tạo Server Actions CRUD

**🎯 Mục đích**: Sinh các Server Action / Route Handler hoàn chỉnh cho 8 entity (transactions, categories, wallets, budgets, goals…).

**📝 Prompt sử dụng**:
```
Tạo Next.js App Router Route Handlers cho entity `transactions` với các method:

- GET /api/transactions: list với filters (search, type, category_id, wallet_id, date_from, date_to, min_amount, max_amount). Join với categories và wallets để trả thêm name/icon/color.
- POST /api/transactions: tạo mới, validate body, đồng thời update wallets.current_balance qua transaction SQL atomic.
- GET /api/transactions/[id]: lấy 1 record + receipt_items.
- PATCH /api/transactions/[id]: update từng field, reverse số dư ví cũ + apply số dư ví mới.
- DELETE /api/transactions/[id]: reverse số dư ví trước khi xóa.

YÊU CẦU:
- Auth check bằng `getUserId()` ở đầu mỗi handler, trả 401 nếu không có session.
- Validate wallet_id và category_id phải thuộc về user (chống IDOR).
- Dùng sql template tag từ `@/app/api/utils/sql` (Neon serverless).
- Trả lỗi tiếng Việt cho user.
- Comment giải thích logic ví/danh mục.

Code TypeScript.
```

**✅ Kết quả mong muốn**: 2 file route handler đầy đủ ~300 dòng, type-safe, có xử lý edge case (delete wallet → null transactions, reverse balance).

**🧠 Lý do**: Logic giao dịch ↔ ví là điểm dễ lỗi nhất. Bắt AI nêu rõ trong prompt việc reverse + re-apply balance giúp tránh bug sai số dư.

---

## 📊 Tổng kết sử dụng AI trong dự án

| Giai đoạn | Tool | Thời gian tiết kiệm |
|---|---|---|
| Thiết kế kiến trúc | Claude Opus | ~4 giờ |
| Sinh database schema | ChatGPT 4 | ~3 giờ |
| Code dashboard UI | Claude Sonnet | ~8 giờ |
| Code OCR flow | Gemini + Claude | ~6 giờ |
| Audit RLS & security | Claude Opus | ~3 giờ |
| Viết Dockerfile | ChatGPT 4 | ~1 giờ |
| Viết báo cáo | Claude Sonnet | ~5 giờ |
| **Tổng tiết kiệm** | | **~30 giờ** |

### Bài học rút ra
1. **Prompt rõ ràng, có cấu trúc** → kết quả tốt hơn 10x
2. **Cung cấp ví dụ cụ thể** → tránh AI "phóng tác"
3. **Yêu cầu output theo schema** → dễ tích hợp vào code
4. **Luôn review output AI** trước khi merge — đặc biệt code bảo mật và SQL
5. **AI không thay thế kiến thức nền** — vẫn cần hiểu để debug khi AI sai
