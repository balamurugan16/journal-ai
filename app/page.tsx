"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function Home() {
  return (
    <section className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-6xl">Journal.ai</h1>
      <Link href="/journals">
        <Button>Get started</Button>
      </Link>
    </section>
  )
}

