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
    name: "Top N' Town for Hunger",
    shortCategory: 'Food',
    tagline: 'Sundaes, Thick Shakes, Waffles & Quick Bites',
    location: 'Student Plaza, Near Central Fountain',
    rating: 4.5,
    reviewsCount: 280,
    prepTime: '8-12 mins',
    priceForTwo: '₹180',
    cuisine: ['Ice Creams', 'Desserts', 'Waffles', 'Fries'],
    isVegOnly: true,
    isOpen: true,
    timing: '10:00 AM - 9:00 PM (Demo Hours)',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&auto=format&fit=crop&q=80',
    logoType: 'topntown',
    brandColor: '#D90429',
    menu: [
      {
        id: 'tt-1',
        name: 'Nutella Belgian Waffle',
        category: 'Desserts',
        price: 120,
        isVeg: true,
        isAvailable: true,
        rating: 4.8,
        description: 'Freshly baked golden waffle smothered with warm Nutella and toasted almond flakes.',
        image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      },
      {
        id: 'tt-2',
        name: 'Peri Peri Crinkle Fries',
        category: 'Snacks',
        price: 75,
        isVeg: true,
        isAvailable: true,
        rating: 4.4,
        description: 'Golden crinkle-cut potato fries tossed in spicy peri peri dusting.',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
        isPopular: true
      },
      {
        id: 'tt-3',
        name: 'Double Scoop Sundae Special',
        category: 'Desserts',
        price: 95,
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
        description: 'Vanilla and roasted almond scoops drizzled with hot chocolate fudge & cherry topping.',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      },
      {
        id: 'tt-4',
        name: 'Crispy Veg Nuggets (6 pcs)',
        category: 'Snacks',
        price: 65,
        isVeg: true,
        isAvailable: true,
        rating: 4.3,
        description: 'Bite-sized crumb-fried vegetable medallions served with tangy mustard dip.',
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      }
    ]
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
    name: 'Kulhad',
    shortCategory: 'Cafe',
    tagline: 'Desi Flavours in Clay Cups: Kulhad Chai, Maggi & Pizza',
    location: 'Central Lawn Kiosk, Near Amphitheatre',
    rating: 4.8,
    reviewsCount: 540,
    prepTime: '7-12 mins',
    priceForTwo: '₹140',
    cuisine: ['Tea', 'Kulhad Pizza', 'Snacks', 'Street Food'],
    isVegOnly: true,
    isOpen: true,
    timing: '8:30 AM - 8:30 PM (Demo Hours)',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    logoType: 'kulhad',
    brandColor: '#8B4513',
    menu: [
      {
        id: 'kh-1',
        name: 'Kulhad Chai',
        category: 'Beverages',
        price: 49,
        isVeg: true,
        isAvailable: true,
        rating: 4.9,
        description: 'Authentic piping-hot ginger & cardamom tea brewed fresh and served in a traditional clay earthen kulhad.',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
        isPopular: true
      },
      {
        id: 'kh-2',
        name: 'Overloaded Kulhad Pizza',
        category: 'Pizza',
        price: 119,
        isVeg: true,
        isAvailable: true,
        rating: 4.8,
        description: 'Diced veggies, paneer, oregano seasoning and bubbling molten mozzarella baked directly in an earthen pot.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
        isPopular: true
      },
      {
        id: 'kh-3',
        name: 'Desi Masala Butter Maggi',
        category: 'Snacks',
        price: 50,
        isVeg: true,
        isAvailable: true,
        rating: 4.7,
        description: 'Steamy double tastemaker Maggi with diced onions, tomatoes, green chillies & Amul butter.',
        image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      },
      {
        id: 'kh-4',
        name: 'Maska Bun with Cardamom Tea',
        category: 'Snacks',
        price: 60,
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
        description: 'Fresh soft sweet bun sliced and generously buttered, paired with a kulhad cutting.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      }
    ]
  },
  {
    id: 'tuckshop',
    name: 'Tuckshop',
    shortCategory: 'Snacks',
    tagline: 'Pocket-Friendly Masala Fries, Patties & Quick Nibbles',
    location: 'Engineering Block 3 Ground Corridor',
    rating: 4.3,
    reviewsCount: 410,
    prepTime: '4-8 mins',
    priceForTwo: '₹80',
    cuisine: ['Quick Bites', 'Samosas', 'Patties', 'Fries'],
    isVegOnly: true,
    isOpen: true,
    timing: '8:30 AM - 6:00 PM (Demo Hours)',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&auto=format&fit=crop&q=80',
    logoType: 'tuckshop',
    brandColor: '#D00000',
    menu: [
      {
        id: 'ts-fries',
        name: 'Masala Fries',
        category: 'Snacks',
        price: 89,
        isVeg: true,
        isAvailable: true,
        rating: 4.7,
        description: 'Crisp golden french fries seasoned with special campus chatpata masala.',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
        isPopular: true
      },
      {
        id: 'ts-1',
        name: 'Warm Aloo Samosa (2 pcs)',
        category: 'Snacks',
        price: 30,
        isVeg: true,
        isAvailable: true,
        rating: 4.5,
        description: 'Crispy golden pastry crust packed with spiced mashed potatoes, served with tamarind chutney.',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      },
      {
        id: 'ts-2',
        name: 'Cheese Paneer Puff Patty',
        category: 'Snacks',
        price: 35,
        isVeg: true,
        isAvailable: true,
        rating: 4.3,
        description: 'Flaky baked puff pastry stuffed with spicy paneer bhurji.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
        isPopular: true
      },
      {
        id: 'ts-3',
        name: 'Adrak Masala Chai',
        category: 'Beverages',
        price: 20,
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
        description: 'Strong hot freshly prepared ginger tea with mint leaves.',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      }
    ]
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
    name: 'Food Court',
    shortCategory: 'Food Court',
    tagline: 'Multi-Cuisine Hub: Wok Noodles, Fried Rice & Biryani',
    location: 'Main Academic Block Central Food Court',
    rating: 4.5,
    reviewsCount: 950,
    prepTime: '10-15 mins',
    priceForTwo: '₹220',
    cuisine: ['Chinese', 'Biryani', 'Meals', 'North Indian'],
    isVegOnly: false,
    isOpen: true,
    timing: '9:00 AM - 9:00 PM (Demo Hours)',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80',
    logoType: 'foodcourt',
    brandColor: '#1B4D36',
    menu: [
      {
        id: 'fc-1',
        name: 'Chilli Paneer with Veg Fried Rice Combo',
        category: 'Chinese',
        price: 130,
        isVeg: true,
        isAvailable: true,
        rating: 4.8,
        description: 'Wok-tossed paneer cubes in spicy soy chilli sauce served with aromatic stir-fried jasmine rice.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
        isPopular: true
      },
      {
        id: 'fc-2',
        name: 'Desi Hakka Noodles Bowl',
        category: 'Chinese',
        price: 90,
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
        description: 'Thin eggless noodles stir-fried on high flame with shredded cabbage, bell pepper, and garlic sauce.',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      },
      {
        id: 'fc-3',
        name: 'Crispy Masala Dosa with Sambar & Chutney',
        category: 'South Indian',
        price: 85,
        isVeg: true,
        isAvailable: true,
        rating: 4.8,
        description: 'Crispy golden fermented crepe stuffed with tempered mustard-curry leaf potato masala, served with piping hot sambar.',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
        isPopular: true
      },
      {
        id: 'fc-4',
        name: 'Steamed Idli Sambar (2 pcs)',
        category: 'South Indian',
        price: 55,
        isVeg: true,
        isAvailable: true,
        rating: 4.7,
        description: 'Pillow-soft steamed rice and lentil cakes served with home-style vegetable sambar and fresh coconut dip.',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      }
    ]
  },
  {
    id: 'sip-n-bites',
    name: 'Sip N Bites',
    shortCategory: 'Beverages',
    tagline: 'Fresh Squeezed Juices, Protein Bowls & Paninis',
    location: 'Sports Complex & Gymnasium Promenade',
    rating: 4.6,
    reviewsCount: 310,
    prepTime: '7-12 mins',
    priceForTwo: '₹170',
    cuisine: ['Healthy', 'Juices', 'Sandwiches', 'Smoothies'],
    isVegOnly: true,
    isOpen: true,
    timing: '7:30 AM - 7:30 PM (Demo Hours)',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    logoType: 'sipnbites',
    brandColor: '#0EA5E9',
    menu: [
      {
        id: 'sb-1',
        name: 'Fresh Pressed Citrus Juice',
        category: 'Beverages',
        price: 50,
        isVeg: true,
        isAvailable: true,
        rating: 4.8,
        description: 'Fresh citrus extraction with zero added sugar and a touch of black salt.',
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80',
        isPopular: true
      },
      {
        id: 'sb-2',
        name: 'Berry Banana Protein Smoothie',
        category: 'Beverages',
        price: 90,
        isVeg: true,
        isAvailable: true,
        rating: 4.7,
        description: 'Banana, mixed berries, chia seeds, and honey whipped with skimmed milk.',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      },
      {
        id: 'sb-3',
        name: 'Protein Sprouts & Paneer Salad Bowl',
        category: 'Healthy Bites',
        price: 75,
        isVeg: true,
        isAvailable: true,
        rating: 4.8,
        description: 'Sprouted moong beans, fresh cottage cheese cubes, diced cucumber, and cherry tomatoes in a lemon-herb dressing.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
        isPopular: true
      },
      {
        id: 'sb-4',
        name: 'Fresh Cut Tropical Fruit Platter',
        category: 'Healthy Bites',
        price: 65,
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
        description: 'Chilled watermelon chunks, sweet papaya, crisp apples, and pomegranate arils sprinkled with chaat masala.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      }
    ]
  },
  {
    id: 'x-burgers',
    name: 'X Burgers Café',
    shortCategory: 'Burgers',
    tagline: 'Smash Burgers, Loaded Fries & Crunchy Nuggets',
    location: 'Student Center Ground Floor',
    rating: 4.7,
    reviewsCount: 520,
    prepTime: '10-14 mins',
    priceForTwo: '₹240',
    cuisine: ['Burgers', 'Fries', 'Fast Food', 'Snacks'],
    isVegOnly: false,
    isOpen: true,
    timing: '10:00 AM - 9:00 PM (Demo Hours)',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80',
    logoType: 'xburgers',
    brandColor: '#111827',
    menu: [
      {
        id: 'xb-burger',
        name: 'Veg Burger',
        category: 'Burgers',
        price: 129,
        isVeg: true,
        isAvailable: true,
        rating: 4.9,
        description: 'Crispy seasoned spiced patty with melted double cheddar slices, gherkins & smoky BBQ aioli on brioche.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
        isPopular: true
      },
      {
        id: 'xb-2',
        name: 'Crispy Fiery Chicken Burger',
        category: 'Burgers',
        price: 155,
        isVeg: false,
        isAvailable: true,
        rating: 4.8,
        description: 'Golden fried chicken breast fillet glazed in spicy buffalo hot sauce with creamy slaw.',
        image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      },
      {
        id: 'xb-3',
        name: 'Cheesy Jalapeno Loaded Fries',
        category: 'Snacks',
        price: 95,
        isVeg: true,
        isAvailable: true,
        rating: 4.7,
        description: 'Golden fries drowned in warm cheddar cheese sauce, pickled jalapeno peppers, and smoked paprika.',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
        isPopular: false
      }
    ]
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
    name: 'Rock N Roll',
    shortCategory: 'Fast Food',
    tagline: 'Kathi Rolls, Gourmet Wraps & Quick Bites',
    cuisine: ['Fast Food', 'Rolls', 'Wraps'],
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80',
    menu: []
  },
  {
    id: 'yum-experts',
    aliasId: 'yum-express',
    name: 'Yum Experts',
    shortCategory: 'Fast Food',
    tagline: 'Express Fast Food, Snacks & Quick Refreshments',
    cuisine: ['Fast Food', 'Snacks', 'Quick Bites'],
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&auto=format&fit=crop&q=80',
    menu: []
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
  const priorityIds = ['dm-pz-1', 'dm-1', 'xb-burger', 'nc-cc-1', 'nc-1', 'ts-fries', 'kh-1', 'tlt-ch-5', 'tlt-brownie', 'cp-sw-4', 'ab-snk-9', 'ed-bg-1'];
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
