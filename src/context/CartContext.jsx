import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  ORDER_TRACKING_STAGES, 
  isOrderEligibleForCancellation, 
  getOrderOutletGroups, 
  INITIAL_DEMO_ORDERS 
} from '../utils/orderUtils';

export { 
  ORDER_TRACKING_STAGES, 
  isOrderEligibleForCancellation, 
  getOrderOutletGroups, 
  INITIAL_DEMO_ORDERS 
};

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const auth = useAuth();

  // Active student identity derived from AuthContext
  const user = auth?.user || {
    isLoggedIn: true,
    name: 'Aarav Sharma',
    rollNo: 'CGC2023CSE042',
    studentId: 'CGC2023CSE042',
    email: 'aarav.cgc@cgc.edu.in',
    phone: '+91 98765 43210',
    hostel: 'Boys Hostel 3, Room 214',
    department: 'Computer Science & Engineering',
    campus: 'CGC University, Mohali'
  };

  // Cart items state: { id, name, price, isVeg, image, outletId, outletName, quantity }
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_cravings_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Order history
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_cravings_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure all parsed orders have orderNumber, pickupCode, and outletGroups
          return parsed.map(ord => ({
            ...ord,
            orderNumber: ord.orderNumber || ord.id,
            pickupCode: ord.pickupCode || ord.pickupToken || 'C-10',
            pickupToken: ord.pickupToken || ord.pickupCode || 'C-10',
            outletGroups: ord.outletGroups || getOrderOutletGroups(ord)
          }));
        }
      }
      return INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  // Discount code state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('campus_cravings_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('campus_cravings_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_cravings_favorites');
      return saved ? JSON.parse(saved) : ['dm-1', 'nc-1'];
    } catch {
      return ['dm-1', 'nc-1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('campus_cravings_user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('campus_cravings_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Toast notification state
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(prev => (prev === message ? null : prev));
    }, 3200);
  };

  const dismissNotification = () => setNotification(null);

  // Cart actions
  const addToCart = (item, outletInfo, customQuantity = 1) => {
    const qty = Math.max(1, customQuantity);
    setCartItems(prev => {
      // Check if existing item from the same outlet (or by item id)
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          isVeg: item.isVeg,
          image: item.image,
          category: item.category,
          outletId: outletInfo?.id || item.outletId,
          outletName: outletInfo?.name || item.outletName,
          outletLocation: outletInfo?.location || item.outletLocation,
          quantity: qty
        }
      ];
    });

    const outletName = outletInfo?.name || item.outletName || 'Campus Outlet';
    showNotification(`Added ${qty} × ${item.name} from ${outletName} to your cart!`);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity: newQty } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const getItemQuantity = (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  // Calculations
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const packagingFee = cartItems.length > 0 ? 5 : 0;
  const discountAmount = appliedCoupon ? Math.round(subtotal * appliedCoupon.percentage) : 0;
  const total = Math.max(0, subtotal + packagingFee - discountAmount);

  // Group items by outlet (students may order from multiple or single outlet)
  const itemsByOutlet = cartItems.reduce((acc, item) => {
    const outlet = item.outletName || 'Campus Outlet';
    if (!acc[outlet]) acc[outlet] = [];
    acc[outlet].push(item);
    return acc;
  }, {});

  // Structured outlet groups with ID, location, items, and outlet subtotal
  const outletsInCart = Object.entries(
    cartItems.reduce((acc, item) => {
      const key = item.outletId || item.outletName || 'campus-outlet';
      if (!acc[key]) {
        acc[key] = {
          outletId: item.outletId,
          outletName: item.outletName || 'Campus Outlet',
          outletLocation: item.outletLocation || 'CGC Mohali Campus',
          items: [],
          outletSubtotal: 0,
          outletItemCount: 0
        };
      }
      acc[key].items.push(item);
      acc[key].outletSubtotal += item.price * item.quantity;
      acc[key].outletItemCount += item.quantity;
      return acc;
    }, {})
  ).map(([, value]) => value);

  // Apply Coupon Code
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'CGC10') {
      setAppliedCoupon({ code: 'CGC10', percentage: 0.10, description: '10% CGC Student Discount' });
      return { success: true, message: 'CGC10 applied: 10% discount!' };
    }
    if (cleanCode === 'BREAK5') {
      setAppliedCoupon({ code: 'BREAK5', percentage: 0.05, description: '5% Campus Break Discount' });
      return { success: true, message: 'BREAK5 applied: 5% discount!' };
    }
    return { success: false, message: 'Invalid coupon code. Try CGC10 or BREAK5' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Place order
  const placeOrder = ({ 
    studentName, 
    studentId, 
    contactNumber, 
    pickupOutlet, 
    pickupNote, 
    paymentMethod, 
    customPickupTime 
  }) => {
    if (cartItems.length === 0) return null;

    // Outlets involved in order
    const involvedOutlets = Array.from(
      new Set(cartItems.map(item => item.outletName || 'Campus Outlet'))
    );
    const primaryOutlet = cartItems[0];
    const orderId = `CGC-DEMO-${Math.floor(10000 + Math.random() * 90000)}`;
    const tokenLetter = (primaryOutlet.outletName || 'C')[0].toUpperCase();
    const pickupToken = `${tokenLetter}-${Math.floor(10 + Math.random() * 90)}`;

    // Build outletGroups for multi-outlet support
    const outletGroupsMap = cartItems.reduce((acc, item) => {
      const key = item.outletId || item.outletName || 'campus-outlet';
      if (!acc[key]) {
        const letter = (item.outletName || 'C')[0].toUpperCase();
        acc[key] = {
          outletId: item.outletId,
          outletName: item.outletName || 'Campus Outlet',
          outletLocation: item.outletLocation || 'CGC Campus Counter',
          pickupCode: `${letter}-${Math.floor(10 + Math.random() * 90)}`,
          items: []
        };
      }
      acc[key].items.push(item);
      return acc;
    }, {});
    const outletGroups = Object.values(outletGroupsMap);

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: orderId,
      orderNumber: orderId,
      outletId: primaryOutlet.outletId,
      outletName: pickupOutlet || involvedOutlets.join(', '),
      outletLocation: primaryOutlet.outletLocation || 'CGC Campus',
      involvedOutlets: involvedOutlets,
      pickupToken: pickupToken,
      pickupCode: pickupToken,
      status: 'Confirmed', // Set initial status to Confirmed upon order creation
      createdAt: new Date().toISOString(),
      orderDate: 'Today, ' + nowStr,
      estimatedTime: customPickupTime || 'Ready in ~12-15 mins',
      paymentMethod: paymentMethod === 'online' ? 'Pay Online (Demo Simulation)' : 'Pay at Pickup Counter',
      paymentStatus: paymentMethod === 'online' ? 'Demo Prepaid (Simulation)' : 'Payment Due at Pickup Counter',
      items: [...cartItems],
      outletGroups: outletGroups,
      subtotal,
      packagingFee,
      discount: discountAmount,
      total,
      studentName: studentName || user?.name || 'Aarav Sharma',
      studentId: studentId || user?.rollNo || 'CGC2023CSE042',
      rollNo: studentId || user?.rollNo || 'CGC2023CSE042',
      contactNumber: contactNumber || user?.phone || '+91 98765 43210',
      pickupNote: pickupNote || 'None',
      timeline: [
        { stage: 'Order Placed', time: nowStr, completed: true },
        { stage: 'Confirmed', time: nowStr, completed: true },
        { stage: 'Preparing', time: null, completed: false },
        { stage: 'Ready for Pickup', time: null, completed: false },
        { stage: 'Collected', time: null, completed: false }
      ],
      isDemoOrder: true
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find(o => o.id === orderId || o.orderNumber === orderId);
  };

  // Update order status (for simulation / status step demo)
  const updateOrderStatus = (orderId, newStatus, extraData = {}) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId || ord.orderNumber === orderId) {
          let updatedTimeline = ord.timeline || [
            { stage: 'Order Placed', time: nowStr, completed: true },
            { stage: 'Confirmed', time: nowStr, completed: true },
            { stage: 'Preparing', time: null, completed: false },
            { stage: 'Ready for Pickup', time: null, completed: false },
            { stage: 'Collected', time: null, completed: false }
          ];

          if (newStatus === 'Preparing') {
            updatedTimeline = updatedTimeline.map(t =>
              t.stage === 'Preparing' ? { ...t, time: nowStr, completed: true } : t
            );
          } else if (newStatus === 'Ready for Pickup') {
            updatedTimeline = updatedTimeline.map(t =>
              t.stage === 'Preparing' || t.stage === 'Ready for Pickup' ? { ...t, time: t.time || nowStr, completed: true } : t
            );
          } else if (newStatus === 'Collected' || newStatus === 'Completed') {
            updatedTimeline = updatedTimeline.map(t => ({ ...t, time: t.time || nowStr, completed: true }));
          }

          return {
            ...ord,
            status: newStatus,
            timeline: updatedTimeline,
            ...extraData
          };
        }
        return ord;
      })
    );
  };

  // Cancel order (allowed only if eligible: not entered preparation)
  const cancelOrder = (orderId, reason = 'Cancelled by student request') => {
    let wasCancelled = false;
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId || ord.orderNumber === orderId) {
          if (['Order Placed', 'Placed', 'Confirmed'].includes(ord.status)) {
            wasCancelled = true;
            return {
              ...ord,
              status: 'Cancelled',
              cancelledAt: new Date().toISOString(),
              cancellationReason: reason,
              paymentStatus: ord.paymentMethod.includes('Online')
                ? 'Refund Initiated (Demo Simulation)'
                : 'Cancelled (No payment due)'
            };
          }
        }
        return ord;
      })
    );

    if (wasCancelled) {
      showNotification(`Order #${orderId} was cancelled successfully.`);
      return { success: true };
    } else {
      showNotification(`Order #${orderId} cannot be cancelled as kitchen preparation has already started.`);
      return { success: false, message: 'Kitchen preparation has already begun.' };
    }
  };

  const loginUser = (userData) => {
    if (auth?.quickDemoLogin) {
      auth.quickDemoLogin(userData.rollNo || userData.studentId || 'CGC2023CSE042');
    }
  };

  const logoutUser = () => {
    if (auth?.logout) {
      auth.logout();
    }
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const isFavorite = (itemId) => {
    return favorites.includes(itemId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        itemCount,
        subtotal,
        packagingFee,
        discountAmount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        itemsByOutlet,
        outletsInCart,
        orders,
        placeOrder,
        getOrderById,
        updateOrderStatus,
        cancelOrder,
        user,
        loginUser,
        logoutUser,
        favorites,
        toggleFavorite,
        isFavorite,
        notification,
        showNotification,
        dismissNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
