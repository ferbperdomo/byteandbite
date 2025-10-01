const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function optimizeOriginals() {
  const inputDir = "public/media/images/photography";
  const backupDir = "public/media/images/photography-backup";
  const outputDir = "public/media/images/photography";

  try {
    // Create backup first
    console.log("📁 Creating backup...");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to optimize...`);

    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const backupPath = path.join(backupDir, file);
      const outputPath = path.join(outputDir, file);

      console.log(`Processing ${file}...`);

      // Backup original first
      fs.copyFileSync(inputPath, backupPath);

      // Optimize original using temporary file
      const tempPath = inputPath + ".tmp";
      await sharp(inputPath)
        .resize(1920, 1080, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 85 })
        .toFile(tempPath);

      // Replace original with optimized version
      fs.renameSync(tempPath, inputPath);

      console.log(`✅ Optimized ${file}`);
    }

    console.log("🎉 All originals optimized successfully!");
    console.log("📁 Original files backed up to photography-backup/");
  } catch (error) {
    console.error("❌ Error processing images:", error);
  }
}

optimizeOriginals();
