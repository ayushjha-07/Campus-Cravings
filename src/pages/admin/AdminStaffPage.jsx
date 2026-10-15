import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import AddEditStaffModal from '../../components/admin/AddEditStaffModal';
import { useAdmin } from '../../context/AdminContext';
import { useMenu } from '../../context/MenuContext';
import { 
  UserCheck, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Store, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  History,
  Sparkles
} from 'lucide-react';

export default function AdminStaffPage() {
  const { staffList, addStaff, updateStaff, toggleStaffStatus, deleteStaff, auditLogs } = useAdmin();
  const { outlets } = useMenu();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [outletFilter, setOutletFilter] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState(null);

  // Filtered staff list
  const filteredStaff = useMemo(() => {
    return staffList.filter(member => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.staffId && member.staffId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (member.assignedOutletName && member.assignedOutletName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRole =
        roleFilter === 'ALL' || member.role === roleFilter;

      const matchesOutlet =
        outletFilter === 'ALL' || member.assignedOutletId === outletFilter;

      return matchesSearch && matchesRole && matchesOutlet;
    });
  }, [staffList, searchQuery, roleFilter, outletFilter]);

  const handleOpenAdd = () => {
    setStaffToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setStaffToEdit(member);
    setIsModalOpen(true);
  };

  const handleSaveStaff = (formData) => {
    if (staffToEdit) {
      updateStaff(staffToEdit.id, formData);
    } else {
      addStaff(formData);
    }
  };

  const handleDelete = (member) => {
    if (window.confirm(`Are you sure you want to remove staff account "${member.name}"?`)) {
      deleteStaff(member.id);
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
                Staff & Operator Directory
              </h1>
              <span className="text-xs font-mono font-bold bg-[#0D3828] text-white px-2.5 py-0.5 rounded-full">
                {staffList.length} Accounts
              </span>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Manage cafeteria operators, counter POS terminals, shift schedules, and access credentials
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-[#EAA044]" />
            <span>Add Staff Account</span>
          </button>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff by name, staff ID, official email, or assigned outlet..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              />
            </div>

            {/* Outlet Filter Dropdown */}
            <div className="shrink-0">
              <select
                value={outletFilter}
                onChange={(e) => setOutletFilter(e.target.value)}
                className="w-full md:w-auto px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 bg-stone-50 cursor-pointer focus:outline-hidden"
              >
                <option value="ALL">All Outlets</option>
                {outlets.map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>

            {/* Role Filter Tabs */}
            <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 md:pb-0">
              {['ALL', 'Outlet Staff', 'Outlet Manager', 'University Admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    roleFilter === role
                      ? 'bg-[#0D3828] text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {role === 'ALL' ? 'All Roles' : role}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Staff Table (Desktop) & Cards (Mobile) */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
          
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50/70 border-b border-stone-200 text-stone-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Staff Member</th>
                  <th className="py-3.5 px-4">Staff ID</th>
                  <th className="py-3.5 px-4">Assigned Outlet</th>
                  <th className="py-3.5 px-4">Platform Role</th>
                  <th className="py-3.5 px-4">Shift & Activity</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredStaff.map((member) => {
                  const isActive = member.status === 'Active';
                  return (
                    <tr key={member.id} className="hover:bg-stone-50/80 transition-colors">
                      
                      {/* Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0D3828] to-[#144834] text-white flex items-center justify-center font-bold text-xs">
                            {member.name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900">{member.name}</div>
                            <div className="text-[10px] text-stone-400">{member.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Staff ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-800">
                        {member.staffId}
                      </td>

                      {/* Assigned Outlet */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-800 flex items-center gap-1.5">
                          <Store className="w-3.5 h-3.5 text-[#EAA044]" />
                          <span>{member.assignedOutletName}</span>
                        </div>
                        <div className="text-[10px] text-stone-400">
                          Contact: {member.phone}
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          member.role === 'University Admin'
                            ? 'bg-purple-50 text-purple-900 border-purple-200'
                            : member.role === 'Outlet Manager'
                            ? 'bg-blue-50 text-blue-900 border-blue-200'
                            : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        }`}>
                          {member.role}
                        </span>
                      </td>

                      {/* Shift & Activity */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-stone-800">{member.shift || 'Full Day'}</div>
                        <div className="text-[10px] text-stone-400">Active: {member.lastActive}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {member.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => toggleStaffStatus(member.id)}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                            }`}
                          >
                            {isActive ? 'Disable' : 'Enable'}
                          </button>

                          <button
                            onClick={() => handleOpenEdit(member)}
                            className="p-1.5 rounded-xl text-stone-600 hover:text-[#0D3828] hover:bg-stone-100 transition-colors cursor-pointer"
                            title="Edit Staff"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(member)}
                            className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-stone-100">
            {filteredStaff.map((member) => (
              <div key={member.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0D3828] text-white flex items-center justify-center font-bold text-xs">
                      {member.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm leading-tight">{member.name}</h3>
                      <p className="text-[11px] text-stone-500 font-mono">{member.staffId} • {member.role}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    member.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}>
                    {member.status}
                  </span>
                </div>

                <div className="text-xs space-y-1 bg-stone-50 p-2.5 rounded-2xl border border-stone-200/80">
                  <div className="text-stone-800 font-bold">Outlet: {member.assignedOutletName}</div>
                  <div className="text-stone-500 text-[11px]">Shift: {member.shift} • {member.email}</div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => toggleStaffStatus(member.id)}
                    className="text-xs font-bold text-stone-600 hover:text-rose-700 cursor-pointer"
                  >
                    {member.status === 'Active' ? 'Disable Access' : 'Enable Access'}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(member)}
                    className="px-3 py-1.5 rounded-xl bg-[#0D3828] text-white text-xs font-bold cursor-pointer"
                  >
                    Edit Staff
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Staff Activity & Audit Trail Preview */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#0D3828]" />
              <h3 className="text-base font-black text-stone-900 tracking-tight">
                Staff Activity & Compliance Log
              </h3>
            </div>
            <span className="text-xs text-stone-400">Live Campus Event Stream</span>
          </div>

          <div className="divide-y divide-stone-100">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900">{log.action}: </span>
                  <span className="text-stone-600">{log.details}</span>
                </div>
                <span className="text-[10px] font-mono text-stone-400 shrink-0 ml-3">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add / Edit Staff Modal */}
      <AddEditStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStaff}
        staffToEdit={staffToEdit}
        outletsList={outlets}
      />
    </AdminLayout>
  );
}
