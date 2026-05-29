"use client";

import {
  Sparkles,
  ScanLine,
  BarChart3,
  Shield,
  Cloud,
  ArrowRight,
  Wallet,
  Target,
  PiggyBank,
  TrendingUp,
  Receipt,
  Lock,
  Server,
  Zap,
} from "lucide-react";
import useUser from "@/utils/useUser";
import Link from "next/link";

export default function LandingPage() {
  const { data: user } = useUser();
  const ctaHref = user ? "/dashboard" : "/account/signup";
  const ctaLabel = user ? "Vào Dashboard" : "Bắt đầu quản lý";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#202020] text-white font-sans">
      {/* Ambient lights */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-[500px] w-[500px] rounded-full bg-[#FFD100]/15 blur-[140px] animate-pulse-glow" />
        <div className="absolute top-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-[#FFEE32]/10 blur-[160px] animate-pulse-glow [animation-delay:3s]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,209,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,209,0,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Navbar */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD100] to-[#FFEE32] text-[#202020] shadow-[0_0_24px_-6px_rgba(255,209,0,0.7)]">
            <Sparkles size={20} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold">Tiền Của Tôi Đâu</span>
            <span className="text-[10px] uppercase tracking-wider text-[#FFD100]/80">
              Finance Tracker
            </span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm text-[#D6D6D6]/70">
          <a href="#features" className="hover:text-white transition-colors">
            Tính năng
          </a>
          <a href="#ocr" className="hover:text-white transition-colors">
            OCR AI
          </a>
          <a href="#security" className="hover:text-white transition-colors">
            Bảo mật
          </a>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Link
              href="/dashboard"
              className="rounded-xl bg-[#FFD100] px-4 py-2 text-sm font-semibold text-[#202020] hover:bg-[#FFEE32] shadow-[0_0_24px_-8px_rgba(255,209,0,0.7)] transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/account/signin"
                className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-[#D6D6D6] hover:text-white transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/account/signup"
                className="rounded-xl bg-[#FFD100] px-4 py-2 text-sm font-semibold text-[#202020] hover:bg-[#FFEE32] shadow-[0_0_24px_-8px_rgba(255,209,0,0.7)] transition-all"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-24 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFD100]/30 bg-[#FFD100]/5 px-4 py-1.5 text-xs font-medium text-[#FFD100] backdrop-blur-sm animate-fade-in-up">
          <Sparkles size={14} />
          <span>Quét hóa đơn bằng AI — Tự động hóa nhập liệu</span>
        </div>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight animate-fade-in-up delay-100">
          Tiền của bạn,{" "}
          <span className="bg-gradient-to-r from-[#FFD100] to-[#FFEE32] bg-clip-text text-transparent">
            ở mọi nơi
          </span>
          <br />
          giờ đã rõ ràng.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[#D6D6D6]/70 sm:text-lg animate-fade-in-up delay-200">
          Quản lý từng đồng. Hiểu rõ từng khoản. Làm chủ tài chính cá nhân với
          dashboard trực quan và AI quét hóa đơn thông minh.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up delay-300">
          <Link
            href={ctaHref}
            className="group flex items-center gap-2 rounded-xl bg-[#FFD100] px-6 py-3.5 text-sm font-semibold text-[#202020] hover:bg-[#FFEE32] shadow-[0_0_40px_-8px_rgba(255,209,0,0.8)] transition-all"
          >
            {ctaLabel}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <a
            href="#features"
            className="rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-[#D6D6D6] backdrop-blur-xl hover:bg-white/[0.06] transition-colors"
          >
            Xem tính năng
          </a>
        </div>

        {/* Hero preview card stack */}
        <div className="relative mx-auto mt-16 max-w-5xl animate-float">
          <div className="absolute inset-x-12 -top-6 h-6 rounded-t-3xl bg-white/[0.04] border-x border-t border-white/10 blur-[1px]" />
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_0_80px_-30px_rgba(255,209,0,0.3)]">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Số dư",
                  value: "24.580.000 ₫",
                  trend: "+12,4%",
                  icon: Wallet,
                },
                {
                  label: "Thu tháng này",
                  value: "18.200.000 ₫",
                  trend: "+8,1%",
                  icon: TrendingUp,
                },
                {
                  label: "Chi tháng này",
                  value: "9.450.000 ₫",
                  trend: "-3,2%",
                  icon: Receipt,
                },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg bg-[#FFD100]/15 p-2 text-[#FFD100]">
                        <Icon size={16} />
                      </div>
                      <span className="text-xs text-[#FFEE32]">{s.trend}</span>
                    </div>
                    <p className="mt-3 text-xs text-[#D6D6D6]/60">{s.label}</p>
                    <p className="mt-1 text-xl font-bold text-white">
                      {s.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#FFD100]">
            Tính năng nổi bật
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl text-white">
            Tất cả những gì bạn cần trong một ứng dụng
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#D6D6D6]/60">
            Từ ghi chép giao dịch, quét hóa đơn bằng AI, đến biểu đồ phân tích
            chuyên sâu — mọi thứ đều được thiết kế để giúp bạn hiểu tiền của
            mình.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Wallet,
              title: "Quản lý nhiều ví",
              desc: "Tiền mặt, ngân hàng, ví điện tử, thẻ tín dụng, tiết kiệm — đồng bộ số dư tự động khi có giao dịch.",
            },
            {
              icon: BarChart3,
              title: "Biểu đồ trực quan",
              desc: "Bar chart, donut, line chart và area chart sinh động, dễ đọc theo ngày, tuần, tháng.",
            },
            {
              icon: ScanLine,
              title: "OCR hóa đơn bằng AI",
              desc: "Chụp hoặc tải ảnh hóa đơn, AI Multimodal Vision tự nhận diện cửa hàng, số tiền, danh mục.",
            },
            {
              icon: PiggyBank,
              title: "Ngân sách thông minh",
              desc: "Đặt ngân sách theo tháng và danh mục, cảnh báo tự động khi vượt 80% hoặc 100%.",
            },
            {
              icon: Target,
              title: "Mục tiêu tiết kiệm",
              desc: "Đặt mục tiêu, theo dõi tiến độ và xem gợi ý số tiền cần tiết kiệm mỗi tháng.",
            },
            {
              icon: Sparkles,
              title: "Insight AI cá nhân hóa",
              desc: "Hệ thống tự phân tích thói quen chi tiêu và đưa ra gợi ý tối ưu mỗi tháng.",
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FFD100]/30 hover:bg-white/[0.05] hover:shadow-[0_0_40px_-15px_rgba(255,209,0,0.4)]"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD100]/20 to-[#FFEE32]/10 text-[#FFD100] ring-1 ring-[#FFD100]/20">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-[#D6D6D6]/60 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* OCR Section */}
      <section id="ocr" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFD100]/30 bg-[#FFD100]/5 px-3 py-1 text-xs font-medium text-[#FFD100]">
              <Zap size={12} />
              AI Multimodal Vision (Mimo v2.5)
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl text-white">
              Quét hóa đơn{" "}
              <span className="bg-gradient-to-r from-[#FFD100] to-[#FFEE32] bg-clip-text text-transparent">
                trong tích tắc
              </span>
            </h2>
            <p className="mt-4 text-[#D6D6D6]/70 leading-relaxed">
              Chỉ cần tải lên ảnh hóa đơn, AI sẽ tự động nhận diện cửa hàng,
              ngày giao dịch, danh sách sản phẩm, tổng tiền và gợi ý danh mục
              phù hợp. Bạn chỉ cần xác nhận và lưu.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#D6D6D6]">
              {[
                "Tự động trích xuất dữ liệu hóa đơn dạng JSON chuẩn",
                "Gợi ý danh mục thông minh dựa trên nội dung",
                "Hỗ trợ tiếng Việt và ký tự đặc biệt",
                "Cho phép chỉnh sửa trước khi lưu giao dịch",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFD100]" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FFD100] px-5 py-3 text-sm font-semibold text-[#202020] hover:bg-[#FFEE32] shadow-[0_0_30px_-8px_rgba(255,209,0,0.7)] transition-colors"
            >
              Thử ngay
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* OCR mockup */}
          <div className="relative animate-float [animation-delay:2s]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_0_60px_-25px_rgba(255,209,0,0.4)]">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                  Kết quả OCR
                </span>
                <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 text-[10px] font-medium text-green-400">
                  ● Độ chính xác 95%
                </span>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  ["Cửa hàng", "Highlands Coffee"],
                  ["Ngày", "26/05/2026"],
                  ["Tổng tiền", "185.000 ₫"],
                  ["Danh mục gợi ý", "Ăn uống"],
                ].map(([k, v], i) => (
                  <div
                    key={i}
                    className="flex justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5"
                  >
                    <span className="text-[#D6D6D6]/60">{k}</span>
                    <span className="font-medium text-white">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-[#FFD100]/20 bg-[#FFD100]/5 p-3 text-xs text-[#FFEE32]">
                ✨ Đã trích xuất 4 sản phẩm trong hóa đơn
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFD100]/15 text-[#FFD100]">
              <Shield size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Bảo mật dữ liệu</h3>
            <p className="mt-2 text-sm text-[#D6D6D6]/60">
              Mọi dữ liệu được bảo vệ bằng Row Level Security — chỉ chủ tài
              khoản mới truy cập được giao dịch của mình.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFD100]/15 text-[#FFD100]">
              <Lock size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Mã hóa mật khẩu</h3>
            <p className="mt-2 text-sm text-[#D6D6D6]/60">
              Mật khẩu được băm bằng Argon2 — thuật toán tiêu chuẩn vàng được
              khuyến nghị bởi OWASP.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFD100]/15 text-[#FFD100]">
              <Server size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">PostgreSQL Cloud</h3>
            <p className="mt-2 text-sm text-[#D6D6D6]/60">
              Cơ sở dữ liệu PostgreSQL bền bỉ, backup tự động, sẵn sàng cho khối
              lượng dữ liệu lớn.
            </p>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs text-[#D6D6D6]/40">
        <p>© 2026 Tiền Của Tôi Đâu — Quản lý tài chính cá nhân thông minh.</p>
      </footer>
    </div>
  );
}
