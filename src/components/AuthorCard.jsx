function AuthorCard({ author }) {
  return (
    <aside className="rounded-lg bg-[#f6f5f2] px-5 py-5 lg:sticky lg:top-24">
      <div className="flex items-center gap-3">
        <img
          src="/images/myphoto.jpg"
          alt=""
          className="h-10 w-10 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <p className="text-[10px] font-medium text-[#75716b]">Author</p>
          <p className="text-sm font-bold text-[#28241f]">{author}</p>
        </div>
      </div>

      <p className="mt-5 text-xs font-medium leading-5 text-[#57524c]">
        I am a fullstack developer in training who loves music. This blog is to
        share some past music events and future events to look forward to.
      </p>

      <p className="mt-5 text-xs font-medium leading-5 text-[#57524c]">
        If you enjoy music then this is the place to be.
      </p>
    </aside>
  )
}

export default AuthorCard
