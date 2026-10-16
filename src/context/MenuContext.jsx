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
  MENUS: 'campus_cravings_outlet_menus_v6',
  OUTLETS: 'campus_cravings_dynamic_outlets_v6'
};

export const MenuProvider = ({ children }) => {
  // Store dynamic outlets list (ensuring all 17 official outlets are always present and up-to-date)
  const [outlets, setOutlets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OUTLETS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const savedMap = new Map();
          parsed.forEach(o => {
            if (o.id) savedMap.set(o.id.toLowerCase(), o);
            if (o.aliasId) savedMap.set(o.aliasId.toLowerCase(), o);
            if (Array.isArray(o.aliases)) {
              o.aliases.forEach(a => savedMap.set(a.toLowerCase(), o));
            }
          });
          // Reconcile with canonical OUTLETS definition so all 17 are always present with latest names/data/menus
          return OUTLETS.map(def => {
            const s = savedMap.get(def.id.toLowerCase()) || 
                      (def.aliasId && savedMap.get(def.aliasId.toLowerCase())) ||
                      (Array.isArray(def.aliases) && def.aliases.map(a => savedMap.get(a.toLowerCase())).find(Boolean));
            if (!s) return def;
            return {
              ...def,
              isOpen: s.isOpen !== undefined ? s.isOpen : def.isOpen
            };
          });
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
          // Merge in any missing or outdated outlet menus
          const merged = { ...parsed };
          OUTLETS.forEach(outlet => {
            const canonLength = outlet.menu?.length || 0;
            const existingMenu = merged[outlet.id] || (outlet.aliasId && merged[outlet.aliasId]);
            if (!existingMenu || !Array.isArray(existingMenu) || existingMenu.length < canonLength) {
              merged[outlet.id] = [...(outlet.menu || [])];
            } else if (outlet.aliasId && merged[outlet.aliasId] && !merged[outlet.id]) {
              merged[outlet.id] = merged[outlet.aliasId];
            }
          });
          return merged;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved outlet menus', e);
    }

    // Default initialization from OUTLETS data
    const initialMap = {};
    OUTLETS.forEach(outlet => {
      initialMap[outlet.id] = [...(outlet.menu || [])];
      if (outlet.aliasId) {
        initialMap[outlet.aliasId] = [...(outlet.menu || [])];
      }
      if (Array.isArray(outlet.aliases)) {
        outlet.aliases.forEach(a => {
          initialMap[a] = [...(outlet.menu || [])];
        });
      }
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

  // Retrieve an outlet with its latest active menu (supports id, aliasId, and aliases)
  const getOutlet = (outletId) => {
    if (!outletId) return null;
    const cleanId = String(outletId).toLowerCase().trim();
    const matchOutlet = (o) => 
      o.id.toLowerCase() === cleanId || 
      (o.aliasId && o.aliasId.toLowerCase() === cleanId) ||
      (Array.isArray(o.aliases) && o.aliases.some(a => a.toLowerCase() === cleanId));

    const baseOutlet = outlets.find(matchOutlet) || OUTLETS.find(matchOutlet);
    if (!baseOutlet) return null;

    // Guaranteed canonical menu fallback for official outlets
    const canonOutlet = OUTLETS.find(o => o.id === baseOutlet.id);
    const canonMenu = canonOutlet?.menu || [];
    const storedMenu = outletMenus[baseOutlet.id] || (baseOutlet.aliasId && outletMenus[baseOutlet.aliasId]);

    const liveMenu = (storedMenu && Array.isArray(storedMenu) && storedMenu.length >= canonMenu.length)
      ? storedMenu
      : (canonMenu.length > 0 ? canonMenu : baseOutlet.menu || []);

    return {
      ...baseOutlet,
      menu: liveMenu
    };
  };

  // Retrieve just the menu array for an outlet
  const getOutletMenu = (outletId) => {
    const o = getOutlet(outletId);
    return o ? (o.menu || []) : [];
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
