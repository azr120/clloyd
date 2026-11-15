# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Chloe Lloyd Studio" (wedding stationery & illustration): a static marketing site plus blog, built with **Astro 5** and deployed to **GitHub Pages**. Astro 5 is deliberate: Astro 7 requires Node >=22.23, and the dev machine has 22.21.

The root also holds two standalone prototypes that are *not* part of the build: `Chloe Lloyd Studio.html` (v1) and `Chloe Lloyd Studio v2.html` (v2 design the Astro site was generated from). `chloe images/` holds the original photos; the site uses copies in `src/assets/images/`. There is no test suite or linter, and the root is not a git repo yet.

## Commands

- `npm install` — first time only
- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — static output to `dist/` (also the best check that content frontmatter is valid)
- `npm run preview` — serve `dist/`
- Test a Pages base path: `SITE=https://user.github.io BASE=/repo npm run build`. In Git Bash prefix with `MSYS_NO_PATHCONV=1`, otherwise `/repo` is rewritten to a Windows path.

## Architecture

- `src/pages/index.astro` — the one-page home (hero, stationery, commissions, process, about, works, contact), generated from v2. `src/pages/blog/index.astro` lists posts; `src/pages/blog/[...slug].astro` renders one post.
- `src/layouts/Base.astro` — shared head/SEO tags, sticky nav, footer and the small inline script (form stub + closing the mobile menu). Nav/footer links are built from `BASE_URL` (`home` variable) so they work both on the home page and from `/blog/...` under a GitHub Pages subpath. Always build internal hrefs this way, never bare `#anchor` or `/path`.
- `src/styles/global.css` — all CSS in one file (palette in `:root`, sections commented `/* ---------- NAME ---------- */`, blog styles at the end). The palette is terracotta / olive / apricot / sea-glass on warm paper.
- Images: use `<Image>` from `astro:assets` with imports from `src/assets/images/` so Astro resizes and converts to WebP (about 750 KB originals become ~100 KB).
- Blog: content collection defined in `src/content.config.ts`; posts are Markdown in `src/content/blog/`. Frontmatter: `title`, `description`, `pubDate`, optional `cover` (relative image path), `coverAlt`, `draft` (true hides the post). In a post body, images are plain Markdown with a relative path, e.g. `![alt](../../assets/images/photo.jpeg)`. The post's filename becomes its URL.
- Deployment: `.github/workflows/deploy.yml` builds on push to `main` and sets `SITE`/`BASE` from the repo owner/name (project site at `/REPO`). For a user site (`USER.github.io` repo) or custom domain, change `BASE` to `/`. In repo settings, Pages source must be "GitHub Actions". `astro.config.mjs` falls back to `https://example.github.io` locally.

## Still placeholders

- Instagram/Pinterest footer links point to the generic `instagram.com` / `pinterest.com`.
- `src/config.ts` holds `TYPEFORM_ID` and `GA_ID` (both set) and `CONTACT_EMAIL` (empty). The contact section embeds Typeform (`data-tf-live`) once `TYPEFORM_ID` is set; until then it shows a "not connected" note. GA4 and the cookie banner (`src/components/CookieBanner.astro`) are rendered only when `GA_ID` is set, and GA loads only after the visitor accepts. `src/pages/privacy.astro` is linked from the footer.
- Custom domain `chloelloydstudio.com` (registered at Spaceship, DNS pointed at GitHub Pages) is set in `public/CNAME` and in the workflow (`SITE=https://chloelloydstudio.com`, `BASE=/`). Local builds fall back to `https://example.github.io`, so canonical URLs only look right in CI builds.
- The About portrait is an SVG drawing, not a photo. Couple names/dates in the sample content are fake.
