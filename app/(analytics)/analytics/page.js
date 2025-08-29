"use client";
import StatsCard from "@/components/ui/StatsCard";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  ShoppingBag,
  Clock,
  Target,
  Activity
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

// Mock analytics data
const revenueData = [
  { month: 'Jan', revenue: 45000, orders: 320, customers: 150 },
  { month: 'Feb', revenue: 52000, orders: 380, customers: 170 },
  { month: 'Mar', revenue: 48000, orders: 350, customers: 160 },
  { month: 'Apr', revenue: 61000, orders: 420, customers: 200 },
  { month: 'May', revenue: 58000, orders: 410, customers: 190 },
  { month: 'Jun', revenue: 67000, orders: 480, customers: 220 }
];

const performanceData = [
  { name: 'Mon', deliveries: 120, onTime: 98, cancelled: 2 },
  { name: 'Tue', deliveries: 190, onTime: 180, cancelled: 10 },
  { name: 'Wed', deliveries: 300, onTime: 285, cancelled: 15 },
  { name: 'Thu', deliveries: 280, onTime: 270, cancelled: 10 },
  { name: 'Fri', deliveries: 350, onTime: 335, cancelled: 15 },
  { name: 'Sat', deliveries: 420, onTime: 400, cancelled: 20 },
  { name: 'Sun', deliveries: 380, onTime: 365, cancelled: 15 }
];

const regionData = [
  { name: 'HSR Layout', value: 35, color: '#3B82F6' },
  { name: 'Koramangala', value: 25, color: '#10B981' },
  { name: 'Indiranagar', value: 20, color: '#F59E0B' },
  { name: 'Whitefield', value: 12, color: '#EF4444' },
  { name: 'Others', value: 8, color: '#8B5CF6' }
];

const hourlyData = [
  { hour: '6AM', orders: 5 },
  { hour: '8AM', orders: 15 },
  { hour: '10AM', orders: 35 },
  { hour: '12PM', orders: 65 },
  { hour: '2PM', orders: 45 },
  { hour: '4PM', orders: 25 },
  { hour: '6PM', orders: 55 },
  { hour: '8PM', orders: 85 },
  { hour: '10PM', orders: 45 },
  { hour: '12AM', orders: 15 }
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="₹3.5L"
          change="+18.2%"
          changeType="positive"
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Total Orders"
          value="2,340"
          change="+12.5%"
          changeType="positive"
          icon={ShoppingBag}
          color="blue"
        />
        <StatsCard
          title="Active Customers"
          value="1,180"
          change="+8.3%"
          changeType="positive"
          icon={Users}
          color="purple"
        />
        <StatsCard
          title="Success Rate"
          value="96.8%"
          change="+2.1%"
          changeType="positive"
          icon={Target}
          color="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <p className="text-sm text-gray-600">Monthly performance overview</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.1}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delivery Performance</h3>
              <p className="text-sm text-gray-600">Weekly delivery success rates</p>
            </div>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="onTime" fill="#3b82f6" radius={4} />
                <Bar dataKey="cancelled" fill="#ef4444" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Regions</h3>
            <p className="text-sm text-gray-600">Order distribution by area</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {regionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded mr-3" style={{backgroundColor: item.color}}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Orders */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Hourly Orders</h3>
            <p className="text-sm text-gray-600">Peak order times</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="orders" fill="#8b5cf6" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
            <p className="text-sm text-gray-600">Important metrics summary</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Avg Order Value</p>
                <p className="text-sm text-gray-600">₹285</p>
              </div>
              <div className="text-green-600">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Customer Retention</p>
                <p className="text-sm text-gray-600">87.3%</p>
              </div>
              <div className="text-blue-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Peak Hours</p>
                <p className="text-sm text-gray-600">7-9 PM</p>
              </div>
              <div className="text-purple-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Avg Delivery Time</p>
                <p className="text-sm text-gray-600">24 minutes</p>
              </div>
              <div className="text-yellow-600">
                <Target className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
