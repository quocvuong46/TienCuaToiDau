"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/useAuth";

const isDev = process.env.NEXT_PUBLIC_CREATE_ENV === "DEVELOPMENT";

const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
  facebook: "Facebook",
  twitter: "Twitter / X",
  apple: "Apple",
};

export default function SocialDevShimPage() {
  const router = useRouter();
  const { signUpWithCredentials, signInWithCredentials } = useAuth();

  useEffect(() => {
    if (!isDev) {
      router.push("/");
    }
  }, [router]);

  const [provider, setProvider] = useState("google");
  const [callbackUrl, setCallbackUrl] = useState("/dashboard");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [missingSecrets, setMissingSecrets] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setProvider(params.get("provider") || "google");
      setCallbackUrl(params.get("callbackUrl") || "/dashboard");
    }
  }, []);

  const label = PROVIDER_LABELS[provider] || provider;

  useEffect(() => {
    fetch(
      `/api/__create/check-social-secrets?provider=${encodeURIComponent(provider)}`
    )
      .then((r) => r.json())
      .then((data) => setMissingSecrets(data.missing || []))
      .catch((err) => {
        console.error("Failed to check social secrets:", err);
      });
  }, [provider]);

  if (!isDev) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      try {
        // Try to sign up first
        await signUpWithCredentials({
          email,
          password: "DevSocialPassword123!",
          name,
        });
      } catch (signupErr: any) {
        // If user already exists, sign in
        if (
          signupErr?.message?.includes("already exists") ||
          signupErr?.message?.includes("already registered") ||
          signupErr?.status === 400 ||
          signupErr?.code === "user_already_exists"
        ) {
          await signInWithCredentials({
            email,
            password: "DevSocialPassword123!",
          });
        } else {
          throw signupErr;
        }
      }

      router.push(callbackUrl);
    } catch (err: any) {
      setError(err?.message || "Sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-[#202020] text-[#D6D6D6]">
      <div className="bg-[#202020] border border-white/10 rounded-xl p-8 w-full max-w-[400px] shadow-md backdrop-blur-xl">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4 text-[13px] text-amber-300">
          <strong>Chế độ phát triển (Development Mode)</strong> — Đây là màn
          hình giả lập đăng nhập {label}. Ở môi trường production, người dùng
          sẽ thấy màn hình OAuth thực tế của {label}.
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-[13px] text-red-300">
            <strong>Lỗi đăng nhập</strong> — {error}
          </div>
        )}

        {missingSecrets && missingSecrets.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-[13px] text-red-300">
            <strong>Thiếu cấu hình API</strong> — Đăng nhập qua {label} sẽ không
            hoạt động ở production cho đến khi bạn điền các biến cấu hình này:{" "}
            {missingSecrets.map((s) => (
              <code key={s} className="bg-red-500/20 px-1 rounded text-[12px] mx-0.5">
                {s}
              </code>
            ))}
          </div>
        )}

        <h2 className="mt-0 mb-6 text-xl font-semibold text-white">
          Đăng nhập bằng {label}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="block text-sm font-medium mb-1.5 text-gray-300">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-[#2b2b2b] text-white text-sm focus:border-[#FFD100] outline-none"
            />
          </label>

          <label className="block mb-6">
            <span className="block text-sm font-medium mb-1.5 text-gray-300">
              Tên hiển thị <span className="text-gray-500">(không bắt buộc)</span>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Test User"
              className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-[#2b2b2b] text-white text-sm focus:border-[#FFD100] outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg border-none text-[#202020] text-sm font-medium bg-[#FFD100] hover:bg-[#FFEE32] disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-default cursor-pointer transition-colors shadow-[0_0_24px_-8px_rgba(255,209,0,0.7)]"
          >
            {loading ? "Đang đăng nhập..." : `Tiếp tục với vai trò {label}`}
          </button>
        </form>
      </div>
    </div>
  );
}
