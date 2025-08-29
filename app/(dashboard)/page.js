"use client";
import { useState } from "react";
import StatsCard from "@/components/ui/StatsCard";
import DataTable from "@/components/ui/DataTable";
import FilterPanel from "@/components/ui/FilterPanel";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { 
  Car, 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  Clock,
  Star,
  DollarSign,
  TrendingUp,
  Activity
} from "lucide-react";
import Link from "next/link";

// Import dummy data
import { orders, analytics, filterConfigs } from "@/lib/data/dummyData";


// Recent orders data
const recentOrders = [
  {
    id: 'ORD-912340',
    customer: 'Rahul Sharma',
    pickup: 'HSR Layout',
    drop: 'MG Road',
    driver: 'Deepak Singh',
    status: 'In Transit',
    amount: '₹245',
    time: '2 min ago'
  },
  {
    id: 'ORD-912341',
    customer: 'Priya Patel',
    pickup: 'Koramangala',
    drop: 'Whitefield',
    driver: 'Amit Kumar',
    status: 'Assigned',
    amount: '₹380',
    time: '5 min ago'
  },
  {
    id: 'ORD-912342',
    customer: 'Karthik Reddy',
    pickup: 'Indiranagar',
    drop: 'Electronic City',
    driver: 'Suresh Babu',
    status: 'Picked Up',
    amount: '₹450',
    time: '8 min ago'
  },
  {
    id: 'ORD-912343',
    customer: 'Neha Gupta',
    pickup: 'JP Nagar',
    drop: 'Marathahalli',
    driver: 'Rajesh M',
    status: 'Delivered',
    amount: '₹320',
    time: '12 min ago'
  },
  {
    id: 'ORD-912344',
    customer: 'Vikram Singh',
    pickup: 'Jayanagar',
    drop: 'Hebbal',
    driver: 'Mohan Das',
    status: 'In Transit',
    amount: '₹290',
    time: '15 min ago'
  }
];

const orderColumns = [
  { 
    key: 'id', 
    label: 'Order ID',
    render: (id) => (
      <Link 
        href={`/orders/${id}`} 
        className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer"
      >
        {id}
      </Link>
    )
  },
  { key: 'customer', label: 'Customer' },
  { key: 'pickup', label: 'Pickup' },
  { key: 'drop', label: 'Drop Location' },
  { key: 'driver', label: 'Driver' },
  { 
    key: 'status', 
    label: 'Status',
    render: (status) => {
      const statusColors = {
        'Assigned': 'bg-blue-50 text-blue-600',
        'Picked Up': 'bg-yellow-50 text-yellow-600',
        'In Transit': 'bg-purple-50 text-purple-600',
        'Delivered': 'bg-green-50 text-green-600',
        'Cancelled': 'bg-red-50 text-red-600'
      };
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-50 text-gray-600'}`}>
          {status}
        </span>
      );
    }
  },
  { key: 'amount', label: 'Amount' },
  { key: 'time', label: 'Time' }
];

export default function DashboardPage() {
  return (
    <main className="space-y-8" role="main" aria-label="Dashboard">
      {/* Page Header with accessibility */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900" id="dashboard-title">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Welcome back! Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <div className="flex items-center space-x-4" role="status" aria-live="polite">
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="text-sm font-medium text-gray-900">2 minutes ago</p>
          </div>
          <div 
            className="w-3 h-3 bg-green-400 rounded-full animate-pulse" 
            aria-label="Live data indicator"
            title="Data is updating in real-time"
          ></div>
        </div>
      </header>

      {/* Hero Metrics Section - Most Important KPIs */}
      <section 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        aria-labelledby="hero-metrics-title"
      >
        <h2 id="hero-metrics-title" className="sr-only">Key Performance Indicators</h2>
        
        {/* Primary KPI - Revenue (Top Left) */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-2">Today&apos;s Revenue</p>
                <p className="text-4xl font-bold mb-2" aria-label="Twenty-four thousand eight hundred fifty rupees">₹24,850</p>
                <div className="flex items-center text-blue-100">
                  <TrendingUp className="w-4 h-4 mr-1" aria-hidden="true" />
                  <span className="text-sm">+8.7% from yesterday</span>
                </div>
              </div>
              <div className="p-4 bg-blue-500 bg-opacity-30 rounded-xl">
                <DollarSign className="w-8 h-8" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Secondary KPI - Orders */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-2">Total Orders</p>
                <p className="text-4xl font-bold mb-2" aria-label="One thousand two hundred forty-seven orders">1,247</p>
                <div className="flex items-center text-green-100">
                  <Activity className="w-4 h-4 mr-1" aria-hidden="true" />
                  <span className="text-sm">+12.5% increase</span>
                </div>
              </div>
              <div className="p-4 bg-green-500 bg-opacity-30 rounded-xl">
                <ShoppingBag className="w-8 h-8" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Tertiary KPI - Active Drivers */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-2">Active Drivers</p>
                <p className="text-4xl font-bold mb-2" aria-label="Three hundred twenty-eight active drivers">328</p>
                <div className="flex items-center text-purple-100">
                  <TrendingUp className="w-4 h-4 mr-1" aria-hidden="true" />
                  <span className="text-sm">+3.2% online</span>
                </div>
              </div>
              <div className="p-4 bg-purple-500 bg-opacity-30 rounded-xl">
                <Car className="w-8 h-8" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Metrics */}
      <section 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        aria-labelledby="secondary-metrics-title"
      >
        <h2 id="secondary-metrics-title" className="sr-only">Additional Metrics</h2>
        
        <StatsCard
          title="Customer Satisfaction"
          value="4.8"
          change="+0.2"
          changeType="positive"
          icon={Star}
          color="yellow"
        />
        <StatsCard
          title="Avg Delivery Time"
          value="28 min"
          change="-3 min"
          changeType="positive"
          icon={Clock}
          color="blue"
        />
        <StatsCard
          title="Active Customers"
          value="2,847"
          change="+156"
          changeType="positive"
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Pending Issues"
          value="7"
          change="-2"
          changeType="positive"
          icon={AlertTriangle}
          color="red"
        />
      </section>


      {/* Recent Orders Table */}
      <section aria-labelledby="recent-orders-title">
        <DataTable
          title="Recent Orders"
          description="Latest order activities and their current status"
          columns={orderColumns}
          data={recentOrders}
          actions={true}
          searchable={true}
          filterable={true}
        />
      </section>
    </main>
  );
}
