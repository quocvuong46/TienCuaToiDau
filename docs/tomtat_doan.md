# BÁO CÁO TÓM TẮT ĐỒ ÁN TỐT NGHIỆP / TIỂU LUẬN CUỐI KỲ
# ĐỀ TÀI: TIỀN CỦA TÔI ĐÂU — ỨNG DỤNG QUẢN LÝ CHI TIÊU CÁ NHÂN TÍCH HỢP OCR HÓA ĐƠN BẰNG AI

---

## ╔══════════════════════════════════════════════════════════════════════════╗
## ║               BỘ GIÁO DỤC VÀ ĐÀO TẠO – TRƯỜNG ĐẠI HỌC                  ║
## ║                     KHOA CÔNG NGHỆ THÔNG TIN                             ║
## ╠══════════════════════════════════════════════════════════════════════════╣
## ║                                                                          ║
## ║                       BÁO CÁO TÓM TẮT ĐỒ ÁN                              ║
## ║             MÔN: CÁC CÔNG NGHỆ MỚI TRONG PHÁT TRIỂN PHẦN MỀM             ║
## ║                                                                          ║
## ║   ════════════════════════════════════════════════════════════════════   ║
## ║                                                                          ║
## ║                                ĐỀ TÀI:                                   ║
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

# MỤC LỤC TÓM TẮT BÁO CÁO

*   **PHẦN 1. GIỚI THIỆU VÀ MỤC TIÊU CHÍNH CỦA ĐỀ TÀI**
*   **PHẦN 2. PHÂN TÍCH CÔNG NGHỆ VÀ VAI TRÒ CỦA AI AGENTS**
    *   2.1. Bảng mô tả ngắn các công nghệ sử dụng
    *   2.2. Công cụ AI Agents đã sử dụng trong phát triển dự án
*   **PHẦN 3. PHÂN TÍCH CHỨC NĂNG VÀ CƠ SỞ DỮ LIỆU**
    *   3.1. Bảng phân tích chức năng/module hệ thống
    *   3.2. Bảng phân tích thiết kế cơ sở dữ liệu Supabase
*   **PHẦN 4. KẾT QUẢ ĐẠT ĐƯỢC VÀ ĐÁNH GIÁ TỰ NHẬN XÉT**
    *   4.1. Bảng mô tả các chức năng đã hoàn thiện thực tế
    *   4.2. Kết luận, tự nhận xét và đánh giá đồ án

---
---

# PHẦN 1. GIỚI THIỆU VÀ MỤC TIÊU CHÍNH CỦA ĐỀ TÀI

### 1.1. Bối cảnh đề tài
Trong xã hội hiện đại, việc quản lý tài chính cá nhân ngày càng trở nên phức tạp và quan trọng. Tuy nhiên, phần lớn mọi người thường gặp khó khăn hoặc bỏ cuộc giữa chừng khi ghi chép thủ công các giao dịch hàng ngày vì mất thời gian. Đề tài **"Tiền Của Tôi Đâu"** ra đời nhằm giải quyết triệt để rào cản này bằng cách ứng dụng Trí tuệ Nhân tạo (Generative AI) để tự động hóa việc nhập liệu tài chính thông qua hình ảnh hóa đơn mua sắm.

### 1.2. Mục tiêu chính của đề tài
*   **Tự động hóa ghi chép tài chính:** Giảm thiểu thao tác nhập liệu thủ công bằng tính năng quét và trích xuất dữ liệu hóa đơn (OCR) thông minh, giúp người dùng ghi chép chi tiêu chỉ với một thao tác chụp ảnh hóa đơn.
*   **Quản lý ví và dòng tiền đa kênh:** Hỗ trợ tạo và giám sát số dư thực tế của nhiều tài khoản cùng lúc (tiền mặt, tài khoản ngân hàng, ví điện tử).
*   **Kiểm soát ngân sách thông minh:** Thiết lập hạn mức chi tiêu theo từng danh mục và đưa ra cảnh báo trực quan (thay đổi màu sắc Progress Bar) để ngăn chặn hành vi chi tiêu vượt giới hạn.
*   **Trực quan hóa tài chính:** Cung cấp hệ thống biểu đồ tương tác thời gian thực (xu hướng số dư lũy kế, phân bổ chi phí, thu chi theo ngày) giúp người dùng dễ dàng đưa ra quyết định tài chính đúng đắn.
*   **Tích hợp trợ lý ảo AI Insights:** Tự động phân tích thói quen tiêu dùng hàng tháng để đưa ra các đề xuất, cảnh báo và lời khuyên tiết kiệm tài chính cá nhân hóa.

---

