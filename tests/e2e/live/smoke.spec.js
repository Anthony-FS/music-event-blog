import { expect, test } from '@playwright/test'

// The API is on a free tier and cold-starts, so article content gets a longer
// timeout than Playwright's default. Everything else renders client-side.
const ARTICLES_TIMEOUT = 30_000

test('the landing page renders the hero and the article list', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Music')
  await expect(page.getByRole('heading', { name: 'Latest articles' })).toBeVisible()
  await expect(page.locator('a[href^="/article/"]').first()).toBeVisible({
    timeout: ARTICLES_TIMEOUT,
  })
})

test('an article card opens the article detail page', async ({ page }) => {
  await page.goto('/')

  const firstCard = page.locator('a[href^="/article/"]').first()
  await expect(firstCard).toBeVisible({ timeout: ARTICLES_TIMEOUT })
  const title = await firstCard.getByRole('heading').innerText()
  await firstCard.click()

  await expect(page).toHaveURL(/\/article\/\d+/)
  await expect(page.getByRole('heading', { name: title })).toBeVisible()
})

test('the admin panel redirects a logged-out visitor to the login page', async ({
  page,
}) => {
  await page.goto('/admin')

  await expect(page).toHaveURL(/\/login$/)
  await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible()
})

test('an unknown url shows the 404 page', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')

  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
})
