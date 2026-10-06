import { defineConfig, devices } from '@playwright/test'

// These specs run against the deployed site and are read-only on purpose:
// no sign-in, no writes. Authenticated flows need mocked routes against a
// local build instead — see tests/e2e/README.md.
export default defineConfig({
  testDir: './tests/e2e/live',
  retries: 2,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'https://music-event-blog.vercel.app',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
