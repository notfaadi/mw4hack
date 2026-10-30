import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const outDir = path.join(process.cwd(), 'public/images/gameplay');

const slides = [
  {
    file: 'mw4-wallhack.png',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3595270/8694e5cb8262343c867d8f8edb70526b19b49cf8/ss_8694e5cb8262343c867d8f8edb70526b19b49cf8.1920x1080.jpg?t=1778886604',
  },
  {
    file: 'mw4-aimbot.png',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3595270/757e49ee3ff2b6ebf60e479731d983cec47faa41/ss_757e49ee3ff2b6ebf60e479731d983cec47faa41.1920x1080.jpg?t=1778886604',
  },
  {
    file: 'mw4-fov.png',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3595270/f713211188a2a872d638089b2d959a337639e91a/ss_f713211188a2a872d638089b2d959a337639e91a.1920x1080.jpg?t=1778886604',
  },
  {
    file: 'mw4-unlock-all.png',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3595270/ee37e2686b1a21ede5b74e853d046ba9bd087878/ss_ee37e2686b1a21ede5b74e853d046ba9bd087878.1920x1080.jpg?t=1778886604',
  },
  {
    file: 'mw4-auto-lethal.png',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3595270/e23921966033db7075d68e33e233120756357093/ss_e23921966033db7075d68e33e233120756357093.1920x1080.jpg?t=1778886604',
  },
  {
    file: 'mw4-xp-bot.png',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3595270/f778362cc479898f1f54f5e4de4f88130cf2b140/ss_f778362cc479898f1f54f5e4de4f88130cf2b140.1920x1080.jpg?t=1778886604',
  },
  {
    file: 'mw4-player-esp.png',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3595270/2a5b9db9430ee79aed122a309460e8c121d67765/ss_2a5b9db9430ee79aed122a309460e8c121d67765.1920x1080.jpg?t=1778886604',
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const slide of slides) {
  const res = await fetch(slide.url);
  if (!res.ok) throw new Error(`Failed ${slide.file}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const out = path.join(outDir, slide.file);
  await sharp(buf)
    .resize({ width: 1920, height: 1080, fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 8 })
    .toFile(out);
  console.log(`Wrote ${slide.file}`);
}

console.log('MW4 gameplay images ready.');
