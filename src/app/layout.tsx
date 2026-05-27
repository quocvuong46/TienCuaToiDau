import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/layout/Providers";
import "./global.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tiền Của Tôi Đâu — Quản Lý Tài Chính Cá Nhân AI",
  description:
    "Làm chủ tài chính cá nhân với Tiền Của Tôi Đâu. Theo dõi chi tiêu, quét hóa đơn bằng AI thông minh, quản lý ngân sách và tiết kiệm hiệu quả.",
  keywords: [
    "quản lý tài chính cá nhân",
    "chi tiêu",
    "quét hóa đơn",
    "tiết kiệm",
    "AI tài chính",
    "Next.js Supabase",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable}`}>
      <body className="font-sans min-h-screen bg-[#202020] text-[#D6D6D6] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
