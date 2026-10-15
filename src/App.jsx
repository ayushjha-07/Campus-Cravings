import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import ScrollToTop from './components/ScrollToTop';
import CartToast from './components/CartToast';
import ProtectedRoute from './components/ProtectedRoute';

// Student Pages
import HomePage from './pages/HomePage';
import OutletMenuPage from './pages/OutletMenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Outlet Staff Dashboard Pages
import StaffDashboardPage from './pages/staff/StaffDashboardPage';
import StaffOrdersPage from './pages/staff/StaffOrdersPage';
import StaffMenuPage from './pages/staff/StaffMenuPage';

// University Admin Dashboard Pages
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminOutletsPage from './pages/admin/AdminOutletsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import AdminStudentsPage from './pages/admin/AdminStudentsPage';
import AdminStaffPage from './pages/admin/AdminStaffPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isStaffRoute = location.pathname.startsWith('/staff');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  const isPortalRoute = isStaffRoute || isAdminRoute || isAuthRoute;

  return (
    <div className={`min-h-screen flex flex-col ${isPortalRoute ? 'bg-[#FAF7F0] dark:bg-[#101713]' : 'bg-[#FDFBF7] dark:bg-[#101713] pb-14 md:pb-0'} text-slate-800 dark:text-[#F5F7F4] antialiased font-sans selection:bg-[#1B4D36] selection:text-white transition-colors duration-200`}>
      {/* Top navigation - hidden on staff kitchen terminal, admin portal, and dedicated auth screens */}
      {!isPortalRoute && <Navbar onOpenSearch={() => setIsSearchOpen(true)} />}

      {/* Search modal triggered from navbar or shortcuts */}
      {!isPortalRoute && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      )}

      {/* Main content routes */}
      <main className="flex-1">
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<HomePage />} />
          <Route path="/outlets" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/outlet/:id" element={<OutletMenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailPage />} />
          <Route path="/order-details/:orderId" element={<OrderDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />

          {/* Outlet Staff Dashboard */}
          <Route path="/staff" element={<Navigate to="/staff/kulhad" replace />} />
          <Route path="/staff/:outletId" element={<StaffDashboardPage />} />
          <Route path="/staff/:outletId/orders" element={<StaffOrdersPage />} />
          <Route path="/staff/:outletId/menu" element={<StaffMenuPage />} />

          {/* University Admin Dashboard */}
          <Route 
            path="/admin" 
            element={
              <AdminProtectedRoute>
                <AdminOverviewPage />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/outlets" 
            element={
              <AdminProtectedRoute>
                <AdminOutletsPage />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <AdminProtectedRoute>
                <AdminOrdersPage />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/menu" 
            element={
              <AdminProtectedRoute>
                <AdminMenuPage />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/students" 
            element={
              <AdminProtectedRoute>
                <AdminStudentsPage />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/staff" 
            element={
              <AdminProtectedRoute>
                <AdminStaffPage />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              <AdminProtectedRoute>
                <AdminAnalyticsPage />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/notifications" 
            element={
              <AdminProtectedRoute>
                <AdminNotificationsPage />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <AdminProtectedRoute>
                <AdminSettingsPage />
              </AdminProtectedRoute>
            } 
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer - hidden on staff terminal and admin portal */}
      {!isPortalRoute && <Footer />}

      {/* Cart Toast Notification - hidden on staff terminal and admin portal */}
      {!isPortalRoute && <CartToast />}

      {/* Mobile Bottom Navigation - hidden on staff terminal and admin portal */}
      {!isPortalRoute && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <MenuProvider>
          <CartProvider>
            <ThemeProvider>
              <Router>
                <ScrollToTop />
                <AppContent />
              </Router>
            </ThemeProvider>
          </CartProvider>
        </MenuProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
