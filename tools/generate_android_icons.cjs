const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function generateIcons() {
  const sourcePath = path.join(__dirname, '../public/icons/icon-512x512.png');
  if (!fs.existsSync(sourcePath)) {
    console.error('Source icon not found:', sourcePath);
    return;
  }

  const image = await Jimp.read(sourcePath);

  const mipmapSizes = [
    { dir: 'mipmap-mdpi', size: 48 },
    { dir: 'mipmap-hdpi', size: 72 },
    { dir: 'mipmap-xhdpi', size: 96 },
    { dir: 'mipmap-xxhdpi', size: 144 },
    { dir: 'mipmap-xxxhdpi', size: 192 }
  ];

  for (const { dir, size } of mipmapSizes) {
    const targetDir = path.join(__dirname, '../android/app/src/main/res', dir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const cloned = image.clone().resize({ w: size, h: size });
    await cloned.write(path.join(targetDir, 'ic_launcher.png'));
    await cloned.write(path.join(targetDir, 'ic_launcher_round.png'));
    await cloned.write(path.join(targetDir, 'ic_launcher_foreground.png'));
    console.log(`Generated icons for ${dir} (${size}x${size})`);
  }

  const splashSizes = [
    { dir: 'drawable-port-mdpi', w: 320, h: 480 },
    { dir: 'drawable-port-hdpi', w: 480, h: 800 },
    { dir: 'drawable-port-xhdpi', w: 720, h: 1280 },
    { dir: 'drawable-port-xxhdpi', w: 960, h: 1600 },
    { dir: 'drawable-port-xxxhdpi', w: 1280, h: 1920 },
    { dir: 'drawable-land-mdpi', w: 480, h: 320 },
    { dir: 'drawable-land-hdpi', w: 800, h: 480 },
    { dir: 'drawable-land-xhdpi', w: 1280, h: 720 },
    { dir: 'drawable-land-xxhdpi', w: 1600, h: 960 },
    { dir: 'drawable-land-xxxhdpi', w: 1920, h: 1280 }
  ];

  for (const { dir, w, h } of splashSizes) {
    const splashDir = path.join(__dirname, '../android/app/src/main/res', dir);
    if (!fs.existsSync(splashDir)) {
      fs.mkdirSync(splashDir, { recursive: true });
    }
    const iconScaled = image.clone().resize({ w: Math.min(w, h) * 0.4, h: Math.min(w, h) * 0.4 });
    const bg = new Jimp({ width: w, height: h, color: 0x050811ff });
    const xPos = Math.round((w - iconScaled.width) / 2);
    const yPos = Math.round((h - iconScaled.height) / 2);
    bg.composite(iconScaled, xPos, yPos);
    await bg.write(path.join(splashDir, 'splash.png'));
    console.log(`Generated splash for ${dir}`);
  }

  console.log('All Android icons and splashes generated successfully!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
});
