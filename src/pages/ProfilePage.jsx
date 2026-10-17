import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  LogOut, 
  ReceiptText, 
  ShoppingBag, 
  CheckCircle,
  Sparkles,
  Edit3,
  Save,
  X,
  Building,
  ShieldCheck,
  ArrowRight,
  Info
} from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuth();
  const { orders } = useCart();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Aarav Sharma',
    phone: user?.phone || '9876543210',
    department: user?.department || 'Computer Science & Engineering',
    hostel: user?.hostel || 'Boys Hostel 3, Room 214'
  });
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  const departments = [
    'Computer Science & Engineering',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Management Studies (MBA/BBA)',
    'Pharmacy & Health Sciences',
    'Applied Sciences & Biotechnology',
    'Hotel Management & Catering'
  ];

  const hostelOptions = [
    'Boys Hostel 1',
    'Boys Hostel 2',
    'Boys Hostel 3',
    'Girls Hostel 1',
    'Girls Hostel 2',
    'Campus Day Scholar (Mohali / Kharar / Chandigarh)'
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const minutesSaved = orders.length * 15; // 15 mins saved per order skipping counter line

  return (
    <div className="min-h-screen bg-[#FBF8F2] dark:bg-[#101713] py-4 sm:py-12 pb-24 md:pb-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-lg bg-white border border-stone-200/90 shadow-2xs">
                <img
                  src="/images/brand/logo.png"
                  alt="Campus Cravings Logo"
                  className="h-5 w-auto object-contain"
                />
              </span>
              <span className="text-xs font-bold text-[#0D1826] uppercase tracking-wider">
                CGC Student Account
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Student Profile & Account
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Manage your personal student details and fast food-pickup preferences.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-200/90 text-stone-800 hover:bg-stone-50 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#0D3828]" />
                <span>Edit Profile</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200/80 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Success update toast */}
        {saveSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        {/* Profile Card & Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Main Info Card */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-6">
            
            {/* Avatar & Title */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0D1826] to-[#162544] text-white font-black text-2xl flex items-center justify-center shadow-md">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <h2 className="text-xl font-black text-stone-900">
                    {user?.name || 'Aarav Sharma'}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono font-bold text-[#0D1826] bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md inline-block">
                      Roll No: {user?.studentId || user?.rollNo || 'CGC2023CSE042'}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-500">
                      CGC University, Mohali
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block p-1.5 rounded-xl bg-stone-50 border border-stone-200/80 shadow-2xs">
                <img
                  src="/images/brand/logo-icon.png"
                  alt="Campus Cravings Mascot"
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>

            {/* Profile Information: View vs Edit Mode */}
            {!isEditing ? (
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-stone-700 divide-y divide-stone-100">
                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-stone-500">
                    <User className="w-4 h-4 text-[#0D3828]" /> Full Name
                  </span>
                  <span className="font-bold text-stone-900">{user?.name}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-stone-500">
                    <GraduationCap className="w-4 h-4 text-[#0D3828]" /> Student ID / Roll
                  </span>
                  <span className="font-mono font-bold text-stone-900">{user?.studentId || user?.rollNo}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-stone-500">
                    <Mail className="w-4 h-4 text-[#0D3828]" /> College Email
                  </span>
                  <span className="font-semibold text-stone-900">{user?.email}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-stone-500">
                    <Phone className="w-4 h-4 text-[#0D3828]" /> Contact Phone
                  </span>
                  <span className="font-semibold text-stone-900">{user?.phone}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-stone-500">
                    <Building className="w-4 h-4 text-[#0D3828]" /> Department
                  </span>
                  <span className="font-semibold text-stone-900">{user?.department}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-stone-500">
                    <MapPin className="w-4 h-4 text-[#0D3828]" /> Campus Residence
                  </span>
                  <span className="font-semibold text-stone-900">{user?.hostel}</span>
                </div>
              </div>
            ) : (
              /* Inline Edit Mode */
              <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
                <div className="text-xs font-bold text-stone-800 uppercase tracking-wider pb-1 border-b border-stone-100">
                  Update Editable Details:
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Department / Academic Branch
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828]"
                  >
                    {departments.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Campus Residence / Hostel
                  </label>
                  <select
                    value={formData.hostel}
                    onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828]"
                  >
                    {hostelOptions.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            )}

            {/* University Verification Notice */}
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-center gap-2.5 text-xs text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified CGC University Mohali Student Identity (Demo Session)</span>
            </div>

          </div>

          {/* Right Column: Queue Savings & Quick Navigation */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Impact & Time Saved Card */}
            <div className="bg-gradient-to-br from-[#0D3828] to-[#144834] text-white rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Campus Break Time Saved</span>
              </div>

              <div>
                <div className="text-4xl font-black text-[#EAA044]">{minutesSaved} Mins</div>
                <div className="text-xs text-emerald-100/90 mt-1">
                  Estimated break time saved by ordering online ahead of time
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-center text-xs">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <div className="font-bold text-lg text-white">{orders.length}</div>
                  <div className="text-[11px] text-emerald-200">Orders Placed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <div className="font-bold text-lg text-white">0</div>
                  <div className="text-[11px] text-emerald-200">Queues Stood In</div>
                </div>
              </div>
            </div>

            {/* Account Actions & My Orders Link (Requirement 3) */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
              <h3 className="font-black text-stone-900 text-sm">Account Navigation</h3>

              <Link
                to="/orders"
                className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-stone-50 border border-stone-100 transition-colors text-xs font-bold text-stone-800 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0D3828] flex items-center justify-center">
                    <ReceiptText className="w-4 h-4" />
                  </div>
                  <div>
                    <div>My Food Orders & Tokens</div>
                    <div className="text-[10px] text-stone-400 font-normal">
                      {orders.length} campus orders on record
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-800 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                to="/cart"
                className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-stone-50 border border-stone-100 transition-colors text-xs font-bold text-stone-800 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <div>Current Food Cart</div>
                    <div className="text-[10px] text-stone-400 font-normal">Review pending meal selections</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-800 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                to="/"
                className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-stone-50 border border-stone-100 transition-colors text-xs font-bold text-stone-800 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 text-[#0D3828] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#E76F51]" />
                  </div>
                  <div>
                    <div>Browse Campus Outlets</div>
                    <div className="text-[10px] text-stone-400 font-normal">Explore cafeterias & menus</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-800 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
