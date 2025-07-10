import { useState } from 'react'

import { tagsEnum } from '@/db/schema/tables'

export const TagsSelector = ({
  value,
  onChange,
}: {
  value: string[]
  onChange: (tags: string[]) => void
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const colors = [
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-green-100 text-green-800 border-green-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-orange-100 text-orange-800 border-orange-200',
    'bg-pink-100 text-pink-800 border-pink-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
  ]

  const toggleTag = (tagValue: string) => {
    if (value.includes(tagValue)) {
      onChange(value.filter((t) => t !== tagValue))
    } else {
      onChange([...value, tagValue])
    }
  }

  const removeTag = (tagValue: string) => {
    onChange(value.filter((t) => t !== tagValue))
  }

  const getTagLabel = (tagValue: string) => {
    return tagsEnum.enumValues.find((tag) => tag === tagValue) || tagValue
  }

  const filteredTags = tagsEnum.enumValues.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const availableTags = filteredTags.filter((tag) => !value.includes(tag))

  return (
    <div className="space-y-3">
      {/* Tags selecionadas */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tagValue, index) => (
            <span
              key={tagValue}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${
                colors[index % colors.length]
              }`}
            >
              {getTagLabel(tagValue)}
              <button
                type="button"
                onClick={() => removeTag(tagValue)}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search Tag */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="🔍 Buscar tags disponíveis..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-44 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
            {availableTags.length > 0 ? (
              <div className="space-y-1 p-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    <span>{tag}</span>
                    <span className="text-xs text-gray-400">+</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-sm text-gray-500">
                {searchTerm
                  ? 'Nenhuma tag encontrada'
                  : 'Todas as tags já foram selecionadas'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Informações */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Clique para adicionar • × para remover</span>
        <span>
          {value.length}/{tagsEnum.enumValues.length} selecionadas
        </span>
      </div>
    </div>
  )
}
