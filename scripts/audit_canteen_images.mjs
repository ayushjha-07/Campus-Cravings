import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { CANTEEN_MENU } from '../src/data/canteenMenu.js';

const dir = './public/images/canteen';

console.log(`Auditing ${CANTEEN_MENU.length} items from CANTEEN_MENU...`);

const report = [];
const hashMap = new Map();

for (const item of CANTEEN_MENU) {
  const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const filename = `${item.id}_${slug}.jpg`;
  const filePath = path.join(dir, filename);
  
  if (!fs.existsSync(filePath)) {
    report.push({ item, filename, exists: false });
  } else {
    const buf = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    const size = buf.length;
    
    if (!hashMap.has(hash)) {
      hashMap.set(hash, []);
    }
    hashMap.get(hash).push({ id: item.id, name: item.name, filename });
    
    report.push({ item, filename, exists: true, size, hash });
  }
}

const missing = report.filter(r => !r.exists);
console.log(`\nExisting files: ${report.filter(r => r.exists).length} / ${CANTEEN_MENU.length}`);
console.log(`Missing files: ${missing.length}`);
if (missing.length > 0) {
  console.log('Missing items:');
  missing.forEach(m => console.log(`  - [${m.item.id}] ${m.item.name} (${m.item.category}) -> ${m.filename}`));
}

console.log(`\nUnique hashes: ${hashMap.size}`);
const duplicateHashes = [...hashMap.entries()].filter(([_, list]) => list.length > 1);
console.log(`Duplicate hash groups: ${duplicateHashes.length}`);
for (const [hash, list] of duplicateHashes) {
  console.log(`\nHash ${hash.slice(0, 16)}... shared by ${list.length} items:`);
  list.forEach(it => console.log(`  - [${it.id}] ${it.name} (${it.filename})`));
}

// Check for oversized files (> 2MB)
const oversized = report.filter(r => r.exists && r.size > 2 * 1024 * 1024);
if (oversized.length > 0) {
  console.log(`\nOversized files (>2MB): ${oversized.length}`);
  oversized.forEach(o => console.log(`  - ${o.filename}: ${(o.size / (1024 * 1024)).toFixed(2)} MB`));
}
