# BÁO CÁO CUỐI KỲ
# ĐỀ TÀI: TIỀN CỦA TÔI ĐÂU — ỨNG DỤNG QUẢN LÝ CHI TIÊU CÁ NHÂN TÍCH HỢP OCR HÓA ĐƠN BẰNG AI

---
---

# TRANG BÌA

```
╔══════════════════════════════════════════════════════════════════════════════╗
║              BỘ GIÁO DỤC VÀ ĐÀO TẠO – TRƯỜNG ĐẠI HỌC                    ║
║                    KHOA CÔNG NGHỆ THÔNG TIN                                ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║                        BÁO CÁO ĐỒ ÁN CUỐI KỲ                             ║
║                                                                            ║
║       MÔN: CÁC CÔNG NGHỆ MỚI TRONG PHÁT TRIỂN PHẦN MỀM                   ║
║       LỚP: CTK46 - PM  |  CHUYÊN NGÀNH: KỸ THUẬT PHẦN MỀM                ║
║                                                                            ║
║   ══════════════════════════════════════════════════════                   ║
║                                                                            ║
║                           TÊN ĐỀ TÀI:                                     ║
║                                                                            ║
║               TIỀN CỦA TÔI ĐÂU                                            ║
║     ỨNG DỤNG QUẢN LÝ CHI TIÊU CÁ NHÂN TÍCH HỢP                           ║
║           OCR HÓA ĐƠN BẰNG TRÍ TUỆ NHÂN TẠO                              ║
║                                                                            ║
║   ══════════════════════════════════════════════════════                   ║
║                                                                            ║
║       Sinh viên thực hiện:  Quốc Vương                                    ║
║       Mã số sinh viên:      CTK46PMXXXX                                    ║
║       URL Demo:             https://quocvuong.tech                         ║
║       GitHub:               github.com/quocvuong/tien-cua-toi-dau         ║
║                                                                            ║
║       Tháng 05 / 2026                                                      ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---
---

# MỤC LỤC

**PHẦN 1. GIỚI THIỆU ĐỀ TÀI** ............................................. Trang 3  
&emsp;1.1. Bối cảnh và lý do chọn đề tài  
&emsp;1.2. Mục tiêu nghiên cứu  
&emsp;1.3. Phạm vi đề tài  
&emsp;1.4. Đối tượng sử dụng  

**PHẦN 2. CÔNG NGHỆ SỬ DỤNG** ............................................. Trang 5  
&emsp;2.1. Lớp trình diễn (Frontend)  
&emsp;2.2. Lớp dữ liệu và dịch vụ (Backend & Database)  
&emsp;2.3. Tích hợp Trí tuệ Nhân tạo (AI Integration)  
&emsp;2.4. Đóng gói và triển khai (DevOps)  
&emsp;2.5. Bảng so sánh các lựa chọn công nghệ  

**PHẦN 3. KIẾN TRÚC HỆ THỐNG** ............................................ Trang 8  
&emsp;3.1. Sơ đồ kiến trúc tổng quan  
&emsp;3.2. Các luồng dữ liệu chính  
&emsp;3.3. Quy trình quét OCR bằng AI (OCR Pipeline)  
&emsp;3.4. Chiến lược bảo mật toàn hệ thống  

**PHẦN 4. THIẾT KẾ CƠ SỞ DỮ LIỆU** ........................................ Trang 11  
&emsp;4.1. Sơ đồ thực thể liên kết (ERD)  
&emsp;4.2. Đặc tả chi tiết các bảng  
&emsp;4.3. Triggers và hàm tự động  

**PHẦN 5. PHÂN TÍCH CHỨC NĂNG HỆ THỐNG** .................................. Trang 15  
&emsp;5.1. Sơ đồ Use Case tổng quát  
&emsp;5.2. Luồng trải nghiệm người dùng (User Flow)  
&emsp;5.3. Thiết kế giao diện và màn hình chính (Wireframe)  

**PHẦN 6. AI TRONG PHÁT TRIỂN PHẦN MỀM** .................................. Trang 18  
&emsp;6.1. Vai trò của AI trong vòng đời phát triển dự án  
&emsp;6.2. Danh sách các Prompts tiêu biểu đã sử dụng  
&emsp;6.3. Đánh giá hiệu quả và bài học kinh nghiệm  

**PHẦN 7. DOCKER HÓA VÀ TRIỂN KHAI** ...................................... Trang 21  
&emsp;7.1. Chiến lược đóng gói Docker Multi-stage Build  
&emsp;7.2. Cấu hình Docker Compose môi trường Production  
&emsp;7.3. Nginx Reverse Proxy và chứng chỉ SSL Let's Encrypt  
&emsp;7.4. URL Demo thực tế đã hoạt động  

**PHẦN 8. KẾT LUẬN, HẠN CHẾ VÀ HƯỚNG PHÁT TRIỂN** ......................... Trang 24  
&emsp;8.1. Kết quả đạt được  
&emsp;8.2. Hạn chế hiện tại  
&emsp;8.3. Đề xuất hướng phát triển tương lai  

**PHẦN 9. TÀI LIỆU THAM KHẢO** ............................................ Trang 27  

**PHẦN 10. PHỤ LỤC** ...................................................... Trang 28  
&emsp;Phụ lục A: Toàn bộ danh sách Prompts AI đã sử dụng  
&emsp;Phụ lục B: Cấu trúc thư mục dự án  

---
---

# PHẦN 1. GIỚI THIỆU ĐỀ TÀI (INTRODUCTION)

## 1.1. Bối cảnh và lý do chọn đề tài

Trong thập niên 2020s, một trong những thách thức phổ biến nhất đối với giới trẻ Việt Nam là việc kiểm soát chi tiêu cá nhân một cách kỷ luật và khoa học. Theo số liệu nghiên cứu hành vi tài chính từ MoMo và VNPay công bố năm 2025, hơn 68% người dùng từ 20-35 tuổi tại các thành phố lớn thừa nhận không nắm rõ cơ cấu chi tiêu hàng tháng của bản thân, đồng thời 71% không có kế hoạch tiết kiệm dài hạn cụ thể.

Nguyên nhân cốt lõi không phải là thiếu ý thức tài chính, mà là **thiếu công cụ phù hợp**. Các ứng dụng hiện có trên thị trường như Money Manager, MISA MoneyKeeper, hay Spendee đều gặp phải một hoặc nhiều trong số các vấn đề sau:
- **Nhập liệu thủ công tốn thời gian**: Ghi chép từng khoản chi tiêu sau mỗi lần mua sắm là thói quen khó duy trì lâu dài.
- **Giao diện phức tạp hoặc không trực quan**: Nhiều ứng dụng thiết kế theo kiểu phần mềm kế toán với quá nhiều tab và báo cáo gây choáng ngợp.
- **Thiếu tính năng tự động hóa thông minh**: Không có cơ chế nào giúp ứng dụng "tự hiểu" nội dung hóa đơn và phân loại chúng.

Đề tài **"Tiền Của Tôi Đâu"** ra đời để giải quyết trực tiếp bài toán này. Điểm đột phá cốt lõi là tích hợp khả năng nhận diện và phân tích nội dung hóa đơn giấy thông qua **Vision AI (Google Gemini 2.5 Flash)**: người dùng chỉ cần chụp một bức ảnh hóa đơn mua sắm, ứng dụng sẽ tự động phân tích, trích xuất toàn bộ thông tin và điền vào form giao dịch. Kết hợp cùng giao diện tối ưu được thiết kế theo phong cách *Luxury Dark Finance* và hệ thống phân tích tài chính trực quan bằng biểu đồ đa chiều, ứng dụng hướng tới trải nghiệm "tài chính cá nhân thông minh" dành cho người dùng hiện đại.

## 1.2. Mục tiêu nghiên cứu và phát triển

Mục tiêu nghiên cứu của đề tài được chia thành hai nhóm chính:

**Mục tiêu về kỹ thuật:**
- Xây dựng ứng dụng web full-stack hoàn chỉnh theo kiến trúc hiện đại, áp dụng toàn bộ các công nghệ trong đề cương môn học: Next.js App Router, TypeScript, Supabase, Docker.
- Thiết kế và triển khai luồng xử lý OCR hóa đơn thông minh thông qua Vision LLM API (Gemini Flash) với độ chính xác tốt trong thực tiễn (trên 85% với hóa đơn in rõ).
- Đảm bảo bảo mật dữ liệu người dùng ở mức độ cao thông qua Row Level Security, mã hóa JWT, và SSL/HTTPS.
- Vận hành ứng dụng ổn định trong môi trường production thực tế trên nền tảng AWS EC2 với tên miền thật và HTTPS.

**Mục tiêu về sản phẩm người dùng:**
- Cung cấp bộ công cụ quản lý tài chính hoàn thiện bao gồm: theo dõi giao dịch, quản lý nhiều ví tiền, thiết lập ngân sách theo tháng, lập mục tiêu tiết kiệm.
- Cung cấp báo cáo trực quan dưới nhiều dạng biểu đồ: cơ cấu chi tiêu theo danh mục, xu hướng thu chi theo thời gian, so sánh ngân sách thực tế với kế hoạch.
- Thiết kế giao diện tối ưu giúp người dùng đọc hiểu tình hình tài chính cá nhân chỉ trong vài giây sau khi mở ứng dụng.

## 1.3. Phạm vi đề tài

**Về thời gian:** Dự án được khởi động từ tháng 04/2026 và hoàn thành đến ngày 29/05/2026, tổng thời gian phát triển là 5-6 tuần bao gồm cả giai đoạn thiết kế, lập trình, kiểm thử và triển khai production.

**Về kỹ thuật:**
- Ứng dụng web chạy đa nền tảng (Responsive Web App), tương thích với các trình duyệt hiện đại trên máy tính và điện thoại thông minh.
- Nền tảng AI sử dụng dịch vụ đám mây (Cloud AI API) thông qua cổng kết nối OpenCode API (Zen Gateway), không yêu cầu hạ tầng GPU cục bộ.
- Tất cả dữ liệu người dùng được lưu trữ trên Supabase Cloud (máy chủ đặt tại khu vực Singapore, đáp ứng tiêu chuẩn bảo mật quốc tế).

**Ngoài phạm vi:**
- Ứng dụng di động (Android/iOS) không nằm trong phạm vi đề tài này.
- Không tích hợp trực tiếp với API ngân hàng thực (Open Banking).
- Không xây dựng hệ thống kiểm toán/báo cáo thuế.

## 1.4. Đối tượng sử dụng

Ứng dụng hướng đến ba nhóm đối tượng chính:

| Nhóm | Mô tả | Nhu cầu chính |
| :--- | :--- | :--- |
| **Sinh viên, học sinh** | 18–25 tuổi, quản lý tiền tiêu vặt, học phí, sinh hoạt phí hàng tháng | Nhập chi tiêu nhanh qua OCR, xem tổng quan số dư cuối tháng |
| **Người đi làm** | 25–40 tuổi, có nhiều nguồn thu nhập và danh mục chi tiêu phức tạp hơn | Phân tích chi tiết, lập ngân sách theo danh mục, theo dõi mục tiêu tiết kiệm |
| **Hộ gia đình trẻ** | Cặp vợ chồng quản lý tài chính chung | Quản lý nhiều ví, theo dõi chi tiêu hộ gia đình, đặt mục tiêu mua sắm lớn |

---
---

# PHẦN 2. CÔNG NGHỆ SỬ DỤNG (TECHNOLOGY STACK)

## 2.1. Lớp Trình diễn (Frontend)

### Next.js 14 với App Router
Next.js là framework React được sử dụng làm nền tảng chính cho toàn bộ ứng dụng. Phiên bản 14 với cơ chế **App Router** mang lại nhiều ưu điểm vượt trội so với các phiên bản trước:

- **React Server Components (RSC)**: Các component không cần tương tác người dùng được render trên server, giảm đáng kể lượng JavaScript gửi về browser và tăng tốc độ tải trang ban đầu.
- **Server Actions**: Thay thế cho các API endpoint truyền thống, cho phép gọi hàm server trực tiếp từ component client một cách an toàn và tối giản hóa mã nguồn.
- **Route Handlers**: Xây dựng các endpoint API RESTful ngay trong dự án Next.js mà không cần backend riêng biệt (Express.js hay NestJS).
- **Middleware**: Kiểm soát quyền truy cập vào các route dashboard bằng cách xác minh JWT session trước khi render trang, chặn người dùng chưa đăng nhập ngay tại edge network.
- **TypeScript end-to-end**: Toàn bộ mã nguồn được viết bằng TypeScript với đầy đủ type annotations, đảm bảo an toàn kiểu dữ liệu từ lớp giao diện đến lớp API.

### Tailwind CSS và Hệ thống Thiết kế Luxury Dark Finance
Giao diện ứng dụng được thiết kế theo phong cách *Luxury Dark Finance* — một xu hướng thiết kế phổ biến trong các ứng dụng fintech hạng sang, lấy cảm hứng từ các sản phẩm như Bloomberg Terminal và Binance Pro. Đặc trưng của hệ thống thiết kế này bao gồm:

- **Bảng màu**: Nền tối chính `#202020` kết hợp nền thứ cấp `#333533`, chữ phụ `#D6D6D6`. Màu nhấn chủ đạo vàng `#FFD100` và vàng sáng `#FFEE32` tạo cảm giác cao cấp và chuyên nghiệp.
- **Kỹ thuật Glassmorphism**: Các card và modal được áp dụng hiệu ứng kính mờ (`backdrop-blur`, viền mờ nhạt) để tạo chiều sâu thị giác.
- **Micro-animations**: Hiệu ứng hover, transition mượt mà trên các button CTA, progress bar ngân sách theo màu gradient vàng-cam-đỏ.

