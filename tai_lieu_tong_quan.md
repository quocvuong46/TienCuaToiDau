# TÀI LIỆU TỔNG QUAN, MỤC TIÊU VÀ PHÂN TÍCH CHỨC NĂNG DỰ ÁN
## ĐỀ TÀI: TIỀN CỦA TÔI ĐÂU — ỨNG DỤNG QUẢN LÝ CHI TIÊU CÁ NHÂN TÍCH HỢP OCR HÓA ĐƠN BẰNG AI

---

## ╔══════════════════════════════════════════════════════════════════════════╗
## ║               BỘ GIÁO DỤC VÀ ĐÀO TẠO – TRƯỜNG ĐẠI HỌC                  ║
## ║                     KHOA CÔNG NGHỆ THÔNG TIN                             ║
## ╠══════════════════════════════════════════════════════════════════════════╣
## ║                                                                          ║
## ║                   TÀI LIỆU KHẢO SÁT & PHÂN TÍCH CHỨC NĂNG                ║
## ║             MÔN: CÁC CÔNG NGHỆ MỚI TRONG PHÁT TRIỂN PHẦN MỀM             ║
## ║                                                                          ║
## ║   ════════════════════════════════════════════════════════════════════   ║
## ║                                                                          ║
## ║                           TÊN DỰ ÁN CÁ NHÂN:                             ║
## ║                           TIỀN CỦA TÔI ĐÂU                               ║
## ║             ỨNG DỤNG QUẢN LÝ CHI TIÊU CÁ NHÂN TÍCH HỢP                   ║
## ║                  OCR HÓA ĐƠN BẰNG TRÍ TUỆ NHÂN TẠO                       ║
## ║                                                                          ║
## ║   ════════════════════════════════════════════════════════════════════   ║
## ║                                                                          ║
## ║         Giảng viên hướng dẫn: Thầy Nguyễn Trọng Hiếu                     ║
## ║         Sinh viên thực hiện:  Đỗ Quốc Vương                              ║
## ║         Mã số sinh viên:      22124976                                   ║
## ║         Lớp học phần:         CTK46 - PM (Chuyên ngành Kỹ thuật Phần mềm)║
## ║         Địa chỉ Demo:         https://quocvuong.tech                     ║
## ║                                                                          ║
## ║       Khánh Hòa, Tháng 05 / 2026                                         ║
## ╚══════════════════════════════════════════════════════════════════════════╝

---
---

# PHẦN 1. TỔNG QUAN ĐỀ TÀI

### 1.1. Bối cảnh và Tính cấp thiết của đề tài
Trong xã hội hiện đại, việc quản lý tài chính cá nhân ngày càng trở nên phức tạp và quan trọng. Tuy nhiên, đa số mọi người gặp khó khăn trong việc duy trì thói quen ghi chép tài chính hàng ngày. Việc nhập liệu chi tiêu thủ công bằng tay sau mỗi lần mua sắm tốn nhiều thời gian và dễ gây nhàm chán, dẫn đến việc hơn 80% người dùng từ bỏ thói quen này chỉ sau vài tuần.

Với sự bùng nổ của các công nghệ Trí tuệ Nhân tạo (AI) và thị giác máy tính, việc tự động hóa trích xuất thông tin từ hình ảnh đã đạt đến độ chính xác cực kỳ cao. Đề tài **"Tiền Của Tôi Đâu"** được nghiên cứu và phát triển nhằm ứng dụng các công nghệ mới nhất như **Next.js 14**, **Supabase** và **Mô hình ngôn ngữ lớn (Google Gemini 2.5 Flash)** để tạo ra một giải pháp quản lý tài chính thông minh. Điểm cốt lõi của dự án là khả năng trích xuất dữ liệu hóa đơn giấy (OCR) tự động bằng AI, giúp người dùng ghi chép chi tiêu chỉ với một thao tác chụp ảnh hóa đơn đơn giản, giải quyết triệt để rào cản về mặt thời gian và thói quen.

