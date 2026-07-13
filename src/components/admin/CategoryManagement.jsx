import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import addIcon from '../../assets/icons/Add_round_light.svg'
import editIcon from '../../assets/icons/Edit_light.svg'
import trashIcon from '../../assets/icons/Trash_light.svg'
import api from '../../lib/axios'
import { adminPrimaryButtonClassName } from '../../lib/adminPageStyles'
import CategoryManagementToolbar from './CategoryManagementToolbar'
import CreateCategoryForm from './CreateCategoryForm'
import ConfirmDialog from '../shared/ConfirmDialog'
import {
  AdminListPanel,
  AdminPageContent,
  AdminPageHeader,
  AdminPageShell,
} from '../shared/AdminPageShell'

function CategoryManagement() {
  const [view, setView] = useState('list')
  const [editingCategory, setEditingCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingCategory, setDeletingCategory] = useState(null)

  useEffect(() => {
    if (view !== 'list') {
      return
    }

    async function fetchCategories() {
      try {
        setIsLoading(true)
        setError(null)

        const { data } = await api.get('/posts')
        const serverCategories = Array.from(
          new Set(
            (data.posts ?? [])
              .map((article) => article.category)
              .filter(Boolean),
          ),
        )

        setCategories(serverCategories)
      } catch {
        setError('Failed to load categories. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [view])

  const normalizedSearchValue = searchValue.trim().toLowerCase()
  const filteredCategories = normalizedSearchValue
    ? categories.filter((category) =>
        category.toLowerCase().includes(normalizedSearchValue),
      )
    : categories

  function handleConfirmDelete() {
    setCategories((currentCategories) =>
      currentCategories.filter((category) => category !== deletingCategory),
    )
    setDeletingCategory(null)
    toast.success('Category deleted.')
  }

  function handleSaveCategory(categoryName) {
    setCategories((currentCategories) => [...currentCategories, categoryName])
    setView('list')
    toast.success('Category created.')
  }

  function handleEditCategory(category) {
    setEditingCategory(category)
    setView('edit')
  }

  function handleUpdateCategory(newCategoryName) {
    setCategories((currentCategories) =>
      currentCategories.map((category) =>
        category === editingCategory ? newCategoryName : category,
      ),
    )
    setEditingCategory(null)
    setView('list')
    toast.success('Category updated.')
  }

  if (view === 'create') {
    return (
      <CreateCategoryForm
        existingCategories={categories}
        onSave={handleSaveCategory}
      />
    )
  }

  if (view === 'edit') {
    return (
      <CreateCategoryForm
        initialCategoryName={editingCategory}
        existingCategories={categories}
        onSave={handleUpdateCategory}
      />
    )
  }

  return (
    <AdminPageShell>
      <AdminPageHeader
        title="Category management"
        actions={
          <button
            type="button"
            onClick={() => setView('create')}
            className={`${adminPrimaryButtonClassName} gap-2`}
          >
            <img src={addIcon} alt="" className="h-4 w-4 invert" aria-hidden="true" />
            Create category
          </button>
        }
      />

      <AdminPageContent>
        <CategoryManagementToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
        <div className="mt-6 flex min-h-0 flex-1 flex-col">
          <CategoryManagementTable
            categories={filteredCategories}
            isLoading={isLoading}
            error={error}
            onEditCategory={handleEditCategory}
            onDeleteCategory={setDeletingCategory}
          />
        </div>
      </AdminPageContent>

      <ConfirmDialog
        open={deletingCategory != null}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingCategory(null)
          }
        }}
        onConfirm={handleConfirmDelete}
        title="Delete category"
        description="Do you want to delete this category?"
        confirmLabel="Delete"
      />
    </AdminPageShell>
  )
}

function CategoryManagementTable({
  categories,
  isLoading,
  error,
  onEditCategory,
  onDeleteCategory,
}) {
  return (
    <AdminListPanel
      isLoading={isLoading}
      error={error}
      isEmpty={categories.length === 0}
      loadingMessage="Loading categories..."
      emptyMessage="No categories found."
    >
      <div className="sticky top-0 z-10 hidden grid-cols-[minmax(0,1fr)_96px] gap-4 border-b border-[#dedbd6] bg-white px-6 py-4 text-sm font-semibold text-[#75716b] md:grid">
        <span>Category</span>
        <span className="sr-only">Actions</span>
      </div>

      {categories.map((category, index) => (
        <div
          key={category}
          className={`grid gap-4 px-6 py-5 text-sm font-medium text-[#28241f] md:grid-cols-[minmax(0,1fr)_96px] md:items-center ${
            index % 2 === 1 ? 'bg-[#f5f5f5]' : 'bg-white'
          }`}
        >
          <p className="truncate">{category}</p>
          <div className="flex items-center gap-4 md:justify-end">
            <button
              type="button"
              aria-label={`Edit ${category}`}
              onClick={() => onEditCategory(category)}
            >
              <img src={editIcon} alt="" className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Delete ${category}`}
              onClick={() => onDeleteCategory(category)}
            >
              <img src={trashIcon} alt="" className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ))}
    </AdminListPanel>
  )
}

export default CategoryManagement
