"use client";

import { createJournal } from "@/lib/journals";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function NewJournal() {
  const router = useRouter()

  const handleClick = async () => {
    const { id } = await createJournal({
      title: "Untitled",
      content: "Write about your day!",
    })
    router.push(`/journals/${id}`)
  }

  return (
    <Card onClick={handleClick} className="h-40 grid cursor-pointer place-items-center">
      <CardHeader>
        <CardTitle className="text-xl">
          New Journal
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
