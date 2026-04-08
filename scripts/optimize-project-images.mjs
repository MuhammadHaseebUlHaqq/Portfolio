import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('src/assets/images');
const files = [
  'ridetogether.png',
  'havoc.png',
  'botverse.png',
  'smartdocs.png',
  'ballinfo.png',
  'footanalysis.png',
];
const widths = [480, 960];

for (const file of files) {
  const inputPath = path.join(imagesDir, file);
  const base = file.replace(/\.png$/i, '');

  for (const width of widths) {
    const webpOut = path.join(imagesDir, `${base}-${width}.webp`);
    const avifOut = path.join(imagesDir, `${base}-${width}.avif`);

    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 72, effort: 4 })
      .toFile(webpOut);

    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 48, effort: 4 })
      .toFile(avifOut);
  }
}

console.log('Project image variants generated.');
