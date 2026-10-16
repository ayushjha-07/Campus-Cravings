import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { 
  Settings, 
  Building2, 
  Clock, 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Bell, 
  CreditCard,
  User,
  Sparkles
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetAllDemoData, adminUser } = useAdmin();

  const [formData, setFormData] = useState({ ...settings });
  const [profileData, setProfileData] = useState({ ...adminUser });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to restore all outlets, menus, orders, students, and staff to fresh default demo states? This will reset all localStorage modifications.')) {
      const ok = resetAllDemoData();
      if (ok) {
        setResetSuccess(true);
        setTimeout(() => {
          setResetSuccess(false);
          window.location.reload();
        }, 1500);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Platform & Campus Operations Settings
            </h1>
            <span className="text-xs font-mono font-bold bg-[#0D3828] text-white px-2.5 py-0.5 rounded-full">
              University Config
            </span>
          </div>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            Configure global food ordering availability, university branding, packaging fee defaults, and administrator credentials
          </p>
        </div>

        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Settings successfully saved and synchronized across all campus portals!</span>
          </div>
        )}

        {resetSuccess && (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-blue-700" />
            <span>All demonstration collections restored! Reloading application...</span>
          </div>
        )}

        {/* Settings Form */}
        <form onSubmit={handleSaveSettings} className="space-y-6">
          
          {/* Card 1: Branding & University Details */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <Building2 className="w-5 h-5 text-[#0D3828]" />
              <h2 className="text-base font-black text-stone-900 tracking-tight">
                University Identity & Campus Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={formData.platformName}
                  onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-medium focus:ring-2 focus:ring-[#0D3828] outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  University Name
                </label>
                <input
                  type="text"
                  value={formData.universityName}
                  onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-medium focus:ring-2 focus:ring-[#0D3828] outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-stone-700 mb-1">
                  Campus Address / Sector
                </label>
                <input
                  type="text"
                  value={formData.campusAddress}
                  onChange={(e) => setFormData({ ...formData, campusAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-medium focus:ring-2 focus:ring-[#0D3828] outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Ordering Availability & Campus Hours */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <Clock className="w-5 h-5 text-[#0D3828]" />
              <h2 className="text-base font-black text-stone-900 tracking-tight">
                Global Ordering Availability & Campus Windows
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Campus-Wide Ordering Mode
                </label>
                <select
                  value={formData.systemStatus}
                  onChange={(e) => setFormData({ ...formData, systemStatus: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-bold text-stone-800 bg-stone-50 focus:ring-2 focus:ring-[#0D3828] outline-hidden cursor-pointer"
                >
                  <option value="OPEN">Open (All 17 Cafeterias Accepting Orders)</option>
                  <option value="PEAK_ONLY">Peak Hours Only (10:30 AM - 4:30 PM)</option>
                  <option value="MAINTENANCE">Closed for Maintenance / Term Break</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Operating Hours Label
                </label>
                <input
                  type="text"
                  value={formData.operatingHours}
                  onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-medium focus:ring-2 focus:ring-[#0D3828] outline-hidden"
                  placeholder="8:30 AM - 8:30 PM"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Standard Preparation Buffer (Minutes)
                </label>
                <input
                  type="number"
                  value={formData.standardPrepBufferMinutes}
                  onChange={(e) => setFormData({ ...formData, standardPrepBufferMinutes: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-medium focus:ring-2 focus:ring-[#0D3828] outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Standard Campus Packaging Fee (₹)
                </label>
                <input
                  type="number"
                  value={formData.defaultPackagingFee}
                  onChange={(e) => setFormData({ ...formData, defaultPackagingFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-medium focus:ring-2 focus:ring-[#0D3828] outline-hidden"
                />
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-6 text-xs font-bold text-stone-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allowCashOnPickup}
                  onChange={(e) => setFormData({ ...formData, allowCashOnPickup: e.target.checked })}
                  className="w-4 h-4 rounded-md text-[#0D3828] focus:ring-[#0D3828]"
                />
                <span>Allow "Pay at Pickup Counter"</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allowDemoPrepay}
                  onChange={(e) => setFormData({ ...formData, allowDemoPrepay: e.target.checked })}
                  className="w-4 h-4 rounded-md text-[#0D3828] focus:ring-[#0D3828]"
                />
                <span>Allow Online Payment Simulation</span>
              </label>
            </div>
          </div>

          {/* Card 3: Administrator Profile */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <User className="w-5 h-5 text-[#0D3828]" />
              <h2 className="text-base font-black text-stone-900 tracking-tight">
                Dean & Administrator Credentials
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Administrator Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-medium focus:ring-2 focus:ring-[#0D3828] outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-medium focus:ring-2 focus:ring-[#0D3828] outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Campus Role
                </label>
                <input
                  type="text"
                  value={profileData.role}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-bold text-stone-500 bg-stone-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Admin ID
                </label>
                <input
                  type="text"
                  value={profileData.adminId}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-mono font-bold text-stone-500 bg-stone-50 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#EAA044]" />
              <span>Save System Settings</span>
            </button>
          </div>

        </form>

        {/* Card 4: Danger Zone / Reset Demo Data */}
        <div className="bg-rose-50/50 rounded-3xl p-5 sm:p-6 border border-rose-200 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-rose-200/60">
            <AlertTriangle className="w-5 h-5 text-rose-700" />
            <h2 className="text-base font-black text-rose-950 tracking-tight">
              Reset Demonstration Environment
            </h2>
          </div>

          <p className="text-xs text-rose-800/90 leading-relaxed">
            Need to return the prototype to its pristine initial state? This action wipes locally saved modifications (menus, orders, staff accounts, student accounts) and restores default CGC Mohali data.
          </p>

          <button
            type="button"
            onClick={handleResetData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Demo Data to Defaults</span>
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
