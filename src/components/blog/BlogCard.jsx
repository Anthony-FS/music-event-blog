import { Link } from 'react-router-dom'

import { DEFAULT_MEMBER_AVATAR_URL } from '../../lib/avatar'

function BlogCard({
  id,
  title,
  category,
  description,
  date,
  image,
  authorName,
  authorAvatar,
  authorBio,
}) {
  return (
    <Link
      to={`/article/${id}`}
      className="block overflow-hidden text-[#28241f]! no-underline! visited:text-[#28241f]!"
    >
      <article>
        <img
          src={image}
          alt=""
          className="aspect-16/10 w-full rounded-lg object-cover"
          loading="lazy"
        />
        <div className="mt-4">
          <span className="inline-flex rounded-full bg-[#d9f8ec] px-3 py-1 text-[11px] font-semibold text-[#12b379]">
            {category}
          </span>
          <h3 className="mt-3 text-lg font-bold leading-snug text-[#28241f]! no-underline!">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-[#75716b]! no-underline!">
            {description}
          </p>
          <BlogMeta
            date={date}
            authorName={authorName}
            authorAvatar={authorAvatar}
            authorBio={authorBio}
          />
        </div>
      </article>
    </Link>
  )
}

function BlogMeta({ date, authorName, authorAvatar, authorBio }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#75716b]">
      <img
        src={authorAvatar || DEFAULT_MEMBER_AVATAR_URL}
        alt={authorName}
        className="h-5 w-5 rounded-full object-cover"
        loading="lazy"
      />
      <span className="font-semibold text-[#43403b]">{authorName}</span>
      {authorBio && (
        <>
          <span aria-hidden="true">|</span>
          <span>{authorBio}</span>
        </>
      )}
      <span aria-hidden="true">|</span>
      <time dateTime="2024-09-11">{date}</time>
    </div>
  )
}

export default BlogCard
