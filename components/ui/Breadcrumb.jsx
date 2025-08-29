"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

// Route mappings for better breadcrumb labels
const routeLabels = {
  '': 'Dashboard',
  'orders': 'Orders',
  'customers': 'Customers', 
  'drivers': 'Drivers',
  'partners': 'Partners',
  'payments': 'Payments',
  'settings': 'Settings',
  'analytics': 'Analytics',
  'reports': 'Reports',
  'tracking': 'Tracking',
  'support': 'Support',
  'notifications': 'Notifications',
  'reviews': 'Reviews'
};

// Route group context for better organization
const routeGroups = {
  'orders': 'Management',
  'customers': 'Management',
  'drivers': 'Management', 
  'partners': 'Management',
  'payments': 'Management',
  'settings': 'Management',
  'analytics': 'Analytics',
  'reports': 'Analytics',
  'tracking': 'Analytics',
  'support': 'Support',
  'notifications': 'Support',
  'reviews': 'Support'
};

export default function Breadcrumb({ customPaths = [], className = "" }) {
  const pathname = usePathname();
  
  // Generate breadcrumb paths
  const generateBreadcrumbs = () => {
    if (customPaths.length > 0) {
      return customPaths;
    }
    
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', href: '/', isHome: true }];
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Skip route group segments (wrapped in parentheses)
      if (segment.startsWith('(') && segment.endsWith(')')) {
        return;
      }
      
      const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      const isLast = index === segments.length - 1;
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isLast,
        group: routeGroups[segment]
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs for dashboard only
  }

  return (
    <nav 
      className={`flex items-center space-x-1 text-sm mb-6 ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <ol className="flex items-center space-x-1" role="list">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center" role="listitem">
            {index > 0 && (
              <ChevronRight 
                className="w-4 h-4 text-gray-400 mx-2" 
                aria-hidden="true"
              />
            )}
            
            {crumb.isLast ? (
              <span 
                className="font-medium text-gray-900"
                aria-current="page"
              >
                {crumb.isHome && <Home className="w-4 h-4 mr-1 inline" aria-hidden="true" />}
                {crumb.label}
              </span>
            ) : (
              <Link 
                href={crumb.href}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm px-1"
                aria-label={`Navigate to ${crumb.label}`}
              >
                {crumb.isHome && <Home className="w-4 h-4 mr-1" aria-hidden="true" />}
                {crumb.label}
              </Link>
            )}
            
            {crumb.group && !crumb.isLast && (
              <span className="text-xs text-gray-400 ml-1">
                ({crumb.group})
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Advanced breadcrumb component with custom styling
export function BreadcrumbWithActions({ 
  customPaths = [], 
  actions = null, 
  className = "",
  showGroup = true 
}) {
  const pathname = usePathname();
  
  const generateBreadcrumbs = () => {
    if (customPaths.length > 0) {
      return customPaths;
    }
    
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', href: '/', isHome: true }];
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Skip route group segments
      if (segment.startsWith('(') && segment.endsWith(')')) {
        return;
      }
      
      const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      const isLast = index === segments.length - 1;
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isLast,
        group: routeGroups[segment]
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <nav aria-label="Breadcrumb navigation">
        <ol className="flex items-center space-x-1" role="list">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center" role="listitem">
              {index > 0 && (
                <ChevronRight 
                  className="w-4 h-4 text-gray-400 mx-2" 
                  aria-hidden="true"
                />
              )}
              
              <div className="flex flex-col">
                {crumb.isLast ? (
                  <span 
                    className="font-semibold text-gray-900 text-lg"
                    aria-current="page"
                  >
                    {crumb.isHome && <Home className="w-5 h-5 mr-2 inline" aria-hidden="true" />}
                    {crumb.label}
                  </span>
                ) : (
                  <Link 
                    href={crumb.href}
                    className="flex items-center text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm px-1"
                    aria-label={`Navigate to ${crumb.label}`}
                  >
                    {crumb.isHome && <Home className="w-4 h-4 mr-1" aria-hidden="true" />}
                    {crumb.label}
                  </Link>
                )}
                
                {crumb.group && showGroup && !crumb.isHome && (
                  <span className="text-xs text-gray-400 mt-0.5">
                    {crumb.group}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
      
      {actions && (
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      )}
    </div>
  );
}
