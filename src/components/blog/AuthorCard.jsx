function AuthorCard({ author, className = '' }) {
  return (
    <aside
      className={`rounded-lg bg-[#f6f5f2] px-4 py-6 lg:sticky lg:top-24 ${className}`}
    >
      <div className="flex items-center gap-3">
        <img
          src="/images/myphoto.jpg"
          alt=""
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />
        <div className="flex flex-col mt-2.5 gap-0">
        <p className="text-xs font-semibold leading-none text-[#75716b]">Author</p>
        <p className="text-xl font-bold leading-none text-[#43403b]">{author}</p>
        </div>
      </div>

      <div className="mt-1 h-px w-full bg-[#dedbd6]" />

      <p className="mt-3 text-base font-semibold leading-6 text-[#75716b]">
        I am a fullstack developer in training who loves music. This blog is to
        share some past music events and future events to look forward to.
      </p>

      <p className="mt-3 text-base font-semibold leading-6 text-[#75716b]">
        If you enjoy music then this is the place to be.
      </p>
    </aside>
  )
}

export default AuthorCard
