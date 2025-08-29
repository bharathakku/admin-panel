"use client";
import { Menu, User, Bell, Search } from "lucide-react";

export default function Topbar({ onMenu, mobileMenuOpen }) {
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
        
        {/* User Avatar */}
        <button 
          className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          aria-label="Open user menu"
          type="button"
        >
          <User className="w-4 h-4 text-gray-600" aria-hidden="true" />
          <span className="sr-only">User profile</span>
        </button>
      </div>
    </header>
  );
}
