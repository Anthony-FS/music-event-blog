import { DEFAULT_MEMBER_AVATAR_URL } from '../../lib/avatar'

function AuthorCard({ author, className = '' }) {
  const authorName =
    typeof author === 'string' ? author : (author?.name ?? 'Admin')
  const avatarUrl =
    typeof author === 'object' ? author?.avatarUrl : DEFAULT_MEMBER_AVATAR_URL
  const bio = typeof author === 'object' ? author?.bio : ''

  return (
    <aside
      className={`rounded-lg bg-[#f6f5f2] px-4 py-6 lg:sticky lg:top-24 ${className}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl || DEFAULT_MEMBER_AVATAR_URL}
          alt={authorName}
          className="aspect-square size-12 shrink-0 rounded-full! object-cover"
          loading="lazy"
        />
        <div className="flex flex-col mt-2.5 gap-0">
        <p className="text-xs font-semibold leading-none text-[#75716b]">Author</p>
        <p className="text-xl font-bold leading-none text-[#43403b]">
          {authorName}
        </p>
        </div>
      </div>

      <div className="mt-1 h-px w-full bg-[#dedbd6]" />

      {bio && (
        <p className="mt-3 whitespace-pre-line text-base font-semibold leading-6 text-[#75716b]">
          {bio}
        </p>
      )}
    </aside>
  )
}

export default AuthorCard
