const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function optimizeImages() {
  const inputDir = "public/media/images/photography";
  const outputDir = "public/media/images/thumbnails";

  try {
    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to process...`);

    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      console.log(`Processing ${file}...`);

      await sharp(inputPath)
        .resize(400, 300, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 80 })
        .toFile(outputPath);

      console.log(`✅ Created thumbnail for ${file}`);
    }

    console.log("🎉 All thumbnails created successfully!");
  } catch (error) {
    console.error("❌ Error processing images:", error);
  }
}

optimizeImages();
