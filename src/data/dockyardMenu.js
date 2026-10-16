// Dockyard Le Bistro - Authentic Menu Data & Happy Offers for CGC University, Mohali
// Extracted from official vendor menu specifications

export const DOCKYARD_OFFERS = [
  {
    id: 'dlb-offer-1',
    title: 'Burger Bonanza',
    deal: 'Buy 6 Veg Burgers & get 1 Veg Burger FREE',
    badge: 'Buy 6 Get 1 Free',
    targetCategory: 'Wrap, Burger and Sandwich',
    tagColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'dlb-offer-2',
    title: 'Pasta Treat',
    deal: 'Buy 3 Any Pasta & get 1 Plate Spring Roll FREE',
    badge: 'Free Spring Roll',
    targetCategory: 'Pasta',
    tagColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
  },
  {
    id: 'dlb-offer-3',
    title: 'Pizza Party Deal',
    deal: 'Buy 3 Any Pizza & get Fried Momos FREE',
    badge: 'Free Momos',
    targetCategory: 'Pizza',
    tagColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30'
  },
  {
    id: 'dlb-offer-4',
    title: 'Mega Shake Saver',
    deal: 'Buy 6 Same Flavour Shakes and get ₹10 discount per shake',
    badge: '₹10 Off / Shake',
    targetCategory: 'Shakes',
    tagColor: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/30'
  }
];

