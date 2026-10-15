import React, { useState, useEffect } from 'react';
import { X, Utensils, IndianRupee, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';

export default function AddEditMenuItemModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialItem = null,
  outletName = 'Campus Outlet' 
}) {
  const isEditing = Boolean(initialItem);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Snacks',
    price: '',
    isVeg: true,
    isAvailable: true,
    isPopular: false,
    description: '',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const categories = [
    'Snacks',
    'Burgers',
    'Pizza',
    'Meals',
    'Beverages',
    'Coffee',
    'Desserts',
    'Combos'
  ];

  const presetImages = [
    { label: 'Snacks', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80' },
    { label: 'Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80' },
    { label: 'Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' },
    { label: 'Chai / Coffee', url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80' },
    { label: 'Meal Thali', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80' },
    { label: 'Dessert / Shake', url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80' }
  ];

  useEffect(() => {
    if (initialItem) {
      setFormData({
        name: initialItem.name || '',
        category: initialItem.category || 'Snacks',
        price: initialItem.price || '',
        isVeg: initialItem.isVeg !== undefined ? initialItem.isVeg : true,
        isAvailable: initialItem.isAvailable !== undefined ? initialItem.isAvailable : true,
        isPopular: Boolean(initialItem.isPopular),
        description: initialItem.description || '',
        image: initialItem.image || presetImages[0].url
      });
    } else {
      setFormData({
        name: '',
        category: 'Snacks',
        price: '',
        isVeg: true,
        isAvailable: true,
        isPopular: false,
        description: '',
        image: presetImages[0].url
      });
    }
    setErrorMsg(null);
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Item name is required.');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setErrorMsg('Please enter a valid price in Indian Rupees.');
      return;
    }

    onSave({
      ...formData,
      name: formData.name.trim(),
      price: Number(formData.price),
      description: formData.description.trim() || 'Delicious freshly prepared food item.'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-stone-200 shadow-2xl animate-in zoom-in-95 duration-200 my-8"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-stone-900">
              {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>
            <p className="text-xs text-stone-500">
              {outletName} • CGC Mohali Campus Menu
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-xl border border-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Dish Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Tandoori Paneer Roll"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828]"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price & Veg/Non-Veg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Price (₹ INR) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-xs">
                  ₹
                </span>
                <input
                  type="number"
                  required
                  min="5"
                  max="1000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g. 85"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Dietary Preference
              </label>
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isVeg: true })}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    formData.isVeg
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-stone-50 border-stone-200 text-stone-600'
                  }`}
                >
                  🟢 Vegetarian
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isVeg: false })}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    !formData.isVeg
                      ? 'bg-rose-50 border-rose-300 text-rose-800'
                      : 'bg-stone-50 border-stone-200 text-stone-600'
                  }`}
                >
                  🔴 Non-Veg
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Description
            </label>
            <textarea
              rows="2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Freshly prepared with crisp ingredients..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828] resize-none"
            />
          </div>

          {/* Preset image selection */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Food Image Preset
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presetImages.map(img => (
                <button
                  key={img.label}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: img.url })}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    formData.image === img.url ? 'border-[#0D3828] ring-2 ring-emerald-100' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-12 object-cover" />
                  <div className="text-[9px] bg-stone-900/80 text-white truncate p-0.5 text-center">
                    {img.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Availability & Popular Toggles */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-bold text-stone-800">Available to Order (In Stock)</span>
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4 rounded-sm border-stone-300 text-[#0D3828] focus:ring-[#0D3828]/20"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-stone-200/80">
              <span className="font-medium text-stone-700">Mark as Popular / Bestseller</span>
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                className="w-4 h-4 rounded-sm border-stone-300 text-[#0D3828] focus:ring-[#0D3828]/20"
              />
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold text-xs hover:bg-stone-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#0D3828] hover:bg-[#144834] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Add Item to Menu'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