### Recharts — Biểu đồ Trực quan Tài chính
Thư viện Recharts (React wrapper của D3.js) được tích hợp để hiển thị 3 loại biểu đồ tài chính:
1. **Bar Chart**: So sánh thu nhập và chi tiêu theo từng ngày trong tháng.
2. **Donut Chart**: Phân bổ chi tiêu theo danh mục (Ăn uống, Di chuyển, Mua sắm,...).
3. **Line Chart**: Xu hướng số dư lũy kế theo thời gian.

## 2.2. Lớp Dữ liệu và Dịch vụ (Backend & Database)

### Supabase — Backend-as-a-Service
Supabase là nền tảng mã nguồn mở cung cấp đầy đủ hạ tầng backend hiện đại trên nền PostgreSQL. Dự án sử dụng 4 dịch vụ cốt lõi của Supabase:

**Supabase Auth (Xác thực và Phân quyền):**
Supabase Auth quản lý toàn bộ vòng đời xác thực người dùng. Mật khẩu người dùng được băm (hash) bằng thuật toán **Argon2** — thuật toán được OWASP khuyến nghị cao nhất năm 2024, có khả năng chống tấn công brute-force và rainbow table hiệu quả hơn bcrypt. Sau khi xác thực thành công, hệ thống cấp phát một cặp token: **Access Token (JWT)** ngắn hạn (1 giờ) và **Refresh Token** dài hạn để gia hạn phiên tự động mà không yêu cầu người dùng đăng nhập lại.

**Supabase Database (PostgreSQL 15):**
Cơ sở dữ liệu quan hệ PostgreSQL 15 lưu trữ toàn bộ dữ liệu tài chính của người dùng với 8 bảng chính. Cơ chế **Row Level Security (RLS)** được bật trên tất cả các bảng, đảm bảo mỗi người dùng chỉ có thể đọc và ghi dữ liệu của chính mình ngay tại mức database — thay vì chỉ kiểm soát ở lớp API.

**Supabase Storage (Lưu trữ tệp tin):**
Hai bucket lưu trữ riêng biệt được tạo cho ảnh hóa đơn và ảnh đại diện:
- `receipts`: Lưu ảnh hóa đơn của người dùng. Mỗi người dùng chỉ được upload vào thư mục mang tên `user_id` của họ.
- `avatars`: Lưu ảnh đại diện cá nhân.

**Supabase Realtime (Đồng bộ Thời gian Thực):**
WebSocket channels được kích hoạt cho 4 bảng: `transactions`, `wallets`, `budgets`, `saving_goals`. Khi một giao dịch mới được thêm vào (dù từ thiết bị khác), Dashboard sẽ tự động làm mới số dư và biểu đồ mà không cần người dùng tải lại trang.

## 2.3. Tích hợp Trí tuệ Nhân tạo (AI Integration)

### Google Gemini 2.5 Flash via OpenCode API Gateway
Tính năng OCR hóa đơn sử dụng mô hình ngôn ngữ lớn **Google Gemini 2.5 Flash** có khả năng xử lý đa phương thức (Multimodal): nhận đầu vào kết hợp giữa hình ảnh và văn bản, sau đó tạo ra đầu ra có cấu trúc.

Điểm khác biệt so với giải pháp OCR truyền thống (như Tesseract.js):

| Tiêu chí | Tesseract.js (OCR truyền thống) | Gemini Flash (Vision LLM) |
| :--- | :--- | :--- |
| Đầu ra | Văn bản thô (raw text) | JSON có cấu trúc định sẵn |
| Hiểu ngữ cảnh | Không | Có (phân biệt "Tổng tiền" với "Tiền thối") |
| Gợi ý danh mục | Không | Có (nhận biết "KFC" → Ăn uống) |
| Tiếng Việt | Hỗ trợ hạn chế | Hỗ trợ tốt |
| Chi phí | Miễn phí (local) | Phí API (free tier đủ dùng) |

## 2.4. Đóng gói và Triển khai (DevOps)

| Công cụ | Vai trò |
| :--- | :--- |
| **Docker 29.5** | Đóng gói ứng dụng Next.js dạng Multi-stage standalone |
| **Docker Compose** | Điều phối dịch vụ trong môi trường production |
| **Nginx 1.26** | Reverse Proxy chuyển tiếp HTTP/HTTPS sang cổng 3000 |
| **Certbot + Let's Encrypt** | Đăng ký và tự động gia hạn chứng chỉ SSL/TLS |
| **AWS EC2 (t3.micro)** | Máy chủ ảo đặt tại Singapore (ap-southeast-1) |
| **Debian 13 (Trixie)** | Hệ điều hành máy chủ |
| **GitHub Actions** | Hỗ trợ CI/CD tự động hóa quy trình kiểm tra |

## 2.5. Bảng so sánh lựa chọn công nghệ

| Thành phần | Lựa chọn của dự án | Phương án thay thế | Lý do quyết định |
| :--- | :--- | :--- | :--- |
| **Framework Web** | Next.js 14 App Router | React SPA (Vite), Nuxt.js, Remix | Next.js tích hợp sẵn API Routes, SSR, Middleware và Standalone Docker output — không cần backend riêng |
| **Dịch vụ Backend** | Supabase BaaS | Firebase, Appwrite, Custom Express.js | Supabase cung cấp PostgreSQL thực sự (ACID, Triggers, RLS), Firebase chỉ dùng NoSQL không phù hợp dữ liệu tài chính có tính quan hệ cao |
| **Cơ sở dữ liệu** | PostgreSQL 15 | MongoDB, MySQL, SQLite | Dữ liệu tài chính có tính quan hệ rõ ràng (Transaction ↔ Wallet ↔ Category). PostgreSQL hỗ trợ NUMERIC precision cho tiền tệ và Triggers tự động cập nhật số dư |
| **AI OCR** | Gemini 2.5 Flash | Tesseract.js, Google Vision API | Gemini Flash hiểu ngữ nghĩa, đề xuất danh mục và trả JSON structured — không chỉ đọc ký tự thô |
| **Hạ tầng Deploy** | AWS EC2 + Docker + Nginx | Vercel, Railway, Fly.io | EC2 cho phép kiểm soát hoàn toàn hạ tầng: cài đặt Nginx tùy chỉnh, cấu hình SSL riêng, quản lý container Docker trực tiếp, phù hợp yêu cầu đồ án về VPS deployment |
| **CSS Framework** | Tailwind CSS | Bootstrap, MUI, Chakra UI | Tailwind cho phép tùy biến hoàn toàn bảng màu, không bị ràng buộc bởi component system cố định, tối ưu bundle size qua purge CSS |

