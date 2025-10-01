const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function optimizeAllMedia() {
  console.log("🚀 Optimizando todos los archivos de media...\n");

  // Optimizar imágenes de fotografía
  console.log("📸 Optimizando imágenes de fotografía...");
  const photoDir = "public/media/images/photography";
  const photoFiles = fs.readdirSync(photoDir);
  
  for (const file of photoFiles) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(photoDir, file);
      const tempPath = inputPath + '.tmp';
      
      console.log(`  Procesando ${file}...`);
      
      await sharp(inputPath)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(tempPath);
      
      fs.renameSync(tempPath, inputPath);
    }
  }

  // Optimizar thumbnails
  console.log("🖼️ Optimizando thumbnails...");
  const thumbDir = "public/media/images/thumbnails";
  const thumbFiles = fs.readdirSync(thumbDir);
  
  for (const file of thumbFiles) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(thumbDir, file);
      const tempPath = inputPath + '.tmp';
      
      console.log(`  Procesando ${file}...`);
      
      await sharp(inputPath)
        .resize(400, 600, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 75 })
        .toFile(tempPath);
      
      fs.renameSync(tempPath, inputPath);
    }
  }

  // Optimizar imágenes web
  console.log("🌐 Optimizando imágenes web...");
  const webDir = "public/media/images/web";
  const webFiles = fs.readdirSync(webDir);
  
  for (const file of webFiles) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const inputPath = path.join(webDir, file);
      const tempPath = inputPath + '.tmp';
      
      console.log(`  Procesando ${file}...`);
      
      await sharp(inputPath)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(tempPath);
      
      fs.renameSync(tempPath, inputPath);
    }
  }

  // Optimizar hero images
  console.log("🎨 Optimizando hero images...");
  const heroDir = "public/media/images/hero";
  const heroFiles = fs.readdirSync(heroDir);
  
  for (const file of heroFiles) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(heroDir, file);
      const tempPath = inputPath + '.tmp';
      
      console.log(`  Procesando ${file}...`);
      
      await sharp(inputPath)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(tempPath);
      
      fs.renameSync(tempPath, inputPath);
    }
  }

  console.log("\n✅ Optimización completada!");
  
  // Mostrar tamaños finales
  const { execSync } = require('child_process');
  console.log("\n📊 Tamaños finales:");
  execSync('du -sh public/media/', { stdio: 'inherit' });
}

optimizeAllMedia().catch(console.error);
