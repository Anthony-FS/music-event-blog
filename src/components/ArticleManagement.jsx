import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import addIcon from '../assets/icons/Add_round_light.svg'
import editIcon from '../assets/icons/Edit_light.svg'
import trashIcon from '../assets/icons/Trash_light.svg'
import api from '../lib/axios'
import ArticleManagementToolbar from './ArticleManagementToolbar'
import CreateArticleForm from './CreateArticleForm'
import DeleteArticleDialog from './DeleteArticleDialog'

const POSTS_PER_PAGE = 30
const STATUS_OPTIONS = ['Published', 'Draft']

function getArticleStatus(article) {
  return String(article.status ?? 'published').toLowerCase()
}

function ArticleManagement() {
  const [view, setView] = useState('list')
  const [editingArticleId, setEditingArticleId] = useState(null)
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingArticleId, setDeletingArticleId] = useState(null)

  useEffect(() => {
    if (view !== 'list') {
      return
    }

    async function fetchCategories() {
      try {
        const { data } = await api.get('/posts')
        const serverCategories = Array.from(
          new Set(
            (data.posts ?? [])
              .map((article) => article.category)
              .filter(Boolean),
          ),
        )

        setCategories(serverCategories)
      } catch {
        setCategories([])
      }
    }

    fetchCategories()
  }, [view])

  useEffect(() => {
    if (view !== 'list') {
      return
    }

    async function fetchArticles() {
      try {
        setIsLoading(true)
        setError(null)

        const params = { page: 1, limit: POSTS_PER_PAGE }

        if (searchValue.trim()) {
          params.search = searchValue.trim()
        }

        if (selectedCategory) {
          params.category = selectedCategory
        }

        const { data } = await api.get('/posts', { params })

        let posts = data.posts ?? []

        if (selectedStatus) {
          const normalizedStatus = selectedStatus.toLowerCase()
          posts = posts.filter(
            (article) => getArticleStatus(article) === normalizedStatus,
          )
        }

        setArticles(posts)
      } catch {
        setError('Failed to load articles. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [view, searchValue, selectedStatus, selectedCategory])

  const normalizedSearchValue = searchValue.trim().toLowerCase()
  const searchResults = normalizedSearchValue
    ? articles.filter((article) =>
        [article.title, article.description, article.content]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(normalizedSearchValue),
          ),
      )
    : []

  function handleCloseForm() {
    setView('list')
    setEditingArticleId(null)
  }

  function handleEditArticle(articleId) {
    setEditingArticleId(articleId)
    setView('edit')
  }

  function handleDeleteArticle(articleId) {
    setDeletingArticleId(articleId)
  }

  function handleConfirmDelete() {
    setArticles((currentArticles) =>
      currentArticles.filter((article) => article.id !== deletingArticleId),
    )
    setDeletingArticleId(null)
    toast.success('Article deleted.')
  }

  if (view === 'create') {
    return (
      <CreateArticleForm categories={categories} onClose={handleCloseForm} />
    )
  }

  if (view === 'edit') {
    return (
      <CreateArticleForm
        articleId={editingArticleId}
        categories={categories}
        onClose={handleCloseForm}
      />
    )
  }

  return (
    <section className="flex h-screen min-h-0 min-w-0 flex-col overflow-hidden bg-[#f9f9f9]">
      <header className="flex shrink-0 min-h-[88px] items-center justify-between border-b border-[#dedbd6] px-6 py-5 sm:px-10">
        <h1 className="text-xl font-bold text-[#28241f]">Article management</h1>
        <button
          type="button"
          onClick={() => setView('create')}
          className="inline-flex! h-11 items-center justify-center gap-2 rounded-full! bg-[#28241f] px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          <img src={addIcon} alt="" className="h-4 w-4 invert" aria-hidden="true" />
          Create article
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-6 py-8 sm:px-10">
        <ArticleManagementToolbar
          categories={categories}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchResults={searchResults}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          statusOptions={STATUS_OPTIONS}
        />
        <div className="mt-6 flex min-h-0 flex-1 flex-col">
          <ArticleManagementTable
            articles={articles}
            isLoading={isLoading}
            error={error}
            onEditArticle={handleEditArticle}
            onDeleteArticle={handleDeleteArticle}
          />
        </div>
      </div>

      <DeleteArticleDialog
        open={deletingArticleId != null}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingArticleId(null)
          }
        }}
        onConfirm={handleConfirmDelete}
      />
    </section>
  )
}

function ArticleManagementTable({
  articles,
  isLoading,
  error,
  onEditArticle,
  onDeleteArticle,
}) {
  const listWindowClassName =
    'min-h-0 flex-1 overflow-y-auto rounded-lg border border-[#dedbd6] bg-white'
  const messageClassName =
    'px-6 py-8 text-center text-sm font-semibold text-[#75716b]'

  if (isLoading) {
    return (
      <div className={listWindowClassName}>
        <p className={messageClassName}>Loading articles...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={listWindowClassName}>
        <p className={messageClassName}>{error}</p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className={listWindowClassName}>
        <p className={messageClassName}>No articles found.</p>
      </div>
    )
  }

  return (
    <div className={listWindowClassName}>
      <div className="sticky top-0 z-10 hidden grid-cols-[minmax(0,1fr)_140px_140px_96px] gap-4 border-b border-[#dedbd6] bg-white px-6 py-4 text-sm font-semibold text-[#75716b] md:grid">
        <span>Article title</span>
        <span>Category</span>
        <span>Status</span>
        <span className="sr-only">Actions</span>
      </div>

      {articles.map((article, index) => (
        <div
          key={article.id}
          className={`grid gap-4 px-6 py-5 text-sm font-medium text-[#28241f] md:grid-cols-[minmax(0,1fr)_140px_140px_96px] md:items-center ${
            index % 2 === 1 ? 'bg-[#f5f5f5]' : 'bg-white'
          }`}
        >
          <p className="truncate">{article.title}</p>
          <p>{article.category}</p>
          <p
            className={`font-semibold ${
              getArticleStatus(article) === 'draft'
                ? 'text-[#75716b]'
                : 'text-[#12b379]'
            }`}
          >
            • {getArticleStatus(article) === 'draft' ? 'Draft' : 'Published'}
          </p>
          <div className="flex items-center gap-4 md:justify-end">
            <button
              type="button"
              aria-label={`Edit ${article.title}`}
              onClick={() => onEditArticle(article.id)}
            >
              <img src={editIcon} alt="" className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Delete ${article.title}`}
              onClick={() => onDeleteArticle(article.id)}
            >
              <img src={trashIcon} alt="" className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArticleManagement
