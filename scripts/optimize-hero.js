const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function optimizeHero() {
  const heroDir = "public/media/images/hero";

  try {
    console.log("🎨 Optimizing hero images...");

    // Optimize desktop version
    const desktopInput = path.join(heroDir, "hero-image.jpg");
    const desktopOutput = path.join(heroDir, "hero-image-optimized.jpg");

    if (fs.existsSync(desktopInput)) {
      console.log("📱 Optimizing desktop hero...");
      await sharp(desktopInput)
        .resize(1920, 1080, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 85 })
        .toFile(desktopOutput);

      // Replace original with optimized
      fs.renameSync(desktopOutput, desktopInput);
      console.log("✅ Desktop hero optimized");
    }

    // Optimize mobile version
    const mobileInput = path.join(heroDir, "hero-image-mobile.jpg");
    const mobileOutput = path.join(heroDir, "hero-image-mobile-optimized.jpg");

    if (fs.existsSync(mobileInput)) {
      console.log("📱 Optimizing mobile hero...");
      await sharp(mobileInput)
        .resize(768, 1024, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 85 })
        .toFile(mobileOutput);

      // Replace original with optimized
      fs.renameSync(mobileOutput, mobileInput);
      console.log("✅ Mobile hero optimized");
    }

    console.log("🎉 Hero images optimized successfully!");

    // Show file sizes
    const desktopSize = fs.statSync(desktopInput).size;
    const mobileSize = fs.statSync(mobileInput).size;

    console.log(`📊 Desktop: ${(desktopSize / 1024).toFixed(1)}KB`);
    console.log(`📊 Mobile: ${(mobileSize / 1024).toFixed(1)}KB`);
  } catch (error) {
    console.error("❌ Error optimizing hero images:", error);
  }
}

optimizeHero();
