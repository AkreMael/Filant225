const fs = require('fs');
const path = require('path');
const https = require('https');
const { Jimp } = require('jimp');

const logoUrl = 'https://i.supaimg.com/0543a7e5-673b-44b9-9668-8152c5aea01b/49d4592c-b74d-4904-b209-a32e8c921f1b.png';
const tempLogoPath = path.join(__dirname, 'official_logo.png');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading official FILANT°225 logo...');
  try {
    await download(logoUrl, tempLogoPath);
    console.log('Logo downloaded to:', tempLogoPath);
  } catch (e) {
    console.warn('Direct download error:', e.message);
  }

  const logoFile = fs.existsSync(tempLogoPath) ? tempLogoPath : path.join(__dirname, '../public/icons/icon-512x512.png');
  const buffer = fs.readFileSync(logoFile);
  const image = await Jimp.read(buffer);

  // Mipmap icons
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
    console.log(`Generated mipmap: ${dir} (${size}x${size})`);
  }

  // Splash screens
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
  }

  console.log('Successfully generated all Android resources with official FILANT°225 branding!');
}

main().catch(console.error);