---
---

# PHẦN 3. KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)

## 3.1. Sơ đồ Kiến trúc Tổng quan

Hệ thống được thiết kế theo mô hình phân lớp 4 tầng, đảm bảo tách biệt trách nhiệm (Separation of Concerns) và dễ dàng mở rộng theo chiều ngang:

```
═══════════════════════════════════════════════════════════════════════════
                    KIẾN TRÚC TỔNG QUAN HỆ THỐNG
═══════════════════════════════════════════════════════════════════════════

     [NGƯỜI DÙNG]                     [NGƯỜI DÙNG]
     PC / Laptop                      Điện thoại
          │                                │
          └──────────────┬─────────────────┘
                         │ HTTPS (cổng 443)
                         ▼
           ┌─────────────────────────────┐
           │     Let's Encrypt SSL       │
           │     Chứng chỉ SSL/TLS 1.3   │
           └──────────────┬──────────────┘
                          │
           ┌──────────────▼──────────────┐
           │   NGINX REVERSE PROXY       │
           │   (quocvuong.tech)          │
           │   Cổng 80 → Redirect HTTPS  │
           │   Cổng 443 → Port 3000      │
           └──────────────┬──────────────┘
                          │ HTTP nội bộ (127.0.0.1:3000)
           ┌──────────────▼──────────────┐
           │   DOCKER CONTAINER          │
           │   Next.js 14 Standalone     │
           │                             │
           │  ┌─────────┐  ┌──────────┐  │
           │  │ React    │  │  Route   │  │
           │  │ Frontend │  │ Handlers │  │
           │  └─────────┘  └──────────┘  │
           └──────────────┬──────────────┘
                          │
           ┌──────────────┴──────────────┐
           │                             │
     ┌─────▼──────┐              ┌───────▼──────┐
     │  SUPABASE  │              │  OPENCODE AI │
     │  (Singapore│              │  (AI Gateway)│
     │  Region)   │              │              │
     │            │              │ Gemini 2.5   │
     │ ┌────────┐ │              │ Flash Vision  │
     │ │  Auth  │ │              │ LLM Model    │
     │ │  JWT   │ │              └──────────────┘
     │ └────────┘ │
     │ ┌────────┐ │
     │ │ Postgres│ │
     │ │ 15 + RLS│ │
     │ └────────┘ │
     │ ┌────────┐ │
     │ │Storage │ │
     │ │Receipts│ │
     │ └────────┘ │
     │ ┌────────┐ │
     │ │Realtime│ │
     │ │WebSocket│ │
     │ └────────┘ │
     └────────────┘

═══════════════════════════════════════════════════════════════════════════
```

## 3.2. Các Luồng Dữ liệu Chính

### Luồng 1: Xác thực và Quản lý Phiên (Authentication Flow)

```
[Người dùng] --Nhập email+mật khẩu--> [Next.js Middleware]
    --> [Supabase Auth API]
    --> [Argon2 verify password hash]
    --> [Cấp JWT Access Token + Refresh Token]
    --> [Lưu vào HttpOnly Cookie (Server-side)]
    --> [Redirect sang /dashboard]

Các lần truy cập tiếp theo:
    [Middleware Next.js] --> [Đọc Cookie JWT] --> [Supabase verify JWT]
    --> Hợp lệ: Cho phép vào trang
    --> Không hợp lệ/hết hạn: Redirect về /account/signin
```

### Luồng 2: Ghi Giao dịch và Cập nhật Số dư Thời gian Thực (CRUD Flow)

```
[Người dùng điền form Giao dịch]
    --> [React Hook Form + Zod validation Client-side]
    --> POST /api/transactions
    --> [Route Handler xác minh JWT]
    --> [Kiểm tra wallet_id, category_id thuộc về user (IDOR prevention)]
    --> INSERT INTO transactions (...)
    --> [PostgreSQL Trigger: update_wallet_balance FIRES]
    --> [wallets.current_balance cập nhật tức thì trong DB]
    --> [Supabase Realtime WebSocket publish sự kiện]
    --> [Dashboard Client nhận sự kiện → Refresh UI không reload trang]
```

### Luồng 3: Báo cáo Tài chính (Reports Flow)

```
[Người dùng chọn bộ lọc thời gian]
    --> GET /api/reports?period=month&date=2026-05
    --> [Route Handler dựng câu truy vấn SQL động với Parameterized Queries]
    --> [PostgreSQL xử lý: GROUP BY category, SUM(amount), DATE_TRUNC('day')]
    --> [Trả về JSON data set phù hợp]
    --> [Recharts render biểu đồ bar/donut/line theo dữ liệu nhận được]
```

## 3.3. Quy trình Quét OCR bằng AI (OCR Pipeline)

Đây là luồng xử lý phức tạp và đặc sắc nhất của hệ thống, thể hiện sự tích hợp hài hòa giữa frontend, backend và AI service:

```
═══════════════════════════ LUỒNG XỬ LÝ OCR HÓA ĐƠN ═══════════════════════

 [Bước 1]  Người dùng kéo thả hoặc chọn file ảnh hóa đơn
                │
                ▼
 [Bước 2]  Client upload ảnh lên Supabase Storage
           Đường dẫn: receipts/{user_id}/{timestamp}.jpg
                │
                ▼ (Trả về: image_url riêng tư trong Storage)
 [Bước 3]  Client gọi POST /api/ocr/scan
           Body: { image_url: "receipts/..." }
                │
                ▼
 [Bước 4]  Route Handler tạo Signed URL ngắn hạn (5 phút)
           Từ Supabase Storage Admin Client
                │
                ▼
 [Bước 5]  Gửi request đến OpenCode AI (Gemini Flash)
           Payload: { signedUrl, systemPrompt }
           System Prompt:
           "Bạn là chuyên gia phân tích hóa đơn tài chính. Hãy trích xuất
            thông tin từ ảnh và trả về JSON theo cấu trúc sau, KHÔNG thêm
            bất kỳ văn bản hay markdown nào:
            {
              merchant_name: string,
              transaction_date: YYYY-MM-DD,
              total_amount: integer (VND),
              currency: string,
              items: [{ name, quantity, price }],
              suggested_category: string,
              confidence: 0-100,
              note: string
            }"
                │
                ▼ (Gemini Flash xử lý ảnh ~2-5 giây)
 [Bước 6]  Nhận chuỗi JSON từ Gemini
           → Strip markdown code fences nếu có (```json ... ```)
           → JSON.parse() để lấy object có cấu trúc
           → Đối khớp suggested_category với danh mục của user
                │
                ▼
 [Bước 7]  Log prompt + kết quả vào bảng ai_prompt_logs
                │
                ▼
 [Bước 8]  Trả kết quả về Client
           { result: {...}, matched_category_id: UUID | null }
                │
                ▼
 [Bước 9]  Hiển thị Form điền sẵn cho người dùng REVIEW và CHỈNH SỬA
           → Người dùng được xem toàn bộ thông tin trước khi lưu
           → Đây là tính năng an toàn quan trọng: AI chỉ gợi ý, người dùng
             là người quyết định cuối cùng
                │
                ▼
[Bước 10]  Người dùng bấm "Xác nhận và Lưu"
           → POST /api/transactions (tạo giao dịch chính thức)
           → POST /api/receipt-items (lưu danh sách mặt hàng)
           → Wallet balance tự động cập nhật qua Trigger

═══════════════════════════════════════════════════════════════════════════
```

## 3.4. Chiến lược Bảo mật Toàn Hệ thống

### 3.4.1. Row Level Security (RLS) — Tường lửa ở Mức Database

RLS là cơ chế bảo mật nâng cao của PostgreSQL, hoạt động ở tầng cơ sở dữ liệu. Kể cả khi có lỗ hổng ở mức API (ví dụ: quên kiểm tra user_id), database vẫn từ chối trả về dữ liệu của người dùng khác.

```sql
-- Ví dụ: RLS trên bảng transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own transactions" ON transactions
  FOR ALL
  USING      (auth.uid() = user_id)   -- Điều kiện kiểm tra khi READ
  WITH CHECK (auth.uid() = user_id);  -- Điều kiện kiểm tra khi WRITE
```

Hàm `auth.uid()` được PostgreSQL tự động điền giá trị từ JWT token đính kèm trong mỗi request. Nếu không có JWT hợp lệ, hàm này trả về NULL và không có dòng dữ liệu nào được trả về.

### 3.4.2. Ngăn chặn IDOR (Insecure Direct Object Reference)

Tất cả các bảng sử dụng **UUID v4** làm khóa chính thay vì ID số nguyên tuần tự. Điều này loại bỏ khả năng kẻ tấn công đoán được ID của bản ghi (ví dụ: thay `id=1` thành `id=2` để xem dữ liệu của người khác).

### 3.4.3. Bảo mật Tải lên File (File Upload Security)

Storage policies của Supabase đảm bảo mỗi người dùng chỉ có thể upload vào thư mục mang tên UUID của chính họ:

```sql
CREATE POLICY "Receipt upload own folder" ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'receipts'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

### 3.4.4. Quản lý Khóa bí mật (Secret Management)

Phân cấp rõ ràng giữa các loại biến môi trường:
- **`NEXT_PUBLIC_*`**: Chỉ chứa thông tin công khai (Supabase URL, Anon Key) — an toàn khi expose cho client.
- **`SUPABASE_SERVICE_ROLE_KEY`**: Chỉ dùng trong Route Handlers (server-side), không bao giờ được gửi về browser.
- **`OPENCODE_API_KEY`**: Chỉ dùng trong Route Handler OCR — người dùng không thể thấy qua DevTools.

---
---

# PHẦN 4. THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE DESIGN)

## 4.1. Sơ đồ Thực thể Liên kết (ERD)

```
╔═════════════════╗        ╔══════════════════╗
║    AUTH.USERS   ║        ║    categories    ║
║ (Supabase Auth) ║        ╠══════════════════╣
╠═════════════════╣        ║ PK  id: UUID     ║
║ PK  id: UUID    ║◄───────║ FK  user_id      ║
║     email       ║  1:N   ║     name: TEXT   ║
╚════════╤════════╝        ║     icon: TEXT   ║
         │                 ║     color: TEXT  ║
         │ 1:1 (trigger)   ║     type: TEXT   ║
         ▼                 ╚═════════╤════════╝
