"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Journal } from "@/data/types";
import useAutosave from "@/lib/hooks/use-autosave";
import { updateJournal } from "@/services/journals";
import { formatTimestamp } from "@/lib/utils";

const EditorComponent = dynamic(() => import("@/components/EditorComponent"), { ssr: false })

function InteractiveEditor(props: Journal) {
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const [loading, setLoading] = useState(false)

  const updateEntry = async () => {
    setLoading(true)
    await updateJournal(
      props.id,
      title,
      content
    )
    setLoading(false)
  }

  useAutosave({
    data: title,
    onSave: (data) => {
      if (data === props.title) return
      updateEntry()
    }
  })

  useAutosave({
    data: content,
    onSave: (data) => {
      if (data === props.content) return
      updateEntry()
    }
  })

  return (
    <article>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 shadow-none text-4xl font-bold focus:outline-none"
      />
      <Suspense fallback={null}>
        <EditorComponent markdown={content} onChange={(markdown) => setContent(markdown)} />
      </Suspense>
    </article>
  )
}

export default InteractiveEditor;
