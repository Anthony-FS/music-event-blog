import api from '../lib/axios'
import { DEFAULT_MEMBER_AVATAR_URL } from '../lib/avatar'

export async function getComments(articleId) {
  try {
    const { data } = await api.get(`/posts/${articleId}/comments`)
    return (data.comments ?? []).map(normalizeComment)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to load comments.'), {
      cause: error,
    })
  }
}

export async function createComment(articleId, message) {
  try {
    const { data } = await api.post(`/posts/${articleId}/comments`, {
      message: message.trim(),
    })
    return normalizeComment(data.comment)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to add the comment.'), {
      cause: error,
    })
  }
}

function normalizeComment(comment) {
  return {
    id: Number(comment.id),
    userId: comment.userId,
    name: comment.name ?? 'Member',
    avatar: comment.avatar || DEFAULT_MEMBER_AVATAR_URL,
    message: comment.message ?? '',
    createdAt: comment.createdAt,
  }
}

function getApiErrorMessage(error, fallback) {
  return error.response?.data?.message ?? fallback
}
