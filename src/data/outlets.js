// Campus Cravings - Outlets & Sample Food Data for CGC University, Mohali
// Note: All menu items, prices, and operating hours are clearly labeled demo sample data for demonstration purposes.
// Real official vendor menus and prices will be substituted one outlet at a time.
import { DOCKYARD_LE_BISTRO_MENU, DOCKYARD_OFFERS } from './dockyardMenu.js';
import { CANTEEN_MENU } from './canteenMenu.js';
import { BUDDYS_BISTRO_MENU } from './buddysMenu.js';
import { DOMINOS_MENU } from './dominosMenu.js';
import { THICK_LETTO_MENU } from './thickLettoMenu.js';
import { CHUTAR_PUTAR_MENU } from './chutarPutarMenu.js';
import { APPLEBEEZ_MENU } from './applebeezMenu.js';
import { NESCAFE_MENU } from './nescafeMenu.js';
import { EASY_DAY_MENU } from './easyDayMenu.js';
import { ROCK_N_ROLL_MENU } from './rockNRollMenu.js';
import { TOP_N_TOWN_MENU } from './topNTownMenu.js';
import { X_BURGERS_MENU } from './xBurgersMenu.js';
import { KULHAD_MENU } from './kulhadMenu.js';
import { YUM_EXPERTS_MENU } from './yumExpertsMenu.js';
import { SIP_N_BITES_MENU } from './sipNBitesMenu.js';
import { FOOD_COURT_MENU } from './foodCourtMenu.js';
import { TUCKSHOP_MENU } from './tuckshopMenu.js';