export const DOCKYARD_LE_BISTRO_MENU = [
  // 1. Amritsari Kulcha (7 items)
  {
    id: 'dlb-1',
    name: 'Aloo Kulcha',
    category: 'Amritsari Kulcha',
    price: 70,
    isVeg: true,
    isAvailable: true,
    description: 'Crispy golden tandoori Amritsari kulcha stuffed with spiced mashed potatoes, served with chole & pickled onions.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-2',
    name: 'Pyaz Kulcha',
    category: 'Amritsari Kulcha',
    price: 80,
    isVeg: true,
    isAvailable: true,
    description: 'Fresh clay oven baked Amritsari kulcha filled with crunchy spiced onions, herbs & butter.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-3',
    name: 'Gobhi Kulcha (Seasonal)',
    category: 'Amritsari Kulcha',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: 'Seasonal grated cauliflower and herb stuffing baked to a flaky, golden crisp.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-4',
    name: 'Paneer Kulcha',
    category: 'Amritsari Kulcha',
    price: 110,
    isVeg: true,
    isAvailable: true,
    description: 'Stuffed with fresh grated cottage cheese, green chillies, coriander and tandoori butter glaze.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-5',
    name: 'Mix Kulcha',
    category: 'Amritsari Kulcha',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Hearty blend of spiced paneer, aloo, pyaz, and fresh herbs baked in a charcoal tandoor.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-6',
    name: 'Masal Kulcha',
    category: 'Amritsari Kulcha',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Special spicy house masala stuffed kulcha layered with aromatic seeds and butter.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-7',
    name: 'Pina Kulcha',
    category: 'Amritsari Kulcha',
    price: 140,
    isVeg: true,
    isAvailable: true,
    description: 'Premium rich stuffed Amritsari kulcha prepared with chef specialty filling and dollops of butter.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 2. Parantha (7 items)
  {
    id: 'dlb-8',
    name: 'Aloo Parantha',
    category: 'Parantha',
    price: 60,
    isVeg: true,
    isAvailable: true,
    description: 'Classic Punjabi whole-wheat tawa parantha loaded with spiced potato mash and butter.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-9',
    name: 'Pyaz Parantha',
    category: 'Parantha',
    price: 70,
    isVeg: true,
    isAvailable: true,
    description: 'Crisp layered parantha filled with finely diced seasoned onions and toasted cumin.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-10',
    name: 'Gobhi Parantha',
    category: 'Parantha',
    price: 70,
    isVeg: true,
    isAvailable: true,
    description: 'Grated spiced cauliflower stuffed whole-wheat flatbread griddled with pure desi ghee.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-11',
    name: 'Paneer Parantha',
    category: 'Parantha',
    price: 80,
    isVeg: true,
    isAvailable: true,
    description: 'Generously stuffed with crumbled cottage cheese, fresh coriander, ginger and spices.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-12',
    name: 'Mix Parantha',
    category: 'Parantha',
    price: 80,
    isVeg: true,
    isAvailable: true,
    description: 'Delicious melange of aloo, gobhi, pyaz, paneer and spices folded into crisp golden dough.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-13',
    name: 'Masal Parantha',
    category: 'Parantha',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: 'Spicy Punjabi masala layered parantha served piping hot with creamy curd and pickle.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-14',
    name: 'Muli Parantha',
    category: 'Parantha',
    price: 80,
    isVeg: true,
    isAvailable: true,
    description: 'Traditional spiced grated radish parantha roasted crisp with golden edges.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 3. Fries (7 items)
  {
    id: 'dlb-15',
    name: 'Classic Fries',
    category: 'Fries',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: 'Crispy salted golden potato french fries with tomato dip.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-16',
    name: 'Peri Peri Fries',
    category: 'Fries',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Hot and zesty french fries tossed in African peri peri seasoning shaker mix.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-17',
    name: 'Tandoori Fries',
    category: 'Fries',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Golden fries smothered in smoky tandoori sauce and roasted spices.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-18',
    name: 'Cheese Fries',
    category: 'Fries',
    price: 140,
    isVeg: true,
    isAvailable: true,
    description: 'Crispy fries blanketed in rich melted yellow cheddar cheese sauce.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-19',
    name: 'Salsa Nachos Fries',
    category: 'Fries',
    price: 160,
    isVeg: true,
    isAvailable: true,
    description: 'Loaded fries topped with crushed tortilla chips, tangy salsa, and cheese sauce.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-20',
    name: 'Pizza Fries',
    category: 'Fries',
    price: 170,
    isVeg: true,
    isAvailable: true,
    description: 'Baked potato fries layered with marinara sauce, mozzarella cheese, and oregano.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-21',
    name: 'Fully Loaded Fries',
    category: 'Fries',
    price: 180,
    isVeg: true,
    isAvailable: true,
    description: 'Ultimate platter of crispy fries topped with assorted sauces, cheese, jalapeños & herbs.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 4. Shakes (11 items)
  {
    id: 'dlb-22',
    name: 'Banana Shake',
    category: 'Shakes',
    price: 70,
    isVeg: true,
    isAvailable: true,
    description: 'Creamy wholesome milkshake blended with fresh ripe bananas and honey.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-23',
    name: 'Mango Shake',
    category: 'Shakes',
    price: 80,
    isVeg: true,
    isAvailable: true,
    description: 'Refreshing chilled milkshake prepared with sweet Alphonso mango pulp.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-24',
    name: 'Cold Coffee',
    category: 'Shakes',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: 'Classic frothy iced cold coffee blended with rich espresso and milk.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-25',
    name: 'Chocolate Cold Coffee',
    category: 'Shakes',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Decadent chilled espresso combined with dark cocoa syrup and chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-26',
    name: 'Chocolate Shake',
    category: 'Shakes',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Rich dark chocolate thick shake topped with chocolate shavings.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-27',
    name: 'Strawberry Shake',
    category: 'Shakes',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: 'Vibrant pink milkshake bursting with sweet strawberry flavour.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-28',
    name: 'Oreo Shake',
    category: 'Shakes',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Thick creamy milkshake loaded with crushed Oreo cookies and vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-29',
    name: 'Vanilla Shake',
    category: 'Shakes',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: 'Smooth and silky traditional milkshake infused with aromatic vanilla bean essence.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-30',
    name: 'Blueberry Shake',
    category: 'Shakes',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Exotic wild blueberry puree blended extra thick with creamy milk.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-31',
    name: 'Brownie Shake',
    category: 'Shakes',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Fudgy baked chocolate brownie blended into a rich gourmet thick shake.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-32',
    name: 'Hazelnut Coffee',
    category: 'Shakes',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Creamy iced coffee infused with roasted hazelnut syrup and whipped milk.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 5. Pizza (9 items)
  {
    id: 'dlb-33',
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Classic cheese lovers pizza loaded with 100% real mozzarella and herb tomato sauce.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-34',
    name: 'Farm House Pizza',
    category: 'Pizza',
    price: 130,
    isVeg: true,
    isAvailable: true,
    description: 'Delightful combination of onion, crisp capsicum, ripe tomato and grilled mushrooms.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-35',
    name: 'Onion Capsicum Pizza',
    category: 'Pizza',
    price: 130,
    isVeg: true,
    isAvailable: true,
    description: 'Crunchy red onions and fresh green bell peppers over stringy melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-36',
    name: 'Schezwan Pizza',
    category: 'Pizza',
    price: 140,
    isVeg: true,
    isAvailable: true,
    description: 'Spicy Schezwan sauce base topped with crunchy veggies and molten cheese.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-37',
    name: 'Tandoori Paneer Pizza',
    category: 'Pizza',
    price: 150,
    isVeg: true,
    isAvailable: true,
    description: 'Marinated tandoori paneer cubes, red paprika, capsicum, and smoky tandoori sauce.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-38',
    name: 'Corn Cheese Pizza',
    category: 'Pizza',
    price: 150,
    isVeg: true,
    isAvailable: true,
    description: 'Sweet American golden corn kernels paired with extra mozzarella and herbs.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-39',
    name: 'Peri Peri Pizza',
    category: 'Pizza',
    price: 160,
    isVeg: true,
    isAvailable: true,
    description: 'Zesty peri peri seasoning, spiced vegetable medley, and molten cheese.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-40',
    name: 'Chicken Supreme Pizza',
    category: 'Pizza',
    price: 160,
    isVeg: false,
    isAvailable: true,
    description: 'Loaded with seasoned herb chicken chunks, grilled onions, capsicum and mozzarella.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-41',
    name: 'Non Veg Loaded Pizza',
    category: 'Pizza',
    price: 200,
    isVeg: false,
    isAvailable: true,
    description: 'Ultimate meat lovers pizza packed with double chicken, sausage, peppers & barbecue drizzle.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 6. Pasta (6 items)
  {
    id: 'dlb-42',
    name: 'Red Sauce Pasta',
    category: 'Pasta',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Penne pasta tossed in tangy Italian tomato arrabbiata sauce with garlic and herbs.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-43',
    name: 'White Sauce Pasta',
    category: 'Pasta',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Creamy and velvety bechamel cheese sauce pasta garnished with oregano and olives.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-44',
    name: 'Mix Sauce Pasta',
    category: 'Pasta',
    price: 130,
    isVeg: true,
    isAvailable: true,
    description: 'Perfect harmony of creamy white sauce and rich tangy red marinara sauce.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-45',
    name: 'Makhni Sauce Pasta',
    category: 'Pasta',
    price: 130,
    isVeg: true,
    isAvailable: true,
    description: 'Desi fusion pasta simmered in rich buttery Punjabi makhni gravy with spices.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-46',
    name: 'Alfredo Mushroom Pasta',
    category: 'Pasta',
    price: 130,
    isVeg: true,
    isAvailable: true,
    description: 'Classic parmesan alfredo pasta loaded with butter sauteed sliced button mushrooms.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-47',
    name: 'Arrabiata Pasta',
    category: 'Pasta',
    price: 140,
    isVeg: true,
    isAvailable: true,
    description: 'Fiery Italian pasta prepared with crushed red chillies, garlic, basil and crushed tomatoes.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 7. Momos (5 items)
  {
    id: 'dlb-48',
    name: 'Steam Momos',
    category: 'Momos',
    price: 60,
    isVeg: true,
    isAvailable: true,
    description: 'Delicate steamed dumplings stuffed with finely minced garden vegetables, served with red chilli dip.',
    image: 'https://images.unsplash.com/photo-1625242661157-e1e3557e8499?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-49',
    name: 'Fried Momos',
    category: 'Momos',
    price: 70,
    isVeg: true,
    isAvailable: true,
    description: 'Crisp deep-fried golden dumplings with a juicy spiced vegetable filling.',
    image: 'https://images.unsplash.com/photo-1625242661157-e1e3557e8499?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-50',
    name: 'Tandoori Momos (6 pcs)',
    category: 'Momos',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: '6 pieces of tandoor roasted momos coated in fiery Punjabi red marination and mint chutney.',
    image: 'https://images.unsplash.com/photo-1625242661157-e1e3557e8499?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-51',
    name: 'Afghani Momos',
    category: 'Momos',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Charcoal grilled momos dipped in velvety cashew, fresh cream and butter sauce.',
    image: 'https://images.unsplash.com/photo-1625242661157-e1e3557e8499?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-52',
    name: 'Honey Chilli Momos',
    category: 'Momos',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Crispy fried momos glazed in sweet and spicy honey chilli garlic reduction with sesame seeds.',
    image: 'https://images.unsplash.com/photo-1625242661157-e1e3557e8499?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 8. Kathi Roll (7 items)
  {
    id: 'dlb-53',
    name: 'Noodles Roll',
    category: 'Kathi Roll',
    price: 70,
    isVeg: true,
    isAvailable: true,
    description: 'Stir fried Hakka noodles, crunchy onions and spicy sauces rolled in a golden paratha.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-54',
    name: 'Veg Roll',
    category: 'Kathi Roll',
    price: 80,
    isVeg: true,
    isAvailable: true,
    description: 'Tender spiced vegetable patty with mint chutney and pickled onions wrapped tightly.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-55',
    name: 'Paneer Roll',
    category: 'Kathi Roll',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: 'Soft cottage cheese cubes sautéed with bell peppers and house blend kathi masala.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-56',
    name: 'Paneer Tikka Roll',
    category: 'Kathi Roll',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Smoky tandoori paneer tikka chunks with capsicum, onion and mint mayo in a flaky wrap.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-57',
    name: 'Soya Chaap Roll',
    category: 'Kathi Roll',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: 'Juicy roasted soya chaap pieces cooked in tandoori spices and rolled fresh.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-58',
    name: 'Soya Afghani Roll',
    category: 'Kathi Roll',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Creamy malai soya chaap pieces with mild spices and herbs wrapped in a flaky roll.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-59',
    name: 'Paneer Mushroom Chilli Roll',
    category: 'Kathi Roll',
    price: 110,
    isVeg: true,
    isAvailable: true,
    description: 'Spicy wok-tossed paneer and mushrooms in oriental chilli garlic sauce rolled to perfection.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 9. Wrap, Burger and Sandwich (7 items)
  {
    id: 'dlb-60',
    name: 'Aloo Wrap',
    category: 'Wrap, Burger and Sandwich',
    price: 80,
    isVeg: true,
    isAvailable: true,
    description: 'Seasoned crispy potato patty wrapped with fresh lettuce, onions and tangy dressing.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-61',
    name: 'Paneer Wrap',
    category: 'Wrap, Burger and Sandwich',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Marinated cottage cheese strips, crunchy greens and creamy chipotle mayo.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-62',
    name: 'Chicken Wrap',
    category: 'Wrap, Burger and Sandwich',
    price: 110,
    isVeg: false,
    isAvailable: true,
    description: 'Grilled spiced chicken strips with crunchy vegetables and garlic aioli in a soft tortilla.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-63',
    name: 'Veg Burger',
    category: 'Wrap, Burger and Sandwich',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: 'Classic crispy vegetable patty burger served with fresh tomato, cucumber, lettuce & mayo.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-64',
    name: 'Paneer Burger',
    category: 'Wrap, Burger and Sandwich',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Crispy seasoned whole paneer slab burger with crunchy onions and spicy cocktail dressing.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-65',
    name: 'Veg Sandwich',
    category: 'Wrap, Burger and Sandwich',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: 'Fresh sandwich bread packed with cucumber, tomato, potato slices, green chutney and butter.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-66',
    name: 'Grilled Sandwich',
    category: 'Wrap, Burger and Sandwich',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Golden grill-toasted triple decker sandwich filled with veggies, herbs and melted cheese.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 10. Crispy Nation (4 items)
  {
    id: 'dlb-67',
    name: 'Kurkure Spring Roll',
    category: 'Crispy Nation',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Spring rolls coated with crunchy kurkure flakes and deep fried to golden perfection.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-68',
    name: 'Kurkure Burger',
    category: 'Crispy Nation',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Extra crispy kurkure-crusted patty burger topped with spicy coleslaw and sauces.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-69',
    name: 'Kurkure Paneer',
    category: 'Crispy Nation',
    price: 140,
    isVeg: true,
    isAvailable: true,
    description: 'Thick succulent cottage cheese sticks coated in crunchy kurkure crumb with spicy dip.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-70',
    name: 'Kurkure Fries',
    category: 'Crispy Nation',
    price: 160,
    isVeg: true,
    isAvailable: true,
    description: 'Double crunchy potato fries tossed in spicy kurkure masala blend and cheesy drizzle.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 11. Tikka (4 items)
  {
    id: 'dlb-71',
    name: 'Paneer Tikka (8 pcs)',
    category: 'Tikka',
    price: 200,
    isVeg: true,
    isAvailable: true,
    description: '8 pieces of charcoal roasted soft cottage cheese cubes with onions, capsicum & mint dip.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-72',
    name: 'Paneer Mushroom Tikka',
    category: 'Tikka',
    price: 200,
    isVeg: true,
    isAvailable: true,
    description: 'Charcoal grilled marinated button mushrooms and paneer in robust Punjabi tandoori spices.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-73',
    name: 'Soya Chaap',
    category: 'Tikka',
    price: 140,
    isVeg: true,
    isAvailable: true,
    description: 'Spiced soya chaap pieces skewered and roasted crisp in a clay oven with butter.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-74',
    name: 'Malai Chaap',
    category: 'Tikka',
    price: 150,
    isVeg: true,
    isAvailable: true,
    description: 'Melt-in-mouth soya chaap marinated in fresh cream, cashew paste, cardamoms and herbs.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 12. Desi Chinese (6 items)
  {
    id: 'dlb-75',
    name: 'Veg Noodles',
    category: 'Desi Chinese',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Wok tossed Hakka noodles with shredded cabbage, carrots, bell peppers, soy and garlic.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-76',
    name: 'Paneer Noodles',
    category: 'Desi Chinese',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Stir fried noodles loaded with crispy golden paneer cubes and spring onions.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-77',
    name: 'Honey Chilli Potato',
    category: 'Desi Chinese',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Crispy finger potatoes glazed in sweet spicy chilli garlic sauce with toasted sesame seeds.',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-78',
    name: 'Veg Manchurian',
    category: 'Desi Chinese',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Crisp fried mixed vegetable dumplings tossed in savoury ginger garlic and soy gravy.',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-79',
    name: 'Paneer Fried Rice',
    category: 'Desi Chinese',
    price: 120,
    isVeg: true,
    isAvailable: true,
    description: 'Aromatic basmati rice stir-fried in a high flame wok with spiced paneer, veggies and soy.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-80',
    name: 'Paneer Chilli',
    category: 'Desi Chinese',
    price: 160,
    isVeg: true,
    isAvailable: true,
    description: 'Batter fried paneer cubes wok tossed with diced onions, green bell peppers & hot chilli sauce.',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 13. Main Course (7 items)
  {
    id: 'dlb-81',
    name: 'Dal Makhni',
    category: 'Main Course',
    price: 170,
    isVeg: true,
    isAvailable: true,
    description: 'Slow-cooked whole black lentils and kidney beans simmered overnight with butter and fresh cream.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-82',
    name: 'Shahi Paneer',
    category: 'Main Course',
    price: 180,
    isVeg: true,
    isAvailable: true,
    description: 'Royal cottage cheese curry cooked in a silky, mildly spiced cashew and tomato gravy.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-83',
    name: 'Kadai Paneer',
    category: 'Main Course',
    price: 180,
    isVeg: true,
    isAvailable: true,
    description: 'Paneer cubes, crunchy capsicum and onions cooked with freshly pounded kadai spices.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-84',
    name: 'Mix Veg',
    category: 'Main Course',
    price: 160,
    isVeg: true,
    isAvailable: true,
    description: 'Medley of seasonal cauliflower, carrots, beans, and peas sautéed in home-style Punjabi gravy.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-85',
    name: 'Palak Paneer',
    category: 'Main Course',
    price: 160,
    isVeg: true,
    isAvailable: true,
    description: 'Fresh spinach puree tempered with garlic, cumin, and soft paneer cubes with cream.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-86',
    name: 'Chana Masala',
    category: 'Main Course',
    price: 170,
    isVeg: true,
    isAvailable: true,
    description: 'Tender chickpeas cooked in a robust, tangy Punjabi onion tomato masala with ginger juliennes.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-87',
    name: 'Rajma Chawal',
    category: 'Main Course',
    price: 140,
    isVeg: true,
    isAvailable: true,
    description: 'Comforting campus favourite bowl of slow simmered red kidney beans served with steamed basmati rice.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 14. Meal Box (5 items)
  {
    id: 'dlb-88',
    name: 'Veg Burger + Fries',
    category: 'Meal Box',
    price: 130,
    isVeg: true,
    isAvailable: true,
    description: 'Crispy vegetable burger paired with a generous portion of salted french fries and dip.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-89',
    name: 'Paneer Burger + Fries',
    category: 'Meal Box',
    price: 160,
    isVeg: true,
    isAvailable: true,
    description: 'Crispy paneer burger served with golden seasoned french fries and ketchup.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-90',
    name: 'Veg Sandwich + Fries',
    category: 'Meal Box',
    price: 150,
    isVeg: true,
    isAvailable: true,
    description: 'Fresh vegetable sandwich accompanied by crunchy french fries and mint sauce.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-91',
    name: 'Paneer Sandwich + Fries',
    category: 'Meal Box',
    price: 180,
    isVeg: true,
    isAvailable: true,
    description: 'Grilled spiced paneer sandwich served with hot crispy potato fries.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-92',
    name: 'Paneer Wrap + Fries',
    category: 'Meal Box',
    price: 220,
    isVeg: true,
    isAvailable: true,
    description: 'Large gourmet paneer kathi wrap served with a hearty side of golden fries.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 15. Additional Items (7 items)
  {
    id: 'dlb-93',
    name: 'Noodle Spring Roll',
    category: 'Snacks & Quick Bites',
    price: 60,
    isVeg: true,
    isAvailable: true,
    description: 'Crispy golden fried pastry rolls stuffed with seasoned Hakka noodles and vegetable shreds.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-94',
    name: 'Veg Spring Roll',
    category: 'Snacks & Quick Bites',
    price: 70,
    isVeg: true,
    isAvailable: true,
    description: 'Crispy oriental rolls filled with cabbage, carrots, bell peppers and sweet chilli dip.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-95',
    name: 'Pav Bhaji',
    category: 'Snacks & Quick Bites',
    price: 80,
    isVeg: true,
    isAvailable: true,
    description: 'Mashed spiced vegetable curry cooked on a flat tawa with butter, served with 2 butter-toasted pavs.',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-96',
    name: 'Chole Bhature',
    category: 'Snacks & Quick Bites',
    price: 90,
    isVeg: true,
    isAvailable: true,
    description: '2 fluffy golden bhature served with authentic Amritsari spicy chole, pickle and onions.',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'dlb-97',
    name: 'Paneer Rice',
    category: 'Snacks & Quick Bites',
    price: 100,
    isVeg: true,
    isAvailable: true,
    description: 'Fluffy seasoned basmati rice tossed with spiced paneer cubes and herbs.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-98',
    name: 'Gobhi Pakoda (250 gm)',
    category: 'Snacks & Quick Bites',
    price: 150,
    isVeg: true,
    isAvailable: true,
    description: '250 gm of hot gram-flour battered crispy cauliflower fritters sprinkled with chaat masala.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'dlb-99',
    name: 'Paneer Pakoda',
    category: 'Snacks & Quick Bites',
    price: 170,
    isVeg: true,
    isAvailable: true,
    description: 'Thick slices of fresh paneer coated in spiced gram-flour batter and fried crisp, served with mint chutney.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  }
];
