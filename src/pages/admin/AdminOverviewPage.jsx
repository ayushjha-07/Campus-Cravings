import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import OrderDetailAdminModal from '../../components/admin/OrderDetailAdminModal';
import { useAdmin } from '../../context/AdminContext';
import { useMenu } from '../../context/MenuContext';
import { useCart } from '../../context/CartContext';
import { 
  Users, 
  Store, 
  ReceiptText, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  ChefHat, 
  IndianRupee, 
  ArrowUpRight, 
  ArrowRight,
  ShieldCheck, 
  AlertCircle,
  Eye,
  Sparkles,
  Layers
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Demo Hourly Ordering Trends across CGC Mohali Campus
const HOURLY_ORDER_DATA = [
  { time: '08:30', orders: 12, revenue: 1440 },
  { time: '10:00', orders: 28, revenue: 3920 },
  { time: '11:30', orders: 45, revenue: 7650 },
  { time: '13:00', orders: 84, revenue: 15120 }, // Lunch Peak
  { time: '14:30', orders: 36, revenue: 5400 },
  { time: '16:00', orders: 58, revenue: 9860 }, // Tea Break Peak
  { time: '17:30', orders: 32, revenue: 4800 },
  { time: '19:00', orders: 22, revenue: 3520 }
];

// Demo Outlet Revenue Comparison
const OUTLET_SHARE_DATA = [
  { name: 'Kulhad', orders: 48, fill: '#0D3828' },
  { name: 'Dominos', orders: 38, fill: '#E76F51' },
  { name: 'Nescafe', orders: 35, fill: '#EAA044' },
  { name: 'Applebeez', orders: 26, fill: '#2A9D8F' },
  { name: 'Tuckshop', orders: 22, fill: '#264653' },
  { name: 'Food Court', orders: 19, fill: '#8AB17D' }
];

export default function AdminOverviewPage() {
  const { adminUser, studentsList, staffList, logAction } = useAdmin();
  const { outlets } = useMenu();
  const { orders, updateOrderStatus } = useCart();

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Computed Real-Time Metrics from Current Order Store
  const pendingOrders = orders.filter(o => o.status === 'Order Placed' || o.status === 'Placed');
  const preparingOrders = orders.filter(o => o.status === 'Preparing');
  const readyOrders = orders.filter(o => o.status === 'Ready for Pickup');
  const completedOrders = orders.filter(o => o.status === 'Collected');

  // Simulated today's campus revenue
  const totalRevenueCalculated = orders.reduce((sum, ord) => sum + (Number(ord.total) || 0), 0);
  const displayRevenue = totalRevenueCalculated > 0 ? totalRevenueCalculated + 48200 : 51710;

  const handleAdminCancel = (orderId, reason) => {
    updateOrderStatus(orderId, 'Cancelled');
    logAction('Emergency Order Cancelled', `Order #${orderId}`, reason, 'order_cancel');
    setSelectedOrder(null);
  };

  const handleSaveAdminNote = (orderId, note) => {
    logAction('Admin Note Attached', `Order #${orderId}`, note, 'order_note');
    setSelectedOrder(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Welcome & Campus Pulse Banner */}
        <div className="bg-gradient-to-r from-[#0D3828] via-[#144834] to-[#1B5E43] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-900/60">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-[#EAA044]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EAA044]" />
                <span>CGC University Food Administration Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Welcome, {adminUser.name}
              </h1>
              <p className="text-emerald-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Centralized oversight for all 17 campus food outlets, live kitchen orders, student registrations, and cafeteria operations across CGC Mohali.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/admin/analytics"
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/20 flex items-center gap-1.5"
              >
                <span>Full Analytics</span>
                <ArrowUpRight className="w-4 h-4 text-[#EAA044]" />
              </Link>
              <Link
                to="/admin/orders"
                className="px-4 py-2.5 rounded-2xl bg-[#EAA044] hover:bg-[#d89037] text-[#0D3828] font-black text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <span>Live Kitchen Queue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 8 Primary Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Students
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-stone-900 tracking-tight">
                {1420 + studentsList.length}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                <span>Active Enrolled</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Food Outlets
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-stone-900 tracking-tight">
                {outlets.length}
              </div>
              <div className="text-[11px] text-stone-500 font-medium mt-0.5">
                {outlets.filter(o => o.isOpen !== false).length} Open for Ordering
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Total Orders Today
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <ReceiptText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-stone-900 tracking-tight">
                {184 + orders.length}
              </div>
              <div className="text-[11px] text-amber-700 font-bold mt-0.5">
                Demo Simulated Volume
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Pending Confirm
              </span>
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-orange-700 tracking-tight">
                {Math.max(pendingOrders.length, 3)}
              </div>
              <div className="text-[11px] text-stone-500 font-medium mt-0.5">
                Awaiting counter action
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                In Kitchen Prep
              </span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <ChefHat className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-indigo-900 tracking-tight">
                {Math.max(preparingOrders.length, 5)}
              </div>
              <div className="text-[11px] text-indigo-700 font-medium mt-0.5">
                Cooking at counters
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Ready for Pickup
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-emerald-800 tracking-tight">
                {Math.max(readyOrders.length, 4)}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                At collection counters
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Gross Revenue (₹)
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0D3828] flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-stone-900 tracking-tight font-mono">
                ₹{displayRevenue.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-stone-400 font-medium mt-0.5">
                *Demo calculation
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Avg Preparation
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-stone-900 tracking-tight">
                12.4 min
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                Target: &lt;15 mins
              </div>
            </div>
          </div>

        </div>

        {/* Charts Row: Hourly Order Trends & Outlet Performance Share */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Order Trends AreaChart (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-stone-900 tracking-tight">
                  Daily Order Volume Trend
                </h3>
                <p className="text-stone-500 text-xs">
                  Peak demand surges during 1:00 PM lunch & 4:00 PM evening recess
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Hourly Peak
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HOURLY_ORDER_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="orderColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D3828" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0D3828" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" />
                  <XAxis dataKey="time" stroke="#888888" fontSize={11} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E5E0D8', fontSize: '12px' }}
                    formatter={(value) => [`${value} orders`, 'Volume']}
                  />
                  <Area type="monotone" dataKey="orders" stroke="#0D3828" strokeWidth={3} fillOpacity={1} fill="url(#orderColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Popular Outlets BarChart (1 Col) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-stone-900 tracking-tight">
                  Top Outlets by Volume
                </h3>
                <p className="text-stone-500 text-xs">
                  Today's order distribution
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={OUTLET_SHARE_DATA} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" horizontal={false} />
                  <XAxis type="number" stroke="#888888" fontSize={11} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#888888" fontSize={11} tickLine={false} width={70} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E5E0D8', fontSize: '12px' }}
                    formatter={(value) => [`${value} orders`, 'Orders']}
                  />
                  <Bar dataKey="orders" radius={[0, 8, 8, 0]}>
                    {OUTLET_SHARE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Recent Orders & Outlet Performance Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Orders Table (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-stone-900 tracking-tight">
                  Recent Orders across CGC Campuses
                </h3>
                <p className="text-stone-500 text-xs">
                  Latest activity across cafeteria counters
                </p>
              </div>
              <Link
                to="/admin/orders"
                className="text-xs font-bold text-[#0D3828] hover:underline flex items-center gap-1"
              >
                <span>View All Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Student</th>
                    <th className="py-2.5 px-3">Outlet</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-stone-900">
                        {order.id || order.orderNumber}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-stone-800">{order.studentName}</div>
                        <div className="text-[10px] text-stone-400 font-mono">{order.studentId || order.rollNo}</div>
                      </td>
                      <td className="py-3 px-3 font-medium text-stone-700">
                        {order.outletName}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-stone-900">
                        ₹{order.total}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          order.status === 'Collected' 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : order.status === 'Preparing'
                            ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                            : order.status === 'Ready for Pickup'
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-[#0D3828] hover:text-white text-stone-700 text-[11px] font-bold transition-all cursor-pointer"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Outlet Performance Summary (1 Col) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-stone-900 tracking-tight">
                  Outlet Status Overview
                </h3>
                <p className="text-stone-500 text-xs">
                  Operational availability
                </p>
              </div>
              <Link
                to="/admin/outlets"
                className="text-xs font-bold text-[#0D3828] hover:underline"
              >
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {outlets.slice(0, 5).map((outlet) => (
                <div
                  key={outlet.id}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 border border-stone-200/70"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0D3828] to-[#144834] text-white flex items-center justify-center font-bold text-xs">
                      {outlet.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-xs leading-tight">
                        {outlet.name}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {outlet.shortCategory} • {outlet.prepTime}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    outlet.isOpen !== false
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}>
                    {outlet.isOpen !== false ? 'Ordering Open' : 'Paused'}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100 text-center">
              <Link
                to="/admin/outlets"
                className="text-xs font-bold text-stone-600 hover:text-[#0D3828] transition-colors"
              >
                View all {outlets.length} campus outlets →
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Order Detail Modal for Inspection */}
      <OrderDetailAdminModal
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onCancelOrder={handleAdminCancel}
        onSaveNote={handleSaveAdminNote}
      />
    </AdminLayout>
  );
}
