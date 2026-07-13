import closeIcon from '../assets/icons/Close_round_light.svg'
import searchIcon from '../assets/icons/Search_light.svg'

function CategoryManagementToolbar({ searchValue, onSearchChange }) {
  return (
    <div className="flex shrink-0">
      <label className="relative block w-full max-w-[360px]">
        <span className="sr-only">Search categories</span>
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
      </label>
    </div>
  )
}

export default CategoryManagementToolbar
