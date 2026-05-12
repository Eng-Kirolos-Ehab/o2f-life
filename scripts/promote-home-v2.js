const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const site = path.join(root, '_site');

const pairs = [
  ['en/home-v2/index.html', 'en/index.html'],
  ['ar/home-v2/index.html', 'ar/index.html']
];

for (const [from, to] of pairs) {
  const source = path.join(site, from);
  const target = path.join(site, to);
  if (!fs.existsSync(source)) {
    console.warn(`[home-v2] Missing source: ${source}`);
    continue;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  console.log(`[home-v2] Promoted ${from} -> ${to}`);
}
