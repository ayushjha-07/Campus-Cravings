import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Heart,
  Store,
  Tag,
  ChefHat
} from 'lucide-react';
import { OUTLETS } from '../data/outlets';

export default function Footer() {
  return (
    <footer className="bg-stone-900 dark:bg-[#0C120F] text-stone-300 dark:text-[#B8C5BB] pt-16 pb-24 md:pb-12 border-t border-stone-800 dark:border-[#1E2922] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800 dark:border-[#1E2922]">
          
          {/* Brand & Campus Pickup Note */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF4EE] flex items-center justify-center text-[#1B4D36] shadow-md">
                <UtensilsCrossed className="w-5 h-5 text-[#1B4D36]" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Campus<span className="text-[#E76F51]">Cravings</span>
                </span>
                <span className="block text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                  CGC University, Mohali
                </span>
              </div>
            </div>

            {/* Campus Pickup Note matching Requirement 8 */}
            <div className="p-3.5 rounded-2xl bg-stone-800/80 dark:bg-[#16211A] border border-stone-700/60 dark:border-[#2A382F] text-xs text-stone-300 leading-relaxed">
              <span className="text-[#EAA044] font-bold block mb-1">Campus Pickup Platform</span>
              Campus Cravings is designed exclusively for fast in-person counter collection across CGC University, Mohali food outlets. Skip the counter lines and collect your meals fresh during lecture breaks.
            </div>

            <div className="space-y-2 pt-1 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>CGC University Campus, Sector 112 / Landran, Mohali, Punjab 140307</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Campus Outlets: 8:00 AM – 9:30 PM (Demo Operating Hours)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support.campuscravings@cgc.edu.in</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4 uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#outlets" className="hover:text-white transition-colors">
                  Food Outlets
                </a>
              </li>
              <li>
                <a href="/#offers" className="hover:text-white transition-colors">
                  Special Offers
                </a>
              </li>
              <li>
                <a href="/#popular" className="hover:text-white transition-colors">
                  Popular Food
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-white transition-colors">
                  How Pickup Works
                </a>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  My Orders & Tracking
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Food Outlets (All 14) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4 uppercase flex items-center gap-2">
              <Store className="w-4 h-4 text-[#EAA044]" />
              <span>Campus Outlets (14 Spots)</span>
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-stone-400">
              {OUTLETS.map(outlet => (
                <Link
                  key={outlet.id}
                  to={`/outlet/${outlet.id}`}
                  className="hover:text-[#52D8A4] transition-colors truncate block"
                >
                  • {outlet.name}
                </Link>
              ))}
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/staff/kulhad"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 transition-colors"
              >
                <ChefHat className="w-3.5 h-3.5 text-[#EAA044]" />
                <span>Staff Kitchen Portal</span>
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold hover:bg-stone-700 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>University Admin</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Demo Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Campus Cravings — CGC University, Mohali. All rights reserved.</p>
          <p className="text-[11px] text-stone-500">
            Demonstration prototype. Food items, pricing, and outlet hours are representative sample data.
          </p>
        </div>

      </div>
    </footer>
  );
}
