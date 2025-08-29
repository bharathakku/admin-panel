"use client";
import { useState } from "react";
import { Edit2, Trash2, Eye, MapPin, Plus, AlertTriangle } from "lucide-react";

export default function ZonesTable({ 
  zones = [], 
  onZoneEdit, 
  onZoneDelete, 
  onZoneView,
  onZoneToggleStatus,
  className = "" 
}) {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const confirmDelete = (zone) => {
    setDeleteConfirm(zone);
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      onZoneDelete?.(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const toggleStatus = (zone) => {
    const newStatus = zone.status === 'Active' ? 'Inactive' : 'Active';
    onZoneToggleStatus?.(zone.id, newStatus);
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Zone Management</h4>
            <p className="text-sm text-gray-500 mt-1">Manage coverage zones, priorities and settings</p>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">{zones.length}</span> total zones
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zone Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coverage
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {zones.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="text-gray-400">
                    <MapPin className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-sm">No zones configured yet</p>
                    <p className="text-xs text-gray-500 mt-1">Start by drawing zones on the map</p>
                  </div>
                </td>
              </tr>
            ) : (
              zones.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: zone.color + '30', color: zone.color }}
                        >
                          <MapPin className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {zone.name}
                        </div>
                        {zone.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {zone.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{zone.city}</div>
                    <div className="text-sm text-gray-500">Zone #{zone.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(zone.priority)}`}>
                      {zone.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(zone)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(zone.status)}`}
                    >
                      {zone.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {zone.area}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onZoneView?.(zone)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="View zone"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onZoneEdit?.(zone)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                        title="Edit zone"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(zone)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete zone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Zone Summary */}
      {zones.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="text-gray-600">
                <span className="font-medium text-green-600">{zones.filter(z => z.status === 'Active').length}</span> Active
              </div>
              <div className="text-gray-600">
                <span className="font-medium text-red-600">{zones.filter(z => z.status === 'Inactive').length}</span> Inactive
              </div>
              <div className="text-gray-600">
                <span className="font-medium text-red-600">{zones.filter(z => z.priority === 'High' || z.priority === 'Critical').length}</span> High Priority
              </div>
            </div>
            <div className="text-gray-500">
              Total Coverage: {zones.reduce((sum, z) => sum + parseFloat(z.area || 0), 0).toFixed(1)} km²
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Delete Zone</h3>
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete the zone "{deleteConfirm.name}"?
                  </p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Warning</h4>
                    <p className="text-sm text-red-700 mt-1">
                      This action cannot be undone. All zone overrides and associated data will be permanently removed.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete Zone
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
