import { Button } from "@/components/ui/button";
import { getSupabaseUser } from "@/lib/user";
import Link from "next/link"

export default async function Home() {
  const user = await getSupabaseUser()
  return (
    <section className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-6xl">Journal.ai</h1>
      <Link href={user ? "/journals" : "/signin"}>
        <Button>Get started</Button>
      </Link>
    </section>
  )
}

