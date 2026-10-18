import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { APPLEBEEZ_MENU } from '../src/data/applebeezMenu.js';

console.log('==================================================');
console.log('AUDITING APPLE BEEZ MENU & IMAGES');
console.log('==================================================');
console.log(`Total menu items: ${APPLEBEEZ_MENU.length}`);

const report = [];
const hashMap = new Map();
let externalCount = 0;

for (const item of APPLEBEEZ_MENU) {
  const imgPath = item.image;
  
  if (!imgPath.startsWith('/images/apple-beez/')) {
    externalCount++;
    report.push({
      id: item.id,
      name: item.name,
      category: item.category,
      imgPath,
      valid: false,
      reason: 'Not a local /images/apple-beez/ path'
    });
    continue;
  }

  const localFile = path.resolve('public' + imgPath);
  if (!fs.existsSync(localFile)) {
    report.push({
      id: item.id,
      name: item.name,
      category: item.category,
      imgPath,
      valid: false,
      reason: 'File does not exist on disk'
    });
    continue;
  }

  const buf = fs.readFileSync(localFile);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  const sizeKb = (buf.length / 1024).toFixed(1);

  if (!hashMap.has(hash)) {
    hashMap.set(hash, []);
  }
  hashMap.get(hash).push({ id: item.id, name: item.name, file: path.basename(localFile) });

  report.push({
    id: item.id,
    name: item.name,
    category: item.category,
    imgPath,
    sizeKb,
    hash,
    valid: true
  });
}

const validItems = report.filter(r => r.valid);
const invalidItems = report.filter(r => !r.valid);
const duplicateHashes = [...hashMap.entries()].filter(([_, list]) => list.length > 1);

console.log(`\nItems with valid local images: ${validItems.length} / ${APPLEBEEZ_MENU.length}`);
console.log(`Invalid / missing / external: ${invalidItems.length}`);
console.log(`Unique image files / hashes: ${hashMap.size}`);
console.log(`Duplicate hash groups: ${duplicateHashes.length}`);

if (invalidItems.length > 0) {
  console.log('\nIssues found:');
  invalidItems.forEach(inv => console.log(`  - [${inv.id}] ${inv.name}: ${inv.reason} (${inv.imgPath})`));
}

if (duplicateHashes.length > 0) {
  console.log('\nDuplicate hash groups:');
  for (const [hash, list] of duplicateHashes) {
    console.log(`  Hash ${hash.slice(0, 12)}... shared by ${list.length} dishes:`);
    list.forEach(d => console.log(`    - [${d.id}] ${d.name} (${d.file})`));
  }
}

// Category breakdown
const catMap = {};
for (const item of APPLEBEEZ_MENU) {
  catMap[item.category] = (catMap[item.category] || 0) + 1;
}
console.log('\nMenu items per category:');
Object.entries(catMap).forEach(([cat, count]) => {
  console.log(`  - ${cat}: ${count} items`);
});

console.log('==================================================');
if (invalidItems.length === 0 && duplicateHashes.length === 0) {
  console.log('✅ AUDIT PASSED: 100% of items have unique, valid local images!');
  process.exit(0);
} else {
  console.log('❌ AUDIT FAILED: Issues must be resolved.');
  process.exit(1);
}
