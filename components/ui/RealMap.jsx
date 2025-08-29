"use client";
import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, RotateCcw, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

export default function RealMap({ 
  pickup, 
  drop, 
  currentLocation, 
  driverName = "Driver",
  height = "h-96",
  showControls = true,
  showRoute = true,
  className = "" 
}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [leaflet, setLeaflet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef([]);
  const routeRef = useRef(null);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const loadLeaflet = async () => {
      try {
        const L = await import('leaflet');
        
        // Fix for default markers in Leaflet with Next.js
        delete L.default.Icon.Default.prototype._getIconUrl;
        L.default.Icon.Default.mergeOptions({
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });

        setLeaflet(L.default);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load Leaflet:', error);
        setIsLoading(false);
      }
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    if (!leaflet || !mapRef.current || map) return;

    // Ensure the DOM element is fully ready
    const mapContainer = mapRef.current;
    if (!mapContainer || !mapContainer.parentNode) return;

    // Clear any existing content in the container
    mapContainer.innerHTML = '';

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        // Default to Bangalore coordinates if no locations provided
        const defaultCenter = pickup?.coordinates || [12.9716, 77.5946];
        
        const mapInstance = leaflet.map(mapContainer, {
          center: defaultCenter,
          zoom: 13,
          zoomControl: false, // We'll add custom controls
        });

        // Add tile layer (OpenStreetMap)
        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(mapInstance);

        setMap(mapInstance);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (map) {
        try {
          map.remove();
        } catch (error) {
          console.error('Error removing map:', error);
        }
      }
    };
  }, [leaflet, pickup]);

  useEffect(() => {
    if (!map || !leaflet || !mapRef.current) return;

    try {
      // Clear existing markers and routes
      markersRef.current.forEach(marker => {
        if (map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      });
      markersRef.current = [];
      if (routeRef.current && map.hasLayer(routeRef.current)) {
        map.removeLayer(routeRef.current);
        routeRef.current = null;
      }
    } catch (error) {
      console.error('Error clearing map layers:', error);
      return;
    }

    const bounds = leaflet.latLngBounds();

    // Create custom icons
    const pickupIcon = leaflet.divIcon({
      html: `<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white">P</div>`,
      className: 'custom-pickup-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const dropIcon = leaflet.divIcon({
      html: `<div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white">D</div>`,
      className: 'custom-drop-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const driverIcon = leaflet.divIcon({
      html: `<div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white animate-pulse">${driverName.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>`,
      className: 'custom-driver-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    // Add pickup marker
    if (pickup?.coordinates) {
      const pickupMarker = leaflet.marker(pickup.coordinates, { icon: pickupIcon })
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h4 class="font-semibold text-green-600">Pickup Location</h4>
            <p class="text-sm">${pickup.address}</p>
            ${pickup.landmark ? `<p class="text-xs text-gray-500">${pickup.landmark}</p>` : ''}
          </div>
        `);
      markersRef.current.push(pickupMarker);
      bounds.extend(pickup.coordinates);
    }

    // Add drop marker
    if (drop?.coordinates) {
      const dropMarker = leaflet.marker(drop.coordinates, { icon: dropIcon })
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h4 class="font-semibold text-red-600">Drop Location</h4>
            <p class="text-sm">${drop.address}</p>
            ${drop.landmark ? `<p class="text-xs text-gray-500">${drop.landmark}</p>` : ''}
          </div>
        `);
      markersRef.current.push(dropMarker);
      bounds.extend(drop.coordinates);
    }

    // Add current location marker
    if (currentLocation?.coordinates) {
      const currentMarker = leaflet.marker(currentLocation.coordinates, { icon: driverIcon })
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h4 class="font-semibold text-blue-600">${driverName}</h4>
            <p class="text-sm">${currentLocation.address || 'Current Location'}</p>
            <p class="text-xs text-gray-500">Last updated: ${currentLocation.lastUpdated || 'just now'}</p>
          </div>
        `);
      markersRef.current.push(currentMarker);
      bounds.extend(currentLocation.coordinates);
    }

    // Draw route if requested and we have pickup/drop locations
    if (showRoute && pickup?.coordinates && drop?.coordinates) {
      const routeCoordinates = [pickup.coordinates];
      
      // Add current location to route if available
      if (currentLocation?.coordinates) {
        routeCoordinates.push(currentLocation.coordinates);
      }
      
      routeCoordinates.push(drop.coordinates);

      // Create a simple polyline (in a real app, you'd use a routing service)
      routeRef.current = leaflet.polyline(routeCoordinates, {
        color: '#3B82F6',
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10',
      }).addTo(map);
    }

    // Fit map to show all markers
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }

  }, [map, leaflet, pickup, drop, currentLocation, driverName, showRoute]);

  const handleZoomIn = () => {
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    if (map) map.zoomOut();
  };

  const handleRecenter = () => {
    if (map && leaflet) {
      const bounds = leaflet.latLngBounds();
      markersRef.current.forEach(marker => {
        bounds.extend(marker.getLatLng());
      });
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  };

  const handleFullscreen = () => {
    if (mapRef.current) {
      if (mapRef.current.requestFullscreen) {
        mapRef.current.requestFullscreen();
      }
    }
  };

  if (isLoading) {
    return (
      <div className={`relative bg-gray-100 rounded-xl ${height} overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className={`relative bg-gray-100 rounded-xl ${height} overflow-hidden`}
        style={{ zIndex: 1 }}
      />

      {/* Map Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleRecenter}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            title="Recenter Map"
          >
            <RotateCcw className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleFullscreen}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            title="Fullscreen"
          >
            <Maximize className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg p-3 shadow-md">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Pickup</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Drop</span>
          </div>
          {currentLocation && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-700">Live Location</span>
            </div>
          )}
        </div>
      </div>

      {/* CSS for Leaflet */}
      <style jsx global>{`
        @import url('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');
        
        .custom-pickup-marker,
        .custom-drop-marker,
        .custom-driver-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
        
        .leaflet-popup-content {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
