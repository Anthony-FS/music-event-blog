import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import expandDownIcon from '../../assets/icons/Expand_down_light.svg'
import imgBoxIcon from '../../assets/icons/Img_box_light.svg'
import trashIcon from '../../assets/icons/Trash_light.svg'
import {
  createArticle,
  deleteArticle,
  getArticle,
  updateArticle,
} from '../../services/articleService'
import {
  deleteArticleImage,
  uploadArticleImage,
  validateArticleImage,
} from '../../services/articleImageService'
import ConfirmDialog from '../shared/ConfirmDialog'
import FormField from '../shared/FormField'
import {
  AdminPageContent,
  AdminPageHeader,
  AdminPageShell,
} from '../shared/AdminPageShell'
import {
  adminInputWideClassName,
  adminReadonlyInputClassName,
  adminTextareaClassName,
} from '../../lib/formStyles'
import {
  adminPrimaryButtonClassName,
  adminSecondaryButtonClassName,
} from '../../lib/adminPageStyles'
import useMember from '../../hooks/useMember'

const initialFormValues = {
  categoryId: '',
  authorName: '',
  title: '',
  introduction: '',
  content: '',
}

function CreateArticleForm({ onClose, articleId = null, categories = [] }) {
  const isEditMode = articleId != null
  const { member } = useMember()
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [originalThumbnailUrl, setOriginalThumbnailUrl] = useState('')
  const [pendingImageFile, setPendingImageFile] = useState(null)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [isLoadingArticle, setIsLoadingArticle] = useState(isEditMode)
  const [loadError, setLoadError] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const categoryOptions = buildCategoryOptions(categories)

  useEffect(() => {
    if (!isEditMode) {
      return
    }

    async function fetchArticle() {
      try {
        setIsLoadingArticle(true)
        setLoadError(null)

        const article = await getArticle(articleId)

        setThumbnailUrl(article.image ?? '')
        setOriginalThumbnailUrl(article.image ?? '')
        setFormValues({
          categoryId: article.categoryId ? String(article.categoryId) : '',
          authorName: article.author ?? '',
          title: article.title ?? '',
          introduction: article.description ?? '',
          content: article.content ?? '',
        })
      } catch (error) {
        setLoadError(error.message)
      } finally {
        setIsLoadingArticle(false)
      }
    }

    fetchArticle()
  }, [articleId, isEditMode])

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  function handleThumbnailChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      validateArticleImage(file)
    } catch (error) {
      toast.error(error.message)
      return
    }

    setPendingImageFile(file)
    const reader = new FileReader()

    reader.onload = () => {
      setThumbnailUrl(String(reader.result))
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  async function handleSave(status) {
    if (isSaving) {
      return
    }

    if (!formValues.title.trim()) {
      toast.error('Please enter an article title.')
      return
    }

    if (!formValues.categoryId) {
      toast.error('Please select a category.')
      return
    }

    if (!pendingImageFile && !thumbnailUrl) {
      toast.error('Please upload a thumbnail image.')
      return
    }

    let uploadedImageUrl = null

    try {
      setIsSaving(true)
      uploadedImageUrl = pendingImageFile
        ? await uploadArticleImage(pendingImageFile)
        : null

      const articlePayload = {
        title: formValues.title.trim(),
        image: uploadedImageUrl ?? thumbnailUrl,
        categoryId: Number(formValues.categoryId),
        description: formValues.introduction.trim(),
        content: formValues.content.trim(),
        status,
      }

      if (isEditMode) {
        await updateArticle(articleId, articlePayload)
      } else {
        await createArticle(articlePayload)
      }

      if (
        uploadedImageUrl &&
        originalThumbnailUrl &&
        originalThumbnailUrl !== uploadedImageUrl
      ) {
        await deleteArticleImage(originalThumbnailUrl).catch(() => {})
      }

      toast.success(
        status === 'published'
          ? 'Article published.'
          : 'Article saved as draft.',
      )
      onClose()
    } catch (error) {
      if (uploadedImageUrl) {
        await deleteArticleImage(uploadedImageUrl).catch(() => {})
      }
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleConfirmDelete() {
    if (isDeleting) {
      return
    }

    try {
      setIsDeleting(true)
      await deleteArticle(articleId)
      await deleteArticleImage(originalThumbnailUrl).catch(() => {})
      setIsDeleteDialogOpen(false)
      toast.success('Article deleted.')
      onClose()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoadingArticle) {
    return (
      <AdminPageShell variant="form">
        <AdminPageHeader variant="form" title="Edit article" />
        <AdminPageContent variant="form">
          <p className="text-sm font-semibold text-[#75716b]">Loading article...</p>
        </AdminPageContent>
      </AdminPageShell>
    )
  }

  if (loadError) {
    return (
      <AdminPageShell variant="form">
        <AdminPageHeader
          variant="form"
          title="Edit article"
          actions={
            <button
              type="button"
              onClick={onClose}
              className={adminSecondaryButtonClassName}
            >
              Back to list
            </button>
          }
        />
        <AdminPageContent variant="form">
          <p className="text-sm font-semibold text-[#75716b]">{loadError}</p>
        </AdminPageContent>
      </AdminPageShell>
    )
  }

  return (
    <AdminPageShell variant="form">
      <AdminPageHeader
        variant="form"
        title={isEditMode ? 'Edit article' : 'Create article'}
        actions={
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => handleSave('draft')}
              disabled={isSaving}
              className={adminSecondaryButtonClassName}
            >
              {isSaving ? 'Saving...' : 'Save as draft'}
            </button>
            <button
              type="button"
              onClick={() => handleSave('published')}
              disabled={isSaving}
              className={adminPrimaryButtonClassName}
            >
              {isSaving ? 'Saving...' : isEditMode ? 'Save' : 'Save and publish'}
            </button>
          </div>
        }
      />

      <AdminPageContent variant="form">
        <form onSubmit={(event) => event.preventDefault()}>
        <div className="flex w-full max-w-3xl flex-col gap-8">
          <FormField label="Thumbnail image">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex aspect-5/3 w-full max-w-90 items-center justify-center overflow-hidden rounded-sm border border-dashed border-[#dedbd6] bg-[#f6f5f2]">
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={imgBoxIcon}
                    alt=""
                    className="h-10 w-10 opacity-40"
                    aria-hidden="true"
                  />
                )}
              </div>

              <label className="inline-flex! h-10 shrink-0 cursor-pointer items-center justify-center rounded-full! border border-[#28241f] bg-white px-6 text-sm font-semibold leading-none text-[#28241f] transition-colors hover:bg-[#eeece8]">
                Upload thumbnail image
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleThumbnailChange}
                />
              </label>
            </div>
          </FormField>

          <FormField label="Category">
            <div className="relative w-full max-w-sm">
              <select
                name="categoryId"
                value={formValues.categoryId}
                onChange={handleInputChange}
                className={`${adminInputWideClassName} appearance-none pr-10 max-w-sm`}
              >
                <option value="">Select category</option>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <img
                src={expandDownIcon}
                alt=""
                className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>
          </FormField>

          <FormField label="Author name">
            <input
              name="authorName"
              value={
                isEditMode
                  ? formValues.authorName
                  : (member?.name ?? member?.username ?? '')
              }
              readOnly
              placeholder="Current administrator"
              className={adminReadonlyInputClassName}
            />
          </FormField>

          <FormField label="Title">
            <input
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              placeholder="Article title"
              className={adminInputWideClassName}
            />
          </FormField>

          <FormField label="Introduction (max 120 letters)">
            <textarea
              name="introduction"
              value={formValues.introduction}
              onChange={handleInputChange}
              maxLength={120}
              rows={5}
              placeholder="Introduction"
              className={adminTextareaClassName}
            />
          </FormField>

          <FormField label="Content">
            <textarea
              name="content"
              value={formValues.content}
              onChange={handleInputChange}
              rows={14}
              placeholder="Content"
              className={`${adminTextareaClassName} min-h-80`}
            />
          </FormField>

          {isEditMode && (
            <div className="border-t border-[#dedbd6] pt-8">
              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="inline-flex! items-center gap-2 text-sm font-semibold text-[#28241f] transition-colors hover:text-black"
              >
                <img src={trashIcon} alt="" className="h-4 w-4" aria-hidden="true" />
                Delete article
              </button>
            </div>
          )}
        </div>
        </form>
      </AdminPageContent>

      {isEditMode && (
        <ConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          title="Delete article"
          description="Do you want to delete this article?"
          confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
        />
      )}
    </AdminPageShell>
  )
}

function buildCategoryOptions(categories) {
  return categories.filter(
    (category) => category?.id != null && category?.name?.trim(),
  )
}

export default CreateArticleForm
