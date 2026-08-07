import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import AuthRequiredDialog from '../shared/AuthRequiredDialog'
import { isLoggedIn } from '../../lib/memberSession'
import { createComment, getComments } from '../../services/commentService'

function CommentSection({ articleId }) {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadComments() {
      try {
        setIsLoading(true)
        setError('')
        const loadedComments = await getComments(articleId)

        if (isActive) {
          setComments(loadedComments)
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message)
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadComments()

    return () => {
      isActive = false
    }
  }, [articleId])

  function requireAuth(event) {
    if (!isLoggedIn()) {
      event?.preventDefault()
      setIsAuthDialogOpen(true)
      return false
    }

    return true
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!requireAuth()) {
      return
    }

    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      setError('Comment is required.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')
      const comment = await createComment(articleId, trimmedMessage)
      setComments((currentComments) => [comment, ...currentComments])
      setMessage('')
      toast.success('Comment added.')
    } catch (submitError) {
      setError(submitError.message)
      toast.error(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mt-12 w-full">
      <form onSubmit={handleSubmit}>
        <label className="block w-full">
          <span className="text-sm font-semibold text-[#75716b]">Comment</span>
          <textarea
            rows={4}
            maxLength={1000}
            value={message}
            placeholder="What are your thoughts?"
            onFocus={requireAuth}
            onChange={(event) => {
              setMessage(event.target.value)
              setError('')
            }}
            className="mt-2 block min-h-28 w-full resize-y rounded-lg border border-[#dedbd6] bg-white px-4 py-3 text-sm font-medium text-[#28241f] outline-none placeholder:text-[#75716b] focus:border-[#28241f]"
          />
        </label>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 rounded-full! bg-[#28241f] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#3a342e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>

      <div className="mt-10 space-y-8">
        {isLoading && (
          <p className="text-sm font-medium text-[#75716b]">
            Loading comments...
          </p>
        )}

        {!isLoading && comments.length === 0 && !error && (
          <p className="text-sm font-medium text-[#75716b]">
            No comments yet. Be the first to comment.
          </p>
        )}

        {comments.map((comment, index) => (
          <article
            key={comment.id}
            className={index > 0 ? 'border-t border-[#dedbd6] pt-8' : ''}
          >
            <div className="flex items-center gap-3">
              <img
                src={comment.avatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <h3 className="text-base font-bold text-[#43403b]">
                  {comment.name}
                </h3>
                <p className="text-xs font-medium text-[#75716b]">
                  {formatCommentDate(comment.createdAt)}
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm font-medium leading-6 text-[#75716b]">
              {comment.message}
            </p>
          </article>
        ))}
      </div>

      <AuthRequiredDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
      />
    </section>
  )
}

function formatCommentDate(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)
}

export default CommentSection
