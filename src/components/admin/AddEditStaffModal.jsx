import React, { useState, useEffect } from 'react';
import { X, UserCheck, AlertCircle } from 'lucide-react';

export default function AddEditStaffModal({ isOpen, onClose, onSave, staffToEdit = null, outletsList = [] }) {
  const isEditing = Boolean(staffToEdit);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    assignedOutletId: 'canteen',
    role: 'Outlet Staff',
    status: 'Active',
    shift: 'Full Day'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (staffToEdit) {
      setFormData({
        name: staffToEdit.name || '',
        email: staffToEdit.email || '',
        phone: staffToEdit.phone || '',
        assignedOutletId: staffToEdit.assignedOutletId || 'canteen',
        role: staffToEdit.role || 'Outlet Staff',
        status: staffToEdit.status || 'Active',
        shift: staffToEdit.shift || 'Full Day'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        assignedOutletId: outletsList[0]?.id || 'kulhad',
        role: 'Outlet Staff',
        status: 'Active',
        shift: 'Full Day'
      });
    }
    setError('');
  }, [staffToEdit, isOpen, outletsList]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter the staff member name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid official CGC email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter a contact phone number.');
      return;
    }

    const assignedOutlet = outletsList.find(o => o.id === formData.assignedOutletId);

    const payload = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      assignedOutletName: assignedOutlet ? assignedOutlet.name : 'Central Cafeteria'
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0D3828] text-white flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-[#EAA044]" />
            </div>
            <div>
              <h3 className="font-black text-stone-900 text-base leading-tight">
                {isEditing ? `Edit Staff: ${staffToEdit.name}` : 'Register New Staff Member'}
              </h3>
              <p className="text-stone-500 text-xs">
                Outlet Assignment & Role Management
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
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              placeholder="e.g. Manpreet Singh"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Official Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
                placeholder="name.outlet@cgc.edu.in"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Contact Phone *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
                placeholder="+91 98765 00000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Assigned Food Outlet *
              </label>
              <select
                value={formData.assignedOutletId}
                onChange={(e) => setFormData({ ...formData, assignedOutletId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              >
                {outletsList.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.name} ({o.shortCategory})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Platform Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              >
                <option value="Outlet Staff">Outlet Staff (Counter POS)</option>
                <option value="Outlet Manager">Outlet Manager (Full Outlet Control)</option>
                <option value="University Admin">University Admin (Campus-Wide)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Shift Schedule
              </label>
              <select
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              >
                <option value="Full Day">Full Day (8:30 AM - 8:30 PM)</option>
                <option value="Morning">Morning Shift (8:30 AM - 2:00 PM)</option>
                <option value="Evening">Evening Shift (1:30 PM - 8:30 PM)</option>
                <option value="Administrative">Administrative Standard Hours</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Account Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              >
                <option value="Active">Active (Permitted POS Access)</option>
                <option value="On Leave">On Leave (Temporary)</option>
                <option value="Suspended">Suspended (Access Revoked)</option>
              </select>
            </div>
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
              {isEditing ? 'Save Changes' : 'Register Staff Account'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
