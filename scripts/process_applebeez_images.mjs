import fs from 'fs';
import path from 'path';

const targetDir = path.resolve('public/images/apple-beez');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

export const APPLEBEEZ_IMAGE_MAP = [
  // BATCH 1 (Items 1 - 20)
  { id: 'ab-snk-1', filename: 'ab-snk-1_veg-noodles.jpg', localSrc: 'public/images/canteen/cc-ch-1_veg-noodles.jpg' },
  { id: 'ab-snk-2', filename: 'ab-snk-2_egg-noodles.jpg', url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-3', filename: 'ab-snk-3_chili-garlic-pasta.jpg', url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-4', filename: 'ab-snk-4_veg-manchurian.jpg', localSrc: 'public/images/canteen/cc-ch-4_veg-manchurian.jpg' },
  { id: 'ab-snk-5', filename: 'ab-snk-5_veg-spring-roll.jpg', localSrc: 'public/images/canteen/cc-snk-9_spring-roll-veg.jpg' },
  { id: 'ab-snk-6', filename: 'ab-snk-6_veg-kathi-roll.jpg', localSrc: 'public/images/canteen/cc-rl-1_veg-roll.jpg' },
  { id: 'ab-snk-7', filename: 'ab-snk-7_egg-kathi-roll.jpg', localSrc: 'public/images/canteen/cc-rl-3_egg-roll.jpg' },
  { id: 'ab-snk-8', filename: 'ab-snk-8_cheese-kathi-roll.jpg', localSrc: 'public/images/canteen/cc-rl-2_paneer-roll.jpg' },
  { id: 'ab-snk-9', filename: 'ab-snk-9_chana-bhatura.jpg', localSrc: 'public/images/canteen/cc-bf-1_chole-bhature.jpg' },
  { id: 'ab-snk-10', filename: 'ab-snk-10_aloo-bhatura.jpg', url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-11', filename: 'ab-snk-11_veg-burger.jpg', localSrc: 'public/images/canteen/cc-bg-1_veg-burger.jpg' },
  { id: 'ab-snk-12', filename: 'ab-snk-12_chilli-paneer.jpg', localSrc: 'public/images/canteen/cc-ch-7_chilli-paneer.jpg' },
  { id: 'ab-snk-13', filename: 'ab-snk-13_grilled-sandwich.jpg', localSrc: 'public/images/canteen/cc-sw-5_grilled-sandwich.jpg' },
  { id: 'ab-snk-14', filename: 'ab-snk-14_bread-omlette.jpg', localSrc: 'public/images/canteen/cc-bf-5_bread-omelette.jpg' },
  { id: 'ab-snk-15', filename: 'ab-snk-15_veg-fried-rice.jpg', localSrc: 'public/images/canteen/cc-mc-7_mix-veg-rice.jpg' },
  { id: 'ab-snk-16', filename: 'ab-snk-16_egg-fried-rice.jpg', url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-17', filename: 'ab-snk-17_dahi-papdi.jpg', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-18', filename: 'ab-snk-18_vegetable-maggi.jpg', url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-19', filename: 'ab-snk-19_cheese-maggi.jpg', url: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-20', filename: 'ab-snk-20_egg-bhurji.jpg', url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80' },

  // BATCH 2 (Items 21 - 40)
  { id: 'ab-snk-21', filename: 'ab-snk-21_paneer-bhurji.jpg', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-22', filename: 'ab-snk-22_white-sauce-pasta.jpg', localSrc: 'public/images/canteen/cc-ps-2_white-sauce-pasta.jpg' },
  { id: 'ab-snk-23', filename: 'ab-snk-23_white-sauce-pasta-cheese.jpg', localSrc: 'public/images/canteen/cc-ps-4_cheese-pasta.jpg' },
  { id: 'ab-snk-24', filename: 'ab-snk-24_red-sauce-pasta.jpg', localSrc: 'public/images/canteen/cc-ps-1_red-sauce-pasta.jpg' },
  { id: 'ab-snk-25', filename: 'ab-snk-25_red-sauce-pasta-cheese.jpg', localSrc: 'public/images/canteen/cc-ps-3_mixed-sauce-pasta.jpg' },
  { id: 'ab-snk-26', filename: 'ab-snk-26_veg-soup.jpg', url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-27', filename: 'ab-snk-27_veg-momos.jpg', url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-28', filename: 'ab-snk-28_pizza-onion-capsicum.jpg', localSrc: 'public/images/canteen/cc-pz-1_margherita.jpg' },
  { id: 'ab-snk-29', filename: 'ab-snk-29_pizza-tomato-corn.jpg', url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-30', filename: 'ab-snk-30_pizza-farmhouse.jpg', localSrc: 'public/images/canteen/cc-pz-2_farmhouse.jpg' },
  { id: 'ab-snk-31', filename: 'ab-snk-31_pizza-spicy-paneer.jpg', localSrc: 'public/images/canteen/cc-pz-3_paneer-pizza.jpg' },
  { id: 'ab-snk-32', filename: 'ab-snk-32_pizza-extra-cheese.jpg', localSrc: 'public/images/canteen/cc-pz-4_cheese-pizza.jpg' },
  { id: 'ab-snk-33', filename: 'ab-snk-33_veg-wrap.jpg', url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-34', filename: 'ab-snk-34_paneer-wrap.jpg', url: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-snk-35', filename: 'ab-snk-35_peri-peri-fries.jpg', url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-mc-1', filename: 'ab-mc-1_rajma-chawal.jpg', localSrc: 'public/images/canteen/cc-mc-2_rajma-chawal.jpg' },
  { id: 'ab-mc-2', filename: 'ab-mc-2_kadhi-chawal.jpg', localSrc: 'public/images/canteen/cc-mc-4_kadhi-chawal.jpg' },
  { id: 'ab-mc-3', filename: 'ab-mc-3_chole-chawal.jpg', localSrc: 'public/images/canteen/cc-mc-3_chole-chawal.jpg' },
  { id: 'ab-mc-4', filename: 'ab-mc-4_chilli-potato.jpg', localSrc: 'public/images/canteen/cc-ch-6_chilli-potato.jpg' },
  { id: 'ab-bev-1', filename: 'ab-bev-1_boiled-milk.jpg', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80' },

  // BATCH 3 (Items 41 - 60)
  { id: 'ab-bev-2', filename: 'ab-bev-2_hot-coffee.jpg', url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-3', filename: 'ab-bev-3_cold-coffee.jpg', localSrc: 'public/images/canteen/cc-bv-4_cold-coffee.jpg' },
  { id: 'ab-bev-4', filename: 'ab-bev-4_banana-shake.jpg', url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-5', filename: 'ab-bev-5_butterscotch-shake.jpg', url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-6', filename: 'ab-bev-6_mango-shake.jpg', url: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-7', filename: 'ab-bev-7_oreo-shake.jpg', url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-8', filename: 'ab-bev-8_cold-drink.jpg', localSrc: 'public/images/canteen/cc-bv-7_soft-drinks-500ml.jpg' },
  { id: 'ab-bev-9', filename: 'ab-bev-9_coke.jpg', url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-10', filename: 'ab-bev-10_energy-drink.jpg', localSrc: 'public/images/canteen/cc-bv-8_red-bull.jpg' },
  { id: 'ab-bev-11', filename: 'ab-bev-11_real-juice.jpg', url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-12', filename: 'ab-bev-12_lassi.jpg', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-13', filename: 'ab-bev-13_nimbooz.jpg', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-14', filename: 'ab-bev-14_coke-can.jpg', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-15', filename: 'ab-bev-15_biscuit.jpg', url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-16', filename: 'ab-bev-16_chocolate.jpg', url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-17', filename: 'ab-bev-17_chips.jpg', url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-18', filename: 'ab-bev-18_namkeen.jpg', url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-19', filename: 'ab-bev-19_ice-cream.jpg', localSrc: 'public/images/canteen/cc-ds-2_ice-cream-cup.jpg' },
  { id: 'ab-bev-20', filename: 'ab-bev-20_verka-kheer.jpg', url: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-21', filename: 'ab-bev-21_hot-gulab-jamun.jpg', localSrc: 'public/images/canteen/cc-ds-3_gulab-jamun-2-pcs.jpg' },

  // BATCH 4 (Items 61 - 65)
  { id: 'ab-bev-22', filename: 'ab-bev-22_black-forest-pastry.jpg', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-23', filename: 'ab-bev-23_strawberry-pastry.jpg', url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-24', filename: 'ab-bev-24_pineapple-pastry.jpg', url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-25', filename: 'ab-bev-25_black-forest-cake.jpg', url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop&q=80' },
  { id: 'ab-bev-26', filename: 'ab-bev-26_pineapple-cake.jpg', url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop&q=80' }
];

async function processBatch(batchNum, items) {
  console.log(`\n========================================`);
  console.log(`Starting Batch ${batchNum} (${items.length} items)...`);
  console.log(`========================================`);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const dest = path.join(targetDir, item.filename);

    if (item.localSrc) {
      fs.copyFileSync(item.localSrc, dest);
      console.log(`[Batch ${batchNum}] [${i + 1}/${items.length}] Copied local: ${item.id} -> ${item.filename}`);
    } else if (item.url) {
      const res = await fetch(item.url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${item.url}: HTTP ${res.status}`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`[Batch ${batchNum}] [${i + 1}/${items.length}] Downloaded: ${item.id} -> ${item.filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
    }
  }

  console.log(`Batch ${batchNum} completed successfully!`);
}

async function main() {
  const batch1 = APPLEBEEZ_IMAGE_MAP.slice(0, 20);
  const batch2 = APPLEBEEZ_IMAGE_MAP.slice(20, 40);
  const batch3 = APPLEBEEZ_IMAGE_MAP.slice(40, 60);
  const batch4 = APPLEBEEZ_IMAGE_MAP.slice(60, 65);

  await processBatch(1, batch1);
  await processBatch(2, batch2);
  await processBatch(3, batch3);
  await processBatch(4, batch4);

  console.log('\nAll 4 batches processed successfully!');
}

main().catch(err => {
  console.error('Error during image processing:', err);
  process.exit(1);
});
