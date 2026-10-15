import React, { useState, useEffect } from 'react';
import { X, Store, Sparkles, Image, Check, AlertCircle } from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Campus Cafe & Wraps', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80' },
  { label: 'Pizza & Italian', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80' },
  { label: 'Indian Tea & Kulhad', url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80' },
  { label: 'Burgers & Fries', url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80' },
  { label: 'Coffee & Bakery', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80' },
  { label: 'Shakes & Juice Bar', url: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&auto=format&fit=crop&q=80' }
];

export default function AddEditOutletModal({ isOpen, onClose, onSave, outletToEdit = null, staffList = [] }) {
  const isEditing = Boolean(outletToEdit);

  const [formData, setFormData] = useState({
    name: '',
    shortCategory: 'Cafe',
    tagline: '',
    location: 'Block 2 Food Court, CGC Mohali',
    timing: '9:00 AM - 8:30 PM (CGC Hours)',
    prepTime: '10-15 mins',
    priceForTwo: '₹150',
    cuisine: 'Snacks, Beverages',
    isVegOnly: false,
    isOpen: true,
    image: PRESET_IMAGES[0].url,
    managerName: 'Assigned Staff'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (outletToEdit) {
      setFormData({
        name: outletToEdit.name || '',
        shortCategory: outletToEdit.shortCategory || 'Cafe',
        tagline: outletToEdit.tagline || '',
        location: outletToEdit.location || 'Block 2 Food Court, CGC Mohali',
        timing: outletToEdit.timing || '9:00 AM - 8:30 PM (CGC Hours)',
        prepTime: outletToEdit.prepTime || '10-15 mins',
        priceForTwo: outletToEdit.priceForTwo || '₹150',
        cuisine: Array.isArray(outletToEdit.cuisine) ? outletToEdit.cuisine.join(', ') : (outletToEdit.cuisine || 'Snacks, Beverages'),
        isVegOnly: Boolean(outletToEdit.isVegOnly),
        isOpen: outletToEdit.isOpen !== undefined ? outletToEdit.isOpen : true,
        image: outletToEdit.image || PRESET_IMAGES[0].url,
        managerName: outletToEdit.managerName || 'Assigned Staff'
      });
    } else {
      setFormData({
        name: '',
        shortCategory: 'Cafe',
        tagline: '',
        location: 'Block 2 Food Court, CGC Mohali',
        timing: '9:00 AM - 8:30 PM (CGC Hours)',
        prepTime: '10-15 mins',
        priceForTwo: '₹150',
        cuisine: 'Snacks, Beverages',
        isVegOnly: false,
        isOpen: true,
        image: PRESET_IMAGES[0].url,
        managerName: staffList[0]?.name || 'Rajesh Kumar'
      });
    }
    setError('');
  }, [outletToEdit, isOpen, staffList]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter the food outlet name.');
      return;
    }
    if (!formData.tagline.trim()) {
      setError('Please enter a brief tagline describing the outlet menu.');
      return;
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      tagline: formData.tagline.trim(),
      cuisine: formData.cuisine.split(',').map(c => c.trim()).filter(Boolean)
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0D3828] text-white flex items-center justify-center">
              <Store className="w-5 h-5 text-[#EAA044]" />
            </div>
            <div>
              <h3 className="font-black text-stone-900 text-base leading-tight">
                {isEditing ? `Edit Outlet: ${outletToEdit.name}` : 'Add New Campus Outlet'}
              </h3>
              <p className="text-stone-500 text-xs">
                CGC University Food Outlets Administration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Outlet Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
                placeholder="e.g. Subway, Waffle House"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Category *
              </label>
              <select
                value={formData.shortCategory}
                onChange={(e) => setFormData({ ...formData, shortCategory: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              >
                <option value="Cafe">Cafe</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Beverages">Beverages</option>
                <option value="Bakery">Bakery</option>
                <option value="Indian">Indian / Dhaba</option>
                <option value="Pizzeria">Pizzeria</option>
                <option value="Canteen">Central Canteen</option>
                <option value="Desserts">Desserts & Shakes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Tagline / Specialty *
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              placeholder="e.g. Freshly Baked Pizzas, Garlic Breads & Pastas"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Campus Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
                placeholder="e.g. Block 2 Food Court"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Assigned Manager
              </label>
              <select
                value={formData.managerName}
                onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              >
                {staffList.map(st => (
                  <option key={st.id} value={st.name}>
                    {st.name} ({st.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={formData.timing}
                onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
                placeholder="9:00 AM - 8:30 PM"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Avg Prep Time
              </label>
              <input
                type="text"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
                placeholder="10-15 mins"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Price for Two
              </label>
              <input
                type="text"
                value={formData.priceForTwo}
                onChange={(e) => setFormData({ ...formData, priceForTwo: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
                placeholder="₹150"
              />
            </div>
          </div>

          {/* Cuisines Tags */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Cuisine Tags (Comma separated)
            </label>
            <input
              type="text"
              value={formData.cuisine}
              onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              placeholder="e.g. Pizza, Italian, Garlic Breads, Drinks"
            />
          </div>

          {/* Image Selection / Presets */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Cover Image URL or Campus Preset
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-mono mb-2"
              placeholder="https://images.unsplash.com/..."
            />
            <div className="grid grid-cols-3 gap-2">
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: preset.url })}
                  className={`text-[10px] p-2 rounded-xl border text-left font-medium transition-all cursor-pointer flex items-center justify-between ${
                    formData.image === preset.url
                      ? 'border-[#0D3828] bg-emerald-50 text-[#0D3828] font-bold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span className="truncate">{preset.label}</span>
                  {formData.image === preset.url && <Check className="w-3 h-3 shrink-0 text-[#0D3828]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles: Veg Only & Active Ordering */}
          <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVegOnly}
                onChange={(e) => setFormData({ ...formData, isVegOnly: e.target.checked })}
                className="w-4 h-4 rounded-md text-[#0D3828] focus:ring-[#0D3828]"
              />
              <span className="text-xs font-bold text-stone-700">100% Pure Veg Outlet</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isOpen}
                onChange={(e) => setFormData({ ...formData, isOpen: e.target.checked })}
                className="w-4 h-4 rounded-md text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs font-bold text-stone-700">Enable Student Online Ordering</span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Create Outlet'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