export const OUTLETS = [
  {
    id: 'applebeez',
    aliasId: 'apple-beez',
    aliases: ['apple-beez', 'applebeez', 'apple-bees'],
    name: 'Apple Beez',
    shortCategory: 'Cafe & Fast Food',
    tagline: 'Noodles, Burgers, Pastas, Kathi Rolls, Shakes & Pastries',
    location: 'Block 2 Food Court, CGC Mohali',
    rating: 4.7,
    reviewsCount: 320,
    prepTime: '10-15 mins',
    priceForTwo: '₹200',
    cuisine: ['Fast Food', 'Noodles', 'Burgers', 'Pasta', 'Kathi Rolls', 'Main Course', 'Shakes', 'Desserts'],
    isVegOnly: false,
    isOpen: true,
    timing: '8:30 AM - 9:30 PM',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    logoType: 'applebeez',
    brandColor: '#E63946',
    menu: APPLEBEEZ_MENU
  },
  {
    id: 'topn-n-town-for-hunger',
    aliases: ['top-n-town', 'topntown', 'topn-n-town-for-hunger', 'top-n-town-hunger'],
    name: "Top N' Town for Hunger",
    shortCategory: 'Multi-Cuisine & Fast Food',
    tagline: 'Burgers, Sandwiches, Momos, Fried Rice, Chowmein, Thupka, Pastas & Korean Specials',
    location: 'Student Plaza, Near Central Fountain, CGC Mohali',
    rating: 4.7,
    reviewsCount: 380,
    prepTime: '10-15 mins',
    priceForTwo: '₹200',
    cuisine: ['Burgers', 'Sandwiches', 'Momos', 'Fried Rice', 'Chowmein', 'Pasta', 'Chinese', 'Korean Specials'],
    isVegOnly: false,
    isOpen: true,
    timing: '9:00 AM - 9:30 PM',
    image: '/images/outlets/topn-n-town-for-hunger.png',
    logoType: 'topntown',
    brandColor: '#D90429',
    menu: TOP_N_TOWN_MENU
  },
  {
    id: 'easy-day',
    aliasId: 'easy-day-supermart',
    aliases: ['easyday', 'easy-day-supermart', 'mini-easyday', 'easy-day'],
    name: 'Easy Day SuperMart',
    shortCategory: 'SuperMart & Fast Food',
    tagline: 'Burgers, Pastas, Fries, Shakes, Sandwiches & Crispy Patties',
    location: 'Near Boys Hostel Block 4, CGC Mohali',
    rating: 4.6,
    reviewsCount: 290,
    prepTime: '6-12 mins',
    priceForTwo: '₹140',
    cuisine: ['Burgers', 'Pasta', 'Fries', 'Shakes', 'Sandwiches', 'Patties', 'Beverages'],
    isVegOnly: false,
    isOpen: true,
    timing: '8:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80',
    logoType: 'easyday',
    brandColor: '#2B9348',
    menu: EASY_DAY_MENU
  },
  {
    id: 'kulhad',
    aliases: ['kulhad', 'kulhad-chai', 'kulhad-cafeteria'],
    name: 'Kulhad',
    shortCategory: 'Chai, Snacks & Kulhad Specials',
    tagline: 'Swad Desh ki Mittee ka — Earthen Kulhad Chai, Maggi, Pizzas, Shakes & Lassi',
    location: 'Central Lawn Kiosk, Near Amphitheatre, CGC Mohali',
    rating: 4.8,
    reviewsCount: 540,
    prepTime: '7-12 mins',
    priceForTwo: '₹140',
    cuisine: ['Chai', 'Pizza', 'Burger', 'Maggi', 'Sandwiches', 'Lassi', 'Street Food', 'Shakes'],
    isVegOnly: true,
    isOpen: true,
    timing: '8:30 AM - 9:30 PM',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    logoType: 'kulhad',
    brandColor: '#8B4513',
    menu: KULHAD_MENU
  },
  {
    id: 'tuckshop',
    aliases: ['tuckshop', 'tuck-shop', 'tuckshop-stationery', 'cgc-tuckshop'],
    name: 'Tuckshop',
    shortCategory: 'Stationery & Essentials',
    tagline: 'Stationery, Printing & Xerox, Computer Accessories, Gifts & Daily Essentials',
    location: 'Engineering Block 3 Ground Corridor, CGC Mohali',
    rating: 4.8,
    reviewsCount: 510,
    prepTime: '2-5 mins',
    priceForTwo: '₹80',
    cuisine: ['Printing & Xerox', 'Stationery', 'Notebooks', 'Computer Accessories', 'Gifts', 'Daily Essentials'],
    isVegOnly: true,
    isOpen: true,
    timing: '8:30 AM - 7:30 PM',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80',
    logoType: 'tuckshop',
    brandColor: '#1E3A8A',
    menu: TUCKSHOP_MENU
  },
  {
    id: 'dominos',
    aliasId: 'dominos-pizza',
    aliases: ['dominos-pizza', 'domino', 'dominos'],
    name: "Domino's",
    shortCategory: 'Pizza',
    tagline: 'Hand-Tossed Pizzas, Garlic Bread, Chicken Wings, Beverages & Desserts',
    location: 'Food Court 1st Floor, CGC Mohali',
    rating: 4.8,
    reviewsCount: 890,
    prepTime: '15-20 mins',
    priceForTwo: '₹300',
    cuisine: ['Pizza', 'Garlic Bread', 'Sides', 'Beverages', 'Desserts'],
    isVegOnly: false,
    isOpen: true,
    timing: '10:30 AM - 9:30 PM',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    logoType: 'dominos',
    brandColor: '#0055A5',
    menu: DOMINOS_MENU
  },
  {
    id: 'nescafe',
    aliasId: 'nescafe-cgc',
    aliases: ['nescafe', 'nescafe-cgc', 'nescafe-coffee'],
    name: 'Nescafe',
    shortCategory: 'Coffee & Maggi',
    tagline: 'Signature Brews, Maggi Varieties, Handcrafted Pizzas & Frappes',
    location: 'Library Quadrangle, Central Walkway, CGC Mohali',
    rating: 4.8,
    reviewsCount: 620,
    prepTime: '6-10 mins',
    priceForTwo: '₹140',
    cuisine: ['Maggi', 'Pizza', 'Coffee', 'Frappes', 'Sweet Corn', 'Tea', 'Snacks'],
    isVegOnly: true,
    isOpen: true,
    timing: '8:00 AM - 8:30 PM',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    logoType: 'nescafe',
    brandColor: '#C1121F',
    menu: NESCAFE_MENU
  },
  {
    id: 'canteen',
    aliasId: 'college-canteen',
    aliases: ['college-canteen', 'canteen'],
    name: 'College Canteen',
    shortCategory: 'Canteen',
    tagline: 'Campus Thalis, Breakfast, Rolls, Pizzas, Burgers & Chinese',
    location: 'Main University Central Canteen Hall',
    rating: 4.6,
    reviewsCount: 780,
    prepTime: '8-14 mins',
    priceForTwo: '₹140',
    cuisine: ['Breakfast', 'North Indian', 'Pizza', 'Burger', 'Sandwich', 'Rolls', 'Pasta', 'Chinese', 'Beverages', 'Desserts'],
    isVegOnly: false,
    isOpen: true,
    timing: '8:00 AM - 7:30 PM (Demo Hours)',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    logoType: 'canteen',
    brandColor: '#2D6A4F',
    menu: CANTEEN_MENU
  },
  {
    id: 'buddys-bistro',
    aliasId: 'buds-bistro',
    aliases: ['buds-bistro', 'buddys', 'buddy-bistro'],
    name: "Buddy's Bistro",
    shortCategory: 'Bistro',
    tagline: 'Pizzas, Burgers, Fries, Rolls, Momos, Shakes & Cholle Bhature',
    location: 'Management Block Food Street',
    rating: 4.7,
    reviewsCount: 360,
    prepTime: '12-16 mins',
    priceForTwo: '₹220',
    cuisine: ['Pizza', 'Burger', 'Sandwich', 'Fries', 'Noodles', 'Pasta', 'Cholle Bhature', 'Omelette', 'Rolls', 'Momos', 'Chai', 'Shakes'],
    isVegOnly: false,
    isOpen: true,
    timing: '9:30 AM - 8:30 PM (Demo Hours)',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    logoType: 'buddys',
    brandColor: '#F77F00',
    menu: BUDDYS_BISTRO_MENU
  },
  {
    id: 'chutar-putar',
    aliasId: 'chutarputar',
    aliases: ['chutarputar', 'cafe-cravings', 'chutar-putar'],
    name: 'Chutar Putar',
    shortCategory: 'Cafe',
    tagline: 'Sandwiches, Burgers, Wraps, Momos, Fries, Chaats, Chai & Shakes',
    location: 'Open Amphitheatre Corner, CGC Mohali',
    rating: 4.7,
    reviewsCount: 470,
    prepTime: '8-14 mins',
    priceForTwo: '₹150',
    cuisine: ['Sandwiches', 'Burgers', 'Wraps', 'Momos', 'Fries', 'Chaat', 'Chai', 'Shakes'],
    isVegOnly: true,
    isOpen: true,
    timing: '9:00 AM - 8:30 PM',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    logoType: 'chutarputar',
    brandColor: '#E76F51',
    menu: CHUTAR_PUTAR_MENU
  },
  {
    id: 'food-court',
    aliases: ['food-court', 'foodcourt', 'cgc-food-court'],
    name: 'Food Court',
    shortCategory: 'Multi-Cuisine Food Court',
    tagline: 'Multi-Cuisine Campus Food Court — Breakfast, Pizzas, Burgers, Thalis, Momos & Chinese',
    location: 'Main Academic Block Central Food Court, CGC Mohali',
    rating: 4.8,
    reviewsCount: 980,
    prepTime: '8-14 mins',
    priceForTwo: '₹180',
    cuisine: ['Breakfast', 'Sandwiches', 'Burgers', 'Pizzas', 'Pasta', 'Noodles', 'Thalis', 'Momos', 'Chinese', 'Beverages', 'Desserts'],
    isVegOnly: false,
    isOpen: true,
    timing: '8:00 AM - 9:30 PM',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80',
    logoType: 'foodcourt',
    brandColor: '#1B4D36',
    menu: FOOD_COURT_MENU
  },
  {
    id: 'sip-n-bites',
    aliasId: 'sip-n-bite',
    aliases: ['sip-n-bites', 'sipnbites', 'sip-n-bite', 'sipnbite'],
    name: 'Sip N Bites',
    shortCategory: 'Shakes, Juices & Fast Food',
    tagline: 'Fresh Juices, Ice Cream Shakes, Biscuit Shakes, Burgers, Pasta, Momos & Rolls',
    location: 'Sports Complex & Gymnasium Promenade, CGC Mohali',
    rating: 4.7,
    reviewsCount: 420,
    prepTime: '7-12 mins',
    priceForTwo: '₹180',
    cuisine: ['Shakes', 'Juices', 'Burgers', 'Momos', 'Pasta', 'Noodles', 'Patties', 'Rolls', 'Pizza', 'Sweets'],
    isVegOnly: false,
    isOpen: true,
    timing: '8:00 AM - 9:30 PM',
    image: '/images/outlets/sip-n-bites.png',
    logoType: 'sipnbites',
    brandColor: '#0EA5E9',
    menu: SIP_N_BITES_MENU
  },
  {
    id: 'x-burgers',
    aliases: ['x-burgers', 'xburgers', 'x-burgers-cafe', 'x-burger'],
    name: 'X Burgers Café',
    shortCategory: 'Burgers & Combos',
    tagline: 'Handcrafted Burgers, Biggie Combos, Loaded Fries, Wraps, Momos & Shakes',
    location: 'Student Center Ground Floor, CGC Mohali',
    rating: 4.8,
    reviewsCount: 520,
    prepTime: '10-14 mins',
    priceForTwo: '₹220',
    cuisine: ['Burgers', 'Biggie Combos', 'Wraps', 'Fries', 'Spring Rolls', 'Momos', 'Shakes', 'Cold Coffee', 'Mojitos'],
    isVegOnly: false,
    isOpen: true,
    timing: '9:30 AM - 9:30 PM',
    image: '/images/outlets/x-burgers.png',
    logoType: 'xburgers',
    brandColor: '#E65100',
    menu: X_BURGERS_MENU
  },
  {
    id: 'thick-let-to',
    aliasId: 'thick-letto',
    aliases: ['thick-letto', 'thick-and-letto', 'thick-let-to'],
    name: 'Thick & Letto',
    shortCategory: 'Shakes',
    tagline: 'Exotic Fruit Thick Shakes, Cold Coffees & Cheesecake Shakes',
    location: 'Girls Hostel Commercial Complex, CGC Mohali',
    rating: 4.8,
    reviewsCount: 380,
    prepTime: '8-12 mins',
    priceForTwo: '₹140',
    cuisine: ['Thick Shakes', 'Cold Coffee', 'Cheesecake Shakes', 'Desserts'],
    isVegOnly: true,
    isOpen: true,
    timing: '10:30 AM - 9:30 PM',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80',
    logoType: 'thickletto',
    brandColor: '#582F0E',
    menu: THICK_LETTO_MENU
  },
  {
    id: 'rock-n-roll',
    aliasId: 'rock-in-roll',
    aliases: ['rock-in-roll', 'rock-n-roll', 'rocknroll'],
    name: 'Rock N Roll',
    shortCategory: 'Kathi Rolls & Fast Food',
    tagline: 'The Real Taste of Roll — Egg, Chicken & Veg Kathi Rolls, Fried Rice & Noodles',
    location: 'Campus Food Street, CGC Mohali',
    rating: 4.7,
    reviewsCount: 340,
    prepTime: '8-12 mins',
    priceForTwo: '₹160',
    cuisine: ['Kathi Rolls', 'Egg Rolls', 'Chicken Rolls', 'Veg Rolls', 'Fried Rice', 'Noodles'],
    isVegOnly: false,
    isOpen: true,
    timing: '10:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80',
    logoType: 'rocknroll',
    brandColor: '#B91C1C',
    menu: ROCK_N_ROLL_MENU
  },
  {
    id: 'yum-experts',
    aliasId: 'yum-express',
    aliases: ['yum-experts', 'yumexperts', 'yum-express', 'yumexpress'],
    name: 'Yum Experts',
    shortCategory: 'Multi-Cuisine Cafe & Fast Food',
    tagline: 'Mocktails, Smoothies, Chaats, Burgers, Wraps, Pasta, Chinese, Rice Bowls & Combos',
    location: 'Main Food Court, CGC University, Mohali',
    rating: 4.8,
    reviewsCount: 480,
    prepTime: '8-14 mins',
    priceForTwo: '₹190',
    cuisine: ['Mocktails', 'Smoothies', 'Burgers', 'Pasta', 'Chinese', 'Rice Bowls', 'Chaats', 'Rolls', 'Pizza'],
    isVegOnly: false,
    isOpen: true,
    timing: '9:00 AM - 10:00 PM',
    image: '/images/outlets/yum-experts.png',
    logoType: 'yumexperts',
    brandColor: '#DC2626',
    menu: YUM_EXPERTS_MENU
  },
  {
    id: 'dockyard-le-bistro',
    name: 'Dockyard Le Bistro',
    shortCategory: 'Bistro',
    tagline: 'Amritsari Kulchas, Handcrafted Pizzas, Burgers, Shakes & Desi Chinese',
    cuisine: ['Amritsari Kulcha', 'Pizza', 'Burgers', 'Shakes', 'Pasta', 'Chinese', 'North Indian'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    brandColor: '#1E293B',
    offers: DOCKYARD_OFFERS,
    menu: DOCKYARD_LE_BISTRO_MENU
  }
];

// Helper function to extract all popular food items matching reference image order first
export const getAllPopularItems = () => {
  const priorityIds = ['dm-pz-1', 'dm-1', 'xb-vb-1', 'rnr-er-1', 'tnt-vb-1', 'kh-ch-1', 'ye-mc-1', 'snb-sh-2', 'nc-cc-1', 'nc-1', 'fc-pz-1', 'fc-rm-1', 'fc-bf-7', 'ts-px-1', 'ts-se-5', 'tlt-ch-5', 'tlt-brownie', 'cp-sw-4', 'ab-snk-9', 'ed-bg-1'];
  const allItems = [];

  OUTLETS.forEach(outlet => {
    outlet.menu.forEach(item => {
      allItems.push({
        ...item,
        outletId: outlet.id,
        outletName: outlet.name,
        outletLocation: outlet.location
      });
    });
  });

  const priorityItems = priorityIds
    .map(id => allItems.find(item => item.id === id))
    .filter(Boolean);

  const remainingPopular = allItems.filter(
    item => item.isPopular && !priorityIds.includes(item.id)
  );

  return [...priorityItems, ...remainingPopular];
};

// Helper function to extract all food items across outlets
export const getAllFoodItems = () => {
  const items = [];
  OUTLETS.forEach(outlet => {
    outlet.menu.forEach(item => {
      items.push({
        ...item,
        outletId: outlet.id,
        outletName: outlet.name,
        outletLocation: outlet.location
      });
    });
  });
  return items;
};
