"use client";
import DataTable from "@/components/ui/DataTable";
import StatsCard from "@/components/ui/StatsCard";
import { 
  Car, 
  Users, 
  CheckCircle, 
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  DollarSign,
  Download,
  Plus,
  Activity
} from "lucide-react";
import { useState } from "react";

// Mock drivers data
const drivers = [
  {
    id: 'DRV-001',
    name: 'Deepak Singh',
    email: 'deepak.singh@email.com',
    phone: '+91 87654 32109',
    vehicle: 'KA-01-AB-1234 (Bike)',
    location: 'HSR Layout',
    status: 'Online',
    totalDeliveries: 245,
    rating: 4.8,
    earnings: 18500,
    joinDate: '2023-03-15',
    lastActive: '5 min ago',
    completionRate: 98.5
  },
  {
    id: 'DRV-002',
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 87654 32108',
    vehicle: 'KA-05-XY-5678 (Scooter)',
    location: 'Koramangala',
    status: 'Busy',
    totalDeliveries: 189,
    rating: 4.6,
    earnings: 14200,
    joinDate: '2023-05-22',
    lastActive: '2 min ago',
    completionRate: 96.8
  },
  {
    id: 'DRV-003',
    name: 'Suresh Babu',
    email: 'suresh.babu@email.com',
    phone: '+91 87654 32107',
    vehicle: 'KA-03-CD-9012 (Bike)',
    location: 'Indiranagar',
    status: 'Online',
    totalDeliveries: 312,
    rating: 4.9,
    earnings: 22800,
    joinDate: '2023-01-10',
    lastActive: '1 min ago',
    completionRate: 99.2
  },
  {
    id: 'DRV-004',
    name: 'Rajesh M',
    email: 'rajesh.m@email.com',
    phone: '+91 87654 32106',
    vehicle: 'KA-07-EF-3456 (Auto)',
    location: 'JP Nagar',
    status: 'Offline',
    totalDeliveries: 156,
    rating: 4.3,
    earnings: 11700,
    joinDate: '2023-07-18',
    lastActive: '2 hours ago',
    completionRate: 94.2
  },
  {
    id: 'DRV-005',
    name: 'Krishna Murthy',
    email: 'krishna.murthy@email.com',
    phone: '+91 87654 32104',
    vehicle: 'KA-09-GH-7890 (Bike)',
    location: 'Banashankari',
    status: 'Online',
    totalDeliveries: 278,
    rating: 4.7,
    earnings: 19400,
    joinDate: '2023-02-28',
    lastActive: 'Just now',
    completionRate: 97.3
  }
];