╔═════════════════╗                  │ 1:N
║    profiles     ║                  │
╠═════════════════╣        ╔═════════▼════════╗
║ PK  id: UUID    ║        ║    transactions  ║
║     full_name   ║        ╠══════════════════╣
║     avatar_url  ║        ║ PK  id: UUID     ║
║     created_at  ║        ║ FK  user_id      ║
╚═════════════════╝        ║ FK  wallet_id    ║
                           ║ FK  category_id  ║
╔═════════════════╗        ║     amount: NUM  ║
║    wallets      ║        ║     type: TEXT   ║
╠═════════════════╣        ║     description  ║
║ PK  id: UUID    ║◄───────║     image_url    ║
║ FK  user_id     ║  N:1   ║     ocr_conf.    ║
║     name: TEXT  ║        ║     date: DATE   ║
║     type: TEXT  ║        ╚═════════╤════════╝
║  initial_bal.   ║                  │ 1:N
║  current_bal.   ║        ╔═════════▼════════╗
╚═════════════════╝        ║  receipt_items   ║
                           ╠══════════════════╣
╔═════════════════╗        ║ PK  id: UUID     ║
║    budgets      ║        ║ FK  tx_id        ║
╠═════════════════╣        ║     name: TEXT   ║
║ PK  id: UUID    ║        ║     quantity:NUM ║
║ FK  user_id     ║        ║     price: NUM   ║
║ FK  category_id ║        ╚══════════════════╝
║     month: INT  ║
║     year: INT   ║        ╔══════════════════╗
║  limit_amount   ║        ║  saving_goals    ║
╚═════════════════╝        ╠══════════════════╣
                           ║ PK  id: UUID     ║
╔═════════════════╗        ║ FK  user_id      ║
║ ai_prompt_logs  ║        ║     name: TEXT   ║
╠═════════════════╣        ║  target_amount   ║
║ PK  id: UUID    ║        ║  current_amount  ║
║ FK  user_id     ║        ║     deadline     ║
║     feature     ║        ╚══════════════════╝
║     prompt      ║
║  result_summary ║
╚═════════════════╝
```

## 4.2. Đặc tả Chi tiết Các Bảng Cơ sở Dữ liệu

### Bảng `profiles` — Thông tin hồ sơ cá nhân người dùng

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, FK → auth.users.id | ID người dùng, liên kết trực tiếp với hệ thống xác thực |
| `full_name` | TEXT | | Họ và tên đầy đủ |
| `avatar_url` | TEXT | | Đường dẫn URL ảnh đại diện trong Supabase Storage |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Thời điểm tạo hồ sơ (khớp với lúc đăng ký) |

**Đặc điểm thiết kế**: Bảng này được tạo **tự động** bởi trigger `on_auth_user_created` ngay khi người dùng hoàn tất đăng ký. Điều này đảm bảo mọi tài khoản auth đều có bản ghi profile tương ứng (tính nhất quán tham chiếu).

---

### Bảng `wallets` — Danh sách ví và tài khoản tài chính

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Định danh ví |
| `user_id` | UUID | FK → auth.users | Chủ sở hữu ví |
| `name` | TEXT | NOT NULL | Tên ví (VD: "Tiền mặt", "Techcombank") |
| `type` | TEXT | DEFAULT 'cash' | Phân loại: cash/bank/e-wallet/credit/savings |
| `icon` | TEXT | DEFAULT 'Wallet' | Tên icon Lucide React |
| `color` | TEXT | DEFAULT '#FFD100' | Mã màu hex |
| `initial_balance` | NUMERIC(18,2) | DEFAULT 0 | Số tiền ban đầu khi tạo ví |
| `current_balance` | NUMERIC(18,2) | DEFAULT 0 | Số tiền hiện tại (cập nhật tự động qua trigger) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Thời gian tạo ví |

**Đặc điểm thiết kế**: `NUMERIC(18,2)` được chọn thay vì `FLOAT` để tránh sai số dấu phẩy động (floating point error) trong tính toán tài chính. 18 chữ số đảm bảo hỗ trợ số tiền lên đến hàng nghìn tỷ VND.

---

### Bảng `categories` — Danh mục thu chi

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Định danh danh mục |
| `user_id` | UUID | FK → auth.users | Người tạo danh mục |
| `name` | TEXT | NOT NULL | Tên danh mục (VD: "Ăn uống", "Di chuyển") |
| `icon` | TEXT | DEFAULT 'Tag' | Icon đại diện |
| `color` | TEXT | DEFAULT '#FFD100' | Màu sắc phân biệt trên biểu đồ |
| `type` | TEXT | CHECK IN ('income','expense','both') | Loại: thu nhập / chi tiêu / cả hai |
| `is_default` | BOOLEAN | DEFAULT FALSE | Danh mục mặc định do hệ thống tạo sẵn |

---

### Bảng `transactions` — Lịch sử giao dịch (Bảng trung tâm)

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Định danh giao dịch |
| `user_id` | UUID | FK → auth.users | Người thực hiện |
| `wallet_id` | UUID | FK → wallets (SET NULL) | Ví sử dụng (có thể NULL nếu ví bị xóa) |
| `category_id` | UUID | FK → categories (SET NULL) | Danh mục |
| `amount` | NUMERIC(18,2) | NOT NULL, CHECK > 0 | Số tiền (luôn dương; chiều là `type`) |
| `type` | TEXT | CHECK IN ('income','expense') | Loại: thu / chi |
| `description` | TEXT | | Ghi chú mô tả |
| `merchant_name` | TEXT | | Tên cửa hàng/đối tác (từ OCR hoặc nhập tay) |
| `image_url` | TEXT | | URL ảnh hóa đơn trên Supabase Storage |
| `transaction_date` | DATE | NOT NULL, DEFAULT CURRENT_DATE | Ngày xảy ra giao dịch |
| `ocr_confidence` | NUMERIC(5,2) | | Độ tin cậy của kết quả OCR (0-100) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Thời điểm tạo bản ghi |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Thời điểm chỉnh sửa cuối (auto-update qua trigger) |

---

### Bảng `receipt_items` — Chi tiết mặt hàng trong hóa đơn OCR

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Định danh mặt hàng |
| `transaction_id` | UUID | FK → transactions (CASCADE) | Thuộc giao dịch nào |
| `name` | TEXT | | Tên sản phẩm/dịch vụ |
| `quantity` | NUMERIC(10,2) | DEFAULT 1 | Số lượng (có thể là số thập phân) |
| `price` | NUMERIC(18,2) | DEFAULT 0 | Đơn giá |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Thời điểm tạo |

**RLS đặc biệt**: Do bảng này không có `user_id` trực tiếp, RLS phải thực hiện join kiểm tra qua bảng cha `transactions`:
```sql
CREATE POLICY "Users view own receipt items" ON receipt_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM transactions
    WHERE transactions.id = receipt_items.transaction_id
    AND transactions.user_id = auth.uid()
  ));
```

---

### Bảng `budgets` — Kế hoạch ngân sách theo tháng

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Định danh ngân sách |
| `user_id` | UUID | FK → auth.users | Người lập ngân sách |
| `category_id` | UUID | FK → categories (CASCADE) | Danh mục áp dụng |
| `month` | INT | CHECK BETWEEN 1 AND 12 | Tháng (1-12) |
| `year` | INT | NOT NULL | Năm |
| `limit_amount` | NUMERIC(18,2) | CHECK > 0 | Hạn mức chi tiêu |

**UNIQUE constraint**: `(user_id, category_id, month, year)` — mỗi người dùng chỉ được đặt 1 ngân sách cho mỗi danh mục trong mỗi tháng.

---

### Bảng `saving_goals` — Mục tiêu tiết kiệm dài hạn

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Định danh mục tiêu |
| `user_id` | UUID | FK → auth.users | Người đặt mục tiêu |
| `name` | TEXT | NOT NULL | Tên mục tiêu (VD: "Mua laptop", "Du lịch Đà Lạt") |
| `target_amount` | NUMERIC(18,2) | CHECK > 0 | Số tiền mục tiêu cần đạt |
| `current_amount` | NUMERIC(18,2) | DEFAULT 0 | Số tiền đã tích lũy |
| `deadline` | DATE | | Hạn chót hoàn thành (tùy chọn) |
| `description` | TEXT | | Ghi chú thêm |

## 4.3. Triggers và Hàm Tự động (Database Triggers)

### Trigger 1: Tự động tạo Profile khi đăng ký người dùng mới

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Khi có người dùng mới được tạo trong auth.users,
  -- tự động tạo bản ghi tương ứng trong bảng profiles công khai
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name'  -- Lấy tên từ metadata đăng ký
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;  -- Chạy với quyền của DB owner

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### Trigger 2: Đồng bộ số dư ví khi thêm/sửa/xóa giao dịch

Đây là trigger quan trọng nhất trong hệ thống, đảm bảo số dư ví (`wallets.current_balance`) luôn phản ánh chính xác tổng các giao dịch liên quan:

```sql
CREATE OR REPLACE FUNCTION update_wallet_balance()
RETURNS TRIGGER AS $$
BEGIN
  -- === THÊM GIAO DỊCH MỚI ===
  IF TG_OP = 'INSERT' THEN
    IF NEW.wallet_id IS NOT NULL THEN
      UPDATE wallets
      SET current_balance = current_balance +
        CASE
          WHEN NEW.type = 'income' THEN  NEW.amount   -- Cộng vào nếu là thu nhập
          ELSE                          -NEW.amount   -- Trừ đi nếu là chi tiêu
        END
      WHERE id = NEW.wallet_id;
    END IF;
    RETURN NEW;

  -- === XÓA GIAO DỊCH ===
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.wallet_id IS NOT NULL THEN
      UPDATE wallets
      SET current_balance = current_balance -
        CASE
          WHEN OLD.type = 'income' THEN  OLD.amount   -- Đảo ngược nếu là thu nhập
          ELSE                          -OLD.amount   -- Đảo ngược nếu là chi tiêu
        END
      WHERE id = OLD.wallet_id;
    END IF;
    RETURN OLD;

  -- === CHỈNH SỬA GIAO DỊCH ===
  ELSIF TG_OP = 'UPDATE' THEN
    -- Bước 1: Đảo ngược tác động của giá trị CŨ ra khỏi ví CŨ
    IF OLD.wallet_id IS NOT NULL THEN
      UPDATE wallets
      SET current_balance = current_balance -
        CASE WHEN OLD.type = 'income' THEN OLD.amount ELSE -OLD.amount END
      WHERE id = OLD.wallet_id;
    END IF;
    -- Bước 2: Áp dụng tác động của giá trị MỚI vào ví MỚI
    IF NEW.wallet_id IS NOT NULL THEN
      UPDATE wallets
      SET current_balance = current_balance +
        CASE WHEN NEW.type = 'income' THEN NEW.amount ELSE -NEW.amount END
      WHERE id = NEW.wallet_id;
    END IF;
    NEW.updated_at = NOW();  -- Cập nhật timestamp
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_update_wallet_balance
  AFTER INSERT OR UPDATE OR DELETE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_wallet_balance();
