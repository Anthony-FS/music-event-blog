import { Link } from 'react-router-dom'

import closeIcon from '../assets/icons/Close_round_light.svg'
import expandDownIcon from '../assets/icons/Expand_down_light.svg'
import searchIcon from '../assets/icons/Search_light.svg'

function ArticleManagementToolbar({
  categories,
  searchValue,
  onSearchChange,
  searchResults,
  selectedStatus,
  onStatusChange,
  selectedCategory,
  onCategoryChange,
  statusOptions,
}) {
  return (
    <div className="flex shrink-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <SearchField
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        searchResults={searchResults}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <FilterSelect
          label="Status"
          value={selectedStatus}
          options={statusOptions}
          onChange={onStatusChange}
        />
        <FilterSelect
          label="Category"
          value={selectedCategory}
          options={categories}
          onChange={onCategoryChange}
        />
      </div>
    </div>
  )
}

function SearchField({ searchValue, onSearchChange, searchResults = [] }) {
  const showResults = searchValue.trim().length > 0

  return (
    <label className="relative block w-full max-w-[360px]">
      <span className="sr-only">Search articles</span>
      <input
        type="search"
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search..."
        className="search-input h-11 w-full rounded-lg border border-[#dedbd6] bg-white pl-10 pr-16 text-sm font-medium text-[#28241f] outline-none placeholder:text-[#75716b] focus:border-[#28241f]"
      />
      <img
        src={searchIcon}
        alt=""
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
        aria-hidden="true"
      />
      {searchValue && (
        <button
          type="button"
          className="absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-[#f0eee9] focus:outline-none focus:ring-2 focus:ring-[#28241f]"
          aria-label="Clear search"
          onClick={() => onSearchChange('')}
        >
          <img src={closeIcon} alt="" className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      {showResults && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 rounded-lg border border-[#dedbd6] bg-white p-2 shadow-lg">
          {searchResults.length > 0 ? (
            searchResults.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="block rounded-lg px-4 py-3 text-sm font-semibold leading-snug text-[#28241f]! no-underline! transition-colors visited:text-[#28241f]! hover:bg-[#f6f5f2] hover:text-[#28241f]!"
              >
                {article.title}
              </Link>
            ))
          ) : (
            <p className="px-4 py-3 text-sm font-semibold text-[#75716b]">
              No articles found.
            </p>
          )}
        </div>
      )}
    </label>
  )
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="relative block min-w-[180px]">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-lg border border-[#dedbd6] bg-white px-4 pr-10 text-sm font-medium text-[#75716b] outline-none focus:border-[#28241f]"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img
        src={expandDownIcon}
        alt=""
        className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2"
        aria-hidden="true"
      />
    </label>
  )
}

export default ArticleManagementToolbar
