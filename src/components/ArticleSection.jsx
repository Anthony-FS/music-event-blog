import { useState } from 'react'
import closeIcon from '../assets/icons/Close_round_light.svg'
import searchIcon from '../assets/icons/Search_light.svg'
import { articles, author, categories } from '../data/blogPosts'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [searchValue, setSearchValue] = useState('')
  const searchQuery = searchValue.trim().toLowerCase()
  const categoryFilteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((article) => article.category === selectedCategory)
  const filteredArticles = categoryFilteredArticles.filter((article) => {
    if (!searchQuery) {
      return true
    }

    const searchableText = [
      article.title,
      article.category,
      article.introduction,
      author.name,
      author.bio,
    ]
      .join(' ')
      .toLowerCase()

    return searchableText.includes(searchQuery)
  })

  return (
    <section className="w-full px-5 pb-16 sm:px-8 sm:pb-20 lg:px-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-base font-bold text-[#28241f]">Latest articles</h2>
        <ArticleToolbar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {filteredArticles.length > 0 ? (
          <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.title} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-lg bg-[#f6f5f2] px-5 py-8 text-center text-sm font-semibold text-[#75716b]">
            No articles found.
          </p>
        )}

        <div className="mt-12 text-center">
          <a
            href="/articles"
            className="text-sm font-semibold !text-black visited:!text-black underline underline-offset-4 transition-colors hover:!text-black"
          >
            View more
          </a>
        </div>
      </div>
    </section>
  )
}

function ArticleToolbar({
  selectedCategory,
  onCategorySelect,
  searchValue,
  onSearchChange,
}) {
  return (
    <div className="mt-6 rounded-sm bg-[#f6f5f2] p-4">
      <div className="flex flex-col gap-5 sm:hidden">
        <SearchField searchValue={searchValue} onSearchChange={onSearchChange} />

        <label className="block">
          <span className="mb-2 block text-xl font-semibold text-[#75716b]">
            Category
          </span>
          <Select value={selectedCategory} onValueChange={onCategorySelect}>
            <SelectTrigger className="h-[60px] w-full rounded-lg border-[#dedbd6] bg-white px-5 text-xl font-semibold text-[#75716b] shadow-none focus-visible:border-[#28241f] focus-visible:ring-0 [&_svg]:size-6 [&_svg]:text-[#28241f]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="z-[60] rounded-lg border-[#dedbd6] bg-white text-[#28241f]">
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="py-3 text-base focus:bg-[#f6f5f2]"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </label>
      </div>

      <div className="hidden gap-4 sm:flex sm:items-center sm:justify-between">
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

        <SearchField searchValue={searchValue} onSearchChange={onSearchChange} />
      </div>
    </div>
  )
}

function SearchField({ searchValue, onSearchChange }) {
  return (
    <label className="relative block w-full sm:max-w-[340px]">
      <span className="sr-only">Search articles</span>
      <Input
        type="search"
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search"
        className="search-input h-10 w-full rounded-sm border border-[#dedbd6] bg-white px-4 pr-16 text-xs font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#9a958e] focus:border-[#28241f] max-sm:h-[60px] max-sm:rounded-lg max-sm:text-xl max-sm:font-semibold"
      />
      {searchValue && (
        <button
          type="button"
          className="absolute right-9 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-[#f0eee9] focus:outline-none focus:ring-2 focus:ring-[#28241f]"
          aria-label="Clear search"
          onClick={() => onSearchChange('')}
        >
          <img src={closeIcon} alt="" className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      <img
        src={searchIcon}
        alt=""
        className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-60 max-sm:right-5 max-sm:h-6 max-sm:w-6"
        aria-hidden="true"
      />
    </label>
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

export default ArticleSection
