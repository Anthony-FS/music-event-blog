import { useState } from 'react'

import './App.css'
import NavBar from './components/NavBar'

const categories = ['All', 'Highlight', 'Festival', 'Inspiration', 'General']

const author = {
  name: 'Anthony FS.',
  bio: 'Music Enjoyer',
}

const articles = [
  {
    title: 'Top Music Festivals to Experience This Year',
    category: 'Festival',
    introduction:
      'Explore standout music festivals, energetic crowds, and unforgettable stages worth adding to your calendar.',
    date: '11 September 2024',
    thumbnail:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'How to Prepare for Your First Outdoor Festival',
    category: 'Highlight',
    introduction:
      'A practical guide to packing smart, staying comfortable, and making the most of your first festival weekend.',
    date: '11 September 2024',
    thumbnail:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Finding Inspiration Through Live Music',
    category: 'Inspiration',
    introduction:
      'Live performances can spark creativity, connection, and fresh motivation long after the final song ends.',
    date: '11 September 2024',
    thumbnail:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Why Small Venues Still Create Big Memories',
    category: 'General',
    introduction:
      'Intimate shows offer close-up sound, shared energy, and personal moments that massive stages cannot replace.',
    date: '11 September 2024',
    thumbnail:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Simple Habits for Discovering New Artists',
    category: 'Inspiration',
    introduction:
      'Build a music discovery routine through playlists, opening acts, local lineups, and friend recommendations.',
    date: '11 September 2024',
    thumbnail:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'The Best Ways to Capture Festival Memories',
    category: 'Festival',
    introduction:
      'Balance photos, videos, journaling, and being present so your favorite music moments stay vivid.',
    date: '11 September 2024',
    thumbnail:
      'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=900&q=80',
  },
]


function App() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <ArticleSection />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 sm:py-20 lg:px-28 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_minmax(240px,360px)_1fr] lg:gap-14">
        <div className="mx-auto max-w-[320px] text-center md:mx-0 md:ml-auto md:justify-self-end">
          <h1 className="text-center text-[34px] font-bold leading-[1.08] text-[#28241f] sm:text-[40px] md:text-right lg:text-[44px]">
            Music
            <br className="hidden sm:block" />{' '}
            Festivals,
            <br /> All Around
          </h1>
          <p className="mt-6 text-center text-xs font-medium leading-[1.45] text-[#75716b] sm:text-[13px] md:text-right">
            Discover a World of Sound at Your Fingertips.
            <br className="hidden sm:block" />{' '}
            Your Daily Dose of Music Festivals and Events.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-lg sm:max-w-[380px] md:max-w-none">
          <img
            src="/images/myphoto.jpg"
            alt="Author portrait"
            className="aspect-4/5 h-full w-full object-cover"
            loading="eager"
          />
        </div>

        <div className="mx-auto max-w-[310px] text-center md:mx-0 md:text-left">
          <p className="text-[10px] font-medium leading-none text-[#75716b]">
            -Author
          </p>
          <h2 className="mt-2 text-xl font-bold leading-tight text-[#43403b]">
            Anthony FS.
          </h2>
          <p className="mt-3 text-[13px] font-medium leading-[1.45] text-[#75716b]">
            I am a fullstack developer in training who loves music. This blog is to share some past music events and future events to look forward to.
            
          </p>
          <p className="mt-5 text-[13px] font-medium leading-[1.45] text-[#75716b]">
            If you enjoy music then this is the place to be.
          </p>
        </div>
      </div>
    </section>
  )
}

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((article) => article.category === selectedCategory)

  return (
    <section className="w-full px-5 pb-16 sm:px-8 sm:pb-20 lg:px-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-base font-bold text-[#28241f]">Latest articles</h2>
        <ArticleToolbar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/articles"
            className="text-sm font-semibold text-[#28241f] underline underline-offset-4 transition-colors hover:text-[#12b379]"
          >
            View more
          </a>
        </div>
      </div>
    </section>
  )
}

function ArticleToolbar({ selectedCategory, onCategorySelect }) {
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-sm bg-[#f6f5f2] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isSelected = category === selectedCategory

          return (
          <button
            key={category}
            type="button"
            onClick={() => onCategorySelect(category)}
            aria-pressed={isSelected}
            className={`rounded-sm px-5 py-3 text-xs font-medium transition-colors ${
              isSelected
                ? 'bg-[#e5e2dc] text-[#28241f]'
                : 'text-[#75716b] hover:bg-[#ebe8e2] hover:text-[#28241f]'
            }`}
          >
            {category}
          </button>
          )
        })}
      </div>

      <label className="relative block w-full sm:max-w-[340px]">
        <span className="sr-only">Search articles</span>
        <input
          type="search"
          placeholder="Search"
          className="h-10 w-full rounded-sm border border-[#dedbd6] bg-white px-4 pr-10 text-xs font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#9a958e] focus:border-[#28241f]"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9a958e]">
          &#9906;
        </span>
      </label>
    </div>
  )
}

function ArticleCard({ article }) {
  return (
    <article className="overflow-hidden">
      <img
        src={article.thumbnail}
        alt=""
        className="aspect-16/10 w-full rounded-lg object-cover"
        loading="lazy"
      />
      <div className="mt-4">
        <span className="inline-flex rounded-full bg-[#d9f8ec] px-3 py-1 text-[11px] font-semibold text-[#12b379]">
          {article.category}
        </span>
        <h3 className="mt-3 text-lg font-bold leading-snug text-[#28241f]">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-[#75716b]">
          {article.introduction}
        </p>
        <ArticleMeta date={article.date} />
      </div>
    </article>
  )
}

function ArticleMeta({ date }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#75716b]">
      <img
        src="/images/myphoto.jpg"
        alt=""
        className="h-5 w-5 rounded-full object-cover"
        loading="lazy"
      />
      <span className="font-semibold text-[#43403b]">{author.name}</span>
      <span aria-hidden="true">|</span>
      <span>{author.bio}</span>
      <span aria-hidden="true">|</span>
      <time dateTime="2024-09-11">{date}</time>
    </div>
  )
}



export default App
