import { defineConfig, devices } from '@playwright/test'

// Hermetic suite: a local production build whose API and Supabase hosts are
// stubs (see .env.e2e), with every request intercepted. Safe to run on every
// push, and it covers the authenticated and write flows that the live smoke
// suite must not touch.
export default defineConfig({
  testDir: './tests/e2e/mocked',
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build:e2e && npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
