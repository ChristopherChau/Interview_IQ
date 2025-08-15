import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  console.log("Callback URL:", request.url);

  if (code) {
    // 👇 IMPORTANT: freeze the cookie store BEFORE any awaits
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    await supabase.auth.exchangeCodeForSession(code);
    console.log("✅ exchanged code for session");
  } else {
    console.log("⚠️ no code on callback URL");
  }

  return NextResponse.redirect(new URL("/", origin));
}
