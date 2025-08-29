"use client";
import { useState, useEffect, useRef } from "react";
import { MapPin, Plus, Edit2, Trash2, Merge, Save, X, AlertCircle } from "lucide-react";

// Mock map functionality (replace with actual map library)
export default function CoverageMap({ 
  zones = [], 
  onZonesChange, 
  onZoneCreate, 
  onZoneUpdate, 
  onZoneDelete, 
  onZonesMerge,
  className = "" 
}) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [selectedZones, setSelectedZones] = useState([]);
  const [currentZone, setCurrentZone] = useState(null);
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [zoneForm, setZoneForm] = useState({
    name: '',
    priority: 'Medium',
    city: '',
    description: ''
  });
  const mapRef = useRef(null);

  // Mock coordinates for Bangalore areas
  const mockZones = [
    {
      id: 1,
      name: "Koramangala",
      city: "Bengaluru",
      priority: "High",
      status: "Active",
      coordinates: [
        { lat: 12.9279, lng: 77.6271 },
        { lat: 12.9335, lng: 77.6356 },
        { lat: 12.9223, lng: 77.6398 },
        { lat: 12.9167, lng: 77.6313 }
      ],
      color: "#ef4444",
      area: "8.5 km²"
    },
    {
      id: 2,
      name: "Indiranagar",
      city: "Bengaluru",
      priority: "Medium",
      status: "Active",
      coordinates: [
        { lat: 12.9716, lng: 77.6412 },
        { lat: 12.9772, lng: 77.6498 },
        { lat: 12.9660, lng: 77.6540 },
        { lat: 12.9604, lng: 77.6454 }
      ],
      color: "#3b82f6",
      area: "12.3 km²"
    },
    {
      id: 3,
      name: "Whitefield",
      city: "Bengaluru", 
      priority: "Low",
      status: "Active",
      coordinates: [
        { lat: 12.9698, lng: 77.7500 },
        { lat: 12.9854, lng: 77.7586 },
        { lat: 12.9542, lng: 77.7628 },
        { lat: 12.9486, lng: 77.7542 }
      ],
      color: "#22c55e",
      area: "15.7 km²"
    }
  ];

  const [mapZones, setMapZones] = useState(mockZones);

  // Drawing functionality
  const startDrawing = () => {
    setIsDrawing(true);
    setIsMerging(false);
    setSelectedZones([]);
  };

  const startMerging = () => {
    setIsMerging(true);
    setIsDrawing(false);
    setSelectedZones([]);
  };

  const handleZoneClick = (zone) => {
    if (isMerging) {
      setSelectedZones(prev => {
        const isSelected = prev.some(z => z.id === zone.id);
        if (isSelected) {
          return prev.filter(z => z.id !== zone.id);
        } else {
          return [...prev, zone];
        }
      });
    } else {
      setCurrentZone(zone);
    }
  };

  const handleMapClick = (e) => {
    if (isDrawing) {
      // Start drawing a new zone
      setShowZoneForm(true);
      setZoneForm({
        name: '',
        priority: 'Medium',
        city: 'Bengaluru',
        description: ''
      });
    }
  };

  const saveNewZone = () => {
    if (!zoneForm.name.trim()) return;
    
    const newZone = {
      id: Date.now(),
      name: zoneForm.name,
      city: zoneForm.city,
      priority: zoneForm.priority,
      status: "Active",
      coordinates: [
        // Mock coordinates - in real implementation, use drawing tool coordinates
        { lat: 12.9716 + Math.random() * 0.1, lng: 77.6412 + Math.random() * 0.1 },
        { lat: 12.9772 + Math.random() * 0.1, lng: 77.6498 + Math.random() * 0.1 },
        { lat: 12.9660 + Math.random() * 0.1, lng: 77.6540 + Math.random() * 0.1 },
        { lat: 12.9604 + Math.random() * 0.1, lng: 77.6454 + Math.random() * 0.1 }
      ],
      color: getRandomColor(),
      area: `${(Math.random() * 10 + 5).toFixed(1)} km²`
    };

    setMapZones(prev => [...prev, newZone]);
    onZoneCreate?.(newZone);
    setShowZoneForm(false);
    setIsDrawing(false);
    setZoneForm({ name: '', priority: 'Medium', city: '', description: '' });
  };

  const mergeSelectedZones = () => {
    if (selectedZones.length < 2) return;
    
    const mergedZone = {
      id: Date.now(),
      name: selectedZones.map(z => z.name).join(" + "),
      city: selectedZones[0].city,
      priority: "High",
      status: "Active",
      coordinates: selectedZones[0].coordinates, // Use first zone's coordinates
      color: getRandomColor(),
      area: `${selectedZones.reduce((sum, z) => sum + parseFloat(z.area), 0).toFixed(1)} km²`
    };

    // Remove selected zones and add merged zone
    setMapZones(prev => [
      ...prev.filter(z => !selectedZones.some(sz => sz.id === z.id)),
      mergedZone
    ]);
    
    onZonesMerge?.(selectedZones, mergedZone);
    setSelectedZones([]);
    setIsMerging(false);
  };

  const deleteZone = (zoneId) => {
    setMapZones(prev => prev.filter(z => z.id !== zoneId));
    onZoneDelete?.(zoneId);
  };

  const getRandomColor = () => {
    const colors = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {/* Map Controls */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Coverage Map</h4>
        <div className="flex items-center space-x-2">
          <button 
            onClick={startDrawing}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              isDrawing 
                ? 'bg-blue-700 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isDrawing ? 'Drawing...' : 'Draw Zone'}
          </button>
          <button 
            onClick={startMerging}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              isMerging 
                ? 'bg-green-700 text-white' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isMerging ? 'Select zones...' : 'Merge Zones'}
          </button>
          {selectedZones.length > 1 && (
            <button 
              onClick={mergeSelectedZones}
              className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Merge ({selectedZones.length})
            </button>
          )}
        </div>
      </div>

      {/* Map Canvas */}
      <div 
        ref={mapRef}
        className="h-96 bg-gray-100 relative cursor-pointer overflow-hidden"
        onClick={handleMapClick}
      >
        {/* Instructions */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <p className="text-xs font-medium text-gray-700">
              {isDrawing ? 'Click to place a new zone' : 
               isMerging ? 'Click zones to select for merging' :
               'Click zones to view details'}
            </p>
          </div>
        </div>

        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
          {/* Street grid pattern */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="absolute bg-gray-300" style={{
                left: `${i * 5}%`,
                top: 0,
                bottom: 0,
                width: '1px'
              }} />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="absolute bg-gray-300" style={{
                top: `${i * 6.67}%`,
                left: 0,
                right: 0,
                height: '1px'
              }} />
            ))}
          </div>
        </div>

        {/* Rendered Zones */}
        {mapZones.map((zone) => {
          const isSelected = selectedZones.some(z => z.id === zone.id);
          return (
            <div
              key={zone.id}
              className={`absolute rounded-lg border-2 transition-all cursor-pointer ${
                isSelected 
                  ? 'border-yellow-400 shadow-lg ring-2 ring-yellow-200' 
                  : 'border-white hover:border-gray-300'
              }`}
              style={{
                backgroundColor: zone.color + '40',
                borderColor: isSelected ? '#fbbf24' : zone.color,
                top: `${20 + (zone.id * 15)}%`,
                left: `${15 + (zone.id * 20)}%`,
                width: `${Math.min(25 + zone.id * 5, 40)}%`,
                height: `${Math.min(20 + zone.id * 3, 35)}%`
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleZoneClick(zone);
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1 shadow-sm">
                  <p className="text-xs font-medium text-gray-800">{zone.name}</p>
                  <p className="text-xs text-gray-600">{zone.area}</p>
                </div>
              </div>
              
              {/* Zone controls */}
              <div className="absolute top-1 right-1 opacity-0 hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentZone(zone);
                      setShowZoneForm(true);
                      setZoneForm({
                        name: zone.name,
                        priority: zone.priority,
                        city: zone.city,
                        description: zone.description || ''
                      });
                    }}
                    className="p-1 bg-white rounded-md shadow-sm hover:bg-gray-50"
                  >
                    <Edit2 className="w-3 h-3 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteZone(zone.id);
                    }}
                    className="p-1 bg-white rounded-md shadow-sm hover:bg-gray-50"
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Center point indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="w-6 h-6 text-red-500" />
          <p className="text-xs text-gray-600 mt-1 text-center">Bengaluru</p>
        </div>
      </div>

      {/* Zone Form Modal */}
      {showZoneForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentZone ? 'Edit Zone' : 'Create New Zone'}
              </h3>
              <button
                onClick={() => {
                  setShowZoneForm(false);
                  setCurrentZone(null);
                  setIsDrawing(false);
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone Name</label>
                <input
                  type="text"
                  value={zoneForm.name}
                  onChange={(e) => setZoneForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter zone name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={zoneForm.city}
                  onChange={(e) => setZoneForm(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select City</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={zoneForm.priority}
                  onChange={(e) => setZoneForm(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={zoneForm.description}
                  onChange={(e) => setZoneForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Optional description"
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => {
                  setShowZoneForm(false);
                  setCurrentZone(null);
                  setIsDrawing(false);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={currentZone ? () => {
                  // Update existing zone
                  setMapZones(prev => prev.map(z => 
                    z.id === currentZone.id 
                      ? { ...z, ...zoneForm }
                      : z
                  ));
                  onZoneUpdate?.(currentZone.id, zoneForm);
                  setShowZoneForm(false);
                  setCurrentZone(null);
                } : saveNewZone}
                disabled={!zoneForm.name.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentZone ? 'Update Zone' : 'Create Zone'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zone Statistics */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              <span className="font-medium text-gray-900">{mapZones.length}</span> zones
            </span>
            <span className="text-gray-600">
              <span className="font-medium text-gray-900">{mapZones.filter(z => z.status === 'Active').length}</span> active
            </span>
          </div>
          {selectedZones.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-medium">
                {selectedZones.length} selected
              </span>
              {selectedZones.length > 1 && (
                <button
                  onClick={mergeSelectedZones}
                  className="flex items-center px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
                >
                  <Merge className="w-3 h-3 mr-1" />
                  Merge
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
