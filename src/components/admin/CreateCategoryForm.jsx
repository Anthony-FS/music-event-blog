import { useState } from 'react'
import { toast } from 'sonner'

import FormField from '../shared/FormField'
import { adminInputClassName } from '../../lib/formStyles'
import { adminPrimaryButtonClassName } from '../../lib/adminPageStyles'
import {
  AdminPageContent,
  AdminPageHeader,
  AdminPageShell,
} from '../shared/AdminPageShell'

function CreateCategoryForm({
  onSave,
  existingCategories = [],
  initialCategoryName = null,
}) {
  const isEditMode = initialCategoryName != null
  const [categoryName, setCategoryName] = useState(initialCategoryName ?? '')
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave() {
    const trimmedName = categoryName.trim()

    if (!trimmedName) {
      toast.error('Please enter a category name.')
      return
    }

    const isDuplicate = existingCategories.some((category) => {
      const existingName =
        typeof category === 'object' ? category.name : category

      if (
        isEditMode &&
        existingName.toLowerCase() === initialCategoryName.toLowerCase()
      ) {
        return false
      }

      return existingName.toLowerCase() === trimmedName.toLowerCase()
    })

    if (isDuplicate) {
      toast.error('This category already exists.')
      return
    }

    try {
      setIsSaving(true)
      await onSave(trimmedName)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminPageShell variant="form">
      <AdminPageHeader
        variant="form"
        title={isEditMode ? 'Edit category' : 'Create category'}
        actions={
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={adminPrimaryButtonClassName}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        }
      />

      <AdminPageContent variant="form">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleSave()
          }}
        >
          <FormField label="Category name">
            <input
              type="text"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="Category name"
              className={adminInputClassName}
            />
          </FormField>
        </form>
      </AdminPageContent>
    </AdminPageShell>
  )
}

export default CreateCategoryForm