### 1.2. Phạm vi của đề tài
*   **Đối tượng nghiên cứu:** Các phương pháp quản lý dòng tiền cá nhân, kỹ thuật tối ưu hóa cơ sở dữ liệu quan hệ thời gian thực, kiến trúc trích xuất dữ liệu hình ảnh (OCR) sử dụng mô hình Multimodal LLM (Large Language Model) thông qua kết quả đầu ra có cấu trúc JSON.
*   **Không gian ứng dụng:** Phát triển dưới dạng ứng dụng Web đáp ứng đa nền tảng (Web App Responsive), tối ưu hiển thị trên cả máy tính để bàn (Desktop) và thiết bị di động (Mobile).
*   **Môi trường vận hành:** Đóng gói bằng Docker container và triển khai thực tế trên hạ tầng đám mây Amazon Web Services (AWS EC2 Singapore), hỗ trợ giao thức bảo mật mã hóa đường truyền HTTPS.

---

# PHẦN 2. MỤC TIÊU ĐỀ TÀI VÀ ĐỐI TƯỢNG SỬ DỤNG

### 2.1. Mục tiêu Đề tài
Dự án hướng tới hoàn thiện hai nhóm mục tiêu cốt lõi:

#### 2.1.1. Mục tiêu Công nghệ (Technical Goals)
*   **Xây dựng luồng xử lý OCR bằng AI an toàn và tốc độ cao:** Tích hợp thành công mô hình Gemini 2.5 Flash thông qua cơ chế Signed URL bảo mật của Supabase Storage, chuyển đổi ảnh chụp hóa đơn tiếng Việt thành dữ liệu tài chính có cấu trúc JSON trong thời gian dưới 5 giây.
*   **Đồng bộ dữ liệu thời gian thực (Realtime):** Ứng dụng WebSockets của Supabase để cập nhật ngay lập tức các biến động số dư ví, ngân sách khi có giao dịch mới mà không cần tải lại trang.
*   **Bảo mật dữ liệu nghiêm ngặt:** Triển khai cơ chế kiểm soát truy cập Row Level Security (RLS) ở mức cơ sở dữ liệu để cô lập hoàn toàn dữ liệu giữa các người dùng.
*   **Quy chuẩn hóa DevOps:** Đóng gói multi-stage Docker để tối giản tài nguyên máy chủ, tự động hóa cấp phát chứng chỉ SSL Let's Encrypt qua Nginx.

#### 2.1.2. Mục tiêu Nghiệp vụ (Business Goals)
*   **Tối giản hóa quy trình ghi chép chi tiêu:** Giúp người dùng giảm 90% thao tác nhập liệu bàn phím bằng công nghệ nhận diện hóa đơn thông minh.
*   **Trực quan hóa tài chính:** Cung cấp hệ thống báo cáo biểu đồ sinh động về cơ cấu chi tiêu và xu hướng tích lũy để người dùng dễ dàng nắm bắt bức tranh tài chính.
*   **Hỗ trợ kỷ luật chi tiêu:** Đưa ra cơ chế cảnh báo màu sắc tiến trình ngân sách trực quan, ngăn ngừa việc chi tiêu vượt quá giới hạn thiết lập trước.
*   **Cá nhân hóa lời khuyên:** Tích hợp module AI Insights phân tích thói quen để đề xuất các giải pháp tối ưu hóa chi phí thực tế hàng tháng.

### 2.2. Đối tượng Sử dụng và Phân loại
*   **Học sinh, sinh viên:** Đối tượng có nguồn thu nhập giới hạn, cần kiểm soát chặt chẽ chi tiêu ăn uống, giáo dục và đặt mục tiêu tiết kiệm nhỏ (mua thiết bị học tập, du lịch).
*   **Người đi làm, nhân viên văn phòng:** Đối tượng có nhiều nguồn thu (lương, thưởng, đầu tư) và nhiều danh mục chi tiêu phức tạp (thuê nhà, hóa đơn điện nước, mua sắm). Có nhu cầu quản lý nhiều ví tài khoản và lập kế hoạch ngân sách tháng nghiêm túc.
*   **Cá nhân có thói quen mua sắm hiện đại:** Nhóm người dùng thường xuyên nhận được hóa đơn giấy từ siêu thị, nhà hàng, quán cà phê và muốn tối giản thời gian ghi chép lịch sử dòng tiền.

