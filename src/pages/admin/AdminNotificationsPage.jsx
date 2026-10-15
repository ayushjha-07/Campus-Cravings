import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Store, 
  UserCheck, 
  AlertCircle, 
  AlertTriangle, 
  Megaphone, 
  CheckCircle2, 
  Filter, 
  Sparkles 
} from 'lucide-react';

export default function AdminNotificationsPage() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useAdmin();

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [unreadOnly, setUnreadOnly] = useState(false);

  // Icon mapping for categories
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'outlet_request':
        return <Store className="w-4 h-4 text-emerald-700" />;
      case 'staff_change':
        return <UserCheck className="w-4 h-4 text-blue-700" />;
      case 'cancelled_order':
        return <AlertCircle className="w-4 h-4 text-rose-700" />;
      case 'operational_issue':
        return <AlertTriangle className="w-4 h-4 text-amber-700" />;
      case 'announcement':
      default:
        return <Megaphone className="w-4 h-4 text-purple-700" />;
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notif => {
      const matchesCategory =
        categoryFilter === 'ALL' || notif.category === categoryFilter;
      const matchesUnread =
        !unreadOnly || !notif.isRead;
      return matchesCategory && matchesUnread;
    });
  }, [notifications, categoryFilter, unreadOnly]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Administration Notification Center
              </h1>
              {unreadCount > 0 && (
                <span className="text-xs font-mono font-bold bg-[#EAA044] text-white px-2.5 py-0.5 rounded-full animate-pulse">
                  {unreadCount} Unread
                </span>
              )}
            </div>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Live operational alerts, franchise registration inquiries, cancellation notices, and cafeteria updates
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-[#0D3828]" />
              <span>Mark All as Read</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'ALL', label: 'All Alerts' },
              { id: 'outlet_request', label: 'Outlet Requests' },
              { id: 'staff_change', label: 'Staff Changes' },
              { id: 'cancelled_order', label: 'Cancellations' },
              { id: 'operational_issue', label: 'Operational' },
              { id: 'announcement', label: 'Announcements' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  categoryFilter === tab.id
                    ? 'bg-[#0D3828] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Unread Only Toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(e) => setUnreadOnly(e.target.checked)}
              className="w-4 h-4 rounded-md text-[#0D3828] focus:ring-[#0D3828]"
            />
            <span>Unread Only</span>
          </label>

        </div>

        {/* Notifications Feed */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs divide-y divide-stone-100 overflow-hidden">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors ${
                !notif.isRead ? 'bg-amber-50/30' : 'hover:bg-stone-50/50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getCategoryIcon(notif.category)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-stone-900 text-sm leading-tight">
                      {notif.title}
                    </h3>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#EAA044]" />
                    )}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-stone-400 font-medium pt-1">
                    <span>{notif.time}</span>
                    <span>•</span>
                    <span className="capitalize">{notif.category.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {!notif.isRead && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="p-1.5 rounded-xl text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                    title="Mark as Read"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Dismiss Notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">All Caught Up!</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No notifications match your current filter selection. All administrative alerts have been reviewed.
              </p>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
