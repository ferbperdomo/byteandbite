const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function optimizeWebImages() {
  const inputDir = "public/media/images/web";
  const outputDir = "public/media/images/web";

  try {
    console.log("🌐 Optimizing web images...");

    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} web images to optimize...`);

    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      console.log(`Processing ${file}...`);

      // Get original dimensions
      const metadata = await sharp(inputPath).metadata();
      console.log(`  Original: ${metadata.width}x${metadata.height}`);

      // Optimize for web (horizontal images)
      // Max width: 1920px, quality: 85%
      const tempPath = inputPath + ".tmp";
      await sharp(inputPath)
        .resize(1920, 1080, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 85 })
        .toFile(tempPath);

      // Replace original with optimized version
      fs.renameSync(tempPath, outputPath);

      // Show file sizes
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const reduction = (
        ((originalSize - optimizedSize) / originalSize) *
        100
      ).toFixed(1);

      console.log(`✅ Optimized ${file}`);
      console.log(
        `   Size: ${(originalSize / 1024).toFixed(1)}KB → ${(
          optimizedSize / 1024
        ).toFixed(1)}KB (${reduction}% reduction)`
      );
    }

    console.log("🎉 All web images optimized successfully!");
  } catch (error) {
    console.error("❌ Error processing web images:", error);
  }
}

optimizeWebImages();
