"use client";
import { useState } from 'react';
import { Check, X, Loader2 } from 'lucide-react';

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'sm', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
};

// Toast Notification Component
export const Toast = ({ message, type = 'success', onClose }) => {
  const typeClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 border rounded-lg shadow-lg ${typeClasses[type]}`}>
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Confirmation Dialog Component
export const ConfirmDialog = ({ 
  isOpen, 
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm, 
  onCancel,
  type = 'warning' 
}) => {
  if (!isOpen) return null;

  const typeClasses = {
    warning: 'text-yellow-600 bg-yellow-100',
    danger: 'text-red-600 bg-red-100',
    info: 'text-blue-600 bg-blue-100'
  };

  const buttonClasses = {
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    danger: 'bg-red-600 hover:bg-red-700',
    info: 'bg-blue-600 hover:bg-blue-700'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onCancel}></div>
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${typeClasses[type]}`}>
              <span className="text-lg font-semibold">!</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">{message}</p>
          
          <div className="flex space-x-3">
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg ${buttonClasses[type]} focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {confirmText}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Edit Modal Component
export const EditModal = ({ 
  isOpen, 
  title, 
  onClose, 
  onSave, 
  children,
  isLoading = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-2xl p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="px-6 py-4">
            {children}
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form Input Component
export const FormInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error = null,
  className = '' 
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// Form Select Component
export const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  required = false,
  error = null,
  className = '' 
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// Toggle Switch Component
export const ToggleSwitch = ({ 
  label, 
  checked, 
  onChange, 
  description = null 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
};

// Action Button Component
export const ActionButton = ({ 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled = false,
  isLoading = false,
  className = '' 
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        flex items-center rounded-lg font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
};

// Table Component
export const DataTable = ({ 
  headers, 
  data, 
  onEdit, 
  onDelete, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cell}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <ActionButton
                    onClick={() => onEdit(row)}
                    variant="outline"
                    size="sm"
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    onClick={() => onDelete(row)}
                    variant="danger"
                    size="sm"
                  >
                    Delete
                  </ActionButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
