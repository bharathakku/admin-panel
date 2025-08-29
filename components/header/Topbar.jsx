"use client";
import { useState, useRef, useEffect } from "react";
import { Menu, User, Bell, Search, Settings, LogOut, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar({ onMenu, mobileMenuOpen }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAccountSettings = () => {
    setShowProfileMenu(false);
    router.push('/settings?tab=account');
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    // Add logout logic here (clear tokens, redirect, etc.)
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear any stored tokens/session data
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      // Redirect to login page or home
      router.push('/login');
    }
  };
  return (
    <header 
      className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-4"
      role="banner"
    >
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <Menu className="w-5 h-5 text-gray-700" aria-hidden="true" />
        </button>
        <div className="text-sm font-semibold text-gray-900">Admin Panel</div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        {/* Search - Hidden on mobile */}
        <button 
          className="hidden sm:flex p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          aria-label="Search"
          type="button"
        >
          <Search className="w-5 h-5 text-gray-600" aria-hidden="true" />
        </button>
        
        {/* Notifications */}
        <button 
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 relative"
          aria-label="View notifications"
          type="button"
        >
          <Bell className="w-5 h-5 text-gray-600" aria-hidden="true" />
          {/* Notification badge */}
          <span 
            className="absolute -top-0 -right-0 w-2 h-2 bg-red-500 rounded-full"
            aria-label="You have new notifications"
          ></span>
        </button>
        
        {/* User Avatar with Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            aria-label="Open user menu"
            aria-expanded={showProfileMenu}
            aria-haspopup="true"
            type="button"
          >
            <User className="w-4 h-4 text-gray-600" aria-hidden="true" />
            <span className="sr-only">User profile</span>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {/* Account Settings */}
                <button
                  onClick={handleAccountSettings}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
                  role="menuitem"
                >
                  <Settings className="w-4 h-4 mr-3 text-gray-500" aria-hidden="true" />
                  Account Settings
                </button>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 focus:outline-none focus:bg-red-50 transition-colors"
                  role="menuitem"
                >
                  <LogOut className="w-4 h-4 mr-3 text-red-500" aria-hidden="true" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
