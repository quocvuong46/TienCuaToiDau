import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const profiles = await sql`
      SELECT id, full_name, avatar_url, created_at
      FROM profiles
      WHERE id = ${userId}
      LIMIT 1
    `;

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const dbProfile = profiles[0] || {};

    return Response.json({
      profile: {
        user_id: userId,
        full_name: dbProfile.full_name || user?.user_metadata?.full_name || "",
        avatar_url: dbProfile.avatar_url || user?.user_metadata?.avatar_url || "",
        created_at: dbProfile.created_at || user?.created_at,
        email: user?.email || "",
      },
    });
  } catch (err) {
    console.error("GET /api/profile error:", err);
    return Response.json({ error: "Lỗi tải hồ sơ" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { full_name, avatar_url } = body || {};

    // Update public profile table
    const result = await sql`
      INSERT INTO profiles (id, full_name, avatar_url)
      VALUES (${userId}, ${full_name || null}, ${avatar_url || null})
      ON CONFLICT (id) DO UPDATE
      SET
        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url)
      RETURNING *
    `;

    // Sync to Supabase Auth metadata
    const supabase = createClient();
    await supabase.auth.updateUser({
      data: {
        full_name: full_name || undefined,
        avatar_url: avatar_url || undefined,
      },
    });

    const dbProfile = result[0] || {};
    return Response.json({
      profile: {
        user_id: userId,
        full_name: dbProfile.full_name,
        avatar_url: dbProfile.avatar_url,
        created_at: dbProfile.created_at,
      },
    });
  } catch (err) {
    console.error("PATCH /api/profile error:", err);
    return Response.json(
      { error: "Không thể cập nhật hồ sơ" },
      { status: 500 },
    );
  }
}
