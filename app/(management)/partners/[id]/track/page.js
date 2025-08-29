"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Navigation, Phone } from "lucide-react";
import MapWrapper from '@/components/ui/MapWrapper';
import ThreeDotMenu from "@/components/ui/ThreeDotMenu";

// Mock tracking data
const mockTrackingData = {
  'PTR-1001': {
    id: 'PTR-1001',
    name: 'Ravi Kumar',
    phone: '+91 9876543210',
    currentLocation: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'MG Road, Bangalore',
      lastUpdated: '2 min ago'
    },
    status: 'Active',
    isOnline: true,
    currentTrip: {
      id: 'TRP-005',
      customer: 'Sana Prakash',
      pickup: 'HSR Layout',
      drop: 'MG Road',
      status: 'In Transit',
      eta: '15 min'
    },
    todayStats: {
      tripsCompleted: 8,
      hoursActive: '6h 30m',
      earnings: '₹1,250'
    }
  }
};

export default function PartnerTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const partnerId = params.id;
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    // Simulate loading tracking data
    setTrackingData(mockTrackingData[partnerId] || mockTrackingData['PTR-1001']);
  }, [partnerId]);

  if (!trackingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tracking data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Track Driver — {trackingData.name}
              </h1>
              <p className="text-sm text-gray-600">
                Live tracking • Last updated {trackingData.currentLocation.lastUpdated}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              trackingData.isOnline 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                trackingData.isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              {trackingData.isOnline ? 'Online' : 'Offline'}
            </div>
            <button 
              onClick={() => window.open(`tel:${trackingData.phone}`)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Driver
            </button>
            
            <ThreeDotMenu
              type="partner"
              itemId={trackingData.id}
              itemData={trackingData}
              onAction={(action, data) => {
                console.log('Partner action:', action, data);
                // Handle various actions
                switch (action) {
                  case 'call':
                    window.open(`tel:${trackingData.phone}`);
                    break;
                  case 'message':
                    alert('Send message functionality would be implemented here');
                    break;
                  case 'suspend':
                    if (confirm('Are you sure you want to suspend this partner?')) {
                      alert('Partner suspension functionality would be implemented here');
                    }
                    break;
                  case 'report':
                    alert('Report issue functionality would be implemented here');
                    break;
                  default:
                    alert(`${action} functionality would be implemented here`);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Live Tracking Map</h3>
                <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg hover:bg-blue-200">
                  Refresh
                </button>
              </div>
              
              {/* Real Map Component */}
              <MapWrapper
                pickup={trackingData.currentTrip && {
                  address: trackingData.currentTrip.pickup,
                  coordinates: [12.9352, 77.6245] // Mock coordinates for pickup
                }}
                drop={trackingData.currentTrip && {
                  address: trackingData.currentTrip.drop,
                  coordinates: [12.9716, 77.5946] // Mock coordinates for drop
                }}
                currentLocation={{
                  coordinates: [trackingData.currentLocation.lat, trackingData.currentLocation.lng],
                  address: trackingData.currentLocation.address,
                  lastUpdated: trackingData.currentLocation.lastUpdated
                }}
                driverName={trackingData.name}
                height="h-96"
                showControls={true}
                showRoute={trackingData.currentTrip ? true : false}
              />
              
              {/* Location Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Current Location</p>
                    <p className="text-sm text-gray-600">{trackingData.currentLocation.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Trip */}
            {trackingData.currentTrip && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Trip</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Trip ID</span>
                    <span className="text-sm font-medium text-gray-900">{trackingData.currentTrip.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Customer</span>
                    <span className="text-sm font-medium text-gray-900">{trackingData.currentTrip.customer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                      {trackingData.currentTrip.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ETA</span>
                    <span className="text-sm font-medium text-gray-900">{trackingData.currentTrip.eta}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-900">{trackingData.currentTrip.pickup}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-900">{trackingData.currentTrip.drop}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Today's Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trips Completed</span>
                  <span className="text-lg font-bold text-gray-900">{trackingData.todayStats.tripsCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hours Active</span>
                  <span className="text-lg font-bold text-gray-900">{trackingData.todayStats.hoursActive}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Earnings</span>
                  <span className="text-lg font-bold text-green-600">{trackingData.todayStats.earnings}</span>
                </div>
              </div>
            </div>

            {/* Driver Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">
                      {trackingData.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{trackingData.name}</p>
                    <p className="text-sm text-gray-600">{trackingData.phone}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="text-sm font-medium text-gray-900">{trackingData.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
