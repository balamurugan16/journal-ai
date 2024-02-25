"use server"

import { supabaseServerHandler } from "@/lib/supabase"
import { cookies } from "next/headers"

const supabase = supabaseServerHandler(cookies())

export async function signInWithGoogle() {
  const res = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback"
    }
  })
}
