"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/utils/useAuth";
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// --- Error mapping: Supabase messages → Vietnamese ---
const ERROR_MAP: Record<string, string> = {
  "User already registered": "Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.",
  "Signup requires a valid password": "Mật khẩu không hợp lệ.",
  "Unable to validate email address: invalid format": "Định dạng email không hợp lệ.",
  "Password should be at least 6 characters": "Mật khẩu phải có ít nhất 6 ký tự.",
  "Email rate limit exceeded": "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.",
  "For security purposes, you can only request this after": "Vui lòng đợi một lát trước khi thử lại.",
};

function mapSupabaseError(msg: string): string {
  for (const [key, vi] of Object.entries(ERROR_MAP)) {
    if (msg.includes(key)) return vi;
  }
  return msg;
}

// --- Per-field validation ---
interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
}

function validateFields(name: string, email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};

  if (name && name.length > 100) {
    errors.name = "Họ tên quá dài (tối đa 100 ký tự).";
  }

  if (!email.trim()) {
    errors.email = "Vui lòng nhập email.";
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.email = "Định dạng email không hợp lệ (không sử dụng dấu tiếng Việt hoặc ký tự đặc biệt).";
    }
  }

  if (!password) {
    errors.password = "Vui lòng nhập mật khẩu.";
  } else if (password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
  } else if (password.length > 72) {
    errors.password = "Mật khẩu tối đa 72 ký tự.";
  }

  return errors;
}

export default function SignUpPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setMounted(true);

    // If user is already logged in, redirect to dashboard using window.location to ensure cookie sync
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        window.location.href = "/dashboard";
      }
    });
  }, []);

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Client-side per-field validation
    const errors = validateFields(name, email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      // Fire signup; don't await the redirect
      await signUpWithCredentials({
        email,
        password,
        name: name || undefined,
      });

      // Use window.location.href to ensure Next.js middleware picks up new session cookies
      window.location.href = "/dashboard";
    } catch (err: any) {
      const raw = err?.message || "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.";
      setServerError(mapSupabaseError(raw));
      setLoading(false);
    }
  };

  // Clear field error on change
  const handleNameChange = (val: string) => {
    setName(val);
    if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: undefined }));
  };
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
  };
  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
  };

  if (!mounted) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#202020] p-4">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-[#FFD100]/15 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#FFEE32]/10 blur-[140px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#202020] p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-[#FFD100]/15 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#FFEE32]/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,209,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,209,0,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <form
        noValidate
        suppressHydrationWarning
        onSubmit={onSubmit}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7),0_0_80px_-20px_rgba(255,209,0,0.4)]"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFD100] to-[#FFEE32] text-[#202020] shadow-[0_0_40px_-8px_rgba(255,209,0,0.8)]">
            <Sparkles size={26} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-white">Tạo tài khoản mới</h1>
          <p className="mt-1.5 text-sm text-[#D6D6D6]/60">
            Bắt đầu hành trình làm chủ tài chính cá nhân
          </p>
        </div>

        <div className="space-y-4">
          {/* Họ và tên */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#D6D6D6]/80">
              Họ và tên (tùy chọn)
            </label>
            <div
              suppressHydrationWarning
              className={`flex items-center overflow-hidden rounded-xl border bg-white/[0.03] transition-colors focus-within:border-[#FFD100]/60 ${
                fieldErrors.name ? "border-red-500/50" : "border-white/10"
              }`}
            >
              <span className="pl-3.5 text-[#D6D6D6]/50">
                <User size={16} />
              </span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                suppressHydrationWarning
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-[#D6D6D6]/40 outline-none"
              />
            </div>
            {fieldErrors.name && (
              <p className="text-xs text-red-400">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#D6D6D6]/80">
              Email
            </label>
            <div
              suppressHydrationWarning
              className={`flex items-center overflow-hidden rounded-xl border bg-white/[0.03] transition-colors focus-within:border-[#FFD100]/60 ${
                fieldErrors.email ? "border-red-500/50" : "border-white/10"
              }`}
            >
              <span className="pl-3.5 text-[#D6D6D6]/50">
                <Mail size={16} />
              </span>
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                suppressHydrationWarning
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="ban@example.com"
                className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-[#D6D6D6]/40 outline-none"
              />
            </div>
            {fieldErrors.email && (
              <p className="text-xs text-red-400">{fieldErrors.email}</p>
            )}
          </div>

          {/* Mật khẩu */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#D6D6D6]/80">
              Mật khẩu
            </label>
            <div
              suppressHydrationWarning
              className={`flex items-center overflow-hidden rounded-xl border bg-white/[0.03] transition-colors focus-within:border-[#FFD100]/60 ${
                fieldErrors.password ? "border-red-500/50" : "border-white/10"
              }`}
            >
              <span className="pl-3.5 text-[#D6D6D6]/50">
                <Lock size={16} />
              </span>
              <input
                required
                name="password"
                type="password"
                autoComplete="new-password"
                suppressHydrationWarning
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Ít nhất 6 ký tự"
                className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-[#D6D6D6]/40 outline-none"
              />
            </div>
            {fieldErrors.password && (
              <p className="text-xs text-red-400">{fieldErrors.password}</p>
            )}
          </div>

          {/* Server error (from Supabase) */}
          {serverError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFD100] px-4 py-3 text-sm font-semibold text-[#202020] transition-all hover:bg-[#FFEE32] disabled:opacity-60 shadow-[0_0_30px_-8px_rgba(255,209,0,0.8)]"
          >
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
            {!loading && (
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            )}
          </button>

          <p className="pt-2 text-center text-sm text-[#D6D6D6]/60">
            Đã có tài khoản?{" "}
            <a
              href="/account/signin"
              className="font-medium text-[#FFD100] hover:text-[#FFEE32]"
            >
              Đăng nhập
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