---

# PHẦN 3. PHÂN TÍCH CHỨC NĂNG HỆ THỐNG (FUNCTIONAL ANALYSIS)

### 3.1. Sơ đồ Use Case Tổng quát
Hệ thống được thiết kế xoay quanh tác nhân chính là **Người dùng đã xác thực (Authenticated User)** tương tác với các phân hệ chức năng:

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                    HỆ THỐNG QUẢN LÝ CHI TIÊU "TIỀN CỦA TÔI ĐÂU"              ║
║                                                                              ║
║   ╔════════════╗       ┌──────────────────────────────────────────────┐      ║
║   ║            ║       │             PHÂN HỆ CHỨC NĂNG                │      ║
║   ║            ║       │                                              │      ║
║   ║            ║ 👤 Đăng ký & Đăng nhập tài khoản                    │      ║
║   ║            ║───────│──○ Xem Dashboard thống kê số dư              │      ║
║   ║ NGƯỜI DÙNG ║       │──○ Nhập giao dịch thủ công                   │      ║
║   ║   (Actor)  ║       │──○ Quét hóa đơn giấy bằng AI (OCR)           │      ║
║   ║            ║───────│──○ Quản lý danh mục & Các Ví tài khoản       │      ║
║   ║            ║       │──○ Thiết lập Ngân sách hạn mức tháng         │      ║
║   ║            ║       │──○ Đặt Mục tiêu tích lũy tiết kiệm           │      ║
║   ║            ║       │──○ Xem biểu đồ phân tích & Nhận AI Insights  │      ║
║   ║            ║       │──○ Xuất báo cáo Excel (CSV) / In PDF         │      ║
║   ╚════════════╝       └──────────────────────────────────────────────┘      ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### 3.2. Luồng Trải nghiệm Người dùng (User Flow) Tiêu biểu

#### Luồng 1: Quy trình đăng ký và thiết lập ban đầu (Onboarding Flow)
```
[Landing Page (Giới thiệu tính năng)]
  → [Đăng ký: email, tên, mật khẩu]
  → [Supabase tạo User & Kích hoạt trigger tự động tạo Profile]
  → [Đăng nhập thành công → Redirect vào /dashboard]
  → [Tạo ví tài khoản mặc định đầu tiên: "Ví Tiền mặt", "Ví Ngân hàng"]
  → [Tự động khởi tạo bộ 12 danh mục chi tiêu chuẩn]
```

#### Luồng 2: Nhập giao dịch tự động bằng công nghệ AI OCR (Đặc trưng cốt lõi)
```
[Người dùng chụp hóa đơn giấy → Truy cập trang /ocr]
  → [Kéo thả hoặc tải ảnh hóa đơn lên]
  → [Hệ thống upload ảnh lên Supabase Storage và tạo Signed URL bảo mật]
  → [Hệ thống gọi API mô hình AI Gemini 2.5 Flash phân tích hình ảnh]
  → [Gemini trả về JSON: Tên cửa hàng, Ngày, Tổng tiền, Món ăn, Danh mục gợi ý]
  → [Form kết quả hiển thị tự động để người dùng kiểm tra nhanh]
  → [Người dùng chọn Ví thanh toán & Xác nhận lưu giao dịch]
  → [Lưu database thành công → Database Trigger cập nhật ngay số dư ví liên quan]
  → [Dashboard hiển thị số dư mới cập nhật thời gian thực]
```

