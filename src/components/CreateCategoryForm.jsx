import { useState } from 'react'
import { toast } from 'sonner'

const inputClassName =
  'h-11 w-full max-w-sm rounded-sm border border-[#dedbd6] bg-white px-4 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] focus:border-[#28241f]'

function CreateCategoryForm({
  onSave,
  existingCategories = [],
  initialCategoryName = null,
}) {
  const isEditMode = initialCategoryName != null
  const [categoryName, setCategoryName] = useState(initialCategoryName ?? '')

  function handleSave() {
    const trimmedName = categoryName.trim()

    if (!trimmedName) {
      toast.error('Please enter a category name.')
      return
    }

    const isDuplicate = existingCategories.some((category) => {
      if (
        isEditMode &&
        category.toLowerCase() === initialCategoryName.toLowerCase()
      ) {
        return false
      }

      return category.toLowerCase() === trimmedName.toLowerCase()
    })

    if (isDuplicate) {
      toast.error('This category already exists.')
      return
    }

    onSave(trimmedName)
  }

  return (
    <section className="min-h-screen min-w-0 flex-1 bg-[#f9f9f9]">
      <header className="flex min-h-[88px] items-center justify-between gap-4 border-b border-[#dedbd6] px-8 py-5 sm:px-16">
        <h1 className="text-xl font-bold text-[#28241f]">
          {isEditMode ? 'Edit category' : 'Create category'}
        </h1>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex! h-11 items-center justify-center rounded-full! bg-[#28241f] px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Save
        </button>
      </header>

      <form
        className="px-8 py-10 sm:px-16"
        onSubmit={(event) => {
          event.preventDefault()
          handleSave()
        }}
      >
        <label className="block w-full max-w-3xl">
          <span className="mb-2 block text-sm font-medium text-[#75716b]">
            Category name
          </span>
          <input
            type="text"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            placeholder="Category name"
            className={inputClassName}
          />
        </label>
      </form>
    </section>
  )
}

export default CreateCategoryForm
