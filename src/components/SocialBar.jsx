import { useState } from 'react'
import { Copy, Smile } from 'lucide-react'

import facebookIcon from '../assets/icons/Facebook_black.svg'
import linkedInIcon from '../assets/icons/LinkedIN_black.svg'
import twitterIcon from '../assets/icons/Twitter_black.svg'
import AuthRequiredDialog from './AuthRequiredDialog'

const socialLinks = [
  { label: 'Facebook', href: '#', icon: facebookIcon, bg: 'bg-[#1877f2]' },
  { label: 'LinkedIn', href: '#', icon: linkedInIcon, bg: 'bg-[#0a66c2]' },
  { label: 'Twitter', href: '#', icon: twitterIcon, bg: 'bg-[#55acee]' },
]

function SocialBar({ likes = 0 }) {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)

  function requireAuth() {
    if (!localStorage.getItem('token')) {
      setIsAuthDialogOpen(true)
      return false
    }

    return true
  }

  function handleCopyLink() {
    navigator.clipboard?.writeText(window.location.href)
  }

  return (
    <div className="mt-10 flex flex-col gap-4 rounded-lg bg-[#f6f5f2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={requireAuth}
        className="inline-flex h-10 w-fit items-center gap-2 rounded-full border border-[#28241f] bg-white px-5 text-sm font-semibold text-[#28241f]"
      >
        <Smile size={18} strokeWidth={1.8} />
        <span>{likes}</span>
      </button>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex h-10 items-center gap-2 rounded-full! border border-[#28241f] bg-white px-6 text-sm font-semibold text-[#28241f] transition-colors hover:bg-[#eeece8]"
        >
          <Copy size={17} strokeWidth={1.8} />
          Copy link
        </button>

        {socialLinks.map(({ label, href, icon, bg }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${bg}`}
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
