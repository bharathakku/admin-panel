"use client";
import DataTable from "@/components/ui/DataTable";
import StatsCard from "@/components/ui/StatsCard";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  MapPin,
  Phone,
  Filter,
  Download,
  Plus
} from "lucide-react";
import { useState } from "react";

// Mock orders data
const orders = [
  {
    id: 'ORD-912340',
    customer: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    pickup: 'HSR Layout, Sector 1, Bangalore',
    drop: 'MG Road, Bangalore',
    driver: 'Deepak Singh',
    driverPhone: '+91 87654 32109',
    status: 'In Transit',
    amount: '₹245',
    time: '2 min ago',
    createdAt: '2024-01-15 10:30 AM',
    estimatedTime: '25 min',
    orderType: 'Package Delivery',
    priority: 'Normal'
  },
  {
    id: 'ORD-912341',
    customer: 'Priya Patel',
    customerPhone: '+91 98765 43211',
    pickup: 'Koramangala, Bangalore',
    drop: 'Whitefield, Bangalore',
    driver: 'Amit Kumar',
    driverPhone: '+91 87654 32108',
    status: 'Assigned',
    amount: '₹380',
    time: '5 min ago',
    createdAt: '2024-01-15 10:25 AM',
    estimatedTime: '35 min',
    orderType: 'Food Delivery',
    priority: 'High'
  },
  {
    id: 'ORD-912342',
    customer: 'Karthik Reddy',
    customerPhone: '+91 98765 43212',
    pickup: 'Indiranagar, Bangalore',
    drop: 'Electronic City, Bangalore',
    driver: 'Suresh Babu',
    driverPhone: '+91 87654 32107',
    status: 'Picked Up',
    amount: '₹450',
    time: '8 min ago',
    createdAt: '2024-01-15 10:22 AM',
    estimatedTime: '40 min',
    orderType: 'Grocery',
    priority: 'Normal'
  },
  {
    id: 'ORD-912343',
    customer: 'Neha Gupta',
    customerPhone: '+91 98765 43213',
    pickup: 'JP Nagar, Bangalore',
    drop: 'Marathahalli, Bangalore',
    driver: 'Rajesh M',
    driverPhone: '+91 87654 32106',
    status: 'Delivered',
    amount: '₹320',
    time: '12 min ago',
    createdAt: '2024-01-15 10:18 AM',
    estimatedTime: '30 min',
    orderType: 'Medical',
    priority: 'High'
  },
  {
    id: 'ORD-912344',
    customer: 'Vikram Singh',
    customerPhone: '+91 98765 43214',
    pickup: 'Jayanagar, Bangalore',
    drop: 'Hebbal, Bangalore',
    driver: 'Mohan Das',
    driverPhone: '+91 87654 32105',
    status: 'Cancelled',
    amount: '₹290',
    time: '15 min ago',
    createdAt: '2024-01-15 10:15 AM',
    estimatedTime: '28 min',
    orderType: 'Package Delivery',
    priority: 'Low'
  },
  {
    id: 'ORD-912345',
    customer: 'Anita Desai',
    customerPhone: '+91 98765 43215',
    pickup: 'Banashankari, Bangalore',
    drop: 'Ulsoor, Bangalore',
    driver: 'Krishna Murthy',
    driverPhone: '+91 87654 32104',
    status: 'Pending',
    amount: '₹195',
    time: '18 min ago',
    createdAt: '2024-01-15 10:12 AM',
    estimatedTime: '22 min',
    orderType: 'Food Delivery',
    priority: 'Normal'
  }
];

