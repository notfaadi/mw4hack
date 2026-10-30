import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'http://localhost:4321',
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/mw4-cheats/',
    '/cheats/lite/': '/products/mw4-cheats/',
    '/cheats/pro/': '/products/mw4-cheats/',
    '/cheats/elite/': '/products/mw4-cheats/elite/',
    '/cheats/compare/': '/blog/mw4-lite-vs-pro/',
    '/products/mw4-cheats/': '/products/mw4-cheats/',
    '/products/mw4-cheats/elite/': '/products/mw4-cheats/elite/',
    '/contact/': '/support/',
    '/products/mw4-cheats/unlock-all/': '/products/mw4-cheats/skin-changer/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
