"use server"

import { cookies } from "next/headers"
import { supabaseServerHandler } from "./supabase"

export async function getSupabaseUser() {
  const supabase = supabaseServerHandler(cookies())
  const response = await supabase.auth.getUser()
  return response.data.user
}

