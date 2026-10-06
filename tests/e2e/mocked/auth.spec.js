import { expect, test } from '@playwright/test'

import { signInAsAdmin, stubBackend } from './stubs'

test('a wrong password shows a friendly error and stays on the login page', async ({
  page,
}) => {
  await stubBackend(page, { signInError: 'Invalid login credentials' })
  await page.goto('/login')

  await page.getByPlaceholder('Email').fill('admin@e2e.test')
  await page.getByPlaceholder('Password').fill('wrong-password')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText('Invalid email or password.')).toBeVisible()
  await expect(page).toHaveURL(/\/login$/)
})

test('client-side validation blocks a submit with a malformed email', async ({ page }) => {
  await stubBackend(page)
  let tokenRequests = 0
  page.on('request', (request) => {
    if (request.url().includes('/auth/v1/token')) tokenRequests += 1
  })
  await page.goto('/login')

  await page.getByPlaceholder('Email').fill('not-an-email')
  await page.getByPlaceholder('Password').fill('longenough')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText('Please enter a valid email address.')).toBeVisible()
  expect(tokenRequests).toBe(0)
})

test('a successful sign-in lands on the landing page', async ({ page }) => {
  await stubBackend(page)
  await page.goto('/login')

  await page.getByPlaceholder('Email').fill('admin@e2e.test')
  await page.getByPlaceholder('Password').fill('correct-password')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page).toHaveURL('http://localhost:4173/')
  await expect(page.getByRole('heading', { name: 'Latest articles' })).toBeVisible()
})

test('a seeded admin session reaches the admin panel', async ({ page }) => {
  await stubBackend(page)
  await signInAsAdmin(page)

  await page.goto('/admin')

  await expect(page.getByRole('heading', { name: 'Article management' })).toBeVisible()
  await expect(page.getByText('Glastonbury 2026 line-up')).toBeVisible()
})
