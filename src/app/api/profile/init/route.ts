import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";
import { DEFAULT_CATEGORIES, DEFAULT_WALLETS } from "@/utils/categoryIcons";
import { createClient } from "@/utils/supabase/server";

export async function POST() {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    // Run profile check and category check in parallel
    const [existing, existingCats] = await Promise.all([
      sql`SELECT id FROM profiles WHERE id = ${userId}`,
      sql`SELECT id FROM categories WHERE user_id = ${userId} LIMIT 1`,
    ]);

    // Only fetch user metadata if we need to create a profile
    if (existing.length === 0) {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const fullName = user?.user_metadata?.full_name || null;
      const avatarUrl = user?.user_metadata?.avatar_url || null;

      await sql`
        INSERT INTO profiles (id, full_name, avatar_url)
        VALUES (${userId}, ${fullName}, ${avatarUrl})
      `;
    }

    if (existingCats.length === 0) {
      // Build batch INSERT for categories using parameterized sql.unsafe
      const catPlaceholders: string[] = [];
      const catParams: any[] = [];
      let catIdx = 1;
      for (const cat of DEFAULT_CATEGORIES) {
        catPlaceholders.push(
          `($${catIdx++}, $${catIdx++}, $${catIdx++}, $${catIdx++}, $${catIdx++}, true)`
        );
        catParams.push(userId, cat.name, cat.icon, cat.color, cat.type);
      }

      const walletPlaceholders: string[] = [];
      const walletParams: any[] = [];
      let wIdx = 1;
      for (const w of DEFAULT_WALLETS) {
        walletPlaceholders.push(
          `($${wIdx++}, $${wIdx++}, $${wIdx++}, $${wIdx++}, $${wIdx++}, 0, 0)`
        );
        walletParams.push(userId, w.name, w.type, w.icon, w.color);
      }

      // Run both batch inserts in parallel (2 queries instead of 14)
      await Promise.all([
        sql(
          `INSERT INTO categories (user_id, name, icon, color, type, is_default)
           VALUES ${catPlaceholders.join(", ")}`,
          catParams
        ),
        sql(
          `INSERT INTO wallets (user_id, name, type, icon, color, initial_balance, current_balance)
           VALUES ${walletPlaceholders.join(", ")}`,
          walletParams
        ),
      ]);
    }

    return Response.json({ ok: true, initialized: true, seeded: true });
  } catch (err) {
    console.error("POST /api/profile/init error:", err);
    return Response.json(
      { error: "Không thể khởi tạo hồ sơ" },
      { status: 500 },
    );
  }
}
