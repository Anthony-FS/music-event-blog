import { useEffect, useState } from 'react'
import { author } from '../../data/blogPosts'
import api from '../../lib/axios'
import { formatArticleDate } from '../../utils/formatArticleDate'
import ArticleToolbar from './ArticleToolbar'
import BlogCard from './BlogCard'

const POSTS_PER_PAGE = 6

function ArticleSection() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const [hasMoreArticles, setHasMoreArticles] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await api.get('/posts')
        const serverCategories = Array.from(
          new Set(
            data.posts
              .map((article) => article.category)
              .filter(Boolean),
          ),
        )

        setCategories(['All', ...serverCategories])
      } catch {
        setCategories(['All'])
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true)
        setError(null)
        setPage(1)

        const { posts, hasMore } = await getPosts({
          pageToFetch: 1,
          selectedCategory,
          searchValue,
        })

        setArticles(posts)
        setHasMoreArticles(hasMore)
      } catch {
        setError('Failed to load articles. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [selectedCategory, searchValue])

  const filteredArticles = articles
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

  async function handleViewMore() {
    const nextPage = page + 1

    try {
      setIsLoadingMore(true)

      const { posts, hasMore } = await getPosts({
        pageToFetch: nextPage,
        selectedCategory,
        searchValue,
      })

      setArticles((currentArticles) => [...currentArticles, ...posts])
      setPage(nextPage)
      setHasMoreArticles(hasMore)
    } catch {
      setError('Failed to load more articles. Please try again later.')
    } finally {
      setIsLoadingMore(false)
    }
  }

  return (
    <section className="w-full px-5 pb-16 sm:px-8 sm:pb-20 lg:px-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-base font-bold text-[#28241f] max-sm:-mx-5 max-sm:px-5">
          Latest articles
        </h2>
        <ArticleToolbar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchResults={searchResults}
        />

        {isLoading ? (
          <p className="mt-8 rounded-lg bg-[#f6f5f2] px-5 py-8 text-center text-sm font-semibold text-[#75716b]">
            Loading articles...
          </p>
        ) : error ? (
          <p className="mt-8 rounded-lg bg-[#f6f5f2] px-5 py-8 text-center text-sm font-semibold text-[#75716b]">
            {error}
          </p>
        ) : filteredArticles.length > 0 ? (
          <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2">
            {filteredArticles.map((article) => (
              <BlogCard
                key={article.id}
                id={article.id}
                title={article.title}
                category={article.category}
                description={article.description}
                date={formatArticleDate(article.date)}
                image={article.image}
                authorName={article.author}
                authorBio={author.bio}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10! rounded-lg bg-[#f6f5f2] px-5 py-8 text-center text-sm font-semibold text-[#75716b] sm:mt-10">
            No articles found.
          </p>
        )}

        {hasMoreArticles && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={handleViewMore}
              disabled={isLoadingMore}
              className="text-sm font-semibold text-black! visited:text-black! underline underline-offset-4 transition-colors hover:text-black!"
            >
              {isLoadingMore ? 'Loading...' : 'View more'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

async function getPosts({ pageToFetch, selectedCategory, searchValue }) {
  const params = {
    page: pageToFetch,
    limit: POSTS_PER_PAGE,
  }

  if (selectedCategory !== 'All') {
    params.category = selectedCategory
  }

  if (searchValue.trim()) {
    params.search = searchValue.trim()
  }

  const { data } = await api.get('/posts', { params })
  const posts = data.posts ?? []
  const hasMore =
    typeof data.hasMore === 'boolean'
      ? data.hasMore
      : posts.length === POSTS_PER_PAGE

  return { posts, hasMore }
}

export default ArticleSection
