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
            <div className="space-y-2">
              <Link to="/" className="inline-block p-2 rounded-2xl bg-white shadow-md border border-stone-200/80 hover:scale-102 transition-transform">
                <img
                  src="/images/brand/logo.png"
                  alt="Campus Cravings Logo"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </Link>
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                CGC University, Mohali • Student Dining
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
                  Explore Outlets
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#why-us" className="hover:text-white transition-colors">
                  Why Campus Cravings
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Student Account Links (Requirement 8) */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4 uppercase">
              Account & Portal
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors text-amber-300 font-medium">
                  Register / Get Started
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  My Orders & Pickup
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Dining Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Food Outlets (All 17) */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4 uppercase flex items-center gap-2">
              <Store className="w-4 h-4 text-[#EAA044]" />
              <span>Campus Outlets (17)</span>
            </h4>
            <div className="space-y-1.5 text-xs text-stone-400 max-h-48 overflow-y-auto pr-2">
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

            <div className="pt-4 flex flex-col gap-2">
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
