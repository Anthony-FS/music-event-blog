import SearchField from '../shared/SearchField'

function CategoryManagementToolbar({ searchValue, onSearchChange }) {
  return (
    <div className="flex shrink-0">
      <SearchField
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        label="Search categories"
      />
    </div>
  )
}

export default CategoryManagementToolbar
