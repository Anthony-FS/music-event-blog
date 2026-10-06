# End-to-end tests

`smoke.spec.js` runs against the deployed site and is **read-only**: it signs
nothing in and writes nothing. Point it elsewhere with `E2E_BASE_URL`.

```bash
npm run test:e2e
```

Authenticated flows (sign-in, article create and delete, comments) are not
covered yet, and must not be added to this file: running them against the
deployed site would write to real data on every CI run. Add them as a separate
spec that serves a local `vite preview` build and stubs the API and Supabase
auth with `page.route`.