const driverColumns = [
  { 
    key: 'name', 
    label: 'Driver',
    render: (name, row) => (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{row.id}</p>
        </div>
      </div>
    )
  },
  { 
    key: 'email', 
    label: 'Contact',
    render: (email, row) => (
      <div>
        <div className="flex items-center text-sm text-gray-900 mb-1">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          <span>{email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2 text-gray-400" />
          <span>{row.phone}</span>
        </div>
      </div>
    )
  },
  { 
    key: 'vehicle', 
    label: 'Vehicle',
    render: (vehicle, row) => (
      <div>
        <p className="font-medium text-gray-900">{vehicle}</p>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
          <span>{row.location}</span>
        </div>
      </div>
    )
  },
  { 
    key: 'status', 
    label: 'Status',
    render: (status, row) => {
      const statusColors = {
        'Online': 'bg-green-50 text-green-600 border-green-200',
        'Busy': 'bg-yellow-50 text-yellow-600 border-yellow-200',
        'Offline': 'bg-gray-50 text-gray-600 border-gray-200'
      };
      return (
        <div>
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[status]}`}>
            {status}
          </span>
          <p className="text-xs text-gray-500 mt-1">{row.lastActive}</p>
        </div>
      );
    }
  },
  { 
    key: 'totalDeliveries', 
    label: 'Performance',
    render: (totalDeliveries, row) => (
      <div>
        <p className="font-semibold text-gray-900">{totalDeliveries} deliveries</p>
        <div className="flex items-center text-sm text-gray-600">
          <Star className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" />
          <span>{row.rating}</span>
          <span className="ml-2">({row.completionRate}%)</span>
        </div>
      </div>
    )
  },
  { 
    key: 'earnings', 
    label: 'Earnings',
    render: (earnings) => (
      <div>
        <p className="font-semibold text-gray-900">₹{earnings.toLocaleString()}</p>
        <p className="text-xs text-gray-500">This month</p>
      </div>
    )
  }
];

export default function DriversPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const tabs = [
    { id: 'all', label: 'All Drivers', count: drivers.length },
    { id: 'online', label: 'Online', count: drivers.filter(d => d.status === 'Online').length },
    { id: 'busy', label: 'Busy', count: drivers.filter(d => d.status === 'Busy').length },
    { id: 'offline', label: 'Offline', count: drivers.filter(d => d.status === 'Offline').length }
  ];

  const filteredDrivers = selectedTab === 'all' ? drivers : 
    drivers.filter(d => d.status.toLowerCase() === selectedTab);

  const onlineDrivers = drivers.filter(d => d.status === 'Online' || d.status === 'Busy').length;
  const avgRating = drivers.reduce((sum, driver) => sum + driver.rating, 0) / drivers.length;
  const totalEarnings = drivers.reduce((sum, driver) => sum + driver.earnings, 0);

  return (
    <div className="mobile-container sm:space-y-6">
      {/* Page Header */}
      <div className="mobile-header sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="mobile-header-title sm:text-3xl sm:font-bold text-gray-900">Driver Management</h1>
          <p className="mobile-text-sm sm:text-gray-600 mt-1">Manage drivers, track performance and monitor availability</p>
        </div>
        <div className="mobile-btn-group sm:flex sm:items-center sm:space-x-3">
          <button className="mobile-btn sm:flex sm:items-center sm:px-4 sm:py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="mobile-btn sm:flex sm:items-center sm:px-4 sm:py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Driver
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Drivers"
          value={drivers.length.toString()}
          change="+3"
          changeType="positive"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Active Drivers"
          value={onlineDrivers.toString()}
          change="+5"
          changeType="positive"
          icon={Activity}
          color="green"
        />
        <StatsCard
          title="Avg Rating"
          value={avgRating.toFixed(1)}
          change="+0.1"
          changeType="positive"
          icon={Star}
          color="yellow"
        />
        <StatsCard
          title="Total Earnings"
          value={`₹${(totalEarnings / 1000).toFixed(0)}K`}
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Driver Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="space-y-4">
            {drivers
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map((driver, index) => (
                <div key={driver.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                    {driver.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{driver.name}</p>
                    <p className="text-sm text-gray-500">{driver.rating} ⭐ • {driver.totalDeliveries} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">#{index + 1}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Availability Status</h3>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Online</span>
              </div>
              <span className="font-semibold text-gray-900">
                {drivers.filter(d => d.status === 'Online').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Busy</span>
              </div>
              <span className="font-semibold text-gray-900">
                {drivers.filter(d => d.status === 'Busy').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Offline</span>
              </div>
              <span className="font-semibold text-gray-900">
                {drivers.filter(d => d.status === 'Offline').length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Key Metrics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Completion Rate</span>
              <span className="font-semibold text-gray-900">97.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Hours/Day</span>
              <span className="font-semibold text-gray-900">8.5 hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="font-semibold text-green-600">4.6/5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Earnings/Month</span>
              <span className="font-semibold text-gray-900">₹{Math.round(totalEarnings / drivers.length).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="border-b border-gray-100">
          <nav className="mobile-nav-tabs sm:flex sm:space-x-8 sm:px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`mobile-nav-tab sm:py-4 sm:px-1 sm:border-b-2 font-medium mobile-text-sm sm:text-sm whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'border-black text-black bg-black text-white sm:bg-transparent sm:text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 py-0.5 px-2 rounded-full mobile-text-xs ${
                  selectedTab === tab.id 
                    ? 'bg-white text-black sm:bg-black sm:text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Drivers Table */}
        <div className="p-6">
          <DataTable
            title=""
            description=""
            columns={driverColumns}
            data={filteredDrivers}
            actions={true}
            searchable={true}
            filterable={true}
            entityType="driver"
          />
        </div>
      </div>
    </div>
  );
}
