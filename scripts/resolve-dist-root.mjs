import fs from 'node:fs';
import path from 'node:path';

/** Astro static → `dist/`; @astrojs/cloudflare → `dist/client/`. */
export function resolveDistRoot(cwd = process.cwd()) {
  const dist = path.join(cwd, 'dist');
  const client = path.join(dist, 'client');

  for (const root of [client, dist]) {
    if (fs.existsSync(path.join(root, 'sitemap-0.xml'))) return root;
  }

  for (const root of [client, dist]) {
    if (fs.existsSync(path.join(root, 'index.html'))) return root;
  }

  return dist;
}

export function siteOrigin() {
  const raw =
    process.env.SITE_URL?.trim() ||
    process.env.PUBLIC_SITE_URL?.trim() ||
    process.env.CF_PAGES_URL?.trim() ||
    'http://localhost:4321';
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}