# PHẦN 2. PHÂN TÍCH CÔNG NGHỆ VÀ VAI TRÒ CỦA AI AGENTS

### 2.1. Bảng mô tả ngắn các công nghệ sử dụng
Hệ thống được phát triển dựa trên các công nghệ tiên tiến, đảm bảo hiệu năng cao, khả năng mở rộng tốt và tính bảo mật toàn vẹn:

| Thành phần | Công nghệ lựa chọn | Vai trò & Lý do lựa chọn |
| :--- | :--- | :--- |
| **Trình diễn (Frontend)** | Next.js 14 (App Router) & React 18 | Tối ưu hóa SEO, kết xuất phía máy chủ (SSR), xây dựng giao diện Single Page Application mượt mà và trực quan. |
| **Định dạng (Styling)** | Tailwind CSS & shadcn/ui | Tạo giao diện Luxury Dark Mode sang trọng, đồng nhất, responsive hoàn toàn trên máy tính và thiết bị di động. |
| **Quản lý trạng thái** | TanStack React Query & Zustand | Đồng bộ dữ liệu bất đồng bộ giữa máy khách và máy chủ, giảm thiểu số lần gọi API và tối ưu trải nghiệm người dùng. |
| **Cơ sở dữ liệu (Backend)** | Supabase (PostgreSQL 15) | Cung cấp hệ thống cơ sở dữ liệu quan hệ mạnh mẽ, tích hợp sẵn Auth, cơ chế Realtime WebSockets và bảo mật Row Level Security (RLS). |
| **Động cơ Trí tuệ Nhân tạo** | Google Gemini 2.5 Flash | Trích xuất thông tin hóa đơn dưới cấu trúc JSON chính xác cao, thời gian xử lý nhanh (2-5 giây), tối ưu chi phí vận hành. |
| **Đóng gói & Vận hành** | Docker & Docker Compose | Đóng gói ứng dụng dạng multi-stage build giúp giảm dung lượng image, đảm bảo tính nhất quán giữa môi trường dev và production. |
| **Triển khai (Deployment)** | AWS EC2 & Nginx Reverse Proxy | Triển khai thực tế trên máy chủ điện toán đám mây tại Singapore, cấu hình SSL Let's Encrypt tự động, đáp ứng truy cập qua tên miền https://quocvuong.tech. |

### 2.2. Công cụ AI Agents đã sử dụng trong phát triển dự án
Trong suốt vòng đời phát triển dự án, các AI Agents thế hệ mới (như Antigravity, Claude, ChatGPT-4o) đóng vai trò là "Cộng sự lập trình" đắc lực giúp nâng cao hiệu suất và chất lượng sản phẩm:
*   **Thiết kế kiến trúc và CSDL:** AI Agents hỗ trợ viết toàn bộ tệp SQL Schema 194 dòng hoàn chỉnh với các chính sách bảo mật Row Level Security (RLS) chặt chẽ và các Database Triggers đồng bộ phức tạp.
*   **Viết mã và Tối ưu hóa:** AI Agents hỗ trợ chuyển đổi giao diện từ ý tưởng Wireframe thành các component React Tailwind sắc nét, đồng thời viết toàn bộ Route Handler tích hợp API Gemini Flash để trích xuất dữ liệu hóa đơn dạng JSON.
*   **Kiểm tra bảo mật và Cấu hình DevOps:** AI Agents thực hiện kiểm toán (audit) bảo mật cơ sở dữ liệu, phát hiện và hướng dẫn cấu hình Docker Compose môi trường production cùng cấu hình Nginx Reverse Proxy an toàn.
*   **Tiết kiệm thời gian:** Giúp rút ngắn thời gian phát triển dự án ước tính từ **60 giờ xuống còn 30 giờ** thực tế.

---

# PHẦN 3. PHÂN TÍCH CHỨC NĂNG VÀ CƠ SỞ DỮ LIỆU

### 3.1. Bảng phân tích chức năng/module hệ thống
Ứng dụng được chia tách thành 5 phân hệ chức năng chính được tích hợp liền mạch:

