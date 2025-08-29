"use client";
import React, { useState } from "react";
import { Check, X, Save, RotateCcw, Users, Shield, AlertCircle, MoreVertical, ChevronDown } from "lucide-react";

export default function RolePermissionsMatrix({ 
  permissions = [],
  roles = ['Viewer', 'Operator', 'Manager', 'Owner'],
  onPermissionsChange,
  onSave,
  className = ""
}) {
  const [permissionMatrix, setPermissionMatrix] = useState(() => {
    // Initialize with default permissions or provided data
    const defaultPermissions = [
      { scope: 'Orders: Read', viewer: true, operator: true, manager: true, owner: true },
      { scope: 'Orders: Write', viewer: false, operator: true, manager: true, owner: true },
      { scope: 'Orders: Delete', viewer: false, operator: false, manager: true, owner: true },
      { scope: 'Partners: Read', viewer: true, operator: true, manager: true, owner: true },
      { scope: 'Partners: Write', viewer: false, operator: true, manager: true, owner: true },
      { scope: 'Partners: Delete', viewer: false, operator: false, manager: true, owner: true },
      { scope: 'Customers: Read', viewer: true, operator: true, manager: true, owner: true },
      { scope: 'Customers: Write', viewer: false, operator: false, manager: true, owner: true },
      { scope: 'Zones: Read', viewer: true, operator: true, manager: true, owner: true },
      { scope: 'Zones: Write', viewer: false, operator: true, manager: true, owner: true },
      { scope: 'Zones: Delete', viewer: false, operator: false, manager: true, owner: true },
      { scope: 'Pricing: Read', viewer: true, operator: true, manager: true, owner: true },
      { scope: 'Pricing: Write', viewer: false, operator: false, manager: true, owner: true },
      { scope: 'Settings: Read', viewer: true, operator: true, manager: true, owner: true },
      { scope: 'Settings: Write', viewer: false, operator: false, manager: false, owner: true },
      { scope: 'Reports: Read', viewer: true, operator: true, manager: true, owner: true },
      { scope: 'Reports: Export', viewer: false, operator: false, manager: true, owner: true },
      { scope: 'Billing: Read', viewer: false, operator: true, manager: true, owner: true },
      { scope: 'Billing: Write', viewer: false, operator: false, manager: false, owner: true },
      { scope: 'Audit: Read', viewer: false, operator: false, manager: true, owner: true },
      { scope: 'Security: Manage', viewer: false, operator: false, manager: false, owner: true },
      { scope: 'Users: Manage', viewer: false, operator: false, manager: false, owner: true }
    ];
    
    return permissions.length > 0 ? permissions : defaultPermissions;
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const togglePermission = (index, role) => {
    setPermissionMatrix(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [role.toLowerCase()]: !updated[index][role.toLowerCase()]
      };
      return updated;
    });
    setHasChanges(true);
    onPermissionsChange?.(permissionMatrix);
  };

  const toggleAllForRole = (role) => {
    const allEnabled = permissionMatrix.every(p => p[role.toLowerCase()]);
    
    setPermissionMatrix(prev => 
      prev.map(permission => ({
        ...permission,
        [role.toLowerCase()]: !allEnabled
      }))
    );
    setHasChanges(true);
  };

  const toggleAllForScope = (index) => {
    const permission = permissionMatrix[index];
    const allRolesEnabled = roles.every(role => permission[role.toLowerCase()]);
    
    setPermissionMatrix(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        ...roles.reduce((acc, role) => ({
          ...acc,
          [role.toLowerCase()]: !allRolesEnabled
        }), {})
      };
      return updated;
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.(permissionMatrix);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save permissions:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetChanges = () => {
    setPermissionMatrix(permissions.length > 0 ? permissions : permissionMatrix);
    setHasChanges(false);
  };

  const getScopeCategory = (scope) => {
    return scope.split(':')[0];
  };

  const groupedPermissions = permissionMatrix.reduce((groups, permission, index) => {
    const category = getScopeCategory(permission.scope);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push({ ...permission, originalIndex: index });
    return groups;
  }, {});

  const getCategoryIcon = (category) => {
    const icons = {
      'Orders': '📋',
      'Partners': '🤝',
      'Customers': '👥',
      'Zones': '🗺️',
      'Pricing': '💰',
      'Settings': '⚙️',
      'Reports': '📊',
      'Billing': '💳',
      'Audit': '🔍',
      'Security': '🔒',
      'Users': '👤'
    };
    return icons[category] || '📝';
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Responsive Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Role & Permissions Matrix
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Configure granular permissions for each role level
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {hasChanges && (
              <button
                onClick={resetChanges}
                className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              >
                Reset
              </button>
            )}
            
            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 lg:px-6 py-3 text-left text-sm font-medium text-gray-700">
                Permission Scope
              </th>
              {roles.map(role => (
                <th key={role} className="px-2 lg:px-4 py-3 text-center text-sm font-medium text-gray-700 w-20 lg:w-24">
                  <div className="flex flex-col items-center">
                    <span className="text-xs lg:text-sm">{role}</span>
                    <button
                      onClick={() => toggleAllForRole(role)}
                      className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                    >
                      Toggle All
                    </button>
                  </div>
                </th>
              ))}
              <th className="px-2 lg:px-4 py-3 text-center text-sm font-medium text-gray-700 w-16 lg:w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
              <React.Fragment key={category}>
                {/* Category Header */}
                <tr className="bg-blue-50">
                  <td colSpan={roles.length + 2} className="px-4 lg:px-6 py-2">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getCategoryIcon(category)}</span>
                      <span className="font-medium text-gray-900">{category}</span>
                      <span className="ml-2 text-xs text-gray-500">({categoryPermissions.length} permissions)</span>
                    </div>
                  </td>
                </tr>
                
                {/* Category Permissions */}
                {categoryPermissions.map((permission, idx) => (
                  <tr key={permission.originalIndex} className="hover:bg-gray-50">
                    <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                      <span className="ml-4">{permission.scope.split(': ')[1]}</span>
                    </td>
                    
                    {roles.map(role => (
                      <td key={role} className="px-2 lg:px-4 py-3 text-center">
                        <button
                          onClick={() => togglePermission(permission.originalIndex, role)}
                          className={`w-6 lg:w-7 h-6 lg:h-7 rounded-lg transition-all duration-150 flex items-center justify-center ${
                            permission[role.toLowerCase()]
                              ? 'bg-blue-500 text-white hover:bg-blue-600'
                              : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                          }`}
                        >
                          {permission[role.toLowerCase()] ? (
                            <Check className="w-3 lg:w-4 h-3 lg:h-4" />
                          ) : (
                            <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-current opacity-50"></div>
                          )}
                        </button>
                      </td>
                    ))}
                    
                    <td className="px-2 lg:px-4 py-3 text-center">
                      <button
                        onClick={() => toggleAllForScope(permission.originalIndex)}
                        className="text-xs text-blue-600 hover:text-blue-800 px-1 lg:px-2 py-1 hover:bg-blue-50 rounded"
                      >
                        Toggle
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {/* Mobile Role Toggle Bar */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-3">Quick Role Actions:</div>
          <div className="grid grid-cols-2 gap-2">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => toggleAllForRole(role)}
                className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-center"
              >
                Toggle All {role}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Category Cards */}
        <div className="divide-y divide-gray-200">
          {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
            <div key={category} className="p-4">
              {/* Category Header */}
              <div className="flex items-center mb-4">
                <span className="text-lg mr-2">{getCategoryIcon(category)}</span>
                <span className="font-medium text-gray-900">{category}</span>
                <span className="ml-2 text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
                  {categoryPermissions.length}
                </span>
              </div>
              
              {/* Permission Cards */}
              <div className="space-y-3">
                {categoryPermissions.map((permission, idx) => (
                  <div key={permission.originalIndex} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-900">
                        {permission.scope.split(': ')[1]}
                      </span>
                      <button
                        onClick={() => toggleAllForScope(permission.originalIndex)}
                        className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 bg-white rounded border"
                      >
                        Toggle All
                      </button>
                    </div>
                    
                    {/* Role Checkboxes */}
                    <div className="grid grid-cols-2 gap-3">
                      {roles.map(role => (
                        <div key={role} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{role}</span>
                          <button
                            onClick={() => togglePermission(permission.originalIndex, role)}
                            className={`w-7 h-7 rounded-lg transition-all duration-150 flex items-center justify-center ${
                              permission[role.toLowerCase()]
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                            }`}
                          >
                            {permission[role.toLowerCase()] ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></div>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {roles.map(role => {
            const enabledCount = permissionMatrix.filter(p => p[role.toLowerCase()]).length;
            const totalCount = permissionMatrix.length;
            const percentage = Math.round((enabledCount / totalCount) * 100);
            
            return (
              <div key={role} className="">
                <div className="text-lg font-bold text-gray-900">{enabledCount}/{totalCount}</div>
                <div className="text-xs text-gray-500">{role}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Changes Warning */}
      {hasChanges && (
        <div className="px-6 py-3 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-yellow-800">
                You have unsaved changes
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={resetChanges}
                className="px-3 py-1 text-xs border border-yellow-300 text-yellow-700 rounded hover:bg-yellow-100"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
