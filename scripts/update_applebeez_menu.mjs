import fs from 'fs';
import path from 'path';
import { APPLEBEEZ_IMAGE_MAP } from './process_applebeez_images.mjs';

const menuFilePath = path.resolve('src/data/applebeezMenu.js');
let content = fs.readFileSync(menuFilePath, 'utf8');

console.log('Original content length:', content.length);

let updatedCount = 0;

for (const mapping of APPLEBEEZ_IMAGE_MAP) {
  // Regex to find the object block for this item id, and replace its image line
  // Example match:
  // id: 'ab-snk-1',
  // ...
  // image: 'https://...'
  const idRegex = new RegExp(`(id:\\s*['"]${mapping.id}['"][\\s\\S]*?image:\\s*)['"][^'"]+['"]`);
  
  if (idRegex.test(content)) {
    content = content.replace(idRegex, `$1'/images/apple-beez/${mapping.filename}'`);
    updatedCount++;
  } else {
    console.error(`Could not find id: ${mapping.id} in menu file!`);
  }
}

console.log(`Updated ${updatedCount} / ${APPLEBEEZ_IMAGE_MAP.length} items.`);

fs.writeFileSync(menuFilePath, content, 'utf8');
console.log('Successfully wrote updated applebeezMenu.js!');
