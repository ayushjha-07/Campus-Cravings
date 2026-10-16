import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import AddEditMenuItemModal from '../../components/staff/AddEditMenuItemModal';
import { useAdmin } from '../../context/AdminContext';
import { useMenu } from '../../context/MenuContext';
import { 
  UtensilsCrossed, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Store, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function AdminMenuPage() {
  const { logAction } = useAdmin();
  const { 
    outlets, 
    outletMenus, 
    addMenuItem, 
    updateMenuItem, 
    toggleItemAvailability, 
    deleteMenuItem 
  } = useMenu();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOutletId, setSelectedOutletId] = useState('ALL');
  const [vegFilter, setVegFilter] = useState('ALL'); // ALL | VEG | NON_VEG
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL'); // ALL | IN_STOCK | SOLD_OUT

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [targetOutletForAdd, setTargetOutletForAdd] = useState('kulhad');

  // Aggregate all menu items across all outlets with outlet metadata
  const allAggregatedItems = useMemo(() => {
    const list = [];
    outlets.forEach(outlet => {
      const items = outletMenus[outlet.id] || outlet.menu || [];
      items.forEach(item => {
        list.push({
          ...item,
          outletId: outlet.id,
          outletName: outlet.name,
          outletCategory: outlet.shortCategory
        });
      });
    });
    return list;
  }, [outlets, outletMenus]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return allAggregatedItems.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.outletName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesOutlet = 
        selectedOutletId === 'ALL' || item.outletId === selectedOutletId;

      const matchesVeg = 
        vegFilter === 'ALL' ||
        (vegFilter === 'VEG' && item.isVeg) ||
        (vegFilter === 'NON_VEG' && !item.isVeg);

      const matchesAvail = 
        availabilityFilter === 'ALL' ||
        (availabilityFilter === 'IN_STOCK' && item.isAvailable !== false) ||
        (availabilityFilter === 'SOLD_OUT' && item.isAvailable === false);

      return matchesSearch && matchesOutlet && matchesVeg && matchesAvail;
    });
  }, [allAggregatedItems, searchQuery, selectedOutletId, vegFilter, availabilityFilter]);

  const handleOpenAddModal = () => {
    setItemToEdit(null);
    setTargetOutletForAdd(selectedOutletId === 'ALL' ? 'kulhad' : selectedOutletId);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setItemToEdit(item);
    setTargetOutletForAdd(item.outletId);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData) => {
    if (itemToEdit) {
      updateMenuItem(itemToEdit.outletId, itemToEdit.id, itemData);
      logAction('Menu Item Updated', `${itemData.name} (${itemToEdit.outletName})`, `Updated price/details`, 'menu_update');
    } else {
      addMenuItem(targetOutletForAdd, itemData);
      const outlet = outlets.find(o => o.id === targetOutletForAdd);
      logAction('Menu Item Created', `${itemData.name} (${outlet?.name || targetOutletForAdd})`, `Added new dish to menu`, 'menu_create');
    }
    setIsModalOpen(false);
  };

  const handleToggleStock = (item) => {
    toggleItemAvailability(item.outletId, item.id);
    const nextState = item.isAvailable !== false ? 'Sold Out' : 'In Stock';
    logAction('Item Stock Toggled', `${item.name} (${item.outletName})`, `Availability changed to ${nextState}`, 'menu_stock');
  };

  const handleDeleteItem = (item) => {
    if (window.confirm(`Are you sure you want to remove "${item.name}" from ${item.outletName}?`)) {
      deleteMenuItem(item.outletId, item.id);
      logAction('Menu Item Removed', `${item.name} (${item.outletName})`, 'Deleted from cafeteria menu', 'menu_delete');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Campus-Wide Menu Management
              </h1>
              <span className="text-xs font-mono font-bold bg-[#0D3828] text-white px-2.5 py-0.5 rounded-full">
                {allAggregatedItems.length} Dishes
              </span>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Live dish prices, categories, and inventory stock across all 17 CGC University food outlets
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-[#EAA044]" />
            <span>Add Menu Dish</span>
          </button>
        </div>

        {/* Toolbar & Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by dish name, ingredient, category, or cafeteria outlet..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              />
            </div>

            {/* Outlet Filter Dropdown */}
            <div className="shrink-0">
              <select
                value={selectedOutletId}
                onChange={(e) => setSelectedOutletId(e.target.value)}
                className="w-full md:w-auto px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 bg-stone-50 cursor-pointer focus:outline-hidden"
              >
                <option value="ALL">All 17 Campus Outlets</option>
                {outlets.map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>

            {/* Veg / Non-Veg Toggle Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setVegFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  vegFilter === 'ALL'
                    ? 'bg-[#0D3828] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setVegFilter('VEG')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  vegFilter === 'VEG'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-emerald-800 hover:bg-stone-200'
                }`}
              >
                Veg Only
              </button>
              <button
                onClick={() => setVegFilter('NON_VEG')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  vegFilter === 'NON_VEG'
                    ? 'bg-rose-700 text-white'
                    : 'bg-stone-100 text-rose-800 hover:bg-stone-200'
                }`}
              >
                Non-Veg
              </button>
            </div>

          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const inStock = item.isAvailable !== false;
            return (
              <div
                key={`${item.outletId}-${item.id}`}
                className={`bg-white rounded-3xl p-4 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${
                  !inStock ? 'opacity-75 bg-stone-50/50' : ''
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar: Outlet & Veg Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D3828] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {item.outletName}
                    </span>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      item.isVeg
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      {item.isVeg ? '● Pure Veg' : '▲ Non-Veg'}
                    </span>
                  </div>

                  {/* Image & Title */}
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-stone-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-stone-900 text-sm leading-tight truncate">
                        {item.name}
                      </h3>
                      <div className="text-[11px] font-bold text-stone-500 mt-0.5">
                        {item.category || 'Snacks'}
                      </div>
                      <div className="font-mono font-black text-stone-900 text-sm mt-1">
                        ₹{item.price}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Controls */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-3">
                  
                  {/* In Stock / Sold Out Toggle Button */}
                  <button
                    onClick={() => handleToggleStock(item)}
                    className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                      inStock
                        ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                    }`}
                  >
                    {inStock ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>In Stock</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Sold Out</span>
                      </>
                    )}
                  </button>

                  {/* Edit and Delete Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 rounded-xl text-stone-600 hover:text-[#0D3828] hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Edit Dish"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Dish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">No Dishes Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              No food items match your search or filter combination. Try selecting "All 17 Campus Outlets" or clearing dietary filters.
            </p>
          </div>
        )}

      </div>

      {/* Add / Edit Menu Item Modal */}
      <AddEditMenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        itemToEdit={itemToEdit}
      />
    </AdminLayout>
  );
}
