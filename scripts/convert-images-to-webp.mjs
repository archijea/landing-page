import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputDir = process.argv[2] ?? "public/images/main-projects";
const outputDir = process.argv[3] ?? "public/images/featured";
const quality = Number(process.argv[4] ?? 82);
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);

async function getImageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getImageFiles(fullPath)));
      continue;
    }

    if (supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

await mkdir(outputDir, { recursive: true });

const imageFiles = await getImageFiles(inputDir);

if (imageFiles.length === 0) {
  console.log(`No JPG, JPEG, or PNG files found in ${inputDir}.`);
  process.exit(0);
}

for (const file of imageFiles) {
  const relativePath = path.relative(inputDir, file);
  const parsedPath = path.parse(relativePath);
  const outputPath = path.join(outputDir, parsedPath.dir, `${parsedPath.name}.webp`);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(file).webp({ quality }).toFile(outputPath);

  console.log(`${file} -> ${outputPath}`);
}

console.log(`Done. Converted ${imageFiles.length} file(s).`);
