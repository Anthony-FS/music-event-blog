import api from '../lib/axios'

const MAX_AVATAR_SIZE = 2 * 1024 * 1024
const ALLOWED_AVATAR_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
])

export function validateAvatarImage(file) {
  if (!file) {
    throw new Error('Please select an image.')
  }

  if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
    throw new Error('Use a JPG, PNG, WebP, or GIF image.')
  }

  if (file.size > MAX_AVATAR_SIZE) {
    throw new Error('The avatar must be 2 MB or smaller.')
  }
}

export async function uploadAvatarImage(file) {
  validateAvatarImage(file)

  const formData = new FormData()
  formData.append('avatar', file)

  try {
    const { data } = await api.post('/avatars', formData)
    return data.avatarUrl
  } catch (error) {
    throw new Error(
      error.response?.data?.message ?? 'Unable to upload the avatar.',
      { cause: error },
    )
  }
}

export async function deleteAvatarImage(avatarUrl) {
  if (!avatarUrl || avatarUrl.startsWith('data:')) {
    return
  }

  try {
    await api.delete('/avatars', { data: { avatarUrl } })
  } catch (error) {
    throw new Error(
      error.response?.data?.message ?? 'Unable to delete the avatar.',
      { cause: error },
    )
  }
}
