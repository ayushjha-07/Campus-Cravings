import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Store, ClipboardList, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = useCart();
  const { isAuthenticated, user } = useAuth();

  // Active orders awaiting pickup or preparing
  const activeOrdersCount = (orders || []).filter(o => 
    ['Placed', 'Order Placed', 'Confirmed', 'Preparing', 'Ready for Pickup'].includes(o.status)
  ).length;

  const handleOutletsClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('outlets');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Let standard link navigate to /#outlets
    }
  };

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Outlets', path: '/outlets', icon: Store },
    { label: 'My Orders', path: '/orders', icon: ClipboardList, badge: activeOrdersCount },
    { label: 'Profile', path: isAuthenticated || user?.isLoggedIn ? '/profile' : '/login', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#19231D]/95 backdrop-blur-md border-t border-stone-200/90 dark:border-[#2A382F] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-3 py-1.5 safe-area-pb transition-colors duration-200">
      <div className="grid grid-cols-4 items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isOrders = item.label === 'My Orders';
          const isProfile = item.label === 'Profile';
          const isActive = isOrders 
            ? location.pathname.startsWith('/order')
            : isProfile
            ? ['/profile', '/login'].includes(location.pathname)
            : !item.isHash && location.pathname === item.path;

          if (item.isHash) {
            return (
              <a
                key={item.label}
                href={item.path}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center py-1 text-stone-500 dark:text-[#B8C5BB] hover:text-[#0D3828] dark:hover:text-[#52D8A4] transition-colors"
              >
                <Icon className="w-5 h-5 mb-0.5 stroke-[1.8]" />
                <span className="text-[11px] font-semibold">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive
                  ? 'text-[#0D3828] dark:text-[#52D8A4] font-bold'
                  : 'text-stone-500 dark:text-[#B8C5BB] hover:text-stone-800 dark:hover:text-[#F5F7F4]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 bg-[#E76F51] text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
