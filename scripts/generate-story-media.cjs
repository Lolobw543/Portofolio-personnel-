const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function processPhoto(id, destName, width = 1200, height = 800, tint = null) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=85`;
  const raw = await fetchBuffer(url);
  const destPath = path.join(__dirname, "../public/images/story", destName);

  let pipeline = sharp(raw)
    .resize(width, height, { fit: "cover" })
    .modulate({ saturation: 1.1, brightness: 0.98 });

  await pipeline
    .webp({ quality: 85, effort: 4 })
    .toFile(destPath);

  console.log(`Saved ${destName}: ${fs.statSync(destPath).size} bytes`);
}

async function main() {
  const storyDir = path.join(__dirname, "../public/images/story");
  if (!fs.existsSync(storyDir)) fs.mkdirSync(storyDir, { recursive: true });

  // Act 1: Sky
  await processPhoto("photo-1527977966376-1c8408f9f108", "sky-silhouette.webp", 800, 1000); // Child/silhouette gazing upward
  await processPhoto("photo-1508614589041-895b88991e3e", "sky-first-drone.webp", 1200, 800); // Drone in flight dusk
  await processPhoto("photo-1508739773434-c26b3d09e071", "sky-field-remote.webp", 800, 1000); // Remote / field atmosphere
  await processPhoto("photo-1516541196182-6bdb0516ed27", "sky-countryside.webp", 1200, 800); // Landscape from above

  // Act 2: Code
  await processPhoto("photo-1517694712202-14dd9538aa97", "code-night-room.webp", 1200, 800); // Room at night with laptop glow
  await processPhoto("photo-1555066931-4365d14bab8c", "code-screen.webp", 800, 1000); // Lines of code on screen
  await processPhoto("photo-1518770660439-4636190af475", "code-electronics.webp", 800, 1000); // Components / maker desk

  // Act 3: Split screen elements
  await processPhoto("photo-1508614589041-895b88991e3e", "split-sky.webp", 960, 1080); // Left sky half
  await processPhoto("photo-1526374965328-7f61d4dc18c5", "split-code.webp", 960, 1080); // Right code half

  console.log("All story media generated successfully!");
}

main().catch(console.error);