const orderColumns = [
  { key: 'id', label: 'Order ID' },
  { 
    key: 'customer', 
    label: 'Customer',
    render: (customer, row) => (
      <div>
        <p className="font-medium text-gray-900">{customer}</p>
        <p className="text-xs text-gray-500">{row.customerPhone}</p>
      </div>
    )
  },
  { 
    key: 'pickup', 
    label: 'Route',
    render: (pickup, row) => (
      <div>
        <div className="flex items-center text-sm text-gray-900 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="truncate max-w-32">{pickup.split(',')[0]}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          <span className="truncate max-w-32">{row.drop.split(',')[0]}</span>
        </div>
      </div>
    )
  },
  { 
    key: 'driver', 
    label: 'Driver',
    render: (driver, row) => (
      <div>
        <p className="font-medium text-gray-900">{driver || 'Unassigned'}</p>
        {driver && <p className="text-xs text-gray-500">{row.driverPhone}</p>}
      </div>
    )
  },
  { 
    key: 'status', 
    label: 'Status',
    render: (status) => {
      const statusColors = {
        'Assigned': 'bg-blue-50 text-blue-600 border-blue-200',
        'Picked Up': 'bg-yellow-50 text-yellow-600 border-yellow-200',
        'In Transit': 'bg-purple-50 text-purple-600 border-purple-200',
        'Delivered': 'bg-green-50 text-green-600 border-green-200',
        'Cancelled': 'bg-red-50 text-red-600 border-red-200',
        'Pending': 'bg-gray-50 text-gray-600 border-gray-200'
      };
      return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
          {status}
        </span>
      );
    }
  },
  { 
    key: 'orderType', 
    label: 'Type',
    render: (type) => (
      <span className="text-sm text-gray-600">{type}</span>
    )
  },
  { 
    key: 'amount', 
    label: 'Amount',
    render: (amount) => (
      <span className="font-semibold text-gray-900">{amount}</span>
    )
  },
  { 
    key: 'time', 
    label: 'Created',
    render: (time, row) => (
      <div>
        <p className="text-sm text-gray-900">{time}</p>
        <p className="text-xs text-gray-500">{row.createdAt}</p>
      </div>
    )
  }
];

export default function OrdersPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'Pending').length },
    { id: 'active', label: 'Active', count: orders.filter(o => ['Assigned', 'Picked Up', 'In Transit'].includes(o.status)).length },
    { id: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'Delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled').length }
  ];

  const filteredOrders = selectedTab === 'all' ? orders : 
    selectedTab === 'active' ? orders.filter(o => ['Assigned', 'Picked Up', 'In Transit'].includes(o.status)) :
    orders.filter(o => o.status === selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1));

  return (
    <div className="mobile-container sm:space-y-6">
      {/* Page Header */}
      <div className="mobile-header sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="mobile-header-title sm:text-3xl sm:font-bold text-gray-900">Order Management</h1>
          <p className="mobile-text-sm text-gray-600 mt-1">Manage and track all delivery orders</p>
        </div>
        <div className="mobile-btn-group sm:flex sm:items-center sm:space-x-3">
          <button className="mobile-btn sm:flex sm:items-center sm:px-4 sm:py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="mobile-btn sm:flex sm:items-center sm:px-4 sm:py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            Create Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value={orders.length.toString()}
          change="+23"
          changeType="positive"
          icon={ShoppingBag}
          color="blue"
        />
        <StatsCard
          title="Active Orders"
          value={orders.filter(o => ['Assigned', 'Picked Up', 'In Transit'].includes(o.status)).length.toString()}
          change="+5"
          changeType="positive"
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="Completed Today"
          value={orders.filter(o => o.status === 'Delivered').length.toString()}
          change="+12"
          changeType="positive"
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Cancelled"
          value={orders.filter(o => o.status === 'Cancelled').length.toString()}
          change="-2"
          changeType="positive"
          icon={XCircle}
          color="red"
        />
      </div>

      {/* Tabs */}
      <div className="mobile-card sm:bg-white sm:rounded-xl sm:border sm:border-gray-100 sm:shadow-sm">
        <div className="border-b border-gray-100">
          <nav className="mobile-table sm:flex sm:space-x-8 mobile-container sm:px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`mobile-nav-item sm:py-4 sm:px-1 sm:border-b-2 font-medium mobile-text-sm sm:text-sm whitespace-nowrap ${
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

        {/* Orders Table */}
        <div className="p-6">
          <DataTable
            title=""
            description=""
            columns={orderColumns}
            data={filteredOrders}
            actions={true}
            searchable={true}
            filterable={true}
            entityType="order"
          />
        </div>
      </div>
    </div>
  );
}
