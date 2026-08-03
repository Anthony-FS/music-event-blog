import api from '../lib/axios'

export async function getArticles({
  page = 1,
  limit = 6,
  category,
  categoryId,
  search,
  status,
} = {}) {
  const params = { page, limit }

  if (category) params.category = category
  if (categoryId) params.categoryId = categoryId
  if (search?.trim()) params.search = search.trim()
  if (status) params.status = status

  try {
    const { data } = await api.get('/posts', { params })

    return {
      ...data,
      posts: (data.posts ?? []).map(normalizeArticle),
      hasMore:
        typeof data.hasMore === 'boolean'
          ? data.hasMore
          : Boolean(data.nextPage),
    }
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to load articles.'), {
      cause: error,
    })
  }
}

export async function getArticle(articleId) {
  try {
    const { data } = await api.get(`/posts/${articleId}`)
    return normalizeArticle(data.post ?? data)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to load the article.'), {
      cause: error,
    })
  }
}

export async function createArticle(article) {
  try {
    const { data } = await api.post('/posts', toArticlePayload(article))
    return normalizeArticle(data.post)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to create the article.'), {
      cause: error,
    })
  }
}

export async function updateArticle(articleId, article) {
  try {
    const { data } = await api.patch(
      `/posts/${articleId}`,
      toArticlePayload(article),
    )
    return normalizeArticle(data.post)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to update the article.'), {
      cause: error,
    })
  }
}

export async function deleteArticle(articleId) {
  try {
    await api.delete(`/posts/${articleId}`)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to delete the article.'), {
      cause: error,
    })
  }
}

export async function likeArticle(articleId) {
  try {
    const { data } = await api.post(`/posts/${articleId}/likes`)
    return {
      likes: Number(data.likes ?? 0),
      likedByUser: Boolean(data.likedByUser),
      alreadyLiked: Boolean(data.alreadyLiked),
    }
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to like the article.'), {
      cause: error,
    })
  }
}

export async function unlikeArticle(articleId) {
  try {
    const { data } = await api.delete(`/posts/${articleId}/likes`)
    return {
      likes: Number(data.likes ?? 0),
      likedByUser: Boolean(data.likedByUser),
      alreadyUnliked: Boolean(data.alreadyUnliked),
    }
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to unlike the article.'), {
      cause: error,
    })
  }
}

export function normalizeArticle(article) {
  const rawStatus = String(article?.status ?? 'published').toLowerCase()

  return {
    ...article,
    id: Number(article.id),
    categoryId: Number(article.categoryId ?? article.category_id),
    category: article.category ?? '',
    status: rawStatus === 'publish' ? 'published' : rawStatus,
    likes: Number(article.likes ?? article.likes_count ?? 0),
    likedByUser: Boolean(article.likedByUser),
    author: article.author ?? 'Admin',
  }
}

function toArticlePayload(article) {
  return {
    title: article.title,
    image: article.image,
    categoryId: Number(article.categoryId),
    description: article.description,
    content: article.content,
    status: article.status,
  }
}

function getApiErrorMessage(error, fallback) {
  return error.response?.data?.message ?? fallback
}
