const comments = [
  {
    name: 'Jacob Lash',
    date: '12 September 2024 at 18:30',
    avatar: '/images/myphoto.jpg',
    message:
      'I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.',
  },
  {
    name: 'Ahri',
    date: '12 September 2024 at 18:30',
    avatar: '/images/myphoto.jpg',
    message:
      "Such a great read! I've always wondered why my cat slow blinks at me-now I know it's her way of showing trust!",
  },
  {
    name: 'Mimi mama',
    date: '12 September 2024 at 18:30',
    avatar: '/images/myphoto.jpg',
    message:
      'This article perfectly captures why cats make such amazing pets. I had no idea their purring could help with healing. Fascinating stuff!',
  },
]

function CommentSection() {
  return (
    <section className="mt-12 w-full">
      <label className="block w-full">
        <span className="text-sm font-semibold text-[#75716b]">Comment</span>
        <textarea
          rows={4}
          placeholder="What are your thoughts?"
          className="mt-2 block min-h-[112px] w-full resize-y rounded-lg border border-[#dedbd6] bg-white px-4 py-3 text-sm font-medium text-[#28241f] outline-none placeholder:text-[#75716b] focus:border-[#28241f]"
        />
      </label>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          className="h-10 rounded-full bg-[#28241f] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#3a342e]"
        >
          Send
        </button>
      </div>

      <div className="mt-10 space-y-8">
        {comments.map((comment, index) => (
          <article
            key={comment.name}
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
                  {comment.date}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm font-medium leading-6 text-[#75716b]">
              {comment.message}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CommentSection
