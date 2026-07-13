import SearchField from '../shared/SearchField'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

function ArticleToolbar({
  categories,
  selectedCategory,
  onCategorySelect,
  searchValue,
  onSearchChange,
  searchResults,
}) {
  return (
    <div className="mt-6 rounded-lg bg-[#f6f5f2] p-4 max-sm:relative max-sm:left-1/2 max-sm:w-screen max-sm:-translate-x-1/2 max-sm:rounded-none max-sm:p-1">
      <div className="flex flex-col gap-4 sm:hidden">
        <SearchField
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchResults={searchResults}
          variant="public"
          label="Search articles"
        />

        <label className="block">
          <span className="mb-2 block text-xl font-semibold text-[#75716b]">
            Category
          </span>
          <Select value={selectedCategory} onValueChange={onCategorySelect}>
            <SelectTrigger className="h-16! w-full overflow-hidden rounded-lg! border-[#dedbd6] bg-white px-6 text-xl font-semibold text-[#9a958e] shadow-none focus-visible:border-[#28241f] focus-visible:ring-0 [&_svg]:mr-1 [&_svg]:size-5 [&_svg]:text-[#28241f] [&_svg]:opacity-60">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="z-60 rounded-lg border-[#dedbd6] bg-white text-[#28241f]">
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
                className={`rounded-lg! px-6 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#e5e2dc] text-[#28241f] '
                    : 'text-[#75716b] hover:bg-[#ebe8e2] hover:text-[#28241f]'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        <SearchField
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchResults={searchResults}
          variant="public"
          label="Search articles"
        />
      </div>
    </div>
  )
}

export default ArticleToolbar
