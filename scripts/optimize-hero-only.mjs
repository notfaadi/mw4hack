import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public/images/hero');
const widths = [640, 960, 1280, 1920];

for (const file of fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f))) {
  const base = file.replace(/\.jpe?g$/i, '');
  const input = path.join(dir, file);
  for (const width of widths) {
    const output = path.join(dir, `${base}-${width}.webp`);
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85, effort: 4 })
      .toFile(output);
    console.log(`Wrote ${path.basename(output)}`);
  }
}
