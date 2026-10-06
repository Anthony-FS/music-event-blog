# End-to-end tests

Two suites, split by what they are allowed to touch.

## Live smoke — `live/smoke.spec.js`

Runs against the deployed site and is **read-only**: it signs nothing in and
writes nothing. Point it elsewhere with `E2E_BASE_URL`.

```bash
npm run test:e2e
```

Because it depends on the deployed API, CI runs it nightly and on demand only,
never per push. Never add a sign-in or a write to this suite: it would hit real
data on every run.

## Mocked — `mocked/*.spec.js`

Hermetic. It builds the app with the stub hosts in `.env.e2e`, serves it with
`vite preview`, and intercepts every request to Supabase and the API
(`mocked/stubs.js`). No credentials, no network, no production writes — so CI
runs it on every push, and authenticated and write flows belong here.

```bash
npm run test:e2e:mocked
```

`signInAsAdmin` seeds the Supabase session into localStorage exactly as a real
sign-in would persist it, which skips the login form for tests that are about
something else.

Stub response shapes must match what the services actually read
(`data.categories`, `data.posts`, and so on) or the UI silently renders empty.

Not covered yet: article create and edit, which need a thumbnail upload to
Supabase storage, and the comment flow.
