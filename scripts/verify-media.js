const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando archivos de media...\n');

// Verificar estructura de carpetas
const mediaPaths = [
  'public/media/images/hero',
  'public/media/images/photography', 
  'public/media/images/thumbnails',
  'public/media/images/web',
  'public/media/videos/portfolio',
  'public/media/videos/thumbnails',
  'public/media/assets/logos'
];

mediaPaths.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    console.log(`✅ ${dir}: ${files.length} archivos`);
    if (files.length > 0) {
      console.log(`   Ejemplos: ${files.slice(0, 3).join(', ')}`);
    }
  } else {
    console.log(`❌ ${dir}: NO EXISTE`);
  }
});

// Verificar archivos específicos
const criticalFiles = [
  'public/media/images/hero/hero-image.jpg',
  'public/media/images/hero/hero-image-mobile.jpg',
  'public/media/assets/logos/bytelogo.png',
  'public/media/images/web/clonetflix.png',
  'public/media/images/web/remitt.png',
  'public/media/images/web/beyourmotorbike.png'
];

console.log('\n🔍 Verificando archivos críticos...');
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    console.log(`✅ ${file}: ${(stats.size / 1024).toFixed(1)}KB`);
  } else {
    console.log(`❌ ${file}: NO EXISTE`);
  }
});

console.log('\n✅ Verificación completada');
