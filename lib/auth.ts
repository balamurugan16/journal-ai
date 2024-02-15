"use server";

import { cookies } from "next/headers";
import { supabaseServerHandler } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginWithGoogle() {
  const cookieStore = cookies()
  const supabase = supabaseServerHandler(cookieStore)

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent"
      }
    }
  });

  revalidatePath("/", "layout")
  redirect(data.url)
}