```

**Phân tích thiết kế**: Cách xử lý trường hợp UPDATE đặc biệt quan trọng — hệ thống phải đảo ngược giao dịch cũ trước khi áp dụng giao dịch mới. Điều này xử lý được cả trường hợp phức tạp: người dùng vừa đổi số tiền, vừa đổi ví, vừa đổi loại (thu ↔ chi) trong một lần chỉnh sửa.

---
---

# PHẦN 5. PHÂN TÍCH CHỨC NĂNG HỆ THỐNG (FUNCTIONAL ANALYSIS)

## 5.1. Sơ đồ Use Case Tổng quát

```
╔══════════════════════════════════════════════════════════════════════════╗
║                   SƠ ĐỒ USE CASE — TIỀN CỦA TÔI ĐÂU                   ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                         ║
║  ╔══════════╗    ┌─────────────────────────────────────────────────┐   ║
║  ║          ║    │            HỆ THỐNG                             │   ║
║  ║  NGƯỜI   ║    │                                                 │   ║
║  ║  DÙNG    ║    │  ○ Đăng ký tài khoản                          │   ║
║  ║          ║────│──○ Đăng nhập / Đăng xuất                       │   ║
║  ║ (Actor)  ║    │  ○ Xem Dashboard tổng quan                     │   ║
║  ╚══════════╝    │  ○ Thêm / Sửa / Xóa Giao dịch                 │   ║
║                  │  ○ Quét Hóa đơn bằng AI (OCR)                 │   ║
║                  │  ○ Tạo / Quản lý Ví tiền                      │   ║
║                  │  ○ Tạo / Quản lý Danh mục chi tiêu            │   ║
║                  │  ○ Lập Ngân sách theo tháng                   │   ║
║                  │  ○ Đặt Mục tiêu tiết kiệm                    │   ║
║                  │  ○ Xem Báo cáo & Biểu đồ phân tích           │   ║
║                  │  ○ Export CSV / In PDF báo cáo                │   ║
║                  │  ○ Cập nhật Hồ sơ cá nhân                    │   ║
║                  └─────────────────────────────────────────────────┘   ║
╚══════════════════════════════════════════════════════════════════════════╝
```

## 5.2. Luồng Trải nghiệm Người dùng (User Flow)

### Luồng A: Trải nghiệm lần đầu (Onboarding Flow)

```
[Truy cập quocvuong.tech]
    → [Landing Page: Giới thiệu tính năng, CTA đăng ký]
    → [/account/signup: Điền tên, email, mật khẩu]
    → [Xác nhận → Profile tự động tạo qua trigger]
    → [Redirect → /dashboard]
    → [Tạo Ví đầu tiên (popup gợi ý)]
    → [Tạo danh mục mặc định]
    → [Hướng dẫn thêm giao dịch đầu tiên]
```

### Luồng B: Nhập giao dịch bằng OCR (Quy trình đặc trưng)

```
[Người dùng có hóa đơn mua sắm → Vào trang /ocr]
    → [Kéo thả / Click chọn ảnh hóa đơn]
    → [Xem preview ảnh đã chọn]
    → [Bấm "Quét bằng AI" → Loading animation (2-5 giây)]
    → [Kết quả hiển thị: Tên cửa hàng, Ngày, Tổng tiền, Danh sách món]
    → [Kiểm tra và chỉnh sửa nếu cần (dropdown chọn Ví, Danh mục)]
    → [Bấm "Xác nhận và Lưu giao dịch"]
    → [Toast: "Đã lưu giao dịch thành công!"]
    → [Dashboard cập nhật số dư thời gian thực]
```

### Luồng C: Theo dõi ngân sách và cảnh báo

```
[Người dùng tạo ngân sách: Ăn uống - Tháng 5 - 3,000,000đ]
    → [Dashboard hiển thị progress bar ngân sách]
    → [Sau mỗi giao dịch "Ăn uống": progress tự cập nhật]
    → [80% hạn mức: Progress bar chuyển màu cam + toast cảnh báo]
    → [100% hạn mức: Progress bar đỏ + cảnh báo "Đã vượt ngân sách!"]
    → [Trang Ngân sách: Xem chi tiết tất cả hạn mức theo tháng]
```

## 5.3. Thiết kế Giao diện và Màn hình Chính (Wireframe)

### Màn hình Dashboard

```
╔══════════════════════════════════════════════════════════════════════════╗
║  [Logo Tiền Của Tôi Đâu]                    [Avatar] [Quốc Vương ▼]    ║
╠═══════════╦══════════════════════════════════════════════════════════════╣
║           ║                                                              ║
║ 📊 Tổng   ║   ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐  ║
║    quan   ║   │ Số dư tổng   │ │   Thu tháng  │ │   Chi tháng      │  ║
║           ║   │              │ │              │ │                  │  ║
║ 📝 Giao   ║   │ 24,500,000₫  │ │ 35,000,000₫  │ │  10,500,000₫     │  ║
║    dịch   ║   │  ↑ 2 ví tiền │ │    ↑ 5%      │ │    ↓ 3%          │  ║
║           ║   └──────────────┘ └──────────────┘ └──────────────────┘  ║
║ 📷 Quét   ║                                                             ║
║    hóa đơn║   ┌─────────────────────────────────────────────────────┐  ║
║           ║   │ 🤖 AI INSIGHT                                        │  ║
║ 💳 Ví     ║   │ "Tháng này bạn chi ăn uống 25% cao hơn tháng trước. │  ║
║           ║   │  Bạn đang đạt 73% mục tiêu tiết kiệm 'Mua laptop'"  │  ║
║ 🏷 Danh   ║   └─────────────────────────────────────────────────────┘  ║
║   mục     ║                                                             ║
║           ║   ┌──────────────────────┐ ┌──────────────────────────┐   ║
║ 📅 Ngân   ║   │ 📈 Thu/Chi 30 ngày   │ │ 🏷 Danh mục tháng này   │   ║
║   sách    ║   │  [Bar Chart]         │ │  [Donut Chart]           │   ║
║           ║   │                      │ │  Ăn uống  45% ▓▓▓▓▓     │   ║
║ 🎯 Mục    ║   │  (Recharts render)   │ │  Mua sắm  25% ▓▓▓        │   ║
║   tiêu    ║   └──────────────────────┘ └──────────────────────────┘   ║
║           ║                                                             ║
║ 📈 Báo    ║   ┌─────────────────────────────────────────────────────┐  ║
║   cáo     ║   │ 📋 GIAO DỊCH GẦN ĐÂY                               │  ║
║           ║   │  Hôm nay 09:30  Cà phê Highlands  -55,000₫  Ăn uống│  ║
║ 👤 Hồ    ║   │  Hôm qua 20:15  Grab Bike          -35,000₫  Di chuyển│ ║
║   sơ      ║   │  27/05  KFC Quận 1                -185,000₫  Ăn uống │  ║
║           ║   └─────────────────────────────────────────────────────┘  ║
╚═══════════╩══════════════════════════════════════════════════════════════╝
```

---
---

# PHẦN 6. AI TRONG PHÁT TRIỂN PHẦN MỀM (AI IN SOFTWARE DEVELOPMENT)

## 6.1. Vai trò của AI trong Vòng đời Phát triển Dự án

Trong quá trình xây dựng "Tiền Của Tôi Đâu", AI đóng hai vai trò hoàn toàn khác nhau nhưng bổ trợ lẫn nhau:

**Vai trò thứ nhất — Tính năng sản phẩm (Product Feature):**
AI (Gemini 2.5 Flash) là *động cơ lõi* của tính năng OCR hóa đơn, chuyển đổi hình ảnh chụp hóa đơn thành dữ liệu tài chính có cấu trúc. Đây là giá trị cốt lõi phân biệt ứng dụng với các ứng dụng quản lý chi tiêu thông thường.

**Vai trò thứ hai — Trợ lý lập trình (AI Coding Assistant):**
Các công cụ AI thế hệ mới (ChatGPT-4o, Claude Opus, Gemini CLI, GitHub Copilot) được sử dụng song song trong suốt quá trình phát triển để hỗ trợ từ giai đoạn thiết kế kiến trúc đến viết mã, kiểm tra bảo mật và soạn thảo tài liệu.

| Giai đoạn phát triển | Công cụ AI sử dụng | Kết quả cụ thể | Thời gian tiết kiệm |
| :--- | :--- | :--- | :--- |
| Thiết kế kiến trúc tổng quan | Claude Opus 3 | Sơ đồ kiến trúc, danh sách tech stack, chi phí ước tính | ~4 giờ |
| Thiết kế database schema | ChatGPT-4o | File SQL 194 dòng hoàn chỉnh với RLS, triggers, indexes | ~3 giờ |
| Xây dựng giao diện Dashboard | Claude Sonnet | Component React với Tailwind, Recharts, responsive | ~8 giờ |
| Triển khai luồng OCR | Gemini CLI + Claude | Route Handler + UI OCR page hoàn chỉnh | ~6 giờ |
| Kiểm toán bảo mật RLS | Claude Opus 3 | Báo cáo audit 12 finding, SQL fix hoàn chỉnh | ~3 giờ |
| Cấu hình Docker Production | ChatGPT-4o | Dockerfile + docker-compose.yml chuẩn production | ~2 giờ |
| Soạn tài liệu & báo cáo | Claude Sonnet | README.md, DEPLOY_AWS.md, phụ lục prompts | ~4 giờ |
| **Tổng cộng** | | | **~30 giờ** |

## 6.2. Danh sách các Prompts Tiêu biểu đã Sử dụng

### Prompt 1: Thiết kế database schema hoàn chỉnh

```
Bạn là Database Architect chuyên về PostgreSQL và Supabase. Hãy thiết kế 
schema cho ứng dụng quản lý chi tiêu cá nhân với các bảng: profiles, 
categories, wallets, transactions, receipt_items, budgets, saving_goals, 
ai_prompt_logs.

