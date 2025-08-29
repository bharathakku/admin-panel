"use client";
import { useState, useEffect } from "react";
import { X, ChevronDown, Calendar, DollarSign, Filter } from "lucide-react";

export default function FilterPanel({ 
  filters = [], 
  onFiltersChange, 
  isVisible, 
  onClose 
}) {
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    onFiltersChange?.(activeFilters);
  }, [activeFilters, onFiltersChange]);

  const handleFilterChange = (filterId, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const clearFilter = (filterId) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterId];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  if (!isVisible) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filters.map((filter) => (
          <FilterField
            key={filter.id}
            filter={filter}
            value={activeFilters[filter.id]}
            onChange={(value) => handleFilterChange(filter.id, value)}
            onClear={() => clearFilter(filter.id)}
          />
        ))}
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).map(([filterId, value]) => {
                const filter = filters.find(f => f.id === filterId);
                if (!filter || !value) return null;
                
                const displayValue = Array.isArray(value) 
                  ? value.join(', ')
                  : typeof value === 'object' && value.label
                  ? value.label
                  : String(value);

                return (
                  <span
                    key={filterId}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {filter.label}: {displayValue}
                    <button
                      onClick={() => clearFilter(filterId)}
                      className="ml-2 hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterField({ filter, value, onChange, onClear }) {
  const renderFilter = () => {
    switch (filter.type) {
      case 'select':
        return (
          <SelectFilter
            filter={filter}
            value={value}
            onChange={onChange}
          />
        );
      
      case 'multiselect':
        return (
          <MultiSelectFilter
            filter={filter}
            value={value}
            onChange={onChange}
          />
        );
      
      case 'daterange':
        return (
          <DateRangeFilter
            filter={filter}
            value={value}
            onChange={onChange}
          />
        );
      
      case 'range':
        return (
          <RangeFilter
            filter={filter}
            value={value}
            onChange={onChange}
          />
        );
      
      case 'text':
        return (
          <TextFilter
            filter={filter}
            value={value}
            onChange={onChange}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {filter.label}
        </label>
        {value && (
          <button
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>
      {renderFilter()}
    </div>
  );
}

function SelectFilter({ filter, value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
      >
        <option value="">All {filter.label}</option>
        {filter.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

function MultiSelectFilter({ filter, value = [], onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue.length > 0 ? newValue : null);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left flex items-center justify-between"
      >
        <span className="truncate">
          {value.length > 0 
            ? `${value.length} selected`
            : `Select ${filter.label}`
          }
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filter.options?.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => toggleOption(option.value)}
                className="mr-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function DateRangeFilter({ filter, value, onChange }) {
  const [startDate, setStartDate] = useState(value?.start || '');
  const [endDate, setEndDate] = useState(value?.end || '');

  const handleDateChange = (start, end) => {
    if (start || end) {
      onChange({ start, end });
    } else {
      onChange(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-2">
        <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              handleDateChange(e.target.value, endDate);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Start date"
          />
        </div>
        <div className="relative">
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              handleDateChange(startDate, e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="End date"
          />
        </div>
      </div>
    </div>
  );
}

function RangeFilter({ filter, value, onChange }) {
  const [min, setMin] = useState(value?.min || '');
  const [max, setMax] = useState(value?.max || '');

  const handleRangeChange = (newMin, newMax) => {
    if (newMin || newMax) {
      onChange({ 
        min: newMin ? parseFloat(newMin) : null,
        max: newMax ? parseFloat(newMax) : null
      });
    } else {
      onChange(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          value={min}
          onChange={(e) => {
            setMin(e.target.value);
            handleRangeChange(e.target.value, max);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`Min ${filter.unit || ''}`}
        />
        <input
          type="number"
          value={max}
          onChange={(e) => {
            setMax(e.target.value);
            handleRangeChange(min, e.target.value);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`Max ${filter.unit || ''}`}
        />
      </div>
    </div>
  );
}

function TextFilter({ filter, value, onChange }) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value || null)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder={filter.placeholder || `Enter ${filter.label.toLowerCase()}`}
    />
  );
}
