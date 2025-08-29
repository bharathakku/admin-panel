"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "@/components/header/Topbar";

export default function Shell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  // Handle escape key for mobile menu
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);
  const openMobileMenu = () => setMobileOpen(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" 
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          {/* Mobile Sidebar */}
          <div 
            className="fixed inset-y-0 left-0 z-50 w-64 bg-black text-gray-300 md:hidden shadow-xl transform transition-transform duration-300 ease-in-out"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div id="mobile-menu-title" className="sr-only">Navigation menu</div>
            <Sidebar 
              onClose={closeMobileMenu} 
              isOpen={mobileOpen}
            />
          </div>
        </>
      )}
      
      {/* Sidebar (desktop) */}
      <aside className="hidden md:block w-64 bg-black text-gray-300 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          onMenu={openMobileMenu} 
          mobileMenuOpen={mobileOpen}
        />
        <main 
          className="flex-1 p-4 sm:p-6 overflow-auto"
          role="main"
          aria-label="Main content"
          tabIndex={-1}
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
