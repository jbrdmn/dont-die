import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/game";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user has a living lemming
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: lemming } = await supabase
          .from("lemmings")
          .select("id")
          .eq("user_id", user.id)
          .eq("is_alive", true)
          .maybeSingle();

        if (!lemming) {
          return NextResponse.redirect(`${origin}/name-your-lemming`);
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth error — redirect to landing
  return NextResponse.redirect(`${origin}/?error=auth`);
}
