import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot, siteOrigin } from './resolve-dist-root.mjs';

const dist = resolveDistRoot();
const source = path.join(dist, 'sitemap-0.xml');

if (!fs.existsSync(source)) {
  const indexOnly = path.join(dist, 'sitemap-index.xml');
  if (fs.existsSync(indexOnly)) {
    console.warn(
      'finalize-sitemap: sitemap-0.xml missing; keeping Astro sitemap-index.xml only.',
    );
    process.exit(0);
  }
  console.error('finalize-sitemap: no sitemap found under dist/ or dist/client/.');
  process.exit(1);
}

const raw = fs.readFileSync(source, 'utf8');
const urlCount = (raw.match(/<url>/g) ?? []).length;

if (urlCount === 0) {
  console.error('finalize-sitemap: sitemap-0.xml contains no URLs.');
  process.exit(1);
}

function formatUrlset(xml) {
  return xml
    .replace(/^<\?xml[^?]*\?>/, '<?xml version="1.0" encoding="UTF-8"?>\n')
    .replace(/<urlset([^>]*)>/, '<urlset$1>\n')
    .replace(/<\/urlset>/, '\n</urlset>\n')
    .replace(/<url>/g, '  <url>\n')
    .replace(/<\/url>/g, '\n  </url>\n')
    .replace(/<loc>/g, '    <loc>')
    .replace(/<\/loc>/g, '</loc>\n')
    .replace(/<lastmod>/g, '    <lastmod>')
    .replace(/<\/lastmod>/g, '</lastmod>\n')
    .replace(/<changefreq>/g, '    <changefreq>')
    .replace(/<\/changefreq>/g, '</changefreq>\n')
    .replace(/<priority>/g, '    <priority>')
    .replace(/<\/priority>/g, '</priority>\n');
}

const origin = siteOrigin();
const formatted = formatUrlset(raw.replaceAll('http://localhost:4321', origin));
fs.writeFileSync(path.join(dist, 'sitemap.xml'), formatted, 'utf8');

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${origin}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(dist, 'sitemap-index.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-0.xml'), formatted, 'utf8');

console.log(`Sitemap finalized: ${urlCount} URLs → ${path.relative(process.cwd(), dist)}/sitemap.xml`);
