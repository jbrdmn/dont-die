import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use service role key for admin operations
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  // Kill all lemmings that weren't saved yesterday
  const { data, error } = await supabase
    .from("lemmings")
    .update({ is_alive: false, died_at: new Date().toISOString() })
    .eq("is_alive", true)
    .lt("last_saved_date", yesterdayStr)
    .select("id");

  // Also kill lemmings that were never saved AND born before today
  const todayStr = new Date().toISOString().slice(0, 10);
  const { data: neverSaved } = await supabase
    .from("lemmings")
    .update({ is_alive: false, died_at: new Date().toISOString() })
    .eq("is_alive", true)
    .is("last_saved_date", null)
    .lt("born_at", todayStr)
    .select("id");

  const killed = (data?.length ?? 0) + (neverSaved?.length ?? 0);

  return NextResponse.json({
    killed,
    error: error?.message,
    timestamp: new Date().toISOString(),
  });
}
