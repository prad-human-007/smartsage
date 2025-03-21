import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("Opening /auth/callback...");

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirect_to") || "/dashboard"; // ✅ Always redirect to Dashboard

  if (!code) {
    console.error("Missing auth code in callback.");
    return NextResponse.redirect(`${requestUrl.origin}/sign-in?error=MissingAuthCode`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Session Exchange Error:", error.message);
    return NextResponse.redirect(`${requestUrl.origin}/sign-in?error=AuthFailed`);
  }

  console.log("User authenticated successfully:", data.session?.user);
  console.log(redirectTo);
  return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`);
}
