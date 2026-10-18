// Kulhad - Official Menu Data for CGC University, Mohali
// Extracted from original vendor physical menu board "Kulhad - Swad Desh ki Mittee ka"

export const KULHAD_MENU = [
  // 1. Pizza (5 items)
  {
    id: 'kh-pz-1',
    name: 'Onion Capsicum Pizza',
    category: 'Pizza',
    price: 89,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Crispy golden crust baked with fresh crunchy onions, green capsicum, mozzarella and signature herbs.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-pz-2',
    name: 'Sweet Corn Pizza',
    category: 'Pizza',
    price: 99,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Loaded with juicy sweet American golden corn kernels, molten cheese and Italian herbs.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-pz-3',
    name: 'Veg Pizza',
    category: 'Pizza',
    price: 119,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Classic garden fresh vegetable pizza with bell peppers, tomatoes, onions, sweet corn and stringy cheese.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'kh-pz-4',
    name: 'Paneer Pizza',
    category: 'Pizza',
    price: 159,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Topped with soft marinated spiced cottage cheese cubes, capsicum, onions and melted cheese.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-pz-5',
    name: 'Cheese Overloaded Pizza',
    category: 'Pizza',
    price: 179,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Excess molten mozzarella and cheddar cheese blend for extreme cheese pull indulgence.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 2. Maggi (3 items)
  {
    id: 'kh-mg-1',
    name: 'Plain Maggi',
    category: 'Maggi',
    price: 30,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Classic comfort Maggi noodles prepared with authentic tastemaker seasoning.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-mg-2',
    name: 'Veg Maggi',
    category: 'Maggi',
    price: 40,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Steaming hot Maggi tossed with sautéed onions, peas, tomatoes, carrots and fresh coriander.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-mg-3',
    name: 'Cheese Maggi',
    category: 'Maggi',
    price: 50,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Rich creamy Maggi topped with generous molten grated cheese and spicy chili flakes.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 3. Fries (3 items)
  {
    id: 'kh-fr-1',
    name: 'Salted Fries',
    category: 'Fries',
    price: 69,
    isVeg: true,
    isAvailable: true,
    rating: 4.5,
    description: 'Golden crispy potato fingers tossed lightly in pure sea salt.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-fr-2',
    name: 'Peri Peri Fries',
    category: 'Fries',
    price: 79,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Crispy fried French fries dusted generously with hot spicy African peri peri seasoning.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-fr-3',
    name: 'Cheese Fries',
    category: 'Fries',
    price: 89,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Hot crispy fries smothered in rich, warm cheddar cheese sauce drizzle.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 4. Burger (4 items)
  {
    id: 'kh-bg-1',
    name: 'Aloo Tikki Burger',
    category: 'Burger',
    price: 49,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Crispy spiced potato patty with freshly sliced onion, tomato and burger mayo in warm buns.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-bg-2',
    name: 'Veg Burger',
    category: 'Burger',
    price: 59,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Seasoned mixed vegetable crumbed patty layered with lettuce, onions and creamy dressing.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'kh-bg-3',
    name: 'Paneer Burger',
    category: 'Burger',
    price: 79,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Crispy marinated cottage cheese paneer patty served with fresh veggies and herb sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-bg-4',
    name: 'Special Burger',
    category: 'Burger',
    price: 99,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Towering special burger with double patty, cheese slice, fresh greens and signature chef spread.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 5. Wrap (2 items)
  {
    id: 'kh-wr-1',
    name: 'Veg Wrap',
    category: 'Wrap',
    price: 75,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Soft tortilla rolled with spiced crunchy garden veggies, tangy herb dressing and mint mayo.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-wr-2',
    name: 'Paneer Wrap',
    category: 'Wrap',
    price: 99,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Tender marinated cottage cheese paneer cubes wrapped with sliced bell peppers, onions and special roll dip.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 6. Street Food (4 items)
  {
    id: 'kh-sf-1',
    name: 'Golgappe (Atta)',
    category: 'Street Food',
    price: 20,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Crispy whole wheat puris filled with spiced potato-chickpea mash and tangy chilled mint-imli water.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-sf-2',
    name: 'Golgappe (Suji)',
    category: 'Street Food',
    price: 20,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Ultra-crisp semolina puris loaded with spiced filling and signature flavored teekha-meetha pani.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-sf-3',
    name: 'Dahi Puri',
    category: 'Street Food',
    price: 50,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Crisp puris stuffed with potato masala, drenched in sweet chilled curd, tamarind chutney and nylon sev.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-sf-4',
    name: 'Phirni (250g)',
    category: 'Street Food',
    price: 50,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Traditional slow-cooked ground rice pudding flavored with green cardamom, saffron and chopped nuts in earthen kulhad.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 7. Sandwich (3 items)
  {
    id: 'kh-sw-1',
    name: 'Veg Sandwich',
    category: 'Sandwich',
    price: 75,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Golden toasted bread stuffed with spiced vegetable mix, cucumbers, tomatoes and creamy green chutney.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-sw-2',
    name: 'SweetCorn Sandwich',
    category: 'Sandwich',
    price: 85,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Crispy grilled bread packed with sweet juicy golden corn kernels, mild mayo and cheese herbs.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-sw-3',
    name: 'Paneer Sandwich',
    category: 'Sandwich',
    price: 99,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Rich grilled sandwich packed with spiced paneer cubes, chopped capsicum and creamy herb spread.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 8. Chai (6 items with Chhota 110ml / Bada 220ml portion variants)
  {
    id: 'kh-ch-1',
    name: 'Normal Chai',
    category: 'Chai',
    price: 20,
    variants: [
      { name: 'Chhota (110 ml)', price: 20 },
      { name: 'Bada (220 ml)', price: 40 }
    ],
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Desi style milk tea brewed with rich tea leaves, served in traditional earthen clay kulhad.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-ch-2',
    name: 'Adrak Chai',
    category: 'Chai',
    price: 20,
    variants: [
      { name: 'Chhota (110 ml)', price: 20 },
      { name: 'Bada (220 ml)', price: 40 }
    ],
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Freshly crushed ginger root simmered with strong Assam tea and milk for authentic adrak kick.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-ch-3',
    name: 'Elaichi Chai',
    category: 'Chai',
    price: 25,
    variants: [
      { name: 'Chhota (110 ml)', price: 25 },
      { name: 'Bada (220 ml)', price: 50 }
    ],
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Fragrant green cardamom pods infused with slow-boiled creamy tea in earthen kulhad.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-ch-4',
    name: 'Rose Chai',
    category: 'Chai',
    price: 25,
    variants: [
      { name: 'Chhota (110 ml)', price: 25 },
      { name: 'Bada (220 ml)', price: 50 }
    ],
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Delicate soothing organic rose petal essence brewed into hot comforting spiced chai.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'kh-ch-5',
    name: 'Masala Chai',
    category: 'Chai',
    price: 25,
    variants: [
      { name: 'Chhota (110 ml)', price: 25 },
      { name: 'Bada (220 ml)', price: 50 }
    ],
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'House blend of cloves, black pepper, cinnamon, nutmeg and ginger in steaming kulhad.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-ch-6',
    name: 'Gur Chai',
    category: 'Chai',
    price: 25,
    variants: [
      { name: 'Chhota (110 ml)', price: 25 },
      { name: 'Bada (220 ml)', price: 50 }
    ],
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Naturally sweetened organic Punjabi jaggery (gur) brewed with aromatic chai spices.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 9. Hot Coffee (3 items)
  {
    id: 'kh-hc-1',
    name: 'Classic Coffee',
    category: 'Hot Coffee',
    price: 30,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Rich frothy roasted coffee whipped with hot sweetened whole milk.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-hc-2',
    name: 'Choco Coffee',
    category: 'Hot Coffee',
    price: 35,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Decadent mocha blend combining hot espresso roast with velvety melted chocolate.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'kh-hc-3',
    name: 'Black Coffee',
    category: 'Hot Coffee',
    price: 35,
    isVeg: true,
    isAvailable: true,
    rating: 4.5,
    description: 'Pure bold dark roasted black coffee without milk for an instant energy boost.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 10. Lassi (4 items)
  {
    id: 'kh-ls-1',
    name: 'Sweet Lassi',
    category: 'Lassi',
    price: 45,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Traditional thick churned sweet yogurt drink served chilled in an earthen kulhad.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-ls-2',
    name: 'Masala Lassi',
    category: 'Lassi',
    price: 50,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Savory spiced buttermilk churned with roasted cumin, black salt and mint.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'kh-ls-3',
    name: 'Mango Lassi',
    category: 'Lassi',
    price: 55,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Luscious tropical Alphonso mango pulp blended with creamy thick sweetened curd.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-ls-4',
    name: 'Dry Fruit Lassi',
    category: 'Lassi',
    price: 60,
    isVeg: true,
    isAvailable: true,
    rating: 4.9,
    description: 'Royal rich lassi generously garnished with chopped almonds, pistachios and saffron strands.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 11. Shakes (5 items)
  {
    id: 'kh-sh-1',
    name: 'Banana Shake',
    category: 'Shakes',
    price: 59,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Fresh ripe bananas blended into rich chilled milk shake.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'kh-sh-2',
    name: 'Oreo Shake',
    category: 'Shakes',
    price: 69,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Crunchy crushed chocolate Oreo cookies whipped with milk and vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-sh-3',
    name: 'Chocolate Shake',
    category: 'Shakes',
    price: 69,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Classic rich cocoa chocolate shake drizzled with chocolate syrup.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-sh-4',
    name: 'Strawberry Shake',
    category: 'Shakes',
    price: 75,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Sweet berry strawberry syrup blended with rich cream and milk.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'kh-sh-5',
    name: 'Vanilla Shake',
    category: 'Shakes',
    price: 75,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Silky smooth classic vanilla bean ice cream whipped into frosty thick shake.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 12. Cookies (3 items)
  {
    id: 'kh-ck-1',
    name: 'Besan Choco Chips (2 pcs)',
    category: 'Cookies',
    price: 15,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Artisanal roasted gram flour besan cookies baked with dark chocolate chips.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-ck-2',
    name: 'Honey Oat Meal (2 pcs)',
    category: 'Cookies',
    price: 15,
    isVeg: true,
    isAvailable: true,
    rating: 4.6,
    description: 'Crisp wholesome rolled oats cookies baked with natural honey sweetness.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'kh-ck-3',
    name: 'Besan (Gluten Free) (2 pcs)',
    category: 'Cookies',
    price: 15,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Pure gluten-free traditional roasted besan cookies with aromatic cardamom crunch.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },

  // 13. Cold Coffee (4 items)
  {
    id: 'kh-cc-1',
    name: 'Plain CC',
    category: 'Cold Coffee',
    price: 59,
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Refreshing creamy iced cold coffee blended with fresh milk and roasted coffee.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-cc-2',
    name: 'Choco CC',
    category: 'Cold Coffee',
    price: 75,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Chilled espresso whipped with velvety chocolate fudge syrup and ice cream.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-cc-3',
    name: 'Hazelnut CC',
    category: 'Cold Coffee',
    price: 79,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Gourmet cold coffee infused with rich nutty aromatic hazelnut syrup.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-cc-4',
    name: 'Carmel CC',
    category: 'Cold Coffee',
    price: 79,
    isVeg: true,
    isAvailable: true,
    rating: 4.8,
    description: 'Silky smooth cold coffee drizzled with rich butterscotch caramel sauce.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // 14. Extras & Water (2 items)
  {
    id: 'kh-ex-1',
    name: 'Edible Cup',
    category: 'Extras',
    price: 10,
    variants: [
      { name: 'Small', price: 5 },
      { name: 'Regular', price: 10 }
    ],
    isVeg: true,
    isAvailable: true,
    rating: 4.7,
    description: 'Eco-friendly crunchy biscuit edible cup for your hot chai or coffee.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'kh-ex-2',
    name: 'Packaged Water Bottle',
    category: 'Beverages',
    price: 20,
    isVeg: true,
    isAvailable: true,
    rating: 4.5,
    description: 'Chilled sealed packaged drinking water bottle (MRP).',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  }
];