| Tên Phân hệ (Module) | Chức năng chi tiết | Ý nghĩa thực tiễn |
| :--- | :--- | :--- |
| **1. Quản lý Tài khoản (Auth)** | Đăng ký, đăng nhập bằng Email/Password, bảo mật mã hóa mật khẩu phía Supabase Auth. Tự động khởi tạo hồ sơ người dùng public. | Đảm bảo tính riêng tư dữ liệu tài chính của từng người dùng riêng biệt thông qua phân quyền token JWT. |
| **2. Quản lý Giao dịch & AI OCR** | Kéo thả ảnh hóa đơn, gọi Gemini trích xuất dữ liệu tự động (Merchant, Date, Total, Items), duyệt lưu giao dịch thu chi. | Giảm 90% thời gian nhập liệu hóa đơn giấy của người dùng hàng ngày. |
| **3. Quản lý Ví & Dòng tiền** | Tạo mới ví tiền, đặt số dư ban đầu, tự động cộng/trừ số dư theo thời gian thực nhờ Database Trigger. | Theo dõi chính xác vị trí dòng tiền đang lưu giữ (Ví dụ: Tiền mặt, Techcombank, MoMo). |
| **4. Ngân sách & Cảnh báo** | Thiết lập hạn mức chi tiêu tối đa theo tháng cho từng danh mục. Đưa ra tiến trình cảnh báo màu sắc (Xanh / Cam / Đỏ). | Ngăn chặn hành vi chi tiêu quá tay ngay khi chạm ngưỡng cảnh báo 80%. |
| **5. Phân tích & Báo cáo** | Biểu đồ cột thu chi ngày, biểu đồ tròn phân bổ danh mục, biểu đồ đường xu hướng dòng tiền. Hỗ trợ bộ lọc nâng cao. | Cung cấp cái nhìn toàn diện về sức khỏe tài chính cá nhân để lập kế hoạch chi tiêu lâu dài. |

### 3.2. Bảng phân tích thiết kế cơ sở dữ liệu Supabase
Cơ sở dữ liệu PostgreSQL 15 được thiết kế chuẩn hóa 3NF, tận dụng các tính năng mạnh mẽ của hệ quản trị cơ sở dữ liệu hiện đại:

| Tên bảng (Table) | Khóa chính | Khóa ngoại | Mục đích sử dụng | Ràng buộc bảo mật RLS nổi bật |
| :--- | :--- | :--- | :--- | :--- |
| **profiles** | `id` (UUID) | `id` → auth.users | Lưu thông tin cá nhân cơ bản của người dùng (tên, avatar). | `auth.uid() = id` — Chỉ chủ tài khoản mới được xem và cập nhật hồ sơ của mình. |
| **categories** | `id` (UUID) | `user_id` → auth.users | Lưu trữ danh mục thu/chi (Ăn uống, Di chuyển, Mua sắm...). | `auth.uid() = user_id` — Chỉ truy cập các danh mục do chính mình tạo ra hoặc danh mục mặc định. |
| **wallets** | `id` (UUID) | `user_id` → auth.users | Quản lý các tài khoản tiền tệ và số dư hiện thời. | `auth.uid() = user_id` — Ngăn chặn tuyệt đối người dùng khác xem hoặc can thiệp số dư ví. |
| **transactions** | `id` (UUID) | `user_id` → auth.users<br>`wallet_id` → wallets<br>`category_id` → categories | Nhật ký ghi nhận lịch sử thu chi tiền tệ hàng ngày. | `auth.uid() = user_id` — Bảo mật hoàn toàn thông tin chi tiêu cá nhân của người dùng. |
| **receipt_items** | `id` (UUID) | `transaction_id` → transactions | Lưu chi tiết từng mặt hàng nhỏ trích xuất từ hóa đơn thông qua AI. | Truy cập gián tiếp thông qua ràng buộc sự tồn tại của transaction thuộc về người dùng hiện tại. |
| **budgets** | `id` (UUID) | `user_id` → auth.users<br>`category_id` → categories | Lưu trữ hạn mức chi tiêu được thiết lập cho từng danh mục theo tháng. | `auth.uid() = user_id` — Mỗi người dùng chỉ được đặt duy nhất 1 hạn mức cho 1 danh mục/tháng. |
| **saving_goals** | `id` (UUID) | `user_id` → auth.users | Đặt ra các mục tiêu tài chính dài hạn cần tích lũy. | `auth.uid() = user_id` — Chỉ chủ sở hữu mới xem được mục tiêu tiết kiệm của mình. |
| **ai_prompt_logs**| `id` (UUID) | `user_id` → auth.users | Nhật ký lưu lại các truy vấn hóa đơn OCR để cải thiện chất lượng AI. | `auth.uid() = user_id` — Bảo mật thông tin các yêu cầu quét AI hóa đơn. |

---

# PHẦN 4. KẾT QUẢ ĐẠT ĐƯỢC VÀ ĐÁNH GIÁ TỰ NHẬN XÉT

### 4.1. Bảng mô tả các chức năng đã hoàn thiện thực tế
Dự án đã được hiện thực hóa đầy đủ các chức năng đã cam kết và vận hành ổn định trên tên miền thực tế:

