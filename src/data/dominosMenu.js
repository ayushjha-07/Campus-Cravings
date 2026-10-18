// Domino's - Official Menu Data for CGC University, Mohali
// Extracted from original Domino's food truck window menu board

export const DOMINOS_MENU = [
  // 1. Pizzas (10 items, each with Regular & Medium size variants)
  {
    id: 'dm-pz-1',
    name: 'Margherita',
    category: 'Pizza',
    price: 99,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Classic delight with 100% real mozzarella cheese on fresh hand-stretched crust.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Regular', price: 99 },
      { name: 'Medium', price: 199 }
    ]
  },
  {
    id: 'dm-pz-2',
    name: 'Farmhouse',
    category: 'Pizza',
    price: 179,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Delightful combination of crunchy onion, crisp capsicum, grilled mushroom & fresh tomato.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Regular', price: 179 },
      { name: 'Medium', price: 299 }
    ]
  },
  {
    id: 'dm-pz-3',
    name: 'Peppy Paneer',
    category: 'Pizza',
    price: 179,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Flavorful trio of juicy paneer chunks, crisp capsicum with spicy red paprika.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Regular', price: 179 },
      { name: 'Medium', price: 299 }
    ]
  },
  {
    id: 'dm-pz-4',
    name: 'Mexican Green Wave',
    category: 'Pizza',
    price: 179,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Mexican herb-sprinkled crunchy onions, crisp capsicum, fresh tomatoes and spicy jalapenos.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80',
    isPopular: false,
    variants: [
      { name: 'Regular', price: 179 },
      { name: 'Medium', price: 299 }
    ]
  },
  {
    id: 'dm-pz-5',
    name: 'Veg Extravaganza',
    category: 'Pizza',
    price: 199,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Overload of black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Regular', price: 199 },
      { name: 'Medium', price: 329 }
    ]
  },
  {
    id: 'dm-pz-6',
    name: 'Cheese n Corn',
    category: 'Pizza',
    price: 149,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Sweet juicy golden corn kernels smothered in generous melting mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80',
    isPopular: false,
    variants: [
      { name: 'Regular', price: 149 },
      { name: 'Medium', price: 259 }
    ]
  },
  {
    id: 'dm-pz-7',
    name: 'Double Cheese Margherita',
    category: 'Pizza',
    price: 179,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Loaded with extra gooey 100% mozzarella cheese over herbed tomato sauce.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Regular', price: 179 },
      { name: 'Medium', price: 299 }
    ]
  },
  {
    id: 'dm-pz-8',
    name: 'Chicken Dominator',
    category: 'Pizza',
    price: 199,
    isVeg: false,
    isAvailable: true,
    rating: 4.9,
    description: 'Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rasher.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Regular', price: 199 },
      { name: 'Medium', price: 329 }
    ]
  },
  {
    id: 'dm-pz-9',
    name: 'Chicken Tikka',
    category: 'Pizza',
    price: 179,
    isVeg: false,
    isAvailable: true,
    rating: 4.8,
    description: 'Succulent boneless chicken tikka boti, sliced onions, capsicum and melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    isPopular: false,
    variants: [
      { name: 'Regular', price: 179 },
      { name: 'Medium', price: 299 }
    ]
  },
  {
    id: 'dm-pz-10',
    name: 'Non Veg Supreme',
    category: 'Pizza',
    price: 199,
    isVeg: false,
    isAvailable: true,
    rating: 4.9,
    description: 'Supreme combination of black olives, onion, capsicum, mushroom, pepper barbecue chicken & peri-peri chicken.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Regular', price: 199 },
      { name: 'Medium', price: 329 }
    ]
  },

  // 2. Sides (8 items)
  {
    id: 'dm-sd-1',
    name: 'Garlic Breadsticks (4 pcs)',
    category: 'Sides',
    price: 109,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Baked to perfection fresh garlic breadsticks sprinkled with exotic Italian herbs (4 pieces).',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dm-sd-2',
    name: 'Cheesy Garlic Bread',
    category: 'Sides',
    price: 149,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Fresh baked bread glazed with roasted garlic butter and smothered in bubbling melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dm-sd-3',
    name: 'Stuffed Garlic Bread',
    category: 'Sides',
    price: 169,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Freshly baked stuffed bread with cheese, sweet corn and sliced tangy jalapenos.',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dm-sd-4',
    name: 'Chicken Wings (4 pcs)',
    category: 'Sides',
    price: 179,
    isVeg: false,
    isAvailable: true,
    rating: 4.7,
    description: 'Oven-roasted tender chicken wings coated with spicy barbecue glaze (4 pieces).',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dm-sd-5',
    name: 'Chicken Boneless Strips (4 pcs)',
    category: 'Sides',
    price: 189,
    isVeg: false,
    isAvailable: true,
    rating: 4.8,
    description: 'Crispy fried boneless tender chicken strips served with choice of dip (4 pieces).',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dm-sd-6',
    name: 'Potato Cheese Shots (4 pcs)',
    category: 'Sides',
    price: 129,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Crispy golden potato nuggets stuffed with melting gooey herb cheese inside (4 pieces).',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dm-sd-7',
    name: 'Cheesy Dip',
    category: 'Sides',
    price: 40,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Creamy jalapeño-infused rich cheese dip, the ultimate partner for garlic bread and pizza crusts.',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dm-sd-8',
    name: 'Peri Peri Dip',
    category: 'Sides',
    price: 40,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Fiery spicy peri-peri herb dip crafted for extra crunch and heat.',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 3. Beverages (5 items)
  {
    id: 'dm-bv-1',
    name: 'Pepsi (475 ml)',
    category: 'Beverages',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Chilled 475ml pet bottle of sparkling classic Pepsi cola.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dm-bv-2',
    name: '7up (475 ml)',
    category: 'Beverages',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.5,
    description: 'Refreshing lemon-lime bubbly soda in a chilled 475ml bottle.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dm-bv-3',
    name: 'Mountain Dew (475 ml)',
    category: 'Beverages',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'High-energy citrus blast chilled 475ml bottle of Mountain Dew.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dm-bv-4',
    name: 'Mirinda (475 ml)',
    category: 'Beverages',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.5,
    description: 'Sweet vibrant orange fizzy fruit soda in a 475ml bottle.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dm-bv-5',
    name: 'Bottled Water',
    category: 'Beverages',
    price: 20,
    isVeg: true,
    isAvailable: true,
    rating: 4.4,
    description: 'Purified mineral drinking water sealed bottle.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 4. Desserts (2 items)
  {
    id: 'dm-ds-1',
    name: 'Choco Lava Cake',
    category: 'Desserts',
    price: 109,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Decadent chocolate cake with a rich molten liquid chocolate center served warm.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dm-ds-2',
    name: 'Choco Brownie',
    category: 'Desserts',
    price: 89,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Fudgy Dutch chocolate brownie infused with crunchy chocolate chips.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  }
];
