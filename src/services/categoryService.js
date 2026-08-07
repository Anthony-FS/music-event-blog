import api from '../lib/axios'

export async function getCategories() {
  try {
    const { data } = await api.get('/categories')
    return (data.categories ?? []).map(normalizeCategory)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to load categories.'), {
      cause: error,
    })
  }
}

export async function createCategory(name) {
  try {
    const { data } = await api.post('/categories', { name })
    return normalizeCategory(data.category)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to create the category.'), {
      cause: error,
    })
  }
}

export async function updateCategory(categoryId, name) {
  try {
    const { data } = await api.patch(`/categories/${categoryId}`, { name })
    return normalizeCategory(data.category)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to update the category.'), {
      cause: error,
    })
  }
}

export async function deleteCategory(categoryId) {
  try {
    await api.delete(`/categories/${categoryId}`)
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to delete the category.'), {
      cause: error,
    })
  }
}

function normalizeCategory(category) {
  return {
    id: Number(category.id),
    name: category.name,
  }
}

function getApiErrorMessage(error, fallback) {
  return error.response?.data?.message ?? fallback
}
