import { categories } from '../data/blogPosts'

function CategoryManagement() {
  const visibleCategories = categories.filter((category) => category !== 'All')

  return (
    <section className="min-h-screen min-w-0 bg-[#f9f9f9]">
      <header className="flex min-h-[88px] items-center border-b border-[#dedbd6] px-6 py-5 sm:px-10">
        <h1 className="text-xl font-bold text-[#28241f]">Category management</h1>
      </header>

      <div className="px-6 py-8 sm:px-10">
        <div className="overflow-hidden rounded-lg border border-[#dedbd6] bg-white">
          <div className="grid grid-cols-[minmax(0,1fr)_120px] gap-4 border-b border-[#dedbd6] px-6 py-4 text-sm font-semibold text-[#75716b]">
            <span>Category name</span>
            <span>Status</span>
          </div>

          {visibleCategories.map((category, index) => (
            <div
              key={category}
              className={`grid grid-cols-[minmax(0,1fr)_120px] gap-4 px-6 py-5 text-sm font-medium text-[#28241f] ${
                index % 2 === 1 ? 'bg-[#f5f5f5]' : 'bg-white'
              }`}
            >
              <span>{category}</span>
              <span className="font-semibold text-[#12b379]">• Active</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryManagement
