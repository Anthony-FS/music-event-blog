import expandDownIcon from '../../assets/icons/Expand_down_light.svg'
import SearchField from '../shared/SearchField'

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
        label="Search articles"
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
          <option
            key={typeof option === 'object' ? option.id : option}
            value={typeof option === 'object' ? option.id : option}
          >
            {typeof option === 'object' ? option.name : option}
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
