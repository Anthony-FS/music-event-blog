# Music Event Blog

A full-stack blog for sharing past and upcoming music events, with member accounts and an admin panel for publishing content.

**Live site:** https://music-event-blog.vercel.app/

## Features

### Visitors
- Browse articles in a paginated grid with a "View more" button
- Search articles and filter them by category
- Read full articles with author details and comments
- Share articles to Facebook, LinkedIn or Twitter, or copy the link
- Sign up and log in

### Members
- Like and unlike articles
- Comment on articles
- Edit profile: name, username, email, bio and profile picture
- Change password (current password is verified first)

### Admins
- Access a protected admin panel (role-based route guard)
- Create, edit and delete articles with thumbnail upload, category, introduction and content
- Save articles as drafts or publish them
- Search and filter articles by status and category
- Create, rename and delete categories
- View notifications when members like or comment on articles

Admin access is available on request from the author.

## Tech Stack

- **Frontend:** React 19, Vite, React Router, axios
- **Styling / UI:** Tailwind CSS, shadcn/ui (Radix UI), React Bootstrap, lucide-react, Sonner (toasts)
- **Backend and data:** REST API in a separate repo ([music-event-blog-server](https://github.com/Anthony-FS/music-event-blog-server)); Supabase for authentication, database and file storage
- **Deployment:** Vercel

## Setup

### Prerequisites
- A recent LTS version of Node
- npm
- A running or deployed instance of the [backend API](https://github.com/Anthony-FS/music-event-blog-server)
- A Supabase project

### Steps

```bash
git clone https://github.com/Anthony-FS/music-event-blog.git
cd music-event-blog
npm install
```

Create a `.env` file in the project root (see [Environment Variables](#environment-variables)):

```env
VITE_API_BASE_URL=<your-backend-api-url>
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Start the dev server:

```bash
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL of the backend REST API used by axios |
| `VITE_SUPABASE_URL` | URL of the Supabase project |
| `VITE_SUPABASE_ANON_KEY` | Public anon key for the Supabase client |

## Project Structure

```
src/
├── assets/        Images and SVG icons
├── components/
│   ├── admin/     Admin panel: article, category and notification management
│   ├── blog/      Public blog UI: hero, article list, comments, social bar
│   ├── layout/    Navbar and footer
│   ├── member/    Member account panel and sign-up confirmation
│   ├── shared/    Reusable pieces: forms, dialogs, route guard, account settings
│   └── ui/        shadcn/ui primitives
├── hooks/         Custom hooks (current member session)
├── lib/           axios and Supabase clients, session helpers, shared styles
├── pages/         Route-level pages
├── services/      API and Supabase calls (articles, auth, comments, profiles, etc.)
└── utils/         Formatting and form validation helpers
```

## Deployment

The app is deployed on Vercel. `vercel.json` rewrites every route to `/`, so React Router can handle client-side routes such as `/article/:id` on direct visits and page refreshes.

Set `VITE_API_BASE_URL`, `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Vercel project settings under Environment Variables.
