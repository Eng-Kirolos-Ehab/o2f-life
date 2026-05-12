const fs = require('fs');
const path = require('path');

const site = path.join(__dirname, '..', '_site');
const pairs = [
  ['en/home-v2/index.html', 'en/index.html'],
  ['ar/home-v2/index.html', 'ar/index.html']
];

for (const pair of pairs) {
  const source = path.join(site, pair[0]);
  const target = path.join(site, pair[1]);

  if (!fs.existsSync(source)) {
    throw new Error('Missing Home V2 source: ' + pair[0]);
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  console.log('Promoted ' + pair[0] + ' -> ' + pair[1]);
}
