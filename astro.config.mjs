import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkWikilinks from './src/utils/remark-wikilinks.mjs';

export default defineConfig({
  site: 'https://houuya.github.io',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [[remarkWikilinks, { postsDir: './_posts' }]],
  },
});
