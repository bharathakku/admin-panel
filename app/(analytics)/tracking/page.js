"use client";
import StatsCard from "@/components/ui/StatsCard";
import MapWrapper from '@/components/ui/MapWrapper';
import { MapPin, Navigation, Clock, AlertCircle } from "lucide-react";

export default function TrackingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Tracking</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring of all active deliveries</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Deliveries"
          value="42"
          change="+5"
          changeType="positive"
          icon={MapPin}
          color="blue"
        />
        <StatsCard
          title="In Transit"
          value="28"
          change="+3"
          changeType="positive"
          icon={Navigation}
          color="green"
        />
        <StatsCard
          title="Avg Delivery Time"
          value="23 min"
          change="-2 min"
          changeType="positive"
          icon={Clock}
          color="purple"
        />
        <StatsCard
          title="Delayed Orders"
          value="3"
          change="-1"
          changeType="positive"
          icon={AlertCircle}
          color="red"
        />
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Live Tracking Map</h3>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg hover:bg-blue-200">
              Refresh All
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
              Filter
            </button>
          </div>
        </div>
        
        {/* Multiple driver tracking map */}
        <MapWrapper
          pickup={{
            address: "Koramangala, Bangalore",
            coordinates: [12.9352, 77.6245]
          }}
          drop={{
            address: "MG Road, Bangalore", 
            coordinates: [12.9716, 77.5946]
          }}
          currentLocation={{
            coordinates: [12.9500, 77.6100],
            address: "Multiple drivers active",
            lastUpdated: "Live"
          }}
          driverName="42 Active Drivers"
          height="h-96"
          showControls={true}
          showRoute={false}
          className="mb-4"
        />
        
        {/* Map Legend */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Available (28)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span>In Transit (42)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>On Break (8)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>Offline (12)</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">Real-time updates • Last sync: 30 seconds ago</p>
        </div>
      </div>
    </div>
  );
}
