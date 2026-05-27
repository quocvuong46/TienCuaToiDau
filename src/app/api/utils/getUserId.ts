import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

/**
 * Returns the authenticated Supabase user ID (UUID string), or null if not signed in.
 */
export async function getUserId(): Promise<string | null> {
  try {
    const supabase = createClient();

    // Check if an Authorization header is provided (e.g. during instant signup api calls)
    const authHeader = headers().get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (!error && user) {
        return user.id;
      }
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id || null;
  } catch (e) {
    console.error("getUserId error:", e);
    return null;
  }
}

export function unauthorizedResponse() {
  return Response.json({ error: "Chưa đăng nhập" }, { status: 401 });
}
