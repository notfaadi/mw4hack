import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const outDir = path.join(process.cwd(), 'public/images/blog');

/** Blog slugs — one MW4 hero image per article (matches posts.ts). */
const blogSlugs = [
  'mw4-cheat-codes-guide',
  'mw4-console-cheats-tips',
  'how-to-use-mw4-cheat-codes',
  'mw4-cheats-features-guide',
  'mw4-console-commands-cheats',
  'mw4-lite-vs-pro',
  'mw4-elite-tier-guide',
  'mw4-scripts-ranked-mmr',
  'mw4-map-hack-setup',
  'mw4-zoom-hack-guide',
  'mw4-skin-changer-guide',
  'ricochet-patch-day-checklist',
  'mw4-hwid-spoofer-after-ban',
  'how-to-buy-mw4-cheats-2026',
  'mw4-auto-combo-hero-scripts',
  'ricochet-verification-errors',
  'mw4-external-cheat-guide',
  'mw4-stream-proof-setup',
  'mw4-aimbot-features-deep-dive',
  'mw4-esp-wallhack-modules-explained',
  'mw4-unlock-all-features-overview',
  'mw4-pro-tier-feature-checklist',
  'mw4-stream-proof-features-guide',
  'mw4-season-update-loader-notes',
  'mw4-ricochet-status-how-to-read',
  'mw4-patch-notes-multiplayer-balance',
  'mw4-cloud-config-sync-updates',
  'mw4-discord-status-channel-guide',
  'mw4-loader-wont-open-fix',
  'mw4-game-crash-with-overlay',
  'mw4-battlenet-sync-error-fix',
  'mw4-fps-drop-after-cheat',
  'mw4-hwid-still-flagged-troubleshooting',
];

async function loadSteamScreenshotUrls() {
  const res = await fetch(
    'https://store.steampowered.com/api/appdetails?appids=3595270&l=english',
  );
  if (!res.ok) throw new Error(`Steam API ${res.status}`);
  const json = await res.json();
  const data = json['3595270']?.data;
  if (!data) throw new Error('Missing Steam app data for 3595270');

  const fromShots = (data.screenshots ?? []).map((s) => s.path_full);
  const header = data.header_image ? [data.header_image] : [];
  const urls = [...fromShots, ...header].filter(Boolean);
  if (urls.length === 0) throw new Error('No Steam screenshots found');
  return urls;
}

fs.mkdirSync(outDir, { recursive: true });

const screenshotUrls = await loadSteamScreenshotUrls();

for (let i = 0; i < blogSlugs.length; i++) {
  const slug = blogSlugs[i];
  const url = screenshotUrls[i % screenshotUrls.length];
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${slug}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const out = path.join(outDir, `${slug}.png`);
  await sharp(buf)
    .resize({ width: 1200, height: 675, fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 8 })
    .toFile(out);
  console.log(`Wrote ${slug}.png`);
}

console.log('MW4 blog card images ready.');
