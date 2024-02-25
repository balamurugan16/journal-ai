"use client";

import { createJournal } from "@/lib/journals";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewJournal() {

  const handleClick = async () => {
    createJournal({
      title: "Untitled",
      content: "Write about your day!",
    })
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
