# Sanity CMS for Inkspilled

This project uses [Sanity](https://www.sanity.io/) as a headless CMS. Content is fetched at build/request time via `src/sanity/fetch.ts`. If Sanity is not configured, the site falls back to the static data in `src/data/`.

## Setup

### 1. Create a Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project.
2. Copy your **Project ID**.

### 2. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 3. Install dependencies

```bash
npm install
```

### 4. Open the Studio

With the dev server running:

```bash
npm run dev
```

Open **http://localhost:3000/studio** to manage content.

Or run the standalone Sanity dev server:

```bash
npm run sanity:dev
```

### 5. Seed initial content (optional)

Create a token with **Editor** permissions at [sanity.io/manage](https://www.sanity.io/manage) → API → Tokens, then add to `.env.local`:

```env
SANITY_API_WRITE_TOKEN=your_write_token
```

Run:

```bash
npm run sanity:seed
```

This imports services, blog posts, FAQs, and singleton page content from the existing static data files.

## Content types

| Type | Studio location | Used on |
|------|-----------------|---------|
| **Service** | Services | `/services`, `/services/[slug]`, contact form |
| **Blog Post** | Blog Posts | `/blog`, `/blog/[slug]`, homepage blog section |
| **FAQ** | FAQs | Homepage FAQ section |
| **Site Settings** | Site Settings | Contact info, footer, form options |
| **About Page** | About Page | `/about` |
| **Contact Page** | Contact Page | `/contact` |
| **Homepage** | Homepage | Homepage blog intro (extensible) |

## Deploying the Studio

Host Sanity Studio separately or use:

```bash
npm run sanity:deploy
```

## CORS

In Sanity project settings → **API** → **CORS origins**, add:

- `http://localhost:3000`
- Your production domain (e.g. `https://inkspilled.com`)

## Revalidation

Fetched content uses `revalidate: 60` (ISR). After publishing in Sanity, changes appear within ~60 seconds on production. For instant updates, add a Sanity webhook pointing to your deployment’s revalidate API route.
