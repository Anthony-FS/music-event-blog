import { describe, expect, it } from 'vitest'

import { normalizeArticle } from '@/services/articleService'

describe('normalizeArticle', () => {
  it('coerces ids to numbers and reads snake_case fallbacks', () => {
    const article = normalizeArticle({
      id: '7',
      category_id: '3',
      likes_count: '5',
      author: 'Ada',
      author_id: 'uuid-1',
      author_avatar: 'avatar.png',
      author_bio: 'Writes about gigs.',
    })

    expect(article.id).toBe(7)
    expect(article.categoryId).toBe(3)
    expect(article.likes).toBe(5)
    expect(article.authorProfile).toEqual({
      id: 'uuid-1',
      name: 'Ada',
      avatarUrl: 'avatar.png',
      bio: 'Writes about gigs.',
    })
  })

  it('maps the legacy "publish" status onto "published"', () => {
    expect(normalizeArticle({ id: 1, status: 'publish' }).status).toBe('published')
    expect(normalizeArticle({ id: 1, status: 'DRAFT' }).status).toBe('draft')
  })

  it('defaults missing fields instead of leaking undefined into the UI', () => {
    const article = normalizeArticle({ id: 1 })

    expect(article.status).toBe('published')
    expect(article.category).toBe('')
    expect(article.likes).toBe(0)
    expect(article.likedByUser).toBe(false)
    expect(article.author).toBe('Admin')
    expect(article.authorProfile.id).toBeNull()
  })
})
