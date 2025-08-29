"use client";
import { useState, Fragment } from "react";
import { useParams, useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  User, 
  Car, 
  Clock, 
  CreditCard,
  Package,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Mail,
  Star,
  Navigation,
  UserCheck,
  Shield,
  Search,
  X
} from "lucide-react";
import Link from "next/link";
import MapWrapper from '@/components/ui/MapWrapper';
import ThreeDotMenu from "@/components/ui/ThreeDotMenu";
import "./mobile-styles.css";

// Mock order data - in a real app, this would come from an API
const mockOrders = {
  'ORD-912340': {
    id: 'ORD-912340',
    customer: {
      name: 'Sana Prakash',
      phone: '+91 98765 43210',
      email: 'sana.p@example.com',
      totalOrders: 14,
      complaints: 0
    },
    pickup: {
      address: 'HSR Layout, Sector 1, Bangalore',
      landmark: 'Near Forum Mall',
      coordinates: { lat: 12.9129, lng: 77.6367 }
    },
    drop: {
      address: 'MG Road, Bangalore',
      landmark: 'Opposite Brigade Road',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    driver: {
      name: 'Ayesha Nair',
      phone: '+91 91234 56780',
      vehicle: 'KA-01-AB-1234',
      rating: 4.8,
      subscription: 'Gold',
      status: 'Ongoing'
    },
    status: 'In Transit',
    amount: '₹245',
    createdAt: '2024-01-15 10:30 AM',
    estimatedTime: '25 min',
    orderType: 'Package Delivery',
    priority: 'Normal',
    paymentMethod: 'Cash',
    distance: '12.5 km',
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
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    drop: {
      address: 'Whitefield, Bangalore',
      landmark: 'ITPL Main Gate',
      coordinates: { lat: 12.9698, lng: 77.7500 }
    },
    driver: {
      name: 'Amit Kumar',
      phone: '+91 87654 32108',
      vehicle: 'KA-01-CD-5678',
      rating: 4.6
    },
    status: 'Assigned',
    amount: '₹380',
    createdAt: '2024-01-15 10:25 AM',
    estimatedTime: '35 min',
    orderType: 'Food Delivery',
    priority: 'High',
    paymentMethod: 'Online',
    distance: '18.2 km',
    timeline: [
      { status: 'Order Placed', time: '10:25 AM', completed: true },
      { status: 'Driver Assigned', time: '10:27 AM', completed: true, current: true },
      { status: 'Pickup Completed', time: 'Pending', completed: false },
      { status: 'In Transit', time: 'Pending', completed: false },
      { status: 'Delivered', time: 'Expected 11:00 AM', completed: false }
    ]
  },
  'ORD-912342': {
    id: 'ORD-912342',
    customer: {
      name: 'Karthik Reddy',
      phone: '+91 98765 43212',
      email: 'karthik.reddy@email.com'
    },
    pickup: {
      address: 'Indiranagar, Bangalore',
      landmark: '100 Feet Road',
      coordinates: { lat: 12.9719, lng: 77.6419 }
    },
    drop: {
      address: 'Electronic City, Bangalore',
      landmark: 'Phase 1, Infosys Gate',
      coordinates: { lat: 12.8456, lng: 77.6603 }
    },
    driver: {
      name: 'Suresh Babu',
      phone: '+91 87654 32107',
      vehicle: 'KA-01-EF-9012',
      rating: 4.9
    },
    status: 'Picked Up',
    amount: '₹450',
    createdAt: '2024-01-15 10:22 AM',
    estimatedTime: '40 min',
    orderType: 'Grocery',
    priority: 'Normal',
    paymentMethod: 'Card',
    distance: '22.1 km',
    timeline: [
      { status: 'Order Placed', time: '10:22 AM', completed: true },
      { status: 'Driver Assigned', time: '10:24 AM', completed: true },
      { status: 'Pickup Completed', time: '10:35 AM', completed: true, current: true },
      { status: 'In Transit', time: 'Pending', completed: false },
      { status: 'Delivered', time: 'Expected 11:15 AM', completed: false }
    ]
  },
  'ORD-912343': {
    id: 'ORD-912343',
    customer: {
      name: 'Neha Gupta',
      phone: '+91 98765 43213',
      email: 'neha.gupta@email.com'
    },
    pickup: {
      address: 'JP Nagar, Bangalore',
      landmark: '4th Phase',
      coordinates: { lat: 12.9081, lng: 77.5831 }
    },
    drop: {
      address: 'Marathahalli, Bangalore',
      landmark: 'Outer Ring Road',
      coordinates: { lat: 12.9591, lng: 77.6974 }
    },
    driver: {
      name: 'Rajesh M',
      phone: '+91 87654 32106',
      vehicle: 'KA-01-GH-3456',
      rating: 4.7
    },
    status: 'Delivered',
    amount: '₹320',
    createdAt: '2024-01-15 10:18 AM',
    estimatedTime: '30 min',
    orderType: 'Medical',
    priority: 'High',
    paymentMethod: 'Cash',
    distance: '16.8 km',
    timeline: [
      { status: 'Order Placed', time: '10:18 AM', completed: true },
      { status: 'Driver Assigned', time: '10:20 AM', completed: true },
      { status: 'Pickup Completed', time: '10:25 AM', completed: true },
      { status: 'In Transit', time: '10:26 AM', completed: true },
      { status: 'Delivered', time: '10:48 AM', completed: true, current: true }
    ]
  },
  'ORD-912344': {
    id: 'ORD-912344',
    customer: {
      name: 'Vikram Singh',
      phone: '+91 98765 43214',
      email: 'vikram.singh@email.com'
    },
    pickup: {
      address: 'Jayanagar, Bangalore',
      landmark: '4th Block',
      coordinates: { lat: 12.9279, lng: 77.5830 }
    },
    drop: {
      address: 'Hebbal, Bangalore',
      landmark: 'Outer Ring Road',
      coordinates: { lat: 13.0358, lng: 77.5970 }
    },
    driver: {
      name: 'Mohan Das',
      phone: '+91 87654 32105',
      vehicle: 'KA-01-IJ-7890',
      rating: 4.5
    },
    status: 'In Transit',
    amount: '₹290',
    createdAt: '2024-01-15 10:15 AM',
    estimatedTime: '28 min',
    orderType: 'Package Delivery',
    priority: 'Low',
    paymentMethod: 'Online',
    distance: '14.3 km',
    timeline: [
      { status: 'Order Placed', time: '10:15 AM', completed: true },
      { status: 'Driver Assigned', time: '10:17 AM', completed: true },
      { status: 'Pickup Completed', time: '10:28 AM', completed: true },
      { status: 'In Transit', time: '10:30 AM', completed: true, current: true },
      { status: 'Delivered', time: 'Expected 10:58 AM', completed: false }
    ]
  }
};

function getStatusColor(status) {
  const colors = {
    'Assigned': 'bg-blue-50 text-blue-600 border-blue-200',
    'Picked Up': 'bg-yellow-50 text-yellow-600 border-yellow-200',
    'In Transit': 'bg-purple-50 text-purple-600 border-purple-200',
    'Delivered': 'bg-green-50 text-green-600 border-green-200',
    'Cancelled': 'bg-red-50 text-red-600 border-red-200',
    'Pending': 'bg-gray-50 text-gray-600 border-gray-200'
  };
  return colors[status] || 'bg-gray-50 text-gray-600 border-gray-200';
}

function getPriorityColor(priority) {
  const colors = {
    'High': 'bg-red-50 text-red-600',
    'Normal': 'bg-blue-50 text-blue-600',
    'Low': 'bg-gray-50 text-gray-600'
  };
  return colors[priority] || 'bg-gray-50 text-gray-600';
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id || 'ORD-10239';
  
  const order = mockOrders[orderId] || mockOrders['ORD-912340'];
  
  // Local state for assignment modal and selected partner
  const [assignOpen, setAssignOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignedPartner, setAssignedPartner] = useState(order ? order.driver : null);
  
  if (!order) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">The order ID &quot;{orderId}&quot; could not be found.</p>
          <Link 
            href="/orders" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  // Available partners list (mock). Replace with API integration later.
  const availablePartners = [
    { id: 'PTR-1001', name: 'Ayesha Nair', phone: '+91 91234 56780', rating: 4.8, subscription: 'Gold', status: 'Available', vehicle: 'KA-01-AB-1234' },
    { id: 'PTR-1002', name: 'Deepak Singh', phone: '+91 87654 32109', rating: 4.7, subscription: 'Pro', status: 'On Trip', vehicle: 'KA-01-CD-5678' },
    { id: 'PTR-1003', name: 'Arun Kumar', phone: '+91 99876 54321', rating: 4.5, subscription: 'Gold', status: 'Available', vehicle: 'KA-02-EF-9012' },
    { id: 'PTR-1004', name: 'Meera Joshi', phone: '+91 98765 12034', rating: 4.9, subscription: 'Premium', status: 'Available', vehicle: 'KA-03-GH-3456' }
  ];

  const filteredPartners = availablePartners.filter(p =>
    (p.name + p.phone + p.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                Order Details — {orderId === 'ORD-10239' ? 'ORD-10239' : order.id}
              </h1>
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href={`/orders/${order.id}/track`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Track Live
            </Link>
            <button onClick={() => setAssignOpen(true)} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
              Assign Partner
            </button>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
              Update Status
            </button>
            <ThreeDotMenu
              type="order"
              itemId={order.id}
              itemData={order}
              onAction={(action, data) => {
                console.log('Order action:', action, data);
                // Handle actions like call, reassign, cancel, etc.
                switch (action) {
                  case 'call':
                    if (data.target === 'customer') {
                      window.open(`tel:${order.customer.phone}`);
                    } else if (data.target === 'driver') {
                      window.open(`tel:${order.driver?.phone}`);
                    }
                    break;
                  case 'reassign':
                    setAssignOpen(true);
                    break;
                  case 'cancel':
                    if (confirm('Are you sure you want to cancel this order?')) {
                      alert('Order cancellation functionality would be implemented here');
                    }
                    break;
                  default:
                    alert(`${action} functionality would be implemented here`);
                }
              }}
            />
          </div>
          
          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center space-x-2">
            <Link
              href={`/orders/${order.id}/track`}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Track
            </Link>
            <button 
              onClick={() => setAssignOpen(true)} 
              className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
            >
              Assign
            </button>
            <ThreeDotMenu
              type="order"
              itemId={order.id}
              itemData={order}
              size="sm"
              onAction={(action, data) => {
                console.log('Order action:', action, data);
                // Handle actions like call, reassign, cancel, etc.
                switch (action) {
                  case 'call':
                    if (data.target === 'customer') {
                      window.open(`tel:${order.customer.phone}`);
                    } else if (data.target === 'driver') {
                      window.open(`tel:${order.driver?.phone}`);
                    }
                    break;
                  case 'reassign':
                    setAssignOpen(true);
                    break;
                  case 'cancel':
                    if (confirm('Are you sure you want to cancel this order?')) {
                      alert('Order cancellation functionality would be implemented here');
                    }
                    break;
                  default:
                    alert(`${action} functionality would be implemented here`);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-2 xs:p-3 sm:p-6">
        {/* Mobile-First: Stack all sections vertically on small screens */}
        <div className="space-y-3 xs:space-y-4 sm:space-y-6">
          
          {/* Order Status & Key Info - Mobile Priority Section */}
          <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4 mb-4">
              <div>
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Order Status</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-block px-2 xs:px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`inline-block px-2 xs:px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(order.priority)}`}>
                    {order.priority} Priority
                  </span>
                </div>
              </div>
              <div className="text-right xs:text-left">
                <p className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900">{order.amount}</p>
                <p className="text-xs xs:text-sm text-gray-500">{order.paymentMethod}</p>
              </div>
            </div>
            
            {/* Quick Stats Grid - Mobile Optimized */}
            <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
              <div className="text-center p-2 xs:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Distance</p>
                <p className="text-sm xs:text-base font-semibold text-gray-900">{order.distance}</p>
              </div>
              <div className="text-center p-2 xs:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Duration</p>
                <p className="text-sm xs:text-base font-semibold text-gray-900">{order.estimatedTime}</p>
              </div>
              <div className="text-center p-2 xs:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Type</p>
                <p className="text-xs xs:text-sm font-semibold text-gray-900">{order.orderType}</p>
              </div>
              <div className="text-center p-2 xs:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Created</p>
                <p className="text-xs xs:text-sm font-semibold text-gray-900">{order.createdAt.split(' ')[1]}</p>
              </div>
            </div>
          </div>

          {/* Addresses Section - Mobile Optimized */}
          <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-3 xs:mb-4">Addresses</h3>
            <div className="space-y-3 xs:space-y-4">
              {/* Pickup Address */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 xs:w-8 h-6 xs:h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-3 xs:w-4 h-3 xs:h-4 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs xs:text-sm font-medium text-gray-900">Pickup Location</p>
                  <p className="text-xs xs:text-sm text-gray-600 mt-1 leading-relaxed">{order.pickup.address}</p>
                  <p className="text-xs text-gray-500">{order.pickup.landmark}</p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <div className="px-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>
              
              {/* Drop Address */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 xs:w-8 h-6 xs:h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-3 xs:w-4 h-3 xs:h-4 text-red-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs xs:text-sm font-medium text-gray-900">Drop Location</p>
                  <p className="text-xs xs:text-sm text-gray-600 mt-1 leading-relaxed">{order.drop.address}</p>
                  <p className="text-xs text-gray-500">{order.drop.landmark}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Partner Info - Two Column on larger mobile screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
            {/* Customer Section */}
            <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 xs:mb-4">
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Customer</h3>
                <div className="flex items-center gap-1 xs:gap-2">
                  <a href={`tel:${order.customer.phone}`} className="p-1 xs:p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Phone className="w-3 xs:w-4 h-3 xs:h-4" />
                  </a>
                  <a href={`mailto:${order.customer.email}`} className="p-1 xs:p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <Mail className="w-3 xs:w-4 h-3 xs:h-4" />
                  </a>
                </div>
              </div>
              <div className="space-y-2 xs:space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm xs:text-base font-medium text-gray-900">{order.customer.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 xs:gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Total Orders</p>
                    <p className="text-sm font-medium text-gray-900">{order.customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Complaints</p>
                    <p className="text-sm font-medium text-gray-900">{order.customer.complaints}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Section */}
            <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 xs:mb-4">
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Partner</h3>
                {assignedPartner && (
                  <div className="flex items-center gap-1 xs:gap-2">
                    <a href={`tel:${assignedPartner.phone}`} className="p-1 xs:p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Phone className="w-3 xs:w-4 h-3 xs:h-4" />
                    </a>
                  </div>
                )}
              </div>
              {assignedPartner ? (
                <div className="space-y-2 xs:space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm xs:text-base font-medium text-gray-900">{assignedPartner.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 xs:gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Vehicle</p>
                      <p className="text-xs xs:text-sm font-medium text-gray-900">{assignedPartner.vehicle}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs xs:text-sm font-medium text-gray-900">{assignedPartner.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Subscription</p>
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                      {assignedPartner.subscription}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <UserCheck className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No partner assigned</p>
                  <button 
                    onClick={() => setAssignOpen(true)}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Assign Partner
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Map Section - Full Width */}
          <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3 xs:mb-4">
              <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Live Tracking</h3>
              <Link 
                href={`/orders/${order.id}/track`}
                className="px-2 xs:px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg hover:bg-blue-200 flex items-center gap-1"
              >
                <Navigation className="w-3 h-3" />
                <span className="hidden xs:inline">Full Screen</span>
                <span className="xs:hidden">Full</span>
              </Link>
            </div>
            
            <MapWrapper
              pickup={{
                address: order.pickup.address,
                landmark: order.pickup.landmark,
                coordinates: [order.pickup.coordinates.lat, order.pickup.coordinates.lng]
              }}
              drop={{
                address: order.drop.address,
                landmark: order.drop.landmark,
                coordinates: [order.drop.coordinates.lat, order.drop.coordinates.lng]
              }}
              currentLocation={{
                coordinates: [order.pickup.coordinates.lat + 0.01, order.pickup.coordinates.lng + 0.01],
                address: 'En route',
                lastUpdated: '2 min ago'
              }}
              driverName={order.driver?.name || 'Driver'}
              height="h-40 xs:h-48 sm:h-64 lg:h-80"
              showControls={true}
              showRoute={true}
            />
          </div>

          {/* Order Timeline Section - spans full width below */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Order Timeline</h3>
              
              {/* Mobile Timeline - Vertical Layout for small screens */}
              <div className="block sm:hidden">
                <div className="space-y-4">
                  {order.timeline.map((step, index) => {
                    const isCompleted = step.completed;
                    const isCurrent = step.current;
                    const isLast = index === order.timeline.length - 1;
                    
                    return (
                      <div key={index} className="flex items-center space-x-3 relative">
                        {/* Vertical line */}
                        {!isLast && (
                          <div className={`absolute left-4 top-8 w-0.5 h-8 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                        
                        {/* Step indicator */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 flex-shrink-0 ${
                          isCompleted 
                            ? isCurrent 
                              ? 'bg-green-500 text-white' 
                              : 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-white" />
                          )}
                        </div>
                        
                        {/* Step content */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            isCompleted ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.status}
                          </p>
                          <p className="text-xs text-gray-400">
                            {step.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Desktop Timeline - Horizontal Layout */}
              <div className="hidden sm:block">
                <div className="flex items-center justify-between mb-8 px-4 overflow-x-auto">
                  {order.timeline.map((step, index) => {
                    const isCompleted = step.completed;
                    const isCurrent = step.current;
                    const isLast = index === order.timeline.length - 1;
                    
                    return (
                      <div key={index} className="flex flex-col items-center relative flex-shrink-0">
                        {/* Progress line */}
                        {!isLast && (
                          <div className={`absolute top-4 left-8 w-20 lg:w-24 xl:w-32 h-0.5 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                        
                        {/* Step indicator */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                          isCompleted 
                            ? isCurrent 
                              ? 'bg-green-500 text-white' 
                              : 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-white" />
                          )}
                        </div>
                        
                        {/* Step label */}
                        <div className="mt-3 text-center max-w-20 lg:max-w-24">
                          <p className={`text-xs font-medium leading-tight ${
                            isCompleted ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.status}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {step.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Additional order info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100">
                <div className="text-center p-3 sm:p-0">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Order Type</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{order.orderType}</p>
                </div>
                <div className="text-center p-3 sm:p-0">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Distance</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{order.distance}</p>
                </div>
                <div className="text-center p-3 sm:p-0">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{order.estimatedTime}</p>
                </div>
                <div className="text-center p-3 sm:p-0">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Amount</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{order.amount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Assign Partner Modal */}
      <Transition appear show={assignOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setAssignOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title className="text-lg font-semibold text-gray-900">Assign Partner</Dialog.Title>
                    <button onClick={() => setAssignOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search by name, phone, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Partners list */}
                  <div className="max-h-80 overflow-auto space-y-3">
                    {filteredPartners.map((p) => (
                      <div key={p.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900">{p.name} <span className="text-xs text-gray-500">({p.id})</span></p>
                          <p className="text-sm text-gray-600">{p.phone} • {p.subscription} • {p.vehicle}</p>
                          <p className="text-xs text-gray-500">Rating: {p.rating} • Status: {p.status}</p>
                        </div>
                        <button
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm"
                          onClick={() => { setAssignedPartner(p); setAssignOpen(false); }}
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                    {filteredPartners.length === 0 && (
                      <p className="text-sm text-gray-500">No partners match your search.</p>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
