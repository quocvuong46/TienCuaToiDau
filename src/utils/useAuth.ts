import { useCallback } from "react";
import { createClient } from "./supabase/client";

function isDevIframe() {
  try {
    return typeof window !== "undefined" && window.self !== window.top;
  } catch {
    return true;
  }
}

function devSocialShim(provider: string, callbackUrl: string | null) {
  const params = new URLSearchParams({ provider });
  if (callbackUrl) params.set("callbackUrl", callbackUrl);
  window.location.href = "/__create/social-dev-shim?" + params;
}

export function useAuth() {
  const supabase = createClient();

  const getCallbackUrl = (): string => {
    if (typeof window === "undefined") return "/dashboard";
    const params = new URLSearchParams(window.location.search);
    return params.get("callbackUrl") || "/dashboard";
  };

  const signInWithCredentials = useCallback(
    async (options: { email: string; password?: string }) => {
      const { email, password } = options;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password || "TestPassword123!",
      });
      if (error) throw error;
      return data;
    },
    [supabase]
  );

  const signUpWithCredentials = useCallback(
    async (options: { email: string; password?: string; name?: string }) => {
      const { email, password, name } = options;
      const { data, error } = await supabase.auth.signUp({
        email,
        password: password || "TestPassword123!",
        options: {
          data: {
            full_name: name || undefined,
          },
        },
      });
      if (error) throw error;

      const token = data.session?.access_token;

      // Seed categories and wallets in the background (fire-and-forget)
      // Don't block the redirect — the dashboard will load fine while this runs
      fetch("/api/profile/init", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
      }).catch((e) => {
        console.error("Failed to seed initial user data:", e);
      });

      return data;
    },
    [supabase]
  );

  const signInWithGoogle = useCallback(
    async (options?: { callbackUrl?: string }) => {
      const cb = options?.callbackUrl || getCallbackUrl();
      if (isDevIframe()) {
        devSocialShim("google", cb);
        return;
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin + cb },
      });
      if (error) throw error;
    },
    [supabase]
  );

  const signInWithFacebook = useCallback(
    async (options?: { callbackUrl?: string }) => {
      const cb = options?.callbackUrl || getCallbackUrl();
      if (isDevIframe()) {
        devSocialShim("facebook", cb);
        return;
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: { redirectTo: window.location.origin + cb },
      });
      if (error) throw error;
    },
    [supabase]
  );

  const signInWithTwitter = useCallback(
    async (options?: { callbackUrl?: string }) => {
      const cb = options?.callbackUrl || getCallbackUrl();
      if (isDevIframe()) {
        devSocialShim("twitter", cb);
        return;
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: { redirectTo: window.location.origin + cb },
      });
      if (error) throw error;
    },
    [supabase]
  );

  const signInWithApple = useCallback(
    async (options?: { callbackUrl?: string }) => {
      const cb = options?.callbackUrl || getCallbackUrl();
      if (isDevIframe()) {
        devSocialShim("apple", cb);
        return;
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: { redirectTo: window.location.origin + cb },
      });
      if (error) throw error;
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.href = "/";
  }, [supabase]);

  return {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithApple,
    signOut,
  };
}

export default useAuth;
