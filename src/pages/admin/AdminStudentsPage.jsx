import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StudentDetailModal from '../../components/admin/StudentDetailModal';
import { useAdmin } from '../../context/AdminContext';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw, 
  Eye, 
  Building2, 
  Mail, 
  Phone,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function AdminStudentsPage() {
  const { studentsList, toggleStudentStatus, resetStudentPassword, logAction, exportToCSV } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | Active | Suspended
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  const [selectedStudent, setSelectedStudent] = useState(null);

  // Departments list
  const departments = useMemo(() => {
    const set = new Set(studentsList.map(s => s.department || 'General'));
    return ['ALL', ...Array.from(set)];
  }, [studentsList]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return studentsList.filter(student => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (student.studentId && student.studentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (student.email && student.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (student.department && student.department.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'ALL' || student.status === statusFilter;

      const matchesDepartment =
        departmentFilter === 'ALL' || student.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [studentsList, searchQuery, statusFilter, departmentFilter]);

  const handleExportCSV = () => {
    const headers = [
      { key: 'studentId', label: 'Student ID' },
      { key: 'name', label: 'Full Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'department', label: 'Department' },
      { key: 'hostel', label: 'Hostel/Residence' },
      { key: 'status', label: 'Account Status' },
      { key: 'totalOrders', label: 'Total Orders' }
    ];

    exportToCSV('CGC_Enrolled_Students', filteredStudents, headers);
    logAction('Students Exported to CSV', 'Student Directory', `Exported ${filteredStudents.length} student rows`, 'data_export');
  };

  const handleToggleStatus = (studentId) => {
    toggleStudentStatus(studentId);
    if (selectedStudent && (selectedStudent.studentId === studentId || selectedStudent.id === studentId)) {
      setSelectedStudent(prev => ({
        ...prev,
        status: prev.status === 'Active' ? 'Suspended' : 'Active'
      }));
    }
  };

  const handleResetPassword = (studentId) => {
    const res = resetStudentPassword(studentId);
    if (res.success) {
      alert(res.message);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header & Export Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Student Account Directory
              </h1>
              <span className="text-xs font-mono font-bold bg-[#0D3828] text-white px-2.5 py-0.5 rounded-full">
                {studentsList.length} Registered
              </span>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Review student cafeteria profiles, order frequency, and account authorization status across CGC Mohali
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold shadow-2xs hover:shadow-md transition-all cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-[#0D3828]" />
            <span>Export Students CSV</span>
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
                placeholder="Search by student name, roll number (CGC202...), email, or branch..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              />
            </div>

            {/* Department Filter */}
            <div className="shrink-0">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full md:w-auto px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 bg-stone-50 cursor-pointer focus:outline-hidden"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'ALL' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === 'ALL'
                    ? 'bg-[#0D3828] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('Active')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === 'Active'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-emerald-800 hover:bg-stone-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setStatusFilter('Suspended')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === 'Suspended'
                    ? 'bg-rose-700 text-white'
                    : 'bg-stone-100 text-rose-800 hover:bg-stone-200'
                }`}
              >
                Suspended
              </button>
            </div>

          </div>
        </div>

        {/* Students Table (Desktop) & Cards (Mobile) */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50/70 border-b border-stone-200 text-stone-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Roll Number</th>
                  <th className="py-3.5 px-4">Department & Hostel</th>
                  <th className="py-3.5 px-4">Orders Placed</th>
                  <th className="py-3.5 px-4">Account Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredStudents.map((student) => {
                  const isActive = student.status === 'Active';
                  return (
                    <tr key={student.id || student.studentId} className="hover:bg-stone-50/80 transition-colors">
                      
                      {/* Name & Contact */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0D3828] to-[#144834] text-white flex items-center justify-center font-bold text-xs">
                            {student.name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900">{student.name}</div>
                            <div className="text-[10px] text-stone-400">{student.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Student ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-800">
                        {student.studentId || student.rollNo}
                      </td>

                      {/* Department & Residence */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-stone-800 truncate">
                          {student.department || 'Computer Science & Engineering'}
                        </div>
                        <div className="text-[10px] text-stone-400 truncate">
                          {student.hostel || 'Campus Day Scholar'}
                        </div>
                      </td>

                      {/* Orders Count & Spent */}
                      <td className="py-3.5 px-4">
                        <div className="font-black text-stone-900">
                          {student.totalOrders || 0} Orders
                        </div>
                        {student.totalSpent && (
                          <div className="text-[10px] text-stone-500 font-mono">
                            ₹{student.totalSpent.toLocaleString('en-IN')} spent
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {student.status || 'Active'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleStatus(student.studentId || student.id)}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                            }`}
                          >
                            {isActive ? 'Suspend' : 'Activate'}
                          </button>

                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-[#0D3828] hover:text-white text-stone-700 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
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
          <div className="md:hidden divide-y divide-stone-100">
            {filteredStudents.map((student) => (
              <div key={student.id || student.studentId} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0D3828] text-white flex items-center justify-center font-bold text-xs">
                      {student.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm leading-tight">{student.name}</h3>
                      <p className="text-[11px] text-stone-500 font-mono">{student.studentId || student.rollNo}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    student.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}>
                    {student.status || 'Active'}
                  </span>
                </div>

                <div className="text-xs space-y-1 bg-stone-50 p-2.5 rounded-2xl border border-stone-200/80">
                  <div className="text-stone-700 font-medium truncate">{student.department}</div>
                  <div className="text-stone-500 text-[11px] truncate">{student.hostel}</div>
                  <div className="text-stone-900 font-bold pt-1">
                    {student.totalOrders || 0} Orders Placed
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleToggleStatus(student.studentId || student.id)}
                    className="text-xs font-bold text-stone-600 hover:text-rose-700 cursor-pointer"
                  >
                    {student.status === 'Active' ? 'Suspend Account' : 'Reactivate'}
                  </button>

                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="px-3 py-1.5 rounded-xl bg-[#0D3828] text-white text-xs font-bold cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">No Students Found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No student accounts match your search or department filter. Try searching with a different roll number or keyword.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Student Detail Modal */}
      <StudentDetailModal
        isOpen={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
        student={selectedStudent}
        onToggleStatus={handleToggleStatus}
        onResetPassword={handleResetPassword}
      />
    </AdminLayout>
  );
}
