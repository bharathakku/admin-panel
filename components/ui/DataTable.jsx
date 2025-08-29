"use client";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Search, Filter, X, SlidersHorizontal } from "lucide-react";
import KebabMenu from "./KebabMenu";

export default function DataTable({ 
  title, 
  description,
  columns, 
  data, 
  actions = false,
  searchable = true,
  filterable = false,
  pagination = true,
  onEdit,
  onDelete,
  onView,
  searchFields = [],
  filterOptions = {},
  className = "",
  entityType = 'order',
  entityBasePath
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  
  const itemsPerPage = 10;
  
  // Enhanced filtering logic
  const filteredData = useMemo(() => {
    let filtered = [...data];
    
    // Search filtering
    if (searchTerm) {
      const fieldsToSearch = searchFields.length > 0 ? searchFields : Object.keys(data[0] || {});
      filtered = filtered.filter(item => 
        fieldsToSearch.some(field => 
          String(item[field] || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Active filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        filtered = filtered.filter(item => {
          if (Array.isArray(value)) {
            return value.includes(item[key]);
          }
          return String(item[key]).toLowerCase() === String(value).toLowerCase();
        });
      }
    });
    
    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  }, [data, searchTerm, activeFilters, sortConfig, searchFields]);
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };
  
  // Clear filters
  const clearFilters = () => {
    setActiveFilters({});
    setSearchTerm("");
    setCurrentPage(1);
  };
  
  // Get unique values for filter options
  const getFilterOptions = (field) => {
    const values = [...new Set(data.map(item => item[field]).filter(Boolean))];
    return values.map(value => ({ label: value, value }));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="mobile-container sm:px-6 sm:py-4 border-b border-gray-100">
        <div className="mobile-header sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="mobile-header-title sm:text-lg sm:font-semibold sm:text-gray-900">{title}</h2>
            {description && (
              <p className="mobile-text-sm sm:text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          
          <div className="mobile-header-actions sm:flex sm:items-center sm:space-x-3">
            {searchable && (
              <div className="mobile-search-container sm:relative">
                <Search className="mobile-search-icon sm:absolute sm:left-3 sm:top-1/2 sm:transform sm:-translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="mobile-search-input sm:pl-10 sm:pr-4 sm:py-2 sm:border sm:border-gray-200 sm:rounded-lg sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            
            {filterable && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="mobile-btn sm:flex sm:items-center sm:px-3 sm:py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mobile-table sm:overflow-x-auto">
        <table className="w-full responsive-hide-mobile">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.label}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    <KebabMenu 
                      entityId={row.id} 
                      entityType={entityType}
                      basePath={entityBasePath}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Mobile Card View */}
        <div className="responsive-show-mobile mobile-container-tight">
          {paginatedData.map((row, rowIndex) => (
            <div key={rowIndex} className="mobile-table-card">
              {/* Card Header with primary info */}
              <div className="mobile-table-card-header">
                <div className="flex-1">
                  {columns[0] && (
                    <div className="font-semibold text-gray-900 mobile-text-wrap">
                      {columns[0].render ? columns[0].render(row[columns[0].key], row) : row[columns[0].key]}
                    </div>
                  )}
                </div>
                {actions && (
                  <div className="flex-shrink-0 ml-3">
                    <KebabMenu 
                      entityId={row.id} 
                      entityType={entityType}
                      basePath={entityBasePath}
                    />
                  </div>
                )}
              </div>
              
              {/* Card Content */}
              <div className="mobile-space-y-3">
                {columns.slice(1).map((column, colIndex) => (
                  <div key={colIndex} className="mobile-table-cell">
                    <span className="mobile-table-label">{column.label}</span>
                    <span className="mobile-table-value mobile-text-wrap">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="mobile-container sm:px-6 sm:py-3 border-t border-gray-100 mobile-stack sm:flex sm:items-center sm:justify-between">
          <div className="mobile-text-center mobile-text-sm sm:text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="mobile-touch-target p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="px-4 py-2 mobile-text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="mobile-touch-target p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
