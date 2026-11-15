// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: SITE and BASE are set in .github/workflows/deploy.yml.
// Project site (https://USER.github.io/REPO/): base '/REPO'.
// User site (USER.github.io) or custom domain: base '/'.
export default defineConfig({
  site: process.env.SITE ?? 'https://example.github.io',
  base: process.env.BASE ?? '/',
  integrations: [sitemap()],
});