#### Luồng 3: Thiết lập ngân sách và cơ chế cảnh báo chi tiêu vượt ngưỡng
```
[Người dùng truy cập /budgets → Thiết lập ngân sách: Ăn uống - 3,000,000đ/tháng]
  → [Dashboard hiển thị tiến trình: Số tiền đã chi / Hạn mức]
  → [Mỗi khi phát sinh giao dịch chi tiêu thuộc danh mục "Ăn uống"]
  → [Thanh tiến độ (Progress Bar) cập nhật phần trăm đã tiêu:]
      - Dưới 80%: Thanh màu xanh lục (Mức an toàn)
      - Từ 80% đến 99%: Thanh chuyển sang màu cam (Cảnh báo chi tiêu chạm trần)
      - Từ 100% trở lên: Thanh chuyển sang màu đỏ (Cảnh báo vượt quá ngân sách)
```

### 3.3. Đặc tả chi tiết các phân hệ chức năng (Modules)

Ứng dụng được modul hóa thành 5 nhóm chức năng chính hoạt động đồng bộ:

| STT | Phân hệ (Module) | Mô tả chi tiết chức năng | Vai trò nghiệp vụ |
| :--- | :---: | :--- | :--- |
| **1** | **Xác thực tài khoản (Authentication)** | *   Đăng ký tài khoản mới bằng Email.<br>*   Đăng nhập hệ thống bảo mật bằng JWT và mã hóa mật khẩu.<br>*   Đổi mật khẩu, cập nhật hồ sơ cá nhân (Họ tên, ảnh đại diện). | Đảm bảo an toàn thông tin, bảo mật tuyệt đối dữ liệu tài chính của từng cá nhân riêng biệt thông qua chính sách RLS cơ sở dữ liệu. |
| **2** | **Quản lý tài sản (Wallets)** | *   Tạo mới, sửa tên, đổi màu sắc và biểu tượng ví tài khoản.<br>*   Xem danh sách các tài khoản đang hoạt động và số dư khả dụng thực tế của từng tài khoản. | Theo dõi chính xác vị trí phân bổ của dòng tiền của cá nhân (Ví điện tử MoMo, ví tiền mặt hay tài khoản ngân hàng). |
| **3** | **Quản lý giao dịch thu chi (Transactions & AI OCR)** | *   Thêm giao dịch thủ công (nhập số tiền, loại thu/chi, chọn ví, chọn danh mục, ghi chú).<br>*   **Quét hóa đơn thông minh bằng AI:** Tải ảnh hóa đơn giấy, hệ thống tự trích xuất toàn bộ thông tin chi tiết hóa đơn (tên cửa hàng, danh sách món hàng lẻ, tổng tiền, ngày giao dịch).<br>*   Tìm kiếm giao dịch theo từ khóa, lọc đa điều chí theo khoảng thời gian, ví, danh mục. | Tối giản hóa 90% thời gian ghi chép dòng tiền thủ công hàng ngày của người dùng, lưu lại vết chi tiêu minh bạch. |
| **4** | **Kế hoạch & Cảnh báo (Budgets & Saving Goals)** | *   **Lập ngân sách:** Thiết lập hạn mức chi tiêu tối đa theo từng danh mục chi tiết theo tháng.<br>*   **Mục tiêu tiết kiệm:** Thiết lập các mục tiêu tích lũy tài chính dài hạn (Target, Deadline, tích lũy từng đợt). | Hỗ trợ người dùng rèn luyện kỷ luật tài chính, cảnh báo sớm các nguy cơ chi tiêu quá tay để nhanh chóng đạt được các mục tiêu tài chính đã đề ra. |
| **5** | **Báo cáo & Trí tuệ nhân tạo (Reports & AI Insights)** | *   **Trực quan biểu đồ:** Biểu đồ thu chi hàng ngày (Bar Chart), biểu đồ tròn tỷ trọng cơ cấu chi phí (Donut Chart), biểu đồ đường xu hướng tích lũy số dư (Line Chart).<br>*   **AI Insights:** Nhận định phân tích thói quen hàng tháng tự động bằng AI, đưa ra cảnh báo nếu chi tiêu tăng vọt so với tháng trước. | Cung cấp cái nhìn toàn diện, trực quan về dòng tiền để người dùng dễ dàng ra quyết định tái cơ cấu chi tiêu hợp lý. |
