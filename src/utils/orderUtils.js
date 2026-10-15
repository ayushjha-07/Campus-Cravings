/**
 * Order Tracking Constants and Utility Helpers
 * CGC University, Mohali - Campus Cravings
 */

export const ORDER_TRACKING_STAGES = [
  { key: 'Order Placed', label: 'Order Placed', desc: 'Received by outlet system' },
  { key: 'Confirmed', label: 'Confirmed', desc: 'Accepted by campus kitchen' },
  { key: 'Preparing', label: 'Preparing', desc: 'Cooking & packing your food' },
  { key: 'Ready for Pickup', label: 'Ready for Pickup', desc: 'Ready at counter for pickup' },
  { key: 'Collected', label: 'Collected', desc: 'Food collected by student' }
];

export const VALID_STATUS_TRANSITIONS = {
  'Order Placed': 'Confirmed',
  'Placed': 'Confirmed',
  'Confirmed': 'Preparing',
  'Preparing': 'Ready for Pickup',
  'Ready for Pickup': 'Collected'
};

export const getNextValidStatus = (currentStatus) => {
  return VALID_STATUS_TRANSITIONS[currentStatus] || null;
};

export const isValidStatusTransition = (currentStatus, newStatus) => {
  if (VALID_STATUS_TRANSITIONS[currentStatus] === newStatus) return true;
  if (currentStatus === 'Placed' && newStatus === 'Confirmed') return true;
  return false;
};

export const getStatusActionInfo = (status) => {
  switch (status) {
    case 'Order Placed':
    case 'Placed':
      return {
        nextStatus: 'Confirmed',
        label: 'Confirm Order',
        color: 'emerald',
        confirmMessage: 'Accept and confirm this order in the kitchen?'
      };
    case 'Confirmed':
      return {
        nextStatus: 'Preparing',
        label: 'Start Preparing',
        color: 'amber',
        confirmMessage: 'Start cooking and packaging this order?'
      };
    case 'Preparing':
      return {
        nextStatus: 'Ready for Pickup',
        label: 'Mark Ready for Pickup',
        color: 'emerald',
        confirmMessage: 'Notify student that food is ready at the counter?'
      };
    case 'Ready for Pickup':
      return {
        nextStatus: 'Collected',
        label: 'Mark Collected',
        color: 'blue',
        confirmMessage: 'Confirm that this meal was handed over to the student?'
      };
    default:
      return null;
  }
};

export const isOrderEligibleForCancellation = (order) => {
  if (!order) return false;
  const status = order.status;
  return status === 'Order Placed' || status === 'Placed' || status === 'Confirmed';
};

export const getOrderOutletGroups = (order) => {
  if (order.outletGroups && order.outletGroups.length > 0) return order.outletGroups;
  const groups = {};
  (order.items || []).forEach(item => {
    const key = item.outletId || item.outletName || order.outletName || 'Campus Outlet';
    if (!groups[key]) {
      const letter = (item.outletName || order.outletName || 'C')[0].toUpperCase();
      groups[key] = {
        outletId: item.outletId || order.outletId,
        outletName: item.outletName || order.outletName || 'Campus Outlet',
        outletLocation: item.outletLocation || order.outletLocation || 'CGC Mohali Campus',
        pickupCode: order.pickupCode || order.pickupToken || `${letter}-42`,
        items: []
      };
    }
    groups[key].items.push(item);
  });
  return Object.values(groups);
};

export const getOutletOrders = (allOrders, targetOutletId) => {
  if (!allOrders || !Array.isArray(allOrders)) return [];
  if (!targetOutletId) return allOrders;
  const cleanId = targetOutletId.toLowerCase();

  return allOrders.filter(order => {
    if (order.outletId && order.outletId.toLowerCase() === cleanId) return true;
    if (order.items && order.items.some(it => it.outletId && it.outletId.toLowerCase() === cleanId)) return true;
    if (order.outletGroups && order.outletGroups.some(g => g.outletId && g.outletId.toLowerCase() === cleanId)) return true;
    if (order.outletName && order.outletName.toLowerCase().includes(cleanId)) return true;
    return false;
  });
};

export const getOutletItemsInOrder = (order, targetOutletId) => {
  if (!order || !order.items) return [];
  if (!targetOutletId) return order.items;
  const cleanId = targetOutletId.toLowerCase();

  const matchingItems = order.items.filter(it => 
    it.outletId ? it.outletId.toLowerCase() === cleanId : (order.outletId && order.outletId.toLowerCase() === cleanId)
  );

  return matchingItems.length > 0 ? matchingItems : order.items;
};

export const getOutletSubtotalInOrder = (order, targetOutletId) => {
  const items = getOutletItemsInOrder(order, targetOutletId);
  return items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
};

