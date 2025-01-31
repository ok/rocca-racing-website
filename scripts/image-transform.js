import sharp from "sharp";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory of the script file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load config
const configPath = path.join(__dirname, "config.json");
const config = JSON.parse(await fs.readFile(configPath, "utf8"));

const inputDir = path.resolve(__dirname, config.inputDir);
const outputDir = path.resolve(__dirname, config.outputDir);

// Ensure output directory exists
await fs.ensureDir(outputDir);

// Process images
async function processImages() {
  for (const image of config.images) {
    const inputPath = path.join(inputDir, image.filename);
    const ext = path.extname(image.filename);
    const baseName = path.basename(image.filename, ext);

    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️  File not found: ${inputPath}`);
      continue;
    }

    for (const size of image.sizes) {
      const outputPath = path.join(outputDir, `${baseName}-${size}.webp`);

      try {
        await sharp(inputPath)
          .resize(size)
          .webp({ quality: 80 })
          .toFile(outputPath);

        console.log(`✅ Created: ${outputPath}`);
      } catch (error) {
        console.error(`❌ Error processing ${image.filename} at size ${size}:`, error);
      }
    }
  }
}

await processImages();
console.log("🎉 Image processing complete!");