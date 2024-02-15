import { supabaseServerHandler } from "@/lib/supabase"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    const supabase = supabaseServerHandler(cookies())
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(origin)
}
