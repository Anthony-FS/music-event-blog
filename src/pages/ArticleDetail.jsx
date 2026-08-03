import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import AuthorCard from '../components/blog/AuthorCard'
import CommentSection from '../components/blog/CommentSection'
import Footer from '../components/layout/Footer'
import NavBar from '../components/layout/NavBar'
import SocialBar from '../components/blog/SocialBar'
import { getArticle } from '../services/articleService'
import { formatArticleDate } from '../utils/formatArticleDate'
import { normalizeArticleContent } from '../utils/normalizeArticleContent'

function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchArticle() {
      try {
        setIsLoading(true)
        setError(null)

        setArticle(await getArticle(id))
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <NavBar />

      <section className="w-full flex-1 overflow-x-hidden px-5 pb-8 pt-0 sm:px-8 sm:py-12 lg:px-28">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <ArticleStateMessage message="Loading article..." />
          ) : error || !article ? (
            <ArticleStateMessage message={error ?? 'Article not found.'} />
          ) : (
            <article>
              <div className="relative left-1/2 w-dvw -translate-x-1/2 sm:left-auto sm:mt-10 sm:w-full sm:translate-x-0">
                <img
                  src={article.image}
                  alt=""
                  className="aspect-[2.25/1] w-full object-cover sm:rounded-lg"
                  loading="eager"
                />
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#75716b]">
                    <span className="rounded-full bg-[#d9f8ec] px-3 py-1 text-[11px] font-semibold text-[#12b379]">
                      {article.category}
                    </span>
                    <time>{formatArticleDate(article.date)}</time>
                  </div>

                  <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-[#28241f] sm:text-4xl">
                    {article.title}
                  </h1>

                  <p className="mt-6 max-w-3xl text-sm font-medium leading-6 text-[#57524c]">
                    {article.description}
                  </p>

                  <ArticleBody content={article.content} />
                  <AuthorCard author={article.author} className="mt-10 lg:hidden" />
                  <SocialBar
                    articleId={article.id}
                    likes={article.likes}
                    likedByUser={article.likedByUser}
                  />
                  <CommentSection />

                </div>

                <AuthorCard author={article.author} className="hidden lg:block" />
              </div>
            </article>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ArticleStateMessage({ message }) {
  return (
    <p className="rounded-lg bg-[#f6f5f2] px-5 py-10 text-center text-sm font-semibold text-[#75716b]">
      {message}
    </p>
  )
}

function ArticleBody({ content }) {
  const sections = normalizeArticleContent(content)

  return (
    <div className="mt-8 space-y-9">
      {sections.map((section) => (
        <section key={section.heading ?? section.body}>
          {section.heading && (
            <h2 className="text-base font-bold leading-snug text-[#28241f]">
              {section.heading}
            </h2>
          )}

          <div className="mt-4 space-y-3">
            {section.paragraphs.map((paragraph) =>
              paragraph.type === 'list' ? (
                <ul
                  key={paragraph.items.join('')}
                  className="list-disc space-y-1 pl-5 text-sm font-medium leading-6 text-[#57524c]"
                >
                  {paragraph.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p
                  key={paragraph.text}
                  className="text-sm font-medium leading-6 text-[#57524c]"
                >
                  {paragraph.text}
                </p>
              ),
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

export default ArticleDetail