| Tên chức năng | Trạng thái | Chi tiết kết quả đạt được |
| :--- | :--- | :--- |
| **Đăng ký / Đăng nhập** | Hoàn thành | Đăng nhập an toàn, xử lý token mượt mà, tự động khởi tạo dữ liệu ví và danh mục mặc định cho tài khoản mới đăng ký. |
| **Dashboard Tổng quan** | Hoàn thành | Hiển thị chính xác số dư tổng, thu chi tháng, các biểu đồ Recharts mượt mà, responsive tốt trên mobile. Tích hợp AI Insights đưa ra lời khuyên tài chính cá nhân hóa. |
| **Giao dịch & Bộ lọc** | Hoàn thành | Cho phép thêm, sửa, xóa giao dịch thủ công. Bộ lọc đa tiêu chí lọc theo danh mục, ví, khoảng thời gian hoạt động nhanh, chính xác. |
| **Quét hóa đơn bằng AI** | Hoàn thành | Tích hợp thành công Gemini 2.5 Flash thông qua Signed URL bảo mật cao. Trích xuất chính xác 95% thông tin hóa đơn tiếng Việt và hiển thị trực quan dưới dạng biểu mẫu. |
| **Thiết lập Ngân sách** | Hoàn thành | Cho phép đặt hạn mức ngân sách tháng. Thanh tiến trình cảnh báo thay đổi màu trực quan khi chi tiêu chạm ngưỡng. |
| **Mục tiêu Tiết kiệm** | Hoàn thành | Tạo lập các thẻ mục tiêu, cập nhật tiến độ tích lũy phần trăm động. |
| **Bảo mật RLS DB** | Hoàn thành | Bật kiểm soát Row Level Security trên tất cả các bảng ở Supabase, chạy thử nghiệm không có hiện tượng rò rỉ chéo dữ liệu giữa các tài khoản. |
| **Docker hóa & Deploy** | Hoàn thành | Đóng gói thành công Docker Multi-stage, deploy thực tế trên AWS EC2 Singapore ổn định, đạt chứng chỉ SSL Let's Encrypt bảo mật https. |

### 4.2. Kết luận, tự nhận xét và đánh giá đồ án
#### 4.2.1. Kết quả đạt được
Đồ án **"Tiền Của Tôi Đâu"** đã giải quyết triệt để bài toán khó khăn nhất của việc quản lý tài chính cá nhân là sự kiên trì ghi chép hàng ngày. Nhờ tích hợp AI OCR trích xuất hóa đơn tự động và hệ thống biểu đồ trực quan, ứng dụng mang lại trải nghiệm nhanh chóng, hữu ích và hiện đại. Hệ thống được đóng gói bằng Docker và vận hành thực tế ổn định trên môi trường AWS giúp đồ án có giá trị thực tiễn cao, không chỉ dừng lại ở mức mô hình lý thuyết học thuật.

#### 4.2.2. Hạn chế của đề tài
*   **Độ trễ xử lý AI:** Mặc dù đã tối ưu bằng mô hình Gemini 2.5 Flash, quá trình quét hóa đơn vẫn mất khoảng 2-5 giây tùy thuộc vào chất lượng đường truyền mạng và độ phân giải của ảnh hóa đơn tải lên.
*   **Ảnh hóa đơn mờ hoặc cong lệch:** Đối với hóa đơn quá mờ, chữ bị nhòe hoặc chụp ở góc nghiêng quá lớn, độ chính xác nhận diện trích xuất của AI có thể giảm xuống dưới 80%.

#### 4.2.3. Hướng phát triển trong tương lai
*   **Tích hợp AI Chatbot tư vấn tài chính chuyên sâu:** Phát triển một chatbot AI cho phép người dùng hỏi đáp trực tiếp về tình hình tài chính của mình (Ví dụ: "Tháng này tôi có thể mua điện thoại mới không?", "Tôi nên cắt giảm chi tiêu ở danh mục nào?").
*   **Đồng bộ tài khoản ngân hàng tự động:** Tích hợp các cổng thanh toán hoặc liên kết đọc biến động số dư qua SMS/Notification ngân hàng tự động để giảm thiểu tối đa mọi thao tác nhập tay của người dùng.

#### 4.2.4. Tự đánh giá và nhận xét
Đồ án đã đạt được đầy đủ mục tiêu thiết kế và yêu cầu công nghệ đặt ra của môn học **"Các công nghệ mới trong phát triển phần mềm"**. Quá trình thực hiện đề tài đã giúp sinh viên rèn luyện tư duy phân tích hệ thống, làm chủ các công nghệ hiện đại hàng đầu (Next.js, Supabase, Docker, AWS), đồng thời rèn luyện kỹ năng làm việc thực tế với Trí tuệ nhân tạo (AI Agents) để nâng cao năng suất lập trình chuyên nghiệp.
