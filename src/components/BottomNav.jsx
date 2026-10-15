import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Store, ShoppingBag, ClipboardList, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BottomNav() {
  const location = useLocation();
  const { itemCount } = useCart();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Outlets', path: '/#outlets', icon: Store, isHash: true },
    { label: 'Cart', path: '/cart', icon: ShoppingBag, badge: itemCount },
    { label: 'Orders', path: '/orders', icon: ClipboardList },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#19231D]/95 backdrop-blur-md border-t border-stone-200/90 dark:border-[#2A382F] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1 safe-area-pb transition-colors duration-200">
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isHash && location.pathname === item.path;

          if (item.isHash) {
            return (
              <a
                key={item.label}
                href={item.path}
                className="flex flex-col items-center justify-center py-1 text-stone-500 dark:text-[#B8C5BB] hover:text-[#0D3828] dark:hover:text-[#EAA044] transition-colors"
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive
                  ? 'text-[#0D3828] dark:text-[#EAA044] font-bold'
                  : 'text-stone-500 dark:text-[#B8C5BB] hover:text-stone-800 dark:hover:text-[#F5F7F4]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#E76F51] text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-2xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
