import { useState } from 'react'
import { Copy, Smile } from 'lucide-react'
import { toast } from 'sonner'

import facebookIcon from '../../assets/icons/Facebook_black.svg'
import linkedInIcon from '../../assets/icons/LinkedIN_black.svg'
import twitterIcon from '../../assets/icons/Twitter_black.svg'
import AuthRequiredDialog from '../shared/AuthRequiredDialog'
import { isLoggedIn } from '../../lib/memberSession'
import { likeArticle, unlikeArticle } from '../../services/articleService'

const socialLinks = [
  { label: 'Facebook', icon: facebookIcon, bg: 'bg-[#1877f2]' },
  { label: 'LinkedIn', icon: linkedInIcon, bg: 'bg-[#0a66c2]' },
  { label: 'Twitter', icon: twitterIcon, bg: 'bg-[#55acee]' },
]

function getShareUrl(platform) {
  const articleUrl = encodeURIComponent(window.location.href)

  const shareUrls = {
    Facebook: `https://www.facebook.com/share.php?u=${articleUrl}`,
    LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`,
    Twitter: `https://www.twitter.com/share?&url=${articleUrl}`,
  }

  return shareUrls[platform]
}

function SocialBar({ articleId, likes = 0, likedByUser = false }) {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const [hasLiked, setHasLiked] = useState(likedByUser)
  const [isUpdatingLike, setIsUpdatingLike] = useState(false)

  function requireAuth() {
    if (!isLoggedIn()) {
      setIsAuthDialogOpen(true)
      return false
    }

    return true
  }

  async function handleLikeToggle() {
    if (!requireAuth() || isUpdatingLike) {
      return
    }

    try {
      setIsUpdatingLike(true)
      const result = hasLiked
        ? await unlikeArticle(articleId)
        : await likeArticle(articleId)
      setLikeCount(result.likes)
      setHasLiked(result.likedByUser)
      toast.success(result.likedByUser ? 'Article liked.' : 'Like removed.')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsUpdatingLike(false)
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link saved to clipboard.')
    } catch {
      toast.error('Unable to copy link.')
    }
  }

  return (
    <div className="relative isolate mt-10 flex flex-col gap-3 rounded-lg px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:bg-[#f6f5f2] sm:px-5 sm:py-4">
      <div className="absolute inset-y-0 left-1/2 -z-10 w-dvw -translate-x-1/2 bg-[#f6f5f2] sm:hidden" />

        <button
          type="button"
          onClick={handleLikeToggle}
          disabled={isUpdatingLike}
          aria-pressed={hasLiked}
          aria-label={hasLiked ? 'Unlike article' : 'Like article'}
          className={`inline-flex h-9 w-full items-center justify-center gap-2 rounded-full! border border-[#28241f] px-5 text-sm font-semibold sm:h-10 sm:w-fit ${
            hasLiked
              ? 'bg-[#d9f8ec] text-[#0b8057] hover:bg-[#c7f3e3]'
              : 'bg-white text-[#28241f] hover:bg-[#eeece8]'
          }`}
        >
          <Smile size={18} strokeWidth={1.8} />
          <span>{likeCount}</span>
        </button>

        <div className="grid grid-cols-[minmax(0,1fr)_36px_36px_36px] items-center gap-2 sm:flex sm:flex-wrap sm:justify-start sm:gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-full! border border-[#28241f] bg-white px-3 text-xs font-semibold text-[#28241f] transition-colors hover:bg-[#eeece8] sm:h-10 sm:px-6 sm:text-sm"
          >
            <Copy size={17} strokeWidth={1.8} />
            <span className="truncate">Copy link</span>
          </button>

          {socialLinks.map(({ label, icon, bg }) => (
            <a
              key={label}
              href={getShareUrl(label)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Share on ${label}`}
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${bg}`}
            >
              <img
                src={icon}
                alt=""
                className="h-6 w-6 brightness-0 invert"
              />
            </a>
          ))}
        </div>

      <AuthRequiredDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
      />
    </div>
  )
}

export default SocialBar
