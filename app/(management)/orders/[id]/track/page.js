"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Phone, MessageSquare, Navigation, MapPin, Clock, Star, Truck } from 'lucide-react';
import MapWrapper from '@/components/ui/MapWrapper';
import ThreeDotMenu from '@/components/ui/ThreeDotMenu';

// Mock order tracking data
const mockTrackingData = {
  'ORD-912340': {
    id: 'ORD-912340',
    customer: {
      name: 'Sana Prakash',
      phone: '+91 98765 43210',
      email: 'sana.p@example.com'
    },
    pickup: {
      address: 'HSR Layout, Sector 1, Bangalore',
      landmark: 'Near Forum Mall',
      coordinates: [12.9129, 77.6367],
      time: '10:45 AM'
    },
    drop: {
      address: 'MG Road, Bangalore',
      landmark: 'Opposite Brigade Road', 
      coordinates: [12.9716, 77.5946],
      estimatedTime: '11:15 AM'
    },
    driver: {
      name: 'Ayesha Nair',
      phone: '+91 91234 56780',
      vehicle: 'KA-01-AB-1234',
      rating: 4.8,
      currentLocation: {
        coordinates: [12.9500, 77.6100],
        address: 'Koramangala, Bangalore',
        lastUpdated: '2 min ago'
      }
    },
    status: 'In Transit',
    amount: '₹245',
    estimatedTime: '15 min',
    distance: '12.5 km',
    orderType: 'Package Delivery',
    priority: 'Normal',
    timeline: [
      { status: 'Order Placed', time: '10:30 AM', completed: true },
      { status: 'Driver Assigned', time: '10:32 AM', completed: true },
      { status: 'Pickup Completed', time: '10:45 AM', completed: true },
      { status: 'In Transit', time: '10:46 AM', completed: true, current: true },
      { status: 'Delivered', time: 'Expected 11:15 AM', completed: false }
    ]
  },
  'ORD-912341': {
    id: 'ORD-912341',
    customer: {
      name: 'Priya Patel',
      phone: '+91 98765 43211',
      email: 'priya.patel@email.com'
    },
    pickup: {
      address: 'Koramangala, Bangalore',
      landmark: 'Near Sony World Junction',
      coordinates: [12.9352, 77.6245],
      time: 'Pending'
    },
    drop: {
      address: 'Whitefield, Bangalore',
      landmark: 'ITPL Main Gate',
      coordinates: [12.9698, 77.7500],
      estimatedTime: '11:00 AM'
    },
    driver: {
      name: 'Amit Kumar',
      phone: '+91 87654 32108',
      vehicle: 'KA-01-CD-5678',
      rating: 4.6,
      currentLocation: {
        coordinates: [12.9352, 77.6245],
        address: 'Koramangala, Bangalore',
        lastUpdated: '1 min ago'
      }
    },
    status: 'Assigned',
    amount: '₹380',
    estimatedTime: '35 min',
    distance: '18.2 km',
    orderType: 'Food Delivery',
    priority: 'High',
    timeline: [
      { status: 'Order Placed', time: '10:25 AM', completed: true },
      { status: 'Driver Assigned', time: '10:27 AM', completed: true, current: true },
      { status: 'Pickup Completed', time: 'Pending', completed: false },
      { status: 'In Transit', time: 'Pending', completed: false },
      { status: 'Delivered', time: 'Expected 11:00 AM', completed: false }
    ]
  }
};

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading tracking data
    const loadTrackingData = () => {
      setTimeout(() => {
        setTrackingData(mockTrackingData[orderId] || mockTrackingData['ORD-912340']);
        setIsLoading(false);
      }, 1000);
    };

    loadTrackingData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (trackingData && trackingData.status === 'In Transit') {
        setTrackingData(prev => ({
          ...prev,
          driver: {
            ...prev.driver,
            currentLocation: {
              ...prev.driver.currentLocation,
              lastUpdated: 'just now'
            }
          }
        }));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [orderId, trackingData]);

  const handleMenuAction = (action, data) => {
    console.log('Menu action:', action, data);
    // Handle various actions like call, message, etc.
    switch (action) {
      case 'call':
        if (data.target === 'customer') {
          window.open(`tel:${trackingData.customer.phone}`);
        } else if (data.target === 'driver') {
          window.open(`tel:${trackingData.driver.phone}`);
        }
        break;
      case 'message':
        // Open message modal or redirect to messaging
        alert(`Send message functionality would be implemented here`);
        break;
      case 'updateStatus':
        // Open status update modal
        alert(`Status update functionality would be implemented here`);
        break;
      case 'reassign':
        // Open driver reassignment modal
        alert(`Driver reassignment functionality would be implemented here`);
        break;
      case 'cancel':
        // Show confirmation and cancel order
        if (confirm('Are you sure you want to cancel this order?')) {
          alert(`Order cancellation functionality would be implemented here`);
        }
        break;
      default:
        alert(`${action} functionality would be implemented here`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tracking information...</p>
        </div>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">Unable to load tracking data for order {orderId}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
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
                Track Order — {trackingData.id}
              </h1>
              <p className="text-sm text-gray-600">
                Live tracking • Last updated {trackingData.driver.currentLocation.lastUpdated}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              trackingData.status === 'In Transit' 
                ? 'bg-purple-100 text-purple-800' 
                : trackingData.status === 'Assigned'
                ? 'bg-blue-100 text-blue-800'
                : trackingData.status === 'Delivered'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {trackingData.status}
            </div>
            
            <button 
              onClick={() => window.open(`tel:${trackingData.customer.phone}`)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Customer
            </button>
            
            <button 
              onClick={() => window.open(`tel:${trackingData.driver.phone}`)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Driver
            </button>
            
            <ThreeDotMenu
              type="order"
              itemId={trackingData.id}
              itemData={trackingData}
              onAction={handleMenuAction}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Live Tracking Map</h3>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg hover:bg-blue-200">
                    <Navigation className="w-4 h-4 inline mr-1" />
                    Directions
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
                    Refresh
                  </button>
                </div>
              </div>
              
        <MapWrapper
                pickup={trackingData.pickup}
                drop={trackingData.drop}
                currentLocation={trackingData.driver.currentLocation}
                driverName={trackingData.driver.name}
                height="h-[500px]"
                showControls={true}
                showRoute={true}
              />
              
              {/* Route Information */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">ETA</p>
                  <p className="text-lg font-bold text-gray-900">{trackingData.estimatedTime}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Navigation className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="text-lg font-bold text-gray-900">{trackingData.distance}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Vehicle</p>
                  <p className="text-lg font-bold text-gray-900">{trackingData.driver.vehicle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Driver Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Information</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">
                    {trackingData.driver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{trackingData.driver.name}</p>
                  <p className="text-sm text-gray-600">{trackingData.driver.phone}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{trackingData.driver.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Vehicle</span>
                  <span className="text-sm font-medium text-gray-900">{trackingData.driver.vehicle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location</span>
                  <span className="text-sm font-medium text-gray-900">
                    {trackingData.driver.currentLocation.address.split(',')[0]}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">
                    Live • Updated {trackingData.driver.currentLocation.lastUpdated}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Name</span>
                  <span className="text-sm font-medium text-gray-900">{trackingData.customer.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone</span>
                  <span className="text-sm font-medium text-gray-900">{trackingData.customer.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Order Value</span>
                  <span className="text-sm font-medium text-gray-900">{trackingData.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type</span>
                  <span className="text-sm font-medium text-gray-900">{trackingData.orderType}</span>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h3>
              <div className="space-y-4">
                {trackingData.timeline.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      step.completed 
                        ? step.current 
                          ? 'bg-blue-500 animate-pulse' 
                          : 'bg-green-500'
                        : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <p className={`text-sm ${
                        step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {step.status}
                      </p>
                      <p className="text-xs text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
