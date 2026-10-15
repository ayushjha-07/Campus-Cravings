import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  Clock, 
  IndianRupee, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Demo Dataset 1: Daily Orders & Revenue over the past 7 days
const DAILY_DATA = [
  { day: 'Mon', orders: 168, revenue: 25200 },
  { day: 'Tue', orders: 194, revenue: 29100 },
  { day: 'Wed', orders: 212, revenue: 32800 },
  { day: 'Thu', orders: 185, revenue: 27900 },
  { day: 'Fri', orders: 245, revenue: 38400 },
  { day: 'Sat', orders: 130, revenue: 19800 },
  { day: 'Sun', orders: 95, revenue: 14200 }
];

// Demo Dataset 2: Peak Ordering Hours at CGC Mohali
const PEAK_HOURS_DATA = [
  { hour: '08:00', orders: 10, label: 'Breakfast' },
  { hour: '09:30', orders: 22, label: '' },
  { hour: '10:30', orders: 54, label: 'Morning Break' },
  { hour: '11:45', orders: 38, label: '' },
  { hour: '13:00', orders: 112, label: 'Lunch Recess' },
  { hour: '14:15', orders: 48, label: '' },
  { hour: '15:30', orders: 35, label: '' },
  { hour: '16:30', orders: 86, label: 'Evening Tea' },
  { hour: '18:00', orders: 42, label: '' },
  { hour: '19:30', orders: 28, label: 'Dinner / Snacks' }
];

// Demo Dataset 3: Top 6 Most Ordered Food Items across campus
const TOP_FOOD_ITEMS = [
  { name: 'Special Kulhad Chai', orders: 210, outlet: 'Kulhad', price: 25 },
  { name: 'Margherita Pizza Regular', orders: 145, outlet: 'Dominos', price: 109 },
  { name: 'Crispy Paneer Grilled Wrap', orders: 128, outlet: 'Applebeez', price: 110 },
  { name: 'Chilled Frappe Cold Coffee', orders: 115, outlet: 'Nescafe', price: 80 },
  { name: 'Veg Aloo Tikki Burger', orders: 98, outlet: 'X Burgers', price: 65 },
  { name: 'Oven-Baked Puff Pastry', orders: 85, outlet: 'Tuckshop', price: 30 }
];

// Demo Dataset 4: Outlet Performance (Orders & Revenue)
const OUTLET_PERFORMANCE_DATA = [
  { outlet: 'Kulhad', orders: 310, revenue: 18500 },
  { outlet: 'Dominos', orders: 240, revenue: 42000 },
  { outlet: 'Nescafe', orders: 225, revenue: 21500 },
  { outlet: 'Applebeez', orders: 180, revenue: 26000 },
  { outlet: 'Tuckshop', orders: 165, revenue: 11200 },
  { outlet: 'Food Court', orders: 150, revenue: 24500 },
  { outlet: 'Canteen', orders: 140, revenue: 17800 }
];

// Demo Dataset 5: Average Preparation Time by Outlet (Minutes)
const PREP_TIME_DATA = [
  { outlet: 'Tuckshop', time: 5 },
  { outlet: 'Nescafe', time: 7 },
  { outlet: 'Kulhad', time: 8 },
  { outlet: 'Chutar Putar', time: 10 },
  { outlet: 'Food Court', time: 12 },
  { outlet: 'Applebeez', time: 14 },
  { outlet: 'Dominos', time: 18 }
];

// Demo Dataset 6: Cancellation Reasons Breakdown
const CANCELLATION_REASONS = [
  { name: 'Class / Lab Rescheduled', value: 45, color: '#0D3828' },
  { name: 'Out of Stock Ingredients', value: 25, color: '#E76F51' },
  { name: 'Student Changed Mind', value: 18, color: '#EAA044' },
  { name: 'Kitchen Busy / Delayed', value: 12, color: '#2A9D8F' }
];

