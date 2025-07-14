'use client'
import { useEffect, useRef, useState } from 'react'
import {
  FiCheckCircle,
  FiFileText,
  FiImage,
  FiUpload,
  FiVideo,
  FiX,
} from 'react-icons/fi'

type ContentType = 'noticia' | 'imagem' | 'video'

interface NewContentModalProps {
  open: boolean
  onCloseAction: () => void
  onCreateAction: (data: {
    title: string
    summary: string
    type: ContentType
    file?: File | null
    body?: string
  }) => void
}

const typeOptions = [
  {
    value: 'noticia',
    label: 'Notícia',
    icon: <FiFileText className="text-purple-600" />,
  },
  {
    value: 'imagem',
    label: 'Imagem',
    icon: <FiImage className="text-orange-500" />,
  },
  {
    value: 'video',
    label: 'Vídeo',
    icon: <FiVideo className="text-indigo-600" />,
  },
]

export function NewContentModal({
  open,
  onCloseAction,
  onCreateAction,
}: NewContentModalProps) {
  const [type, setType] = useState<ContentType>('noticia')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [success, setSuccess] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setType('noticia')
      setTitle('')
      setSummary('')
      setBody('')
      setFile(null)
      setSuccess(false)
      setTimeout(() => titleRef.current?.focus(), 100)
    }
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    if (type === 'imagem' || type === 'video') {
      if (!file) return
    }
    onCreateAction({ title, summary, type, file, body })
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      onCloseAction()
    }, 1000)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null
    setFile(f)
  }

  if (!open) return null

  return (
    <div className="animate-fade-in fixed inset-0 z-[500] flex items-center justify-center bg-black/40">
      <div className="animate-fade-in relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        {/* Close button */}
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
          onClick={onCloseAction}
          aria-label="Fechar"
        >
          <FiX size={26} />
        </button>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Novo Conteúdo</h2>
        <p className="mb-6 text-gray-500">
          Preencha as informações para criar um novo conteúdo.
        </p>
        <form onSubmit={handleSubmit} autoComplete="off" spellCheck={false}>
          {/* Tipo do conteúdo */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Tipo
            </label>
            <div className="flex gap-4">
              {typeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-all ${
                    type === opt.value
                      ? 'border-[#6C63FF] bg-purple-50 font-bold'
                      : 'border-gray-200 bg-gray-50 hover:border-purple-300'
                  } `}
                  onClick={() => setType(opt.value as ContentType)}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Título */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Título
            </label>
            <input
              ref={titleRef}
              type="text"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-purple-200 focus:outline-none"
              placeholder="Título do conteúdo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {/* Resumo */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Resumo
            </label>
            <textarea
              className="max-h-[120px] min-h-[60px] w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base placeholder-gray-400 focus:ring-2 focus:ring-purple-200 focus:outline-none"
              placeholder="Resumo do conteúdo (opcional)"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          {/* Campos condicionais */}
          {type === 'noticia' && (
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Texto / Corpo
              </label>
              <textarea
                className="min-h-[80px] w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base placeholder-gray-400 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                placeholder="Digite o texto da notícia..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>
          )}
          {(type === 'imagem' || type === 'video') && (
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {type === 'imagem' ? 'Imagem' : 'Vídeo'}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept={type === 'imagem' ? 'image/*' : 'video/*'}
                  className="block"
                  onChange={handleFileChange}
                  required
                />
                {file && (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <FiCheckCircle /> Arquivo selecionado
                  </span>
                )}
              </div>
            </div>
          )}
          {/* Ações */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={onCloseAction}
              className="rounded-lg border border-gray-200 bg-white px-7 py-3 text-lg font-medium text-gray-700 transition hover:bg-gray-50"
              disabled={success}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#6C63FF] px-7 py-3 text-lg font-semibold text-white transition hover:bg-[#453bc7]"
              disabled={success}
            >
              {success ? (
                <>
                  <FiCheckCircle className="animate-bounce" />
                  Criado!
                </>
              ) : (
                <>
                  <FiUpload />
                  Criar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
