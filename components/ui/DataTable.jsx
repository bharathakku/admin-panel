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
  className = ""
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
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            
            {filterable && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
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
                    <KebabMenu orderId={row.id} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