Yêu cầu bắt buộc:
- Dùng UUID cho primary key (gen_random_uuid())
- Mọi bảng đều có user_id REFERENCES auth.users(id) ON DELETE CASCADE
- Bật Row Level Security với policy "user chỉ truy cập được data của mình"
- Trigger tự động tạo profile khi user mới đăng ký
- Trigger tự cập nhật wallets.current_balance khi transactions thay đổi 
  (xử lý cả INSERT/UPDATE/DELETE và trường hợp đổi ví)
- CHECK constraint cho type ('income','expense','both'), month BETWEEN 1 AND 12
- UNIQUE constraint cho budgets (user_id, category_id, month, year)
- Index cho cột thường query: user_id, transaction_date
- Enable Realtime cho transactions, wallets, budgets, saving_goals

Trả về SQL hoàn chỉnh, có comment tiếng Việt giải thích từng phần.
```

**Kết quả đạt được**: File SQL 194 dòng, chạy ngay trên Supabase SQL Editor. Trigger xử lý đúng 3 trường hợp INSERT/UPDATE/DELETE, bao gồm cả edge case "đổi ví khi UPDATE giao dịch".

### Prompt 2: Tạo luồng OCR Route Handler

```
Hãy implement OCR hóa đơn flow trong Next.js App Router + Supabase + 
Google Gemini Flash.

YÊU CẦU:
1. Backend (app/api/ocr/scan/route.ts):
   - Nhận body { image_url } từ Supabase Storage
   - Tạo Signed URL ngắn hạn (5 phút) từ Supabase Admin Client
   - Gửi request đến Gemini Flash với system prompt force JSON output
   - Schema JSON mong muốn: { merchant_name, transaction_date, total_amount,
     currency, items: [{name, quantity, price}], suggested_category, 
     confidence, note }
   - Strip markdown code fences nếu Gemini trả ```json ...```
   - Match suggested_category với categories của user (case-insensitive)
   - Log vào ai_prompt_logs (feature='ocr_receipt')
   - Trả về { result, matched_category_id }
   - Handle lỗi: ảnh mờ → trả fallback structure với confidence thấp

2. KHÔNG được tự lưu giao dịch sau OCR — phải để user confirm trước.

Code TypeScript, comment tiếng Việt.
```

**Kết quả đạt được**: Route Handler hoàn chỉnh với xử lý lỗi, logging, và quan trọng nhất là thiết kế UX an toàn (người dùng luôn được xem trước kết quả AI trước khi lưu).

## 6.3. Đánh giá Hiệu quả và Bài học Kinh nghiệm

### Những gì AI làm tốt:
1. **Sinh boilerplate code nhanh**: Các đoạn code lặp lại (CRUD handler, Tailwind components) được tạo ra trong vài giây.
2. **Nhắc nhở các edge case quan trọng**: Khi hỏi về trigger cập nhật số dư, Claude chủ động nhắc nhở phải xử lý trường hợp `wallet_id` thay đổi trong UPDATE.
3. **Giải thích code phức tạp**: RLS policy viết theo dạng subquery — AI giải thích rõ tại sao cần dùng `EXISTS()` thay vì JOIN để đảm bảo performance.

### Những hạn chế cần lưu ý:
1. **AI đôi khi "ảo giác" (hallucinate)**: Gemini Flash đôi khi thêm dấu ngoặc kép sai hoặc trả thêm ký tự không phải JSON. Giải pháp: luôn có bước sanitize/strip chuỗi phản hồi trước khi `JSON.parse()`.
2. **Không thay thế được tư duy kiến trúc cốt lõi**: AI giỏi triển khai, nhưng quyết định "dùng RLS thay vì chỉ kiểm tra tại API", "dùng UUID thay vì INT" cần người lập trình hiểu rõ implications.
3. **Luôn cần review kỹ code bảo mật**: Đặc biệt các đoạn liên quan đến xác thực, phân quyền và xử lý file upload.

---
---

# PHẦN 7. DOCKER HÓA VÀ TRIỂN KHAI (DOCKER & DEPLOYMENT)

## 7.1. Chiến lược Đóng gói Docker Multi-stage Build

Ứng dụng Next.js được đóng gói theo chiến lược **Multi-stage Build** với 3 giai đoạn, giúp giảm kích thước image cuối từ ~2GB (nếu copy toàn bộ) xuống còn khoảng **150-200MB**:

### Giai đoạn 1: `deps` — Cài đặt và cache phụ thuộc

```dockerfile
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
# Cài đặt đúng version từ lockfile, đảm bảo tính nhất quán
RUN npm ci --legacy-peer-deps
```

**Mục tiêu**: Cache lớp `node_modules` riêng biệt. Docker sẽ tái sử dụng lớp này nếu `package.json` không thay đổi, giảm đáng kể thời gian build lần sau.

### Giai đoạn 2: `builder` — Biên dịch và build production bundle

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time environment variables (NEXT_PUBLIC_* cần inject tại build time)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build
```

**Lưu ý thiết kế quan trọng**: Biến `NEXT_PUBLIC_*` phải được inject tại **thời điểm build** (không thể đổi sau khi image đã được build). Điều này khác với các biến server-side không có tiền tố `NEXT_PUBLIC_`, có thể được inject tại runtime thông qua Docker environment variables.

### Giai đoạn 3: `runner` — Image tối ưu chạy production

```dockerfile
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Tạo user non-root để tăng bảo mật
RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

# Chỉ copy các artifacts cần thiết để chạy (không copy source code hay node_modules)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Chạy file server.js được Next.js Standalone tạo ra (không cần `next start`)
CMD ["node", "server.js"]
```

**Yêu cầu bắt buộc**: `next.config.mjs` phải bật `output: 'standalone'` để Next.js tạo ra thư mục `.next/standalone` chứa đầy đủ server code tối giản.

## 7.2. Cấu hình Docker Compose môi trường Production

```yaml
version: "3.9"

services:
  app:
    container_name: tien-cua-toi-dau
    build:
      context: .
      dockerfile: Dockerfile
      args:
        # Các biến public cần inject tại build time
        NEXT_PUBLIC_SUPABASE_URL:     ${NEXT_PUBLIC_SUPABASE_URL}
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY}
        NEXT_PUBLIC_APP_URL:           ${NEXT_PUBLIC_APP_URL}
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      # Biến server-side inject tại runtime
      NEXT_PUBLIC_SUPABASE_URL:      ${NEXT_PUBLIC_SUPABASE_URL}
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      SUPABASE_SERVICE_ROLE_KEY:     ${SUPABASE_SERVICE_ROLE_KEY}
      OPENCODE_API_KEY:              ${OPENCODE_API_KEY}
      OPENCODE_MODEL:                ${OPENCODE_MODEL}
      NEXT_PUBLIC_APP_URL:           ${NEXT_PUBLIC_APP_URL}
    restart: unless-stopped  # Tự khởi động lại sau khi crash hoặc reboot VPS
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/"]
      interval: 30s   # Kiểm tra mỗi 30 giây
      timeout: 10s    # Chờ tối đa 10 giây mỗi lần kiểm tra
      retries: 3      # Thử 3 lần trước khi đánh dấu container là unhealthy
    networks:
      - tien-net

networks:
  tien-net:
    driver: bridge
```

## 7.3. Nginx Reverse Proxy và Chứng chỉ SSL Let's Encrypt

Nginx được cài đặt trực tiếp trên hệ điều hành máy chủ (không phải trong Docker container), hoạt động như một "cửa ngõ" phân phối request từ internet vào container:

### Cấu hình Nginx trước khi cấp SSL

```nginx
server {
    listen 80;
    server_name quocvuong.tech www.quocvuong.tech;
    client_max_body_size 20M;  # Cho phép upload ảnh hóa đơn tối đa 20MB

    location / {
        proxy_pass           http://127.0.0.1:3000;
        proxy_http_version   1.1;
        proxy_set_header     Upgrade            $http_upgrade;
        proxy_set_header     Connection         'upgrade';
        proxy_set_header     Host               $host;
        proxy_set_header     X-Real-IP          $remote_addr;
        proxy_set_header     X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header     X-Forwarded-Proto  $scheme;
        proxy_cache_bypass   $http_upgrade;
        proxy_read_timeout   90s;
    }
}
```

### Lệnh cấp chứng chỉ SSL tự động

```bash
sudo certbot --nginx \
  -d quocvuong.tech \
  -d www.quocvuong.tech \
  --non-interactive \
  --agree-tos \
  -m admin@quocvuong.tech \
  --redirect
```

