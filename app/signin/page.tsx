"use client";

import { Button } from "@/components/ui/button";
import { supabaseBrowserClient } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Signin() {
  // const supabase = createClientComponentClient()
  const supabase = supabaseBrowserClient()

  async function signin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
      }
    });
  }

  return (
    <Button onClick={signin}>Continue with Google</Button>
  )
}

