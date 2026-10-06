import { expect, test } from '@playwright/test'

import { ARTICLES, CATEGORIES, signInAsAdmin, stubBackend } from './stubs'

test.beforeEach(async ({ page }) => {
  await stubBackend(page)
  await signInAsAdmin(page)
})

test('deleting an article asks for confirmation, then sends the delete', async ({
  page,
}) => {
  const article = ARTICLES[0]
  let deleted = null
  await page.route(`**/api.e2e.test/posts/${article.id}`, (route) => {
    deleted = route.request().method()
    return route.fulfill({ status: 204, body: '' })
  })

  await page.goto('/admin')
  await page.getByRole('button', { name: `Delete ${article.title}` }).click()

  await expect(page.getByRole('heading', { name: 'Delete article' })).toBeVisible()
  expect(deleted).toBeNull()

  await page.getByRole('button', { name: 'Delete', exact: true }).click()

  await expect.poll(() => deleted).toBe('DELETE')
  await expect(page.getByText('Article deleted.')).toBeVisible()
  await expect(page.getByText(article.title)).toHaveCount(0)
})

test('cancelling the confirmation sends nothing', async ({ page }) => {
  const article = ARTICLES[0]
  let requested = false
  await page.route(`**/api.e2e.test/posts/${article.id}`, (route) => {
    requested = true
    return route.fulfill({ status: 204, body: '' })
  })

  await page.goto('/admin')
  await page.getByRole('button', { name: `Delete ${article.title}` }).click()
  await page.getByRole('button', { name: 'Cancel' }).click()

  await expect(page.getByRole('heading', { name: 'Delete article' })).toBeHidden()
  await expect(page.getByText(article.title)).toBeVisible()
  expect(requested).toBe(false)
})

test('creating a category posts the name and shows it in the list', async ({ page }) => {
  const created = { id: 3, name: 'Interviews' }
  let payload = null
  await page.route('**/api.e2e.test/categories**', (route) => {
    if (route.request().method() === 'POST') {
      payload = route.request().postDataJSON()
      return route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ category: created }),
      })
    }

    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        categories: payload ? [...CATEGORIES, created] : CATEGORIES,
      }),
    })
  })

  await page.goto('/admin')
  await page.getByRole('button', { name: 'Category management' }).click()
  await page.getByRole('button', { name: 'Create category' }).click()
  await page.getByPlaceholder('Category name').fill(created.name)
  await page.getByRole('button', { name: 'Save' }).click()

  await expect.poll(() => payload).toEqual({ name: created.name })
  await expect(page.getByText('Category created.')).toBeVisible()
  await expect(page.getByText(created.name)).toBeVisible()
})