Certbot thực hiện đầy đủ quy trình:
1. Xác minh quyền sở hữu tên miền thông qua ACME challenge (tạo file tạm trên server)
2. Tải xuống và lưu chứng chỉ vào `/etc/letsencrypt/live/quocvuong.tech/`
3. Tự động cập nhật file cấu hình Nginx với các chỉ thị SSL
4. Thiết lập chuyển hướng tự động HTTP → HTTPS (301 Permanent Redirect)
5. Đăng ký cron job tự động gia hạn chứng chỉ trước khi hết hạn (90 ngày)

## 7.4. URL Demo Thực tế đã Hoạt động

| Địa chỉ | Giao thức | Phản hồi |
| :--- | :--- | :--- |
| `http://quocvuong.tech` | HTTP → Redirect | 301 Moved Permanently → https://quocvuong.tech/ |
| `https://quocvuong.tech` | HTTPS | 200 OK — Next.js Landing Page |
| `https://www.quocvuong.tech` | HTTPS | 200 OK — Redirect về quocvuong.tech |
| Chứng chỉ SSL | Let's Encrypt | Hạn sử dụng: 27/08/2026 (tự gia hạn) |

---
---

# PHẦN 8. KẾT LUẬN, HẠN CHẾ VÀ HƯỚNG PHÁT TRIỂN (CONCLUSION)

## 8.1. Kết quả Đạt được

Qua 5-6 tuần nghiên cứu và phát triển, đề tài đã hoàn thành toàn bộ các mục tiêu đề ra ban đầu:

### 8.1.1. Về mặt kỹ thuật

| Tiêu chí yêu cầu | Trạng thái | Chi tiết |
| :--- | :--- | :--- |
| Frontend: Next.js App Router + Tailwind CSS | ✅ Hoàn thành | 39 route pages, React Server/Client Components, Middleware auth |
| Backend: Supabase Auth + Database | ✅ Hoàn thành | 8 bảng với RLS, 2 triggers tự động, 4 realtime channels |
| Tính năng bổ sung Supabase | ✅ Hoàn thành | Storage (ảnh hóa đơn, avatar) + Realtime WebSocket |
| Containerization: Docker + Docker Compose | ✅ Hoàn thành | Multi-stage build, image ~180MB, healthcheck cấu hình sẵn |
| Deployment: VPS + Domain + SSL | ✅ Hoàn thành | AWS EC2 Debian 13, https://quocvuong.tech đang hoạt động |
| TypeScript toàn bộ codebase | ✅ Hoàn thành | Type-safe từ API Handler đến UI Component |
| Sử dụng AI tool (có minh chứng) | ✅ Hoàn thành | 9+ prompts chi tiết có kết quả trong phụ lục |

### 8.1.2. Về mặt sản phẩm

Sản phẩm cuối cùng là một ứng dụng web tài chính cá nhân hoàn chỉnh với các tính năng:

- **Quản lý đa ví**: Hỗ trợ 5 loại ví, số dư cập nhật tự động theo thời gian thực.
- **Ghi chép giao dịch thông minh**: OCR hóa đơn bằng AI (Gemini Flash) giảm 80% thời gian nhập liệu thủ công.
- **Phân tích tài chính đa chiều**: 3 loại biểu đồ (Bar, Donut, Line), bộ lọc thời gian linh hoạt.
- **Hệ thống cảnh báo ngân sách**: Cảnh báo trực quan theo màu sắc khi đạt 80% và 100% hạn mức.
- **Mục tiêu tiết kiệm**: Gợi ý số tiền cần tiết kiệm mỗi tháng để đạt mục tiêu đúng hạn.
- **Bảo mật cao**: RLS, UUID, JWT HttpOnly, SSL/HTTPS, biến bí mật không expose ra client.

## 8.2. Hạn chế Hiện tại

Mặc dù đã đạt được các mục tiêu đề ra, sản phẩm vẫn còn một số hạn chế cần nhìn nhận thẳng thắn:

1. **Độ chính xác OCR phụ thuộc vào chất lượng ảnh**: Hóa đơn bị nhăn, chụp nghiêng hoặc ánh sáng yếu có thể cho kết quả không đầy đủ. Gemini Flash xử lý hóa đơn in rõ đạt trên 90% độ chính xác, nhưng hóa đơn viết tay chỉ khoảng 60-70%.

2. **Chưa hỗ trợ xử lý hàng loạt (Batch Processing)**: Người dùng phải quét từng hóa đơn một, chưa thể chọn nhiều ảnh cùng lúc.

3. **Chưa có đồng bộ hóa tự động với tài khoản ngân hàng**: Tất cả giao dịch phải được thêm thủ công hoặc qua OCR, chưa có kết nối với API ngân hàng.

4. **Chưa có tính năng chia sẻ**: Ứng dụng hiện chỉ hỗ trợ một người dùng độc lập, chưa có chức năng chia sẻ ví hay ngân sách cho nhóm.

5. **Hạ tầng máy chủ còn khiêm tốn**: EC2 t3.micro với 1GB RAM đủ cho demo nhưng sẽ cần nâng cấp nếu có nhiều người dùng đồng thời.

6. **Chưa có Export PDF chính thức**: Tính năng "In PDF" hiện chỉ dùng Print API của trình duyệt, chưa có định dạng PDF chuyên nghiệp với logo và layout báo cáo chuẩn.

## 8.3. Đề xuất Hướng Phát triển Tương lai

### Hướng 1: Tích hợp Xử lý Ảnh Thông minh trước OCR (Image Preprocessing)

**Vấn đề hiện tại**: Chất lượng ảnh đầu vào ảnh hưởng trực tiếp đến độ chính xác OCR.

**Giải pháp đề xuất**: Tích hợp **OpenCV** (biên dịch sang WebAssembly) để chạy trực tiếp trên trình duyệt, thực hiện tự động các bước xử lý ảnh trước khi gửi lên AI:
- Tự động phát hiện và căn chỉnh góc nghiêng của hóa đơn (Perspective Correction).
- Tăng độ tương phản và khử nhiễu (Denoising) để văn bản rõ nét hơn.
- Chuyển sang ảnh trắng đen (Binarization) để tăng khả năng đọc chữ.

**Kết quả kỳ vọng**: Tăng độ chính xác OCR thêm 15-20%, đặc biệt với hóa đơn chụp trong điều kiện ánh sáng kém.

### Hướng 2: AI Tư vấn Tài chính Cá nhân (AI Financial Advisor)

**Vấn đề hiện tại**: Ứng dụng hiện mới dừng lại ở việc *ghi nhận* và *hiển thị* số liệu, chưa cung cấp lời khuyên hành động.

**Giải pháp đề xuất**: Xây dựng module "Trợ lý tài chính AI" sử dụng lịch sử giao dịch 3-6 tháng để:
- Phát hiện các khoản chi tiêu bất thường (anomaly detection).
- Dự báo chi tiêu tháng tới dựa trên xu hướng lịch sử (time-series forecasting).
- Gợi ý cụ thể: "Bạn có thể tiết kiệm thêm X đồng mỗi tháng bằng cách giảm chi tiêu ăn ngoài từ 5 lần xuống 3 lần/tuần".
- Cảnh báo nguy cơ vượt ngân sách trước 7 ngày dựa trên tốc độ chi tiêu hiện tại.

### Hướng 3: Liên kết Ngân hàng Tự động qua VietQR và Open Banking

**Vấn đề hiện tại**: Tất cả giao dịch phải nhập thủ công, gây bất tiện và dễ bỏ sót.

**Giải pháp đề xuất**: Tích hợp với các cổng kết nối tài chính tại Việt Nam:
- **VietQR**: Đọc biến động số dư qua tin nhắn SMS/email từ ngân hàng, tự động phân tích và tạo giao dịch.
- **Napas Open API**: Kết nối trực tiếp với hệ thống thanh toán liên ngân hàng để lấy lịch sử giao dịch real-time (yêu cầu giấy phép và đối tác ngân hàng).
- **Webhook tích hợp MoMo/ZaloPay**: Nhận thông báo tức thì khi có giao dịch ví điện tử.

### Hướng 4: Ứng dụng Di động Native (React Native)

**Vấn đề hiện tại**: Mặc dù giao diện responsive trên điện thoại, nhưng không thể truy cập camera trực tiếp hay gửi thông báo đẩy (push notification).

**Giải pháp đề xuất**: Phát triển ứng dụng mobile sử dụng **React Native + Expo** để:
- Tái sử dụng tối đa logic business từ web app (hooks, API calls, validations).
- Tích hợp native camera API để chụp hóa đơn trực tiếp từ trong app.
- Gửi thông báo đẩy nhắc nhở ghi chép chi tiêu hàng ngày (8h tối).
- Widget dashboard hiển thị số dư ngay trên màn hình chính điện thoại.

### Hướng 5: Quản lý Tài chính Nhóm/Gia đình (Shared Finance)

**Vấn đề hiện tại**: Ứng dụng chỉ hỗ trợ một người dùng độc lập, không phù hợp cho việc quản lý tài chính chung.

**Giải pháp đề xuất**: Thiết kế thêm mô hình "Không gian chia sẻ" (Shared Space):
- Cho phép nhiều thành viên cùng truy cập và quản lý một tập hợp ví và ngân sách chung.
- Tính năng "Chia đôi hóa đơn" (Split Bill): Chia đều hoặc theo tỷ lệ tùy chỉnh.
- Bảng tổng hợp đóng góp của từng thành viên theo tháng.
- Thông báo khi thành viên khác thêm giao dịch vào ví chung.

### Hướng 6: Báo cáo Tài chính Chuyên sâu và Export Chuyên nghiệp

**Vấn đề hiện tại**: Báo cáo hiện tại còn đơn giản, export PDF chỉ qua tính năng in của trình duyệt.

**Giải pháp đề xuất**: Nâng cấp module báo cáo với:
- **PDF chuyên nghiệp**: Dùng `@react-pdf/renderer` để tạo file PDF có layout báo cáo tài chính chuẩn, bao gồm logo, bảng số liệu và biểu đồ nhúng.
- **Excel chi tiết**: Export file `.xlsx` với nhiều sheet: Tổng quan, Chi tiết giao dịch, Phân tích danh mục, So sánh ngân sách.
- **So sánh năm**: Biểu đồ so sánh thu chi cùng kỳ năm trước theo từng tháng.
- **Báo cáo thuế thu nhập**: Tổng hợp thu nhập trong năm theo từng nguồn, hỗ trợ khai báo thuế thu nhập cá nhân.

