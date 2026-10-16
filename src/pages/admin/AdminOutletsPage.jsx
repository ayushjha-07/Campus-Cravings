import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import AddEditOutletModal from '../../components/admin/AddEditOutletModal';
import { useAdmin } from '../../context/AdminContext';
import { useMenu } from '../../context/MenuContext';
import { 
  Store, 
  Search, 
  Plus, 
  Edit3, 
  ExternalLink, 
  ChefHat, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  ShieldCheck, 
  Sparkles,
  UserCheck
} from 'lucide-react';

export default function AdminOutletsPage() {
  const { staffList, logAction } = useAdmin();
  const { outlets, updateOutlet, toggleOutletStatus, addOutlet } = useMenu();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | OPEN | CLOSED
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [outletToEdit, setOutletToEdit] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(outlets.map(o => o.shortCategory || 'Cafe'));
    return ['ALL', ...Array.from(set)];
  }, [outlets]);

  // Filtered outlets
  const filteredOutlets = useMemo(() => {
    return outlets.filter(outlet => {
      const matchesSearch = 
        outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.shortCategory?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = 
        statusFilter === 'ALL' ||
        (statusFilter === 'OPEN' && outlet.isOpen !== false) ||
        (statusFilter === 'CLOSED' && outlet.isOpen === false);

      const matchesCategory = 
        categoryFilter === 'ALL' || outlet.shortCategory === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [outlets, searchQuery, statusFilter, categoryFilter]);

  const handleOpenAddModal = () => {
    setOutletToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (outlet) => {
    setOutletToEdit(outlet);
    setIsModalOpen(true);
  };

  const handleSaveOutlet = (outletData) => {
    if (outletToEdit) {
      updateOutlet(outletToEdit.id, outletData);
      logAction('Outlet Updated', outletData.name, `Modified outlet details & timings`, 'outlet_update');
    } else {
      const created = addOutlet(outletData);
      logAction('New Outlet Registered', created.name, `Added to CGC cafeteria network`, 'outlet_create');
    }
  };

  const handleToggleStatus = (outlet) => {
    toggleOutletStatus(outlet.id);
    const nextState = outlet.isOpen !== false ? 'Closed' : 'Open';
    logAction('Outlet Status Toggled', outlet.name, `Online ordering set to ${nextState}`, 'outlet_status');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Food Outlets Administration
              </h1>
              <span className="text-xs font-mono font-bold bg-[#0D3828] text-white px-2.5 py-0.5 rounded-full">
                {outlets.length} Outlets
              </span>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Manage all 17 official CGC University cafeterias, timings, staff assignments, and availability
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-[#EAA044]" />
            <span>Add New Outlet</span>
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by outlet name, food category, or campus location..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  statusFilter === 'ALL'
                    ? 'bg-[#0D3828] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => setStatusFilter('OPEN')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  statusFilter === 'OPEN'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Ordering Open
              </button>
              <button
                onClick={() => setStatusFilter('CLOSED')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  statusFilter === 'CLOSED'
                    ? 'bg-red-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Paused / Closed
              </button>
            </div>

            {/* Category Dropdown */}
            <div className="shrink-0">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 focus:outline-hidden bg-stone-50 cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'ALL' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Outlets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOutlets.map((outlet) => {
            const isOpen = outlet.isOpen !== false;
            return (
              <div
                key={outlet.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Outlet Cover Image */}
                <div className="relative h-36 bg-stone-100 overflow-hidden">
                  <img
                    src={outlet.image}
                    alt={outlet.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-stone-900 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {outlet.shortCategory || outlet.cuisine?.[0] || 'Cafe'}
                  </span>

                  {/* Status Toggle Badge */}
                  <button
                    onClick={() => handleToggleStatus(outlet)}
                    className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md border backdrop-blur-xs transition-transform hover:scale-105 cursor-pointer ${
                      isOpen
                        ? 'bg-emerald-600/90 text-white border-emerald-400'
                        : 'bg-rose-700/90 text-white border-rose-500'
                    }`}
                    title="Click to toggle ordering availability"
                  >
                    {isOpen ? '● Ordering Open' : '✕ Paused'}
                  </button>

                  {/* Name and Tagline in Cover Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-black text-base leading-tight truncate">
                      {outlet.name}
                    </h3>
                    <p className="text-[11px] text-stone-200 truncate mt-0.5">
                      {outlet.tagline}
                    </p>
                  </div>
                </div>

                {/* Outlet Meta Content */}
                <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between text-xs">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{outlet.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-stone-500">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{outlet.timing || '9:00 AM - 8:30 PM'}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-stone-500">
                      <UserCheck className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Manager: <strong className="text-stone-800">{outlet.managerName || 'Assigned Staff'}</strong></span>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/staff/${outlet.id}`}
                        className="p-2 rounded-xl text-stone-600 hover:text-[#0D3828] hover:bg-emerald-50 transition-colors"
                        title="Open Staff POS Kitchen Terminal"
                      >
                        <ChefHat className="w-4 h-4" />
                      </Link>

                      <Link
                        to={`/outlet/${outlet.id}`}
                        target="_blank"
                        className="p-2 rounded-xl text-stone-600 hover:text-[#0D3828] hover:bg-emerald-50 transition-colors"
                        title="View Student Food Menu"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(outlet)}
                        className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition-colors cursor-pointer ${
                          isOpen
                            ? 'bg-stone-100 text-stone-700 hover:bg-rose-50 hover:text-rose-700'
                            : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        }`}
                      >
                        {isOpen ? 'Pause Ordering' : 'Enable Ordering'}
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(outlet)}
                        className="px-3 py-1.5 rounded-xl bg-[#0D3828] hover:bg-[#144834] text-white font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3 text-[#EAA044]" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredOutlets.length === 0 && (
          <div className="bg-white rounded-3xl p-10 text-center border border-stone-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">No Food Outlets Match Your Filter</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search query, status selection, or category filter to view all campus cafeterias.
            </p>
          </div>
        )}

      </div>

      {/* Add / Edit Outlet Modal */}
      <AddEditOutletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveOutlet}
        outletToEdit={outletToEdit}
        staffList={staffList}
      />
    </AdminLayout>
  );
}
