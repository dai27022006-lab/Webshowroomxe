# BAVARIA MOTOR HOUSE — INDEPENDENT PREMIUM BMW SHOWROOM

Website showroom xe BMW cao cấp độc lập dành cho khách hàng tìm hiểu xe, xem video chuyển động thực tế và đăng ký lịch hẹn lái thử riêng tư (thuộc hệ sinh thái giải pháp **AutoLead Systems**).

Giao diện được thiết kế theo cấu trúc và trải nghiệm thẩm mỹ editorial của **Mercedes-Benz Vietnam** (`mercedes-benz.com.vn/vi`).

---

## 📂 Vị Trí Thư Mục

```text
D:\bavaria-motor-house
```

---

## 🚀 Cách Chạy Độc Lập

```bash
cd D:\bavaria-motor-house
npm run dev
```

Website showroom sẽ chạy tại:
👉 **`http://localhost:5174`**

---

## 🔗 Liên Kết & Tương Tác Giữa 2 Web

| Ứng dụng | Thư mục | Port | Mục đích |
| :--- | :--- | :--- | :--- |
| **Web 1: AutoLead Systems** | `D:\autolead-systems111-main` | `http://localhost:5173` | B2B Landing Page & Dashboard Quản trị CRM điều hành Showroom |
| **Web 2: Bavaria Motor House** | `D:\bavaria-motor-house` | `http://localhost:5174` | Showroom khách xem xe, xem video, chat AI Concierge & đặt lái thử |

### Cơ Chế Đồng Bộ Lead Tức Thì (Real-time Flow)
1. Khi khách hàng vào **Web 2** (`http://localhost:5174`), xem các dòng xe BMW hoặc chat với **BMW CONCIERGE** và bấm **"Đặt lịch lái thử"**.
2. Biểu mẫu gửi dữ liệu trực tiếp về API backend của **Web 1** (`/api/buyer/lead`, `/api/buyer/qualify`, `/api/buyer/appointment`).
3. Khách hàng nhận được thông báo trạng thái chính thức:
   > *"Yêu cầu của bạn đã được gửi đến showroom. Nhân viên tư vấn sẽ liên hệ để xác nhận lịch lái thử."*
4. Đơn đăng ký ngay lập tức nhảy vào màn hình CRM của **Web 1** (`http://localhost:5173/#crm`) ở trạng thái **Qualified Lead / Appointment Booked**.
