import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import StaffLayout from '../../components/staff/StaffLayout';
import AddEditMenuItemModal from '../../components/staff/AddEditMenuItemModal';
import StatusConfirmModal from '../../components/staff/StatusConfirmModal';
import { OUTLETS } from '../../data/outlets';
import { useMenu } from '../../context/MenuContext';
import { 
  UtensilsCrossed, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Sparkles,
  Info,
  RotateCcw
} from 'lucide-react';

export default function StaffMenuPage() {
  const { outletId = 'kulhad' } = useParams();
  const { 
    getOutlet, 
    getOutletMenu, 
    addMenuItem, 
    updateMenuItem, 
    toggleItemAvailability, 
    deleteMenuItem,
    resetOutletMenu 
  } = useMenu();

  const currentOutlet = OUTLETS.find(o => o.id === outletId || o.aliasId === outletId || (Array.isArray(o.aliases) && o.aliases.includes(outletId))) || OUTLETS[0];
  const menuItems = getOutletMenu(currentOutlet.id);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal states
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState(null);

  const showToast = (msg) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  // Extract categories
  const categories = useMemo(() => {
    const cats = new Set(menuItems.map(item => item.category));
    return ['all', ...Array.from(cats)];
  }, [menuItems]);

  // Filtered menu
  const filteredMenu = useMemo(() => {
    return menuItems.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch = !searchQuery.trim() || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase().trim()));
      return matchCat && matchSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  // Save handler (Add or Edit)
  const handleSaveItem = (itemData) => {
    if (editingItem) {
      updateMenuItem(currentOutlet.id, editingItem.id, itemData);
      showToast(`Updated "${itemData.name}" successfully.`);
    } else {
      addMenuItem(currentOutlet.id, itemData);
      showToast(`Added "${itemData.name}" to menu.`);
    }
    setEditingItem(null);
  };

  // Toggle stock availability
  const handleToggleStock = (item) => {
    toggleItemAvailability(currentOutlet.id, item.id);
    showToast(
      item.isAvailable 
        ? `Marked "${item.name}" as Sold Out.` 
        : `Marked "${item.name}" as Available in Stock.`
    );
  };

  // Confirm delete
  const handleDeleteConfirm = () => {
    if (deleteConfirmItem) {
      deleteMenuItem(currentOutlet.id, deleteConfirmItem.id);
      showToast(`Removed "${deleteConfirmItem.name}" from menu.`);
      setDeleteConfirmItem(null);
    }
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3828] uppercase tracking-wider mb-1">
              <UtensilsCrossed className="w-4 h-4 text-[#EAA044]" />
              <span>Campus Food Inventory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Menu Management • {currentOutlet.name}
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Manage food items, prices, and instant kitchen availability (In Stock / Sold Out).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingItem(null);
                setIsAddEditModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Dish</span>
            </button>
          </div>
        </div>

        {/* Feedback Toast Notification */}
        {feedbackToast && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{feedbackToast}</span>
          </div>
        )}

        {/* Real-time synchronization notice */}
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Instant Sync:</strong> When you mark an item "Sold Out" or edit prices, students browsing this outlet's menu see those changes immediately!
            </span>
          </div>

          <Link
            to={`/outlet/${currentOutlet.id}`}
            target="_blank"
            className="text-[#0D3828] font-bold text-xs hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Open Student View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0D3828] text-white shadow-2xs'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828]"
            />
          </div>
        </div>

        {/* Menu Items Table / Grid (Requirement 5) */}
        {filteredMenu.length > 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] text-stone-400 uppercase font-black text-[10px] tracking-wider border-b border-stone-200/80">
                  <tr>
                    <th className="py-3.5 px-4">Dish</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Diet</th>
                    <th className="py-3.5 px-4">Counter Availability</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredMenu.map(item => (
                    <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                      {/* Dish Image & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-2xl object-cover bg-stone-100 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-stone-900 text-sm">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-stone-400 line-clamp-1 max-w-xs">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-[11px] font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg">
                          {item.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-black text-stone-900 text-sm">
                        ₹{item.price}
                      </td>

                      {/* Veg / Non-Veg */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          item.isVeg ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                        }`}>
                          {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                        </span>
                      </td>

                      {/* Instant Availability Toggle Switch */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleStock(item)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            item.isAvailable
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                          }`}
                          title="Click to toggle counter availability"
                        >
                          <span className={`w-2 h-2 rounded-full ${
                            item.isAvailable ? 'bg-emerald-600' : 'bg-rose-600'
                          }`} />
                          <span>{item.isAvailable ? 'In Stock (Available)' : 'Sold Out (Hidden)'}</span>
                        </button>
                      </td>

                      {/* Edit & Delete Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItem(item);
                              setIsAddEditModalOpen(true);
                            }}
                            className="p-2 text-stone-600 hover:text-[#0D3828] hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                            title="Edit dish"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmItem(item)}
                            className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            title="Delete item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 shadow-2xs space-y-3">
            <UtensilsCrossed className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-800 text-base">No Menu Items Found</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              No dishes found matching your search. Click "Add New Dish" to add items to {currentOutlet.name}.
            </p>
          </div>
        )}

      </div>

      {/* Add / Edit Menu Item Modal */}
      <AddEditMenuItemModal
        isOpen={isAddEditModalOpen}
        initialItem={editingItem}
        outletName={currentOutlet.name}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
      />

      {/* Delete Confirmation Modal */}
      <StatusConfirmModal
        isOpen={Boolean(deleteConfirmItem)}
        title={`Delete "${deleteConfirmItem?.name}"?`}
        message="Are you sure you want to remove this dish from the counter menu? Students will no longer be able to order it."
        confirmText="Yes, Delete Dish"
        confirmColor="rose"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteConfirmItem(null)}
      />
    </StaffLayout>
  );
}
