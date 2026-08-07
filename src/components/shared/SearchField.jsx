import { Link } from 'react-router-dom'

import closeIcon from '../../assets/icons/Close_round_light.svg'
import searchIcon from '../../assets/icons/Search_light.svg'
import { cn } from '../../lib/utils'
import { Input } from '../ui/input'

const variantConfig = {
  public: {
    wrapperClassName: 'relative block w-full sm:max-w-[340px]',
    inputClassName:
      'search-input h-10 w-full rounded-sm border border-[#dedbd6] bg-white px-4 pr-16 text-xs font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#9a958e] focus:border-[#28241f] max-sm:h-16! max-sm:rounded-lg max-sm:text-xl max-sm:font-semibold',
    searchIconClassName:
      'pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-60 max-sm:right-5 max-sm:h-6 max-sm:w-6',
    clearButtonClassName:
      'absolute right-9 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-[#f0eee9] focus:outline-none focus:ring-2 focus:ring-[#28241f]',
    closeIconClassName: 'h-5 w-5',
    resultLinkClassName:
      'block rounded-lg px-4 py-3 text-sm font-semibold leading-snug text-[#28241f]! no-underline! transition-colors visited:text-[#28241f]! hover:bg-[#f6f5f2] hover:text-[#28241f]! sm:text-lg',
    useUiInput: true,
    defaultPlaceholder: 'Search',
  },
  admin: {
    wrapperClassName: 'relative block w-full max-w-[360px]',
    inputClassName:
      'search-input h-11 w-full rounded-lg border border-[#dedbd6] bg-white pl-10 pr-16 text-sm font-medium text-[#28241f] outline-none placeholder:text-[#75716b] focus:border-[#28241f]',
    searchIconClassName:
      'pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60',
    clearButtonClassName:
      'absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-[#f0eee9] focus:outline-none focus:ring-2 focus:ring-[#28241f]',
    closeIconClassName: 'h-4 w-4',
    resultLinkClassName:
      'block rounded-lg px-4 py-3 text-sm font-semibold leading-snug text-[#28241f]! no-underline! transition-colors visited:text-[#28241f]! hover:bg-[#f6f5f2] hover:text-[#28241f]!',
    useUiInput: false,
    defaultPlaceholder: 'Search...',
  },
}

function SearchField({
  searchValue,
  onSearchChange,
  searchResults,
  variant = 'admin',
  label = 'Search',
  placeholder,
  emptyMessage = 'No articles found.',
  className,
  getResultHref = (result) => `/article/${result.id}`,
  getResultLabel = (result) => result.title,
}) {
  const config = variantConfig[variant]
  const showSuggestions = searchResults != null && searchValue.trim().length > 0

  function handleChange(event) {
    onSearchChange(event.target.value)
  }

  return (
    <label className={cn(config.wrapperClassName, className)}>
      <span className="sr-only">{label}</span>
      {config.useUiInput ? (
        <Input
          type="search"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder ?? config.defaultPlaceholder}
          className={config.inputClassName}
        />
      ) : (
        <input
          type="search"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder ?? config.defaultPlaceholder}
          className={config.inputClassName}
        />
      )}

      <img
        src={searchIcon}
        alt=""
        className={config.searchIconClassName}
        aria-hidden="true"
      />

      {searchValue && (
        <button
          type="button"
          className={config.clearButtonClassName}
          aria-label="Clear search"
          onClick={() => onSearchChange('')}
        >
          <img
            src={closeIcon}
            alt=""
            className={config.closeIconClassName}
            aria-hidden="true"
          />
        </button>
      )}

      {showSuggestions && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 rounded-lg border border-[#dedbd6] bg-white p-2 shadow-lg">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <Link
                key={result.id}
                to={getResultHref(result)}
                className={config.resultLinkClassName}
              >
                {getResultLabel(result)}
              </Link>
            ))
          ) : (
            <p className="px-4 py-3 text-sm font-semibold text-[#75716b]">
              {emptyMessage}
            </p>
          )}
        </div>
      )}
    </label>
  )
}

export default SearchField