### Hướng 7: Gamification — Thẻ thành tích và Thử thách Tài chính

**Vấn đề hiện tại**: Ứng dụng hiện chưa có cơ chế khuyến khích người dùng duy trì thói quen ghi chép đều đặn.

**Giải pháp đề xuất**: Tích hợp yếu tố trò chơi hóa (Gamification):
- **Streak hàng ngày**: Huy hiệu "Ghi chép liên tục 7/30/100 ngày".
- **Thẻ thành tích (Badges)**: "Tiết kiệm gia được 10 triệu", "Không vượt ngân sách 3 tháng liên tiếp".
- **Thử thách tài chính**: "30 ngày không mua sắm ngoài kế hoạch", "Tiết kiệm 20% thu nhập tháng này".
- **Bảng xếp hạng ẩn danh**: So sánh tỷ lệ tiết kiệm với những người dùng cùng nhóm thu nhập (anonymized data).

---
---

# PHẦN 9. TÀI LIỆU THAM KHẢO (REFERENCES)

1. **Vercel. (2024). Next.js Documentation — App Router.** Truy cập tại: https://nextjs.org/docs/app
   *Tài liệu chính thức về React Server Components, Route Handlers, Middleware và Standalone Build.*

2. **Supabase Inc. (2024). Supabase Documentation.**
   - Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
   - Realtime: https://supabase.com/docs/guides/realtime
   - Storage: https://supabase.com/docs/guides/storage
   *Tài liệu chính thức về các dịch vụ Supabase sử dụng trong dự án.*

3. **Google DeepMind. (2025). Gemini API Documentation — Multimodal capabilities.**
   Truy cập tại: https://ai.google.dev/gemini-api/docs/vision
   *Hướng dẫn tích hợp Gemini Flash cho tác vụ nhận diện và phân tích hình ảnh.*

4. **OWASP Foundation. (2024). OWASP Top 10:2021 — Application Security Risks.**
   Truy cập tại: https://owasp.org/Top10/
   *Tài liệu tham khảo về các rủi ro bảo mật ứng dụng web phổ biến nhất.*

5. **Docker Inc. (2024). Docker Documentation — Multi-stage builds.**
   Truy cập tại: https://docs.docker.com/build/building/multi-stage/
   *Hướng dẫn kỹ thuật đóng gói Docker tối ưu cho ứng dụng Node.js production.*

6. **Electronic Frontier Foundation. (2024). Certbot Documentation.**
   Truy cập tại: https://certbot.eff.org/
   *Hướng dẫn cài đặt và tự động gia hạn chứng chỉ Let's Encrypt cho Nginx.*

7. **Amazon Web Services. (2024). Amazon EC2 Documentation.**
   Truy cập tại: https://docs.aws.amazon.com/ec2/
   *Tài liệu thiết lập và quản lý máy chủ ảo trên AWS.*

8. **PostgreSQL Global Development Group. (2024). PostgreSQL 15 Documentation.**
   Truy cập tại: https://www.postgresql.org/docs/15/
   *Tài liệu về Row Level Security, Triggers, PL/pgSQL và các kiểu dữ liệu.*

9. **Nginx Inc. (2024). Nginx Documentation — Reverse Proxy.**
   Truy cập tại: https://nginx.org/en/docs/http/ngx_http_proxy_module.html
   *Tài liệu cấu hình Nginx làm Reverse Proxy cho ứng dụng Node.js.*

10. **MoMo Technology (M_Service). (2025). Báo cáo xu hướng thanh toán số Việt Nam 2025.**
    *Dữ liệu thống kê hành vi tài chính người dùng trẻ Việt Nam làm cơ sở lý luận cho đề tài.*

---
---

# PHẦN 10. PHỤ LỤC (APPENDIX)

## Phụ lục A: Toàn bộ Danh sách Prompts AI đã Sử dụng

| STT | Mục đích | Công cụ AI | Kết quả |
| :--- | :--- | :--- | :--- |
| 1 | Thiết kế kiến trúc tổng quan hệ thống | Claude Opus 3 | Sơ đồ kiến trúc ASCII + tech stack + chi phí ước tính |
| 2 | Thiết kế database schema PostgreSQL với RLS và Triggers | ChatGPT-4o | File SQL 194 dòng chạy được ngay trên Supabase |
| 3 | Tạo UI Dashboard Luxury Dark Finance | Claude Sonnet | Dashboard page Next.js với Recharts, responsive, dark theme |
| 4 | Implement luồng OCR Route Handler + Frontend | Gemini CLI + Claude | Route Handler TypeScript hoàn chỉnh + UI page OCR |
| 5 | Audit và tối ưu RLS policies bảo mật | Claude Opus 3 | Báo cáo audit 12 findings với SQL fix |
| 6 | Viết Dockerfile multi-stage production | ChatGPT-4o | Dockerfile + docker-compose.yml chuẩn production |
| 7 | Kiểm toán bảo mật OWASP Top 10 | Claude Opus 3 | Bảng báo cáo security với severity và fix recommendations |
| 8 | Tạo Route Handlers CRUD cho 8 entity | Claude Sonnet | 16 file route handlers type-safe với error handling |
| 9 | Soạn tài liệu README và hướng dẫn deploy | Claude Sonnet | README.md + DEPLOY_AWS.md + SUPABASE_SETUP.md |

## Phụ lục B: Cấu trúc Thư mục Dự án

```
tien-cua-toi-dau/
│
├── app/                           # Next.js App Router (root)
│   ├── layout.tsx                 # Root layout (font, providers)
│   ├── page.tsx                   # Landing page (/)
│   ├── account/
│   │   ├── signin/page.tsx        # Đăng nhập
│   │   ├── signup/page.tsx        # Đăng ký
│   │   └── logout/page.tsx        # Đăng xuất
│   ├── dashboard/page.tsx         # Dashboard tổng quan
│   ├── transactions/
│   │   ├── page.tsx               # Danh sách giao dịch
│   │   └── [id]/page.tsx          # Chi tiết giao dịch
│   ├── categories/page.tsx        # Quản lý danh mục
│   ├── wallets/page.tsx           # Quản lý ví tiền
│   ├── budgets/page.tsx           # Lập ngân sách
│   ├── goals/page.tsx             # Mục tiêu tiết kiệm
│   ├── ocr/page.tsx               # Quét hóa đơn AI
│   ├── reports/page.tsx           # Báo cáo & biểu đồ
│   ├── profile/page.tsx           # Hồ sơ cá nhân
│   └── api/                       # Route Handlers (API Endpoints)
│       ├── auth/
│       │   └── token/route.ts     # Lấy JWT token
│       ├── profile/route.ts
│       ├── transactions/
│       │   ├── route.ts           # GET (list), POST (create)
│       │   └── [id]/route.ts      # GET, PATCH, DELETE
│       ├── categories/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── wallets/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── budgets/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── goals/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── dashboard/stats/route.ts  # Thống kê tổng hợp
│       ├── reports/route.ts          # Dữ liệu báo cáo
│       └── ocr/scan/route.ts         # OCR AI endpoint
│
├── components/                    # Thư viện UI Components
│   ├── ui/                        # shadcn/ui base components
│   ├── layout/                    # Sidebar, Header, Footer
│   ├── dashboard/                 # Dashboard-specific components
│   ├── charts/                    # Recharts wrappers
│   ├── forms/                     # Form components với RHF + Zod
│   └── ocr/                       # OCR upload và review components
│
├── lib/                           # Thư viện tiện ích
│   ├── supabase/
│   │   ├── client.ts              # Supabase browser client
│   │   └── server.ts              # Supabase server client
│   ├── gemini.ts                  # OpenCode AI (Gemini) client
│   ├── utils.ts                   # Hàm tiện ích chung
│   ├── validations.ts             # Zod schemas
│   └── constants.ts               # Hằng số (màu sắc, config)
│
├── docs/                          # Tài liệu dự án
│   ├── README.md
│   ├── DEPLOY_AWS.md
│   ├── SUPABASE_SETUP.md
│   ├── quychethi.md
│   ├── baocaoquychethi.md
│   ├── AI_PROMPTS_APPENDIX.md
│   ├── schema.sql.txt
│   └── storage-policies.sql.txt
│
├── public/                        # Tài nguyên tĩnh
│   └── .gitkeep
│
├── Dockerfile                     # Multi-stage Docker build
├── docker-compose.yml             # Production orchestration
├── next.config.mjs                # Cấu hình Next.js (output: standalone)
├── tailwind.config.js             # Tailwind CSS config + custom theme
├── tsconfig.json                  # TypeScript config
├── package.json                   # Danh sách dependencies
└── .env                           # Biến môi trường (không commit)
```

## Phụ lục C: Hướng dẫn Chạy Ứng dụng tại Môi trường Cục bộ

```bash
# 1. Clone dự án
git clone https://github.com/quocvuong/tien-cua-toi-dau.git
cd tien-cua-toi-dau

# 2. Cài đặt dependencies
npm install

# 3. Cấu hình biến môi trường
cp .env.example .env.local
# Điền các giá trị: SUPABASE_URL, SUPABASE_ANON_KEY, SERVICE_ROLE_KEY,
# OPENCODE_API_KEY, OPENCODE_MODEL

# 4. Khởi chạy môi trường development
npm run dev
# Truy cập: http://localhost:3000

# ===============================
# Hoặc chạy bằng Docker:
# ===============================
docker compose up --build
# Truy cập: http://localhost:3000
```

---
*Báo cáo này được hoàn thành ngày 29/05/2026.*
*Đề tài: "Tiền Của Tôi Đâu — Ứng dụng Quản lý Chi tiêu Cá nhân Tích hợp OCR Hóa đơn bằng AI"*
*Sinh viên: Quốc Vương | CTK46-PM | Kỹ thuật Phần mềm*
*Demo: https://quocvuong.tech*
