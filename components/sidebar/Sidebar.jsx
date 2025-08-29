"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NAV } from "./navConfig";
import { useEffect, useRef } from "react";

export default function Sidebar({ onClickLink, onClose, isOpen }) {
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus management for mobile sidebar
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && onClose) {
      onClose();
    }
  };

  return (
    <aside 
      ref={sidebarRef}
      className="w-64 min-h-screen flex flex-col"
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      {/* Logo */}
      <header className="h-20 flex items-center justify-between px-6 border-b border-white/10">
        <div className="flex items-center">
          <div 
            className="h-10 w-10 rounded-md bg-slate-800 mr-3" 
            role="img"
            aria-label="DeliveryPro logo"
          />
          <div className="text-white font-semibold" id="app-title">DeliveryPro</div>
        </div>
        {onClose && (
          <button 
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label="Close navigation menu"
            type="button"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </header>

      {/* Nav Links */}
      <nav className="p-4 flex-1" role="navigation" aria-label="Primary navigation">
        <ul className="space-y-1" role="list">
          {NAV.map((item, index) => {
            const Icon = item.icon;
            const active =
              item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

            return (
              <li key={item.href} role="listitem">
                <Link
                  href={item.href}
                  onClick={() => {
                    onClickLink?.();
                    onClose?.();
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    active
                      ? "bg-gray-800 text-white border-l-4 border-blue-500 font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700"
                  }`}
                  aria-current={active ? "page" : undefined}
                  role="menuitem"
                  tabIndex={0}
                >
                  <Icon 
                    className="w-5 h-5 flex-shrink-0" 
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.label}</span>
                  {active && (
                    <span className="sr-only"> (current page)</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Version Pill */}
      <footer className="px-4 py-3 border-t border-white/10">
        <div 
          className="text-xs text-gray-400"
          role="contentinfo"
          aria-label="Application version"
        >
          <span className="sr-only">Version </span>v1.0.0
        </div>
      </footer>
    </aside>
  );
}
