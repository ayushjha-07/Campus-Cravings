import React, { createContext, useContext, useState, useEffect } from 'react';
import { OUTLETS } from '../data/outlets';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

const STORAGE_KEYS = {
  MENUS: 'campus_cravings_outlet_menus',
  OUTLETS: 'campus_cravings_dynamic_outlets'
};

export const MenuProvider = ({ children }) => {
  // Store dynamic outlets list (allowing admin to toggle isOpen, edit details, add outlets)
  const [outlets, setOutlets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OUTLETS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved outlets', e);
    }
    return OUTLETS;
  });

  // Store custom outlet menus: { [outletId]: MenuItem[] }
  const [outletMenus, setOutletMenus] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENUS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved outlet menus', e);
    }

    // Default initialization from OUTLETS data
    const initialMap = {};
    OUTLETS.forEach(outlet => {
      initialMap[outlet.id] = [...(outlet.menu || [])];
    });
    return initialMap;
  });

  // Persist outlets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OUTLETS, JSON.stringify(outlets));
    } catch (e) {
      console.error('Failed to save outlets to localStorage', e);
    }
  }, [outlets]);

  // Persist menus to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(outletMenus));
    } catch (e) {
      console.error('Failed to save outlet menus to localStorage', e);
    }
  }, [outletMenus]);

  // Retrieve an outlet with its latest active menu
  const getOutlet = (outletId) => {
    const baseOutlet = outlets.find(o => o.id === outletId) || OUTLETS.find(o => o.id === outletId) || OUTLETS[0];
    const liveMenu = outletMenus[baseOutlet.id] || baseOutlet.menu || [];
    return {
      ...baseOutlet,
      menu: liveMenu
    };
  };

  // Retrieve just the menu array for an outlet
  const getOutletMenu = (outletId) => {
    if (!outletId) return [];
    if (outletMenus[outletId]) {
      return outletMenus[outletId];
    }
    const baseOutlet = outlets.find(o => o.id === outletId) || OUTLETS.find(o => o.id === outletId);
    return baseOutlet ? (baseOutlet.menu || []) : [];
  };

  // --- Outlet Management Methods (Admin & Staff) ---

  // Update outlet details (e.g. description, timings, image, manager, etc.)
  const updateOutlet = (outletId, updatedFields) => {
    setOutlets(prev =>
      prev.map(outlet => {
        if (outlet.id === outletId) {
          return {
            ...outlet,
            ...updatedFields
          };
        }
        return outlet;
      })
    );
  };

  // Toggle outlet ordering availability (Open <-> Paused/Closed)
  const toggleOutletStatus = (outletId) => {
    setOutlets(prev =>
      prev.map(outlet => {
        if (outlet.id === outletId) {
          return {
            ...outlet,
            isOpen: !outlet.isOpen
          };
        }
        return outlet;
      })
    );
  };

  // Add a new outlet (e.g. new campus kiosk)
  const addOutlet = (outletData) => {
    const newId = outletData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20) + `-${Date.now().toString().slice(-4)}`;
    const newOutlet = {
      id: newId,
      name: outletData.name.trim(),
      shortCategory: outletData.shortCategory?.trim() || 'Cafe',
      tagline: outletData.tagline?.trim() || 'Fresh Campus Meals & Drinks',
      location: outletData.location?.trim() || 'Block 2 Food Court, CGC Mohali',
      rating: 4.5,
      reviewsCount: 1,
      prepTime: outletData.prepTime?.trim() || '10-15 mins',
      priceForTwo: outletData.priceForTwo?.trim() || '₹150',
      cuisine: Array.isArray(outletData.cuisine) ? outletData.cuisine : ['Snacks', 'Beverages'],
      isVegOnly: Boolean(outletData.isVegOnly),
      isOpen: outletData.isOpen !== undefined ? outletData.isOpen : true,
      timing: outletData.timing?.trim() || '9:00 AM - 8:00 PM',
      image: outletData.image?.trim() || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      logoType: 'custom',
      brandColor: '#0D3828',
      managerName: outletData.managerName || 'Assigned Staff',
      menu: []
    };

    setOutlets(prev => [newOutlet, ...prev]);
    // Initialize empty menu for new outlet
    setOutletMenus(prev => ({
      ...prev,
      [newId]: []
    }));

    return newOutlet;
  };

  // Reset outlets to the 14 default CGC outlets
  const resetOutlets = () => {
    setOutlets(OUTLETS);
    try {
      localStorage.removeItem(STORAGE_KEYS.OUTLETS);
    } catch {
      // ignore
    }
  };

  // --- Menu Item Management Methods ---

  // Add a new menu item to an outlet
  const addMenuItem = (outletId, itemData) => {
    const newItem = {
      id: `${outletId.slice(0, 3)}-${Date.now()}`,
      name: itemData.name.trim(),
      category: itemData.category || 'Snacks',
      price: Number(itemData.price) || 50,
      isVeg: Boolean(itemData.isVeg),
      isAvailable: typeof itemData.isAvailable === 'boolean' ? itemData.isAvailable : true,
      description: itemData.description?.trim() || 'Delicious fresh meal prepared at CGC counter.',
      image: itemData.image?.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      rating: 4.8,
      isPopular: Boolean(itemData.isPopular),
      isCustomItem: true
    };

    setOutletMenus(prev => {
      const currentList = prev[outletId] || getOutletMenu(outletId);
      return {
        ...prev,
        [outletId]: [newItem, ...currentList]
      };
    });

    return newItem;
  };

  // Edit an existing menu item
  const updateMenuItem = (outletId, itemId, updatedFields) => {
    setOutletMenus(prev => {
      const currentList = prev[outletId] || getOutletMenu(outletId);
      const updatedList = currentList.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : item.price
          };
        }
        return item;
      });

      return {
        ...prev,
        [outletId]: updatedList
      };
    });
  };

  // Toggle availability (In Stock vs Sold Out)
  const toggleItemAvailability = (outletId, itemId) => {
    setOutletMenus(prev => {
      const currentList = prev[outletId] || getOutletMenu(outletId);
      const updatedList = currentList.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            isAvailable: !item.isAvailable
          };
        }
        return item;
      });

      return {
        ...prev,
        [outletId]: updatedList
      };
    });
  };

  // Delete a menu item after confirmation
  const deleteMenuItem = (outletId, itemId) => {
    setOutletMenus(prev => {
      const currentList = prev[outletId] || getOutletMenu(outletId);
      return {
        ...prev,
        [outletId]: currentList.filter(item => item.id !== itemId)
      };
    });
  };

  // Reset an outlet's menu to default seed data
  const resetOutletMenu = (outletId) => {
    const baseOutlet = OUTLETS.find(o => o.id === outletId);
    if (!baseOutlet) return;
    setOutletMenus(prev => ({
      ...prev,
      [outletId]: [...(baseOutlet.menu || [])]
    }));
  };

  return (
    <MenuContext.Provider
      value={{
        outlets,
        allOutlets: outlets,
        outletMenus,
        getOutlet,
        getOutletMenu,
        updateOutlet,
        toggleOutletStatus,
        addOutlet,
        resetOutlets,
        addMenuItem,
        updateMenuItem,
        toggleItemAvailability,
        deleteMenuItem,
        resetOutletMenu
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
