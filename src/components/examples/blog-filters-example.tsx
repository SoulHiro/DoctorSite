'use client'

// Exemplo de como usar o sistema de filtros reutilizável em uma página de blog

import { Tag, User } from 'lucide-react'

import {
  FilterDate,
  FilterOption,
  FilterSearch,
  FilterSelect,
  useFilters,
} from '@/components/ui/filters'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  category: string
  publishedAt: string
  tags: string[]
}

interface BlogFiltersExampleProps {
  posts: BlogPost[]
  onFilteredPosts: (posts: BlogPost[]) => void
}

const BlogFiltersExample = ({
  posts,
  onFilteredPosts,
}: BlogFiltersExampleProps) => {
  // Hook de filtros com configuração específica do blog
  const { values, updateFilter } = useFilters({
    initialValues: {
      search: '',
      category: 'all',
      author: 'all',
      publishedDate: null,
    },
    onFilterChange: (filters) => {
      // Aplicar filtros aos posts
      const filtered = posts.filter((post) => {
        // Filtro de busca (título, excerpt, tags)
        const matchesSearch =
          !filters.search ||
          post.title
            .toLowerCase()
            .includes((filters.search as string).toLowerCase()) ||
          post.excerpt
            .toLowerCase()
            .includes((filters.search as string).toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes((filters.search as string).toLowerCase())
          )

        // Filtro por categoria
        const matchesCategory =
          filters.category === 'all' || post.category === filters.category

        // Filtro por autor
        const matchesAuthor =
          filters.author === 'all' || post.author === filters.author

        // Filtro por data de publicação
        const matchesDate =
          !filters.publishedDate ||
          (() => {
            const postDate = new Date(post.publishedAt)
            const filterDate = filters.publishedDate as Date
            return (
              postDate.getFullYear() === filterDate.getFullYear() &&
              postDate.getMonth() === filterDate.getMonth()
            )
          })()

        return matchesSearch && matchesCategory && matchesAuthor && matchesDate
      })

      onFilteredPosts(filtered)
    },
    debounceMs: 400, // Debounce um pouco maior para busca em texto
  })

  // Extrair opções únicas dos posts
  const categoryOptions: FilterOption[] = [
    { label: 'Todas as categorias', value: 'all', icon: Tag },
    ...Array.from(new Set(posts.map((post) => post.category))).map(
      (category) => ({
        label: category,
        value: category,
        icon: Tag,
      })
    ),
  ]

  const authorOptions: FilterOption[] = [
    { label: 'Todos os autores', value: 'all', icon: User },
    ...Array.from(new Set(posts.map((post) => post.author))).map((author) => ({
      label: author,
      value: author,
      icon: User,
    })),
  ]

  return (
    <div className="mb-8">
      <div className="space-y-6 rounded-lg border border-slate-200 bg-slate-50/80 p-6">
        {/* Busca principal */}
        <div>
          <FilterSearch
            value={values.search as string}
            onChange={(value) => updateFilter('search', value)}
            placeholder="Buscar por título, conteúdo ou tags..."
            className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-orange-500 focus:ring-orange-500/20"
          />
        </div>

        {/* Filtros secundários */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Categoria */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Categoria
            </label>
            <FilterSelect
              value={values.category as string}
              onChange={(value) => updateFilter('category', value)}
              options={categoryOptions}
              placeholder="Selecione uma categoria"
              className="border-slate-300 bg-white focus:border-orange-500 focus:ring-orange-500/20"
            />
          </div>

          {/* Autor */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Autor
            </label>
            <FilterSelect
              value={values.author as string}
              onChange={(value) => updateFilter('author', value)}
              options={authorOptions}
              placeholder="Selecione um autor"
              className="border-slate-300 bg-white focus:border-orange-500 focus:ring-orange-500/20"
            />
          </div>

          {/* Data de publicação */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Data de publicação
            </label>
            <FilterDate
              value={values.publishedDate as Date | null}
              onChange={(date) => updateFilter('publishedDate', date)}
              placeholder="Selecione o mês/ano"
              className="border-slate-300 bg-white focus:border-orange-500 focus:ring-orange-500/20"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogFiltersExample
