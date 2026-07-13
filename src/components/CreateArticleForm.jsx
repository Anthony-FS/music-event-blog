import { useState } from 'react'
import { toast } from 'sonner'

import expandDownIcon from '../assets/icons/Expand_down_light.svg'
import imgBoxIcon from '../assets/icons/Img_box_light.svg'
import { categories } from '../data/blogPosts'

const initialFormValues = {
  category: '',
  authorName: 'Thompson P.',
  title: '',
  introduction: '',
  content: '',
}

const inputClassName =
  'h-11 w-full rounded-sm border border-[#dedbd6] bg-white px-4 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] focus:border-[#28241f]'

function CreateArticleForm({ onClose }) {
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [formValues, setFormValues] = useState(initialFormValues)

  const categoryOptions = categories.filter((category) => category !== 'All')

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

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setThumbnailUrl(String(reader.result))
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  function handleSave(status) {
    if (!formValues.title.trim()) {
      toast.error('Please enter an article title.')
      return
    }

    if (!formValues.category) {
      toast.error('Please select a category.')
      return
    }

    toast.success(
      status === 'published' ? 'Article published.' : 'Article saved as draft.',
    )
    onClose()
  }

  return (
    <section className="min-h-screen min-w-0 flex-1 bg-[#f9f9f9]">
      <header className="flex min-h-[88px] items-center justify-between gap-4 border-b border-[#dedbd6] px-8 py-5 sm:px-16">
        <h1 className="text-xl font-bold text-[#28241f]">Create article</h1>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            className="inline-flex! h-11 items-center justify-center rounded-full! border border-[#28241f] bg-white px-6 text-sm font-semibold text-[#28241f] transition-colors hover:bg-[#eeece8]"
          >
            Save as draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('published')}
            className="inline-flex! h-11 items-center justify-center rounded-full! bg-[#28241f] px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            Save and publish
          </button>
        </div>
      </header>

      <form
        className="px-8 py-10 sm:px-16"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex w-full max-w-3xl flex-col gap-8">
          <FormField label="Thumbnail image">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex aspect-5/3 w-full max-w-[360px] items-center justify-center overflow-hidden rounded-sm border border-dashed border-[#dedbd6] bg-[#f6f5f2]">
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
                name="category"
                value={formValues.category}
                onChange={handleInputChange}
                className={`${inputClassName} appearance-none pr-10`}
              >
                <option value="">Select category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
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
              value={formValues.authorName}
              onChange={handleInputChange}
              placeholder="Thompson P."
              className="h-11 w-full max-w-sm rounded-sm border border-transparent bg-[#f6f5f2] px-4 text-sm font-medium text-[#75716b] outline-none placeholder:text-[#75716b] focus:border-[#dedbd6]"
            />
          </FormField>

          <FormField label="Title">
            <input
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              placeholder="Article title"
              className={inputClassName}
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
              className="w-full resize-y rounded-sm border border-[#dedbd6] bg-white px-4 py-3 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] focus:border-[#28241f]"
            />
          </FormField>

          <FormField label="Content">
            <textarea
              name="content"
              value={formValues.content}
              onChange={handleInputChange}
              rows={14}
              placeholder="Content"
              className="min-h-[320px] w-full resize-y rounded-sm border border-[#dedbd6] bg-white px-4 py-3 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] focus:border-[#28241f]"
            />
          </FormField>
        </div>
      </form>
    </section>
  )
}

function FormField({ label, children }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-[#75716b]">{label}</p>
      {children}
    </div>
  )
}

export default CreateArticleForm
