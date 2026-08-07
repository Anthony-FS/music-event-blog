import { supabase } from '../lib/supabase'

const BUCKET_NAME = 'article-images'
const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
])

export function validateArticleImage(file) {
  if (!file) {
    throw new Error('Please select an image.')
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error('Use a JPG, PNG, WebP, or GIF image.')
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('The image must be 5 MB or smaller.')
  }
}

export async function uploadArticleImage(file) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  validateArticleImage(file)

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('You must be logged in to upload an image.')
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const filePath = `${user.id}/${Date.now()}-${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, { contentType: file.type, upsert: false })

  if (error) {
    throw new Error(error.message)
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)
  return data.publicUrl
}

export async function deleteArticleImage(imageUrl) {
  if (!supabase) {
    return
  }

  const filePath = getManagedImagePath(imageUrl)

  if (!filePath) {
    return
  }

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath])

  if (error) {
    throw new Error(error.message)
  }
}

function getManagedImagePath(imageUrl) {
  if (!imageUrl) {
    return null
  }

  try {
    const url = new URL(imageUrl)
    const marker = `/storage/v1/object/public/${BUCKET_NAME}/`
    const markerIndex = url.pathname.indexOf(marker)

    if (markerIndex === -1) {
      return null
    }

    return decodeURIComponent(url.pathname.slice(markerIndex + marker.length))
  } catch {
    return null
  }
}