export const INITIAL_DEMO_ORDERS = [
  // 1. KULHAD - Awaiting Confirmation (New Order)
  {
    id: 'CGC-DEMO-85012',
    orderNumber: 'CGC-DEMO-85012',
    outletId: 'kulhad',
    outletName: 'Kulhad',
    outletLocation: 'Central Lawn Food Kiosk, Counter 1',
    pickupToken: 'K-55',
    pickupCode: 'K-55',
    status: 'Order Placed',
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    orderDate: 'Today, ' + new Date(Date.now() - 2 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    estimatedTime: 'Pending Confirmation',
    paymentMethod: 'Pay at Pickup Counter',
    paymentStatus: 'Payment Due at Pickup Counter',
    items: [
      { id: 'kh-3', name: 'Kulhad Bun Maska with Elaichi Chai', price: 55, quantity: 2, outletId: 'kulhad', outletName: 'Kulhad', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80' }
    ],
    outletGroups: [
      {
        outletId: 'kulhad',
        outletName: 'Kulhad',
        outletLocation: 'Central Lawn Food Kiosk, Counter 1',
        pickupCode: 'K-55',
        items: [
          { id: 'kh-3', name: 'Kulhad Bun Maska with Elaichi Chai', price: 55, quantity: 2 }
        ]
      }
    ],
    subtotal: 110,
    packagingFee: 5,
    discount: 0,
    total: 115,
    studentName: 'Rohan Mehra',
    studentId: 'CGC2023ME104',
    rollNo: 'CGC2023ME104',
    contactNumber: '+91 98111 22334',
    pickupNote: 'Extra hot chai please',
    timeline: [
      { stage: 'Order Placed', time: new Date(Date.now() - 2 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true }
    ],
    isDemoOrder: true
  },

  // 2. KULHAD - Cooking & Preparing
  {
    id: 'CGC-DEMO-84910',
    orderNumber: 'CGC-DEMO-84910',
    outletId: 'kulhad',
    outletName: 'Kulhad',
    outletLocation: 'Central Lawn Food Kiosk, Counter 1',
    pickupToken: 'K-49',
    pickupCode: 'K-49',
    status: 'Preparing',
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    orderDate: 'Today, ' + new Date(Date.now() - 8 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    estimatedTime: 'Ready in ~6 mins',
    paymentMethod: 'Pay Online (Demo Simulation)',
    paymentStatus: 'Demo Prepaid (Simulation)',
    items: [
      { id: 'kh-2', name: 'Overloaded Kulhad Pizza', price: 119, quantity: 1, outletId: 'kulhad', outletName: 'Kulhad', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
      { id: 'kh-1', name: 'Special Tandoori Kulhad Chai', price: 25, quantity: 1, outletId: 'kulhad', outletName: 'Kulhad', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80' }
    ],
    outletGroups: [
      {
        outletId: 'kulhad',
        outletName: 'Kulhad',
        outletLocation: 'Central Lawn Food Kiosk, Counter 1',
        pickupCode: 'K-49',
        items: [
          { id: 'kh-2', name: 'Overloaded Kulhad Pizza', price: 119, quantity: 1 },
          { id: 'kh-1', name: 'Special Tandoori Kulhad Chai', price: 25, quantity: 1 }
        ]
      }
    ],
    subtotal: 144,
    packagingFee: 5,
    discount: 14,
    total: 135,
    studentName: 'Priya Verma',
    studentId: 'CGC2023IT029',
    rollNo: 'CGC2023IT029',
    contactNumber: '+91 97222 33445',
    pickupNote: 'Extra cheese seasoning',
    timeline: [
      { stage: 'Order Placed', time: '12:22 PM', completed: true },
      { stage: 'Confirmed', time: '12:23 PM', completed: true },
      { stage: 'Preparing', time: '12:25 PM', completed: true }
    ],
    isDemoOrder: true
  },

  // 3. KULHAD - Ready for Pickup
  {
    id: 'CGC-DEMO-84210',
    orderNumber: 'CGC-DEMO-84210',
    outletId: 'kulhad',
    outletName: 'Kulhad',
    outletLocation: 'Central Lawn Food Kiosk, Counter 1',
    pickupToken: 'K-42',
    pickupCode: 'K-42',
    status: 'Ready for Pickup',
    createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    orderDate: 'Today, ' + new Date(Date.now() - 18 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    estimatedTime: 'Ready now at counter',
    paymentMethod: 'Pay at Pickup Counter',
    paymentStatus: 'Payment Due at Pickup Counter',
    items: [
      { id: 'kh-1', name: 'Special Tandoori Kulhad Chai', price: 25, quantity: 2, outletId: 'kulhad', outletName: 'Kulhad', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80' },
      { id: 'kh-2', name: 'Overloaded Kulhad Pizza', price: 119, quantity: 1, outletId: 'kulhad', outletName: 'Kulhad', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' }
    ],
    outletGroups: [
      {
        outletId: 'kulhad',
        outletName: 'Kulhad',
        outletLocation: 'Central Lawn Food Kiosk, Counter 1',
        pickupCode: 'K-42',
        items: [
          { id: 'kh-1', name: 'Special Tandoori Kulhad Chai', price: 25, quantity: 2 },
          { id: 'kh-2', name: 'Overloaded Kulhad Pizza', price: 119, quantity: 1 }
        ]
      }
    ],
    subtotal: 169,
    packagingFee: 5,
    discount: 0,
    total: 174,
    studentName: 'Aarav Sharma',
    studentId: 'CGC2023CSE042',
    rollNo: 'CGC2023CSE042',
    contactNumber: '+91 98765 43210',
    pickupNote: 'Extra napkins and clay cups please',
    timeline: [
      { stage: 'Order Placed', time: '12:15 PM', completed: true },
      { stage: 'Confirmed', time: '12:16 PM', completed: true },
      { stage: 'Preparing', time: '12:20 PM', completed: true },
      { stage: 'Ready for Pickup', time: '12:28 PM', completed: true }
    ],
    isDemoOrder: true
  },

  // 4. KULHAD - Completed / Collected
  {
    id: 'CGC-DEMO-83204',
    orderNumber: 'CGC-DEMO-83204',
    outletId: 'kulhad',
    outletName: 'Kulhad',
    outletLocation: 'Central Lawn Food Kiosk, Counter 1',
    pickupToken: 'K-31',
    pickupCode: 'K-31',
    status: 'Collected',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    orderDate: 'Today, ' + new Date(Date.now() - 45 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    estimatedTime: 'Food Collected',
    paymentMethod: 'Pay at Pickup Counter',
    paymentStatus: 'Paid at Counter',
    items: [
      { id: 'kh-1', name: 'Special Tandoori Kulhad Chai', price: 25, quantity: 4, outletId: 'kulhad', outletName: 'Kulhad', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80' }
    ],
    outletGroups: [
      {
        outletId: 'kulhad',
        outletName: 'Kulhad',
        outletLocation: 'Central Lawn Food Kiosk, Counter 1',
        pickupCode: 'K-31',
        items: [
          { id: 'kh-1', name: 'Special Tandoori Kulhad Chai', price: 25, quantity: 4 }
        ]
      }
    ],
    subtotal: 100,
    packagingFee: 5,
    discount: 0,
    total: 105,
    studentName: 'Karan Patel',
    studentId: 'CGC2023ECE077',
    rollNo: 'CGC2023ECE077',
    contactNumber: '+91 99888 77665',
    pickupNote: 'None',
    timeline: [
      { stage: 'Order Placed', time: '11:45 AM', completed: true },
      { stage: 'Confirmed', time: '11:46 AM', completed: true },
      { stage: 'Preparing', time: '11:49 AM', completed: true },
      { stage: 'Ready for Pickup', time: '11:55 AM', completed: true },
      { stage: 'Collected', time: '11:58 AM', completed: true }
    ],
    isDemoOrder: true
  },

  // 5. DOMINOS - Confirmed
  {
    id: 'CGC-DEMO-91044',
    orderNumber: 'CGC-DEMO-91044',
    outletId: 'dominos',
    outletName: 'Dominos',
    outletLocation: 'Student Food Court, First Floor Counter 2',
    pickupToken: 'D-18',
    pickupCode: 'D-18',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    orderDate: 'Today, ' + new Date(Date.now() - 4 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    estimatedTime: 'Ready in ~14 mins',
    paymentMethod: 'Pay Online (Demo Simulation)',
    paymentStatus: 'Demo Prepaid (Simulation)',
    items: [
      { id: 'dm-1', name: 'Farmhouse Regular Pizza', price: 179, quantity: 1, outletId: 'dominos', outletName: 'Dominos', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80' },
      { id: 'dm-3', name: 'Stuffed Garlic Breadsticks', price: 99, quantity: 1, outletId: 'dominos', outletName: 'Dominos', image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?auto=format&fit=crop&w=400&q=80' }
    ],
    outletGroups: [
      {
        outletId: 'dominos',
        outletName: 'Dominos',
        outletLocation: 'Student Food Court, First Floor Counter 2',
        pickupCode: 'D-18',
        items: [
          { id: 'dm-1', name: 'Farmhouse Regular Pizza', price: 179, quantity: 1 },
          { id: 'dm-3', name: 'Stuffed Garlic Breadsticks', price: 99, quantity: 1 }
        ]
      }
    ],
    subtotal: 278,
    packagingFee: 5,
    discount: 28,
    total: 255,
    studentName: 'Simran Kaur',
    studentId: 'CGC2023ECE019',
    rollNo: 'CGC2023ECE019',
    contactNumber: '+91 98123 45678',
    pickupNote: 'Please pack oregano seasoning packets',
    timeline: [
      { stage: 'Order Placed', time: '12:35 PM', completed: true },
      { stage: 'Confirmed', time: '12:36 PM', completed: true }
    ],
    isDemoOrder: true
  },

  // 6. NESCAFE - Collected
  {
    id: 'CGC-DEMO-73201',
    orderNumber: 'CGC-DEMO-73201',
    outletId: 'nescafe',
    outletName: 'Nescafe',
    outletLocation: 'Academic Block 1, Ground Floor Porch',
    pickupToken: 'N-07',
    pickupCode: 'N-07',
    status: 'Collected',
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    orderDate: 'Yesterday, 3:15 PM',
    estimatedTime: 'Food Collected',
    paymentMethod: 'Pay at Pickup Counter',
    paymentStatus: 'Paid at Counter',
    items: [
      { id: 'nc-1', name: 'Classic Cold Coffee Frappe', price: 50, quantity: 2, outletId: 'nescafe', outletName: 'Nescafe', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80' },
      { id: 'nc-3', name: 'Grilled Cheese Sandwich', price: 65, quantity: 1, outletId: 'nescafe', outletName: 'Nescafe', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80' }
    ],
    outletGroups: [
      {
        outletId: 'nescafe',
        outletName: 'Nescafe',
        outletLocation: 'Academic Block 1, Ground Floor Porch',
        pickupCode: 'N-07',
        items: [
          { id: 'nc-1', name: 'Classic Cold Coffee Frappe', price: 50, quantity: 2 },
          { id: 'nc-3', name: 'Grilled Cheese Sandwich', price: 65, quantity: 1 }
        ]
      }
    ],
    subtotal: 165,
    packagingFee: 5,
    discount: 0,
    total: 170,
    studentName: 'Aarav Sharma',
    studentId: 'CGC2023CSE042',
    rollNo: 'CGC2023CSE042',
    contactNumber: '+91 98765 43210',
    pickupNote: 'None',
    timeline: [
      { stage: 'Order Placed', time: '3:15 PM', completed: true },
      { stage: 'Confirmed', time: '3:16 PM', completed: true },
      { stage: 'Preparing', time: '3:19 PM', completed: true },
      { stage: 'Ready for Pickup', time: '3:25 PM', completed: true },
      { stage: 'Collected', time: '3:29 PM', completed: true }
    ],
    isDemoOrder: true
  },

  // 7. TUCKSHOP - Cancelled
  {
    id: 'CGC-DEMO-61892',
    orderNumber: 'CGC-DEMO-61892',
    outletId: 'tuckshop',
    outletName: 'Tuckshop',
    outletLocation: 'Main Auditorium Foyer',
    pickupToken: 'T-15',
    pickupCode: 'T-15',
    status: 'Cancelled',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    orderDate: 'Today, 10:10 AM',
    estimatedTime: 'Order Cancelled',
    paymentMethod: 'Pay at Pickup Counter',
    paymentStatus: 'Cancelled (No payment due)',
    items: [
      { id: 'ts-2', name: 'Crispy Veg Spring Roll (2 Pcs)', price: 40, quantity: 2, outletId: 'tuckshop', outletName: 'Tuckshop', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80' }
    ],
    outletGroups: [
      {
        outletId: 'tuckshop',
        outletName: 'Tuckshop',
        outletLocation: 'Main Auditorium Foyer',
        pickupCode: 'T-15',
        items: [
          { id: 'ts-2', name: 'Crispy Veg Spring Roll (2 Pcs)', price: 40, quantity: 2 }
        ]
      }
    ],
    subtotal: 80,
    packagingFee: 5,
    discount: 0,
    total: 85,
    studentName: 'Aarav Sharma',
    studentId: 'CGC2023CSE042',
    rollNo: 'CGC2023CSE042',
    contactNumber: '+91 98765 43210',
    pickupNote: 'Extra spicy dip',
    cancelledAt: new Date(Date.now() - 2.8 * 60 * 60 * 1000).toISOString(),
    cancellationReason: 'Lecture schedule shifted to Lab 3',
    timeline: [
      { stage: 'Order Placed', time: '10:10 AM', completed: true },
      { stage: 'Confirmed', time: '10:11 AM', completed: true }
    ],
    isDemoOrder: true
  }
];
