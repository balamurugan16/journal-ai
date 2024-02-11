'use client'

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin
} from "@mdxeditor/editor"
import { FC } from 'react'
import '@mdxeditor/editor/style.css'

interface EditorProps {
  markdown: string
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
  onChange: (markdown: string) => void
}

const Editor: FC<EditorProps> = ({ markdown, onChange, editorRef }) => {
  return <MDXEditor
    contentEditableClassName="prose"
    ref={editorRef}
    markdown={markdown}
    onChange={onChange}
    plugins={[
      headingsPlugin(),
      listsPlugin(),
      linkPlugin(),
      tablePlugin(),
      quotePlugin(),
      markdownShortcutPlugin(),
    ]}
  />
}

export default Editor
