// Compress dashboard profile pic: same look, much smaller file (e.g. 858 KB -> ~80–150 KB).
// Run: npm install && npm run optimize-image
// Then in dashboard.html change the profile img src to: wedding_image_crop_opt.jpg
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, 'wedding_image_crop.JPEG');
const output = path.join(__dirname, 'wedding_image_crop_opt.jpg');

if (!fs.existsSync(input)) {
  console.log('wedding_image_crop.JPEG not found. Skipping.');
  process.exit(0);
}

sharp(input)
  .resize(600, 600, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(output)
  .then((info) => {
    console.log('Created wedding_image_crop_opt.jpg —', Math.round(info.size / 1024), 'KB');
    console.log('In dashboard.html set profile img src to: wedding_image_crop_opt.jpg');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
