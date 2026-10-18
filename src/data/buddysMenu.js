// Buddy's Bistro - Official Menu Data for CGC University, Mohali
// Extracted from original vendor physical menu boards (Parts 1 & 2)

export const BUDDYS_BISTRO_MENU = [
  // 1. Pizza (6 items)
  {
    id: 'bb-pz-1',
    name: 'Veg Pizza',
    category: 'Pizza',
    price: 180,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Crispy stone-baked crust topped with rich tomato sauce, onions, crisp capsicum and melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-pz-2',
    name: 'Paneer Makhani Pizza',
    category: 'Pizza',
    price: 200,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Rich fusion pizza topped with creamy makhani gravy, soft spiced paneer cubes and mozzarella.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-pz-3',
    name: 'Sweet Corn Pizza',
    category: 'Pizza',
    price: 180,
    isVeg: true,
    isAvailable: true,
    rating: 4.5,
    description: 'Generously loaded with sweet American golden corn, Italian herbs and gooey melted cheese.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-pz-4',
    name: 'Cheese Pizza',
    category: 'Pizza',
    price: 220,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Ultimate four-cheese indulgence with double mozzarella layer, cheddar and herb drizzle.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-pz-5',
    name: 'Mix Pizza',
    category: 'Pizza',
    price: 210,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Loaded with a colorful medley of paneer, sweet corn, mushrooms, bell peppers and onions.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-pz-6',
    name: 'Chicken Pizza',
    category: 'Pizza',
    price: 220,
    isVeg: false,
    isAvailable: true,
    rating: 4.9,
    description: 'Tender seasoned chicken chunks, smoky barbecue glaze, sliced onions and mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 2. Burger (3 items)
  {
    id: 'bb-bg-1',
    name: 'Veg Burger',
    category: 'Burger',
    price: 50,
    isVeg: true,
    isAvailable: true,
    rating: 4.5,
    description: 'Crisp seasoned vegetable patty, sliced tomatoes, crunchy onions and creamy bistro mayo.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-bg-2',
    name: 'Veg Cheese Burger',
    category: 'Burger',
    price: 70,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Crispy veggie patty blanketed under melted cheddar cheese slice with crunchy lettuce and herb sauce.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-bg-3',
    name: 'Double Tikki Burger',
    category: 'Burger',
    price: 70,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Two golden fried spiced potato tikkis stacked with zesty chutney and house special seasoning.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 3. Sandwich (4 items)
  {
    id: 'bb-sw-1',
    name: 'Veg Sandwich',
    category: 'Sandwich',
    price: 90,
    isVeg: true,
    isAvailable: true,
    rating: 4.5,
    description: 'Fresh sliced cucumbers, ripe tomatoes, bell peppers and mint green chutney grilled golden crisp.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-sw-2',
    name: 'Paneer Makhani Sandwich',
    category: 'Sandwich',
    price: 120,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Tender paneer cubes tossed in rich butter makhani sauce grilled between artisan bread slices.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-sw-3',
    name: 'Sweet Corn Sandwich',
    category: 'Sandwich',
    price: 100,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Juicy American sweet corn kernels combined with creamy mayo and herbs inside toasted bread.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-sw-4',
    name: 'Chicken Sandwich',
    category: 'Sandwich',
    price: 130,
    isVeg: false,
    isAvailable: true,
    rating: 4.8,
    description: 'Generously packed with seasoned shredded chicken, black pepper mayo and crisp iceberg lettuce.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 4. Fries (4 items, with Size Variants)
  {
    id: 'bb-fr-1',
    name: 'Masala Fries',
    category: 'Fries',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Crisp golden french fries dusted with Buddy\'s signature spicy peri-peri chaat masala.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Regular', price: 60 },
      { name: 'Large', price: 100 }
    ]
  },
  {
    id: 'bb-fr-2',
    name: 'Cheese Fries',
    category: 'Fries',
    price: 90,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Golden salted fries generously smothered with hot velvety cheddar cheese sauce.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-fr-3',
    name: 'Paneer Cheese Fries',
    category: 'Fries',
    price: 100,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Loaded fries topped with seasoned paneer crumbles, melted cheese sauce and jalapenos.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-fr-4',
    name: 'Chicken Cheese Fries',
    category: 'Fries',
    price: 120,
    isVeg: false,
    isAvailable: true,
    rating: 4.9,
    description: 'Crispy fries piled high with diced barbecue chicken, hot cheese blend and chipotle mayo.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 5. Noodles (3 items, with Half/Full Size Variants)
  {
    id: 'bb-nd-1',
    name: 'Veg Noodle',
    category: 'Noodles',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Wok tossed hakka noodles with sliced cabbage, bell peppers, carrots, garlic and soy sauce.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Half', price: 60 },
      { name: 'Full', price: 110 }
    ]
  },
  {
    id: 'bb-nd-2',
    name: 'Paneer Noodles',
    category: 'Noodles',
    price: 70,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Stir fried noodles with golden spiced paneer cubes, crunchy greens and spicy chili sauce.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Half', price: 70 },
      { name: 'Full', price: 120 }
    ]
  },
  {
    id: 'bb-nd-3',
    name: 'Chicken Noodles',
    category: 'Noodles',
    price: 80,
    isVeg: false,
    isAvailable: true,
    rating: 4.9,
    description: 'High heat wok tossed noodles packed with juicy shredded chicken, egg, spring onions and chili oil.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    variants: [
      { name: 'Half', price: 80 },
      { name: 'Full', price: 130 }
    ]
  },

  // 6. Pasta (2 items)
  {
    id: 'bb-ps-1',
    name: 'Red Sauce Pasta',
    category: 'Pasta',
    price: 100,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Penne cooked in tangy spicy tomato arrabbiata sauce with garlic, black olives and basil.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-ps-2',
    name: 'White Sauce Pasta',
    category: 'Pasta',
    price: 120,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Creamy rich alfredo sauce penne with sweet corn, mushrooms, herbs and grated parmesan.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 7. Cholle Bhature (1 item)
  {
    id: 'bb-cb-1',
    name: 'Cholle Bhature',
    category: 'Cholle Bhature',
    price: 100,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Buddy\'s specialty: Two large hot crisp puffed bhature served with rich dark spiced Punjabi chana, pickle & onions.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 8. Omelette & Non-Veg Specials (5 items)
  {
    id: 'bb-om-1',
    name: 'Bread Omelette',
    category: 'Omelette',
    price: 70,
    isVeg: false,
    isAvailable: true,
    rating: 4.7,
    description: 'Double egg fluffy omelette layered with onions, green chillies and toasted white bread slices.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-om-2',
    name: 'Bread Cheese Omelette',
    category: 'Omelette',
    price: 80,
    isVeg: false,
    isAvailable: true,
    rating: 4.8,
    description: 'Hot fluffy double egg omelette stuffed with melted cheddar cheese slice between buttered bread.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-om-3',
    name: 'Paneer Chilli',
    category: 'Omelette',
    price: 160,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Crisp batter coated cottage cheese cubes tossed with bell peppers, onions and spicy dark soya sauce.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-om-4',
    name: 'Chicken Chilli',
    category: 'Omelette',
    price: 200,
    isVeg: false,
    isAvailable: true,
    rating: 4.9,
    description: 'Crispy fried boneless chicken bites wok tossed with fiery green chillies, garlic and spicy Chinese glaze.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-om-5',
    name: 'Capacy Chicken',
    category: 'Omelette',
    price: 160,
    isVeg: false,
    isAvailable: true,
    rating: 4.8,
    description: 'Chef\'s special crispy breaded fried chicken seasoned with special herbs and spicy garlic dip.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 9. Rolls (4 items)
  {
    id: 'bb-rl-1',
    name: 'Veg Roll',
    category: 'Rolls',
    price: 50,
    isVeg: true,
    isAvailable: true,
    rating: 4.5,
    description: 'Crisp flaky paratha wrapped with seasoned sauteed mixed vegetables, onions and tangy sauces.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-rl-2',
    name: 'Paneer Roll',
    category: 'Rolls',
    price: 70,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Spiced marinated paneer chunks rolled in warm paratha with sliced red onions and mint sauce.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-rl-3',
    name: 'Noodle Roll',
    category: 'Rolls',
    price: 70,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Unique campus favorite: Spicy stir-fried hakka noodles rolled inside warm paratha with sauces.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-rl-4',
    name: 'Spring Roll',
    category: 'Rolls',
    price: 70,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Golden fried crispy wonton rolls filled with shredded cabbage, carrots and spring onions with sweet chili dip.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 10. Momos (2 items)
  {
    id: 'bb-mm-1',
    name: 'Veg Momos',
    category: 'Momos',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Steamed Himalayan dumplings packed with finely minced seasoned vegetables served with fiery red chutney.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-mm-2',
    name: 'Chicken Momos',
    category: 'Momos',
    price: 80,
    isVeg: false,
    isAvailable: true,
    rating: 4.9,
    description: 'Juicy steamed dumplings stuffed with spiced minced chicken, garlic and herbs with spicy dipping sauce.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 11. Chai (4 items)
  {
    id: 'bb-ch-1',
    name: 'Simple Chai',
    category: 'Chai',
    price: 20,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Hot authentic tapri style boiled milk tea sweetened to taste.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-ch-2',
    name: 'Adrak Chai',
    category: 'Chai',
    price: 25,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Freshly crushed ginger brewed in hot milk tea for a warming herbal comfort drink.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-ch-3',
    name: 'Masala Chai',
    category: 'Chai',
    price: 25,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Signature spiced tea boiled with fresh cardamom, cinnamon, cloves and black pepper.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-ch-4',
    name: 'Gudh Chai',
    category: 'Chai',
    price: 25,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Traditional healthy jaggery sweetened milk tea brewed with natural brown gudh.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 12. Shakes & Coolers (8 items)
  {
    id: 'bb-sk-1',
    name: 'Banana Shake',
    category: 'Shakes',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Thick wholesome shake blended with fresh ripe bananas and chilled whole milk.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-sk-2',
    name: 'Mango Shake',
    category: 'Shakes',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Rich tropical mango pulp shake blended extra thick and served ice cold.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-sk-3',
    name: 'Oreo Shake',
    category: 'Shakes',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Classic chocolate cookie milkshake blended with crushed Oreos and chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-sk-4',
    name: 'Cold Coffee',
    category: 'Shakes',
    price: 80,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Creamy thick blended iced coffee topped with chocolate syrup and whipped foam.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'bb-sk-5',
    name: 'Strawberry Shake',
    category: 'Shakes',
    price: 80,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Sweet berry milkshake blended with real strawberry puree and vanilla cream.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-sk-6',
    name: 'Black Current Shake',
    category: 'Shakes',
    price: 80,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Rich deep purple berry shake with tangy sweet blackcurrant notes.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-sk-7',
    name: 'Nimbo Pani',
    category: 'Shakes',
    price: 50,
    isVeg: true,
    isAvailable: true,
    rating: 4.5,
    description: 'Chilled refreshing freshly squeezed Indian lemonade with mint, cumin and rock salt.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'bb-sk-8',
    name: 'Mojito',
    category: 'Shakes',
    price: 100,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Virgin mint mojito: Sparkling club soda muddled with fresh mint leaves, lime and crushed ice.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 13. Special / Bakery (1 item)
  {
    id: 'bb-ck-1',
    name: 'Birthday Cake',
    category: 'Cakes',
    price: 350,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Fresh campus celebration birthday cake prepared on order with candles and knife included.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  }
];
