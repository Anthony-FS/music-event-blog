// Request stubs for the hosts baked into the e2e build (.env.e2e).
// Nothing here talks to a real service.

export const ADMIN_USER = {
  id: 'uuid-admin',
  email: 'admin@e2e.test',
  aud: 'authenticated',
  role: 'authenticated',
  app_metadata: {},
  user_metadata: { name: 'E2E Admin', username: 'e2eadmin' },
}

export const ADMIN_PROFILE = {
  id: ADMIN_USER.id,
  name: 'E2E Admin',
  username: 'e2eadmin',
  bio: 'Runs the tests.',
  avatar_url: '',
  role: 'admin',
}

export const ARTICLES = [
  {
    id: 1,
    title: 'Glastonbury 2026 line-up',
    category: 'Festivals',
    categoryId: 1,
    status: 'published',
    description: 'Who is playing and when.',
    content: '# Line-up\nThe headliners are in.',
    image: 'https://api.e2e.test/images/1.jpg',
    author: 'E2E Admin',
    date: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'Draft: best small venues',
    category: 'Venues',
    categoryId: 2,
    status: 'draft',
    description: 'Still being written.',
    content: 'Coming soon.',
    image: 'https://api.e2e.test/images/2.jpg',
    author: 'E2E Admin',
    date: '2026-02-01T00:00:00.000Z',
  },
]

export const CATEGORIES = [
  { id: 1, name: 'Festivals' },
  { id: 2, name: 'Venues' },
]

function session() {
  return {
    access_token: 'e2e-access-token',
    refresh_token: 'e2e-refresh-token',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    user: ADMIN_USER,
  }
}

function json(route, body, status = 200) {
  return route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })
}

/**
 * Stub Supabase auth + the profiles table and the blog API. Pass
 * `signInError` to make the password grant fail the way GoTrue does.
 */
export async function stubBackend(page, { signInError = null } = {}) {
  await page.route('**/auth/v1/token**', (route) =>
    signInError
      ? json(route, { error: 'invalid_grant', error_description: signInError }, 400)
      : json(route, session()),
  )
  await page.route('**/auth/v1/logout**', (route) => route.fulfill({ status: 204, body: '' }))
  await page.route('**/auth/v1/user**', (route) => json(route, ADMIN_USER))
  await page.route('**/rest/v1/profiles**', (route) => json(route, [ADMIN_PROFILE]))

  await page.route('**/api.e2e.test/categories**', (route) =>
    json(route, { categories: CATEGORIES }),
  )
  await page.route('**/api.e2e.test/notifications**', (route) =>
    json(route, { notifications: [], unreadCount: 0 }),
  )
  await page.route('**/api.e2e.test/posts**', (route) =>
    json(route, { posts: ARTICLES, totalPosts: ARTICLES.length, hasMore: false }),
  )
  // Article thumbnails point at the stub host too.
  await page.route('**/api.e2e.test/images/**', (route) =>
    route.fulfill({ status: 200, contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg"/>' }),
  )
}

/** Seed the Supabase session the way a real sign-in would persist it. */
export async function signInAsAdmin(page) {
  const value = JSON.stringify(session())
  await page.addInitScript(
    ([key, stored]) => window.localStorage.setItem(key, stored),
    ['sb-e2e-auth-token', value],
  )
}
