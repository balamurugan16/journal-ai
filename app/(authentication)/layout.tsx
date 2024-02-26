import Image from "next/image";
import { PropsWithChildren } from "react";
import heroImg from "@/assets/man-with-short-hair-avatar(2).svg"
import { redirect } from "next/navigation";
import { supabaseServerHandler } from "@/lib/supabase";
import { cookies } from "next/headers";

export default async function layout({ children }: PropsWithChildren) {
  const supabase = supabaseServerHandler(cookies())
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/")
  }

  return (
    <main className="grid place-items-center p-8 h-screen w-screen grid-cols-1 md:grid-cols-2">
      <section className="hidden md:block">
        <Image
          alt="happy man with short hair"
          src={heroImg}
          width={500}
        />
      </section>
      <section>
        {children}
      </section>
    </main>
  )
}
