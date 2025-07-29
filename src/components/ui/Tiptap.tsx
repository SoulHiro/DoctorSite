'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Undo,
} from 'lucide-react'
import { useEffect } from 'react'

import { Button } from './button'

type TiptapProps = {
  value: string
  onChange: (value: string) => void
}

type TiptapViewerProps = {
  content: string
  className?: string
}

// Componente para visualização (read-only)
export const TipTapViewer = ({
  content,
  className = '',
}: TiptapViewerProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `prose prose-lg max-w-none focus:outline-none ${className}`,
      },
    },
  })

  if (!editor) {
    return (
      <div className="animate-pulse">
        <div className="mb-4 h-4 w-3/4 rounded bg-gray-200"></div>
        <div className="mb-4 h-4 w-full rounded bg-gray-200"></div>
        <div className="mb-4 h-4 w-2/3 rounded bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded bg-gray-200"></div>
      </div>
    )
  }

  return <EditorContent editor={editor} className="tiptap-viewer" />
}

const Tiptap = ({ value, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false, // Fix para SSR
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  })

  // Detectar quando o valor foi resetado e limpar o editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [editor, value])

  if (!editor) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 bg-gray-50 p-2">
          <div className="flex animate-pulse space-x-1">
            <div className="h-8 w-8 rounded bg-gray-200"></div>
            <div className="h-8 w-8 rounded bg-gray-200"></div>
            <div className="h-8 w-8 rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="bg-white p-4">
          <div className="min-h-[300px] animate-pulse rounded bg-gray-100"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      {/* Barra de Ferramentas */}
      <div className="border-b border-gray-200 bg-gray-50 p-2">
        <div className="flex flex-wrap gap-1">
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('bold') ? 'default' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={editor.isActive('italic') ? 'default' : 'ghost'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={editor.isActive('code') ? 'default' : 'ghost'}
            onClick={() => editor.chain().focus().toggleCode().run()}
            className="h-8 w-8 p-0"
          >
            <Code className="h-4 w-4" />
          </Button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          <Button
            type="button"
            size="sm"
            variant={
              editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className="h-8 px-2 text-xs font-semibold"
          >
            H1
          </Button>

          <Button
            type="button"
            size="sm"
            variant={
              editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className="h-8 px-2 text-xs font-semibold"
          >
            H2
          </Button>

          <Button
            type="button"
            size="sm"
            variant={
              editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className="h-8 px-2 text-xs font-semibold"
          >
            H3
          </Button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          <Button
            type="button"
            size="sm"
            variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="h-8 w-8 p-0"
          >
            <Quote className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="h-8 w-8 p-0"
          >
            <Undo className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="h-8 w-8 p-0"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white">
        <EditorContent editor={editor} className="tiptap-content" />
      </div>
    </div>
  )
}

export default Tiptap
