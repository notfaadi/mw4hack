import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const slugs = process.argv.slice(2);
const dir = path.join(process.cwd(), 'public/images/blog');
const widths = [320, 400, 512, 640, 960];

for (const slug of slugs) {
  const input = path.join(dir, `${slug}.png`);
  if (!fs.existsSync(input)) {
    console.warn(`Skip missing ${slug}.png`);
    continue;
  }
  for (const width of widths) {
    const output = path.join(dir, `${slug}-${width}.webp`);
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(output);
  }
  console.log(`Optimized ${slug}`);
}