export default function AdminAnalyticsPage() {
  const { logAction, exportToCSV } = useAdmin();
  const [dateRange, setDateRange] = useState('7_DAYS'); // TODAY | 7_DAYS | 30_DAYS | SEMESTER

  const handleExportAnalyticsCSV = () => {
    const headers = [
      { key: 'name', label: 'Dish / Metric' },
      { key: 'outlet', label: 'Outlet' },
      { key: 'orders', label: 'Total Volume' },
      { key: 'price', label: 'Unit Price (INR)' }
    ];

    exportToCSV('CGC_Campus_Analytics_Top_Dishes', TOP_FOOD_ITEMS, headers);
    logAction('Analytics Data Exported', 'Campus Reports', 'Downloaded top food items and revenue breakdown', 'data_export');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Cafeteria Analytics & Executive Reports
              </h1>
              <span className="text-xs font-mono font-bold bg-[#0D3828] text-white px-2.5 py-0.5 rounded-full">
                Interactive Recharts
              </span>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Evaluate peak cafeteria ordering windows, top food preferences, preparation bottlenecks, and revenue trends
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Date Range Selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3.5 py-2 rounded-2xl border border-stone-200 text-xs font-bold text-stone-700 bg-white shadow-2xs focus:outline-hidden cursor-pointer"
            >
              <option value="TODAY">Today's Shift</option>
              <option value="7_DAYS">Last 7 Days (Default)</option>
              <option value="30_DAYS">Past 30 Days</option>
              <option value="SEMESTER">Full Spring 2026 Semester</option>
            </select>

            <button
              onClick={handleExportAnalyticsCSV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#EAA044]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-4 rounded-3xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Academic Demonstration Metrics:</strong> Visualizations reflect structured campus demonstration records calibrated for CGC University break intervals.
            </span>
          </div>
          <span className="text-[11px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md shrink-0">
            CGC Mohali
          </span>
        </div>

        {/* Chart Row 1: Weekly Orders & Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Daily Orders Trend (AreaChart) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-stone-900 tracking-tight">
                  Orders per Day
                </h3>
                <p className="text-stone-500 text-xs">
                  Weekly food order volume progression
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Weekly Volume
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DAILY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D3828" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0D3828" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" />
                  <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E5E0D8', fontSize: '12px' }}
                    formatter={(val) => [`${val} orders`, 'Orders']}
                  />
                  <Area type="monotone" dataKey="orders" stroke="#0D3828" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Sales (BarChart) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-stone-900 tracking-tight">
                  Gross Weekly Sales (₹)
                </h3>
                <p className="text-stone-500 text-xs">
                  Estimated gross transaction volume by day
                </p>
              </div>
              <span className="text-[10px] font-bold text-[#0D3828] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                INR (₹)
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DAILY_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" />
                  <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E5E0D8', fontSize: '12px' }}
                    formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Gross Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#EAA044" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Chart Row 2: Peak Ordering Hours & Most Ordered Food Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Peak Ordering Hours LineChart */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-stone-900 tracking-tight">
                  Peak Campus Ordering Hours
                </h3>
                <p className="text-stone-500 text-xs">
                  Critical spikes correspond to 1:00 PM lunch & 4:30 PM evening break
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PEAK_HOURS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" />
                  <XAxis dataKey="hour" stroke="#888888" fontSize={11} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E5E0D8', fontSize: '12px' }}
                    formatter={(val, name, item) => [`${val} orders`, item.payload.label || 'Volume']}
                  />
                  <Line type="monotone" dataKey="orders" stroke="#E76F51" strokeWidth={3} dot={{ r: 4, fill: '#E76F51' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Most Ordered Food Items BarChart */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-stone-900 tracking-tight">
                  Top 6 Most Ordered Food Items
                </h3>
                <p className="text-stone-500 text-xs">
                  Campus favorites ranking by volume
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TOP_FOOD_ITEMS} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" horizontal={false} />
                  <XAxis type="number" stroke="#888888" fontSize={11} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#888888" fontSize={10} tickLine={false} width={130} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E5E0D8', fontSize: '12px' }}
                    formatter={(val, name, item) => [`${val} units sold (₹${item.payload.price} ea)`, item.payload.outlet]}
                  />
                  <Bar dataKey="orders" fill="#0D3828" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Chart Row 3: Outlet Performance, Prep Time, & Cancellations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Outlet Performance (Orders & Revenue) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <h3 className="text-base font-black text-stone-900 tracking-tight">
              Outlet Orders vs Revenue
            </h3>
            <p className="text-stone-500 text-xs">
              Comparison across major campus cafeterias
            </p>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={OUTLET_PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" />
                  <XAxis dataKey="outlet" stroke="#888888" fontSize={10} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E5E0D8', fontSize: '12px' }}
                  />
                  <Bar dataKey="orders" fill="#2A9D8F" radius={[4, 4, 0, 0]} name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Average Prep Time */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <h3 className="text-base font-black text-stone-900 tracking-tight">
              Average Prep Time (Minutes)
            </h3>
            <p className="text-stone-500 text-xs">
              Turnaround speed by cafeteria kitchen
            </p>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PREP_TIME_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" />
                  <XAxis dataKey="outlet" stroke="#888888" fontSize={10} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E5E0D8', fontSize: '12px' }}
                    formatter={(val) => [`${val} mins`, 'Avg Prep Time']}
                  />
                  <Bar dataKey="time" fill="#E76F51" radius={[4, 4, 0, 0]} name="Minutes" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cancellation Reasons PieChart */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
            <h3 className="text-base font-black text-stone-900 tracking-tight">
              Order Cancellation Reasons
            </h3>
            <p className="text-stone-500 text-xs">
              Primary causes of cancelled food orders
            </p>

            <div className="h-60 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CANCELLATION_REASONS}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {CANCELLATION_REASONS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E5E0D8', fontSize: '12px' }}
                    formatter={(val) => [`${val}%`, 'Percentage']}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
