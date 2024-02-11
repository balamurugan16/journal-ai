"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Analysis, Journal } from "@/data/types";
import useAutosave from "@/lib/hooks/use-autosave";
import { getJournal, updateJournal } from "@/services/journals";
import { formatTimestamp } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const EditorComponent = dynamic(() => import("@/components/EditorComponent"), { ssr: false })

type Props = {
  analysis: Analysis | null;
} & Journal;

function InteractiveEditor(props: Props) {
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  // const [loading, setLoading] = useState(false)

  const updateEntry = async () => {
    // setLoading(true)
    await updateJournal(
      props.id,
      title,
      content
    )
    // setLoading(false)
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
      <header className="p-2">
        <p className="font-light italic text-gray-600 mb-2" suppressHydrationWarning>{formatTimestamp(props.updatedAt)}</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-bold focus:outline-none"
        />
        <div className="mt-2 flex gap-2">
          {props.analysis && props.analysis.tags.map(tag => <Badge variant="secondary" key={tag}>{tag}</Badge>)}
        </div>
      </header>
      <Suspense fallback={null}>
        <EditorComponent markdown={content} onChange={(markdown) => setContent(markdown)} />
      </Suspense>
    </article >
  )
}

export default InteractiveEditor;
