"use client";
import React, { useState, useEffect } from "react";
import { 
  Settings as SettingsIcon,
  Settings,
  User,
  Bell,
  Shield,
  Truck,
  CreditCard,
  Save,
  FileText,
  Download,
  Eye,
  MoreVertical,
  IndianRupee,
  MapPin,
  Users,
  Car,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Map,
  Zap,
  Globe,
  AlertTriangle,
  Clock,
  Mail,
  ShoppingBag,
  UserCheck,
  Menu,
  ChevronDown
} from "lucide-react";

// Import API functions
import {
  generalSettings,
  accountSettings,
  pricingAPI,
  rolesAPI,
  zonesAPI,
  notificationsAPI,
  vehiclesAPI,
  paymentAPI,
  reportsAPI,
  securityAPI,
  deliveryAPI
} from '@/lib/api/settings';

// Import Enhanced UI Components
import {
  LoadingSpinner,
  Toast,
  ConfirmDialog,
  EditModal,
  FormInput,
  FormSelect,
  ToggleSwitch,
  ActionButton,
  DataTable
} from '@/components/settings/UIComponents';

// Import new enhanced components
import CoverageMap from '@/components/ui/CoverageMap';
import ZonesTable from '@/components/ui/ZonesTable';
import RolePermissionsMatrix from '@/components/ui/RolePermissionsMatrix';
import NotificationSettings from '@/components/ui/NotificationSettings';
import DeliverySettings from '@/components/ui/DeliverySettings';

// Import dummy data
import dummyData, { zones as mockZones, filterConfigs } from '@/lib/data/dummyData';
import { useApi, handleApiError } from '@/lib/api/apiHelpers';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });
  const [editModal, setEditModal] = useState({ isOpen: false });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // General Settings State
  const [generalData, setGeneralData] = useState({
    companyName: 'DeliveryPro Admin',
    businessType: 'Food Delivery',
    timeZone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)'
  });
  
  // Account Settings State
  const [accountData, setAccountData] = useState({
    adminName: 'Admin User',
    email: 'admin@company.com',
    phone: '+91 98765 43210',
    role: 'Super Admin'
  });
  
  // Pricing State
  const [pricingData, setPricingData] = useState({
    baseFare: 40.00,
    perKm: 8.00,
    perMin: 1.50,
    minimumFare: 60.00
  });
  
  const [regionalRules, setRegionalRules] = useState([
    { id: 1, city: 'Bengaluru', vehicle: 'Bike', timeWindow: '07:00-10:00', multiplier: '1.4x', status: 'Active' },
    { id: 2, city: 'Bengaluru', vehicle: 'Mini Truck', timeWindow: '22:00-06:00', multiplier: '1.8x', status: 'Active' },
    { id: 3, city: 'Hyderabad', vehicle: 'Bike', timeWindow: '10:00-18:00', multiplier: '1.1x', status: 'Active' },
    { id: 4, city: 'Hyderabad', vehicle: 'Van', timeWindow: '18:00-22:00', multiplier: '1.3x', status: 'Inactive' }
  ]);
  
  const [promotions, setPromotions] = useState([
    { id: 1, code: 'WELCOME50', description: '50% up to ₹100 - New users', status: 'Active' },
    { id: 2, code: 'Surge Pricing', description: '1.2x (max 2.5x) during peak hours', status: 'Scheduled' }
  ]);
  
  // Roles & Permissions State
  const [rolePermissions, setRolePermissions] = useState([
    { scope: 'Orders: Read', viewer: true, operator: false, manager: true, owner: false },
    { scope: 'Orders: Write', viewer: false, operator: true, manager: false, owner: true },
    { scope: 'Partners: Read', viewer: true, operator: false, manager: true, owner: false },
    { scope: 'Partners: Write', viewer: false, operator: true, manager: false, owner: true },
    { scope: 'Zones: Manage', viewer: true, operator: false, manager: true, owner: false },
    { scope: 'Pricing: Manage', viewer: false, operator: true, manager: false, owner: true },
    { scope: 'Settings: Read', viewer: true, operator: false, manager: true, owner: false },
    { scope: 'Settings: Write', viewer: false, operator: true, manager: false, owner: true },
    { scope: 'Billing: Manage', viewer: true, operator: false, manager: true, owner: false },
    { scope: 'Audit: Read', viewer: false, operator: true, manager: false, owner: true }
  ]);
  
  // Zones State
  const [zones, setZones] = useState([
    { id: 1, name: 'Koramangala', priority: 'High', city: 'Bengaluru', status: 'Active' },
    { id: 2, name: 'Indiranagar', priority: 'Medium', city: 'Bengaluru', status: 'Active' },
    { id: 3, name: 'Whitefield', priority: 'Low', city: 'Bengaluru', status: 'Active' },
    { id: 4, name: 'Gachibowli', priority: 'Medium', city: 'Hyderabad', status: 'Inactive' }
  ]);
  
  const [zoneOverrides, setZoneOverrides] = useState([
    { id: 1, zone: 'Koramangala', vehicle: 'Bike', minFare: '₹50', multiplier: '1.2x', status: 'Active' },
    { id: 2, zone: 'Indiranagar', vehicle: 'Mini Truck', minFare: '₹150', multiplier: '1.5x', status: 'Active' },
    { id: 3, zone: 'Whitefield', vehicle: 'Bike', minFare: '₹40', multiplier: '1.1x', status: 'Active' },
    { id: 4, zone: 'Gachibowli', vehicle: 'Van', minFare: '₹200', multiplier: '1.3x', status: 'Inactive' }
  ]);
  
  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    orders: {
      orderPlaced: true,
      orderCancelled: false,
      orderDelayed: true,
      refundIssued: false
    },
    partners: {
      partnerAssigned: true,
      etaUpdated: false,
      locationLost: true,
      deliveryCompleted: false
    },
    system: {
      billingUpdates: true,
      weeklyReports: true,
      securityAlerts: true,
      featureAnnouncements: false
    },
    customRules: {
      highValueOrder: true,
      stuckInTransit2h: true,
      cashCollectionPending: true
    }
  });
  
  // Vehicle Management State
  const [vehicleForm, setVehicleForm] = useState({
    name: '',
    capacity: '',
    maxDistance: '',
    baseSpeed: ''
  });
  
  const [vehicleTypes, setVehicleTypes] = useState([
    { id: 1, type: 'Bike', capacity: '15 kg', maxDistance: '20 km', nightAllowed: 'Yes', status: 'Active' },
    { id: 2, type: 'Mini Truck', capacity: '1000 kg', maxDistance: '30 km', nightAllowed: 'Yes', status: 'Active' },
    { id: 3, type: 'Tempo', capacity: '2000 kg', maxDistance: '40 km', nightAllowed: 'Yes', status: 'Active' },
    { id: 4, type: 'Van', capacity: '500 kg', maxDistance: '25 km', nightAllowed: 'No', status: 'Active' },
    { id: 5, type: 'Truck', capacity: '5000 kg', maxDistance: '100 km', nightAllowed: 'Yes', status: 'Active' }
  ]);
  
  const [vehicleDefaults, setVehicleDefaults] = useState({
    bikeBaseSpeed: 35,
    miniTruckBaseSpeed: 28
  });
  
  // Payment Settings State
  const [paymentMethods, setPaymentMethods] = useState({
    creditCard: true,
    upi: true,
    cashOnDelivery: true
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    transactionFee: 2.5,
    minimumOrderAmount: 50
  });
  
  // Reports State
  const [reports, setReports] = useState([
    { id: 1, name: 'Daily Revenue Report', description: 'Daily earnings and transaction summary', lastGenerated: '2 hours ago' },
    { id: 2, name: 'Partner Performance Report', description: 'Partner ratings, trips, and earnings', lastGenerated: '1 day ago' },
    { id: 3, name: 'Customer Analytics Report', description: 'Customer behavior and order patterns', lastGenerated: '3 days ago' },
    { id: 4, name: 'Order Summary Report', description: 'Comprehensive order statistics', lastGenerated: '1 week ago' }
  ]);
  
  const [automatedReports, setAutomatedReports] = useState({
    dailyEmail: true,
    weeklyPerformance: false
  });
  
  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    twoFactorAuth: false
  });
  
  // Delivery Settings State
  const [deliverySettings, setDeliverySettings] = useState({
    defaultDeliveryFee: 25,
    maxDeliveryDistance: 50,
    avgDeliveryTime: 30,
    workingHours: '24/7'
  });
  
  // Utility Functions
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  
  const showConfirm = (title, message, onConfirm, type = 'warning') => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm,
      type
    });
  };
  
  const hideConfirm = () => {
    setConfirmDialog({ isOpen: false });
  };
  
  const showEditModal = (title, content, onSave) => {
    setEditModal({
      isOpen: true,
      title,
      content,
      onSave
    });
  };
  
  const hideEditModal = () => {
    setEditModal({ isOpen: false });
  };
  
  // API Integration Functions
  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Load data from APIs when component mounts
      // const generalData = await generalSettings.get();
      // const accountData = await accountSettings.get();
      // etc.
      showToast('Settings loaded successfully');
    } catch (error) {
      showToast('Failed to load settings', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveAllSettings = async () => {
    setIsLoading(true);
    try {
      // Save all changed settings to backend
      await generalSettings.update(generalData);
      await accountSettings.update(accountData);
      // Add more API calls as needed
      showToast('Settings saved successfully');
    } catch (error) {
      showToast('Failed to save settings', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load initial data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'account', label: 'Account', icon: User },
    { id: 'pricing', label: 'Pricing & Promotions', icon: IndianRupee },
    { id: 'roles', label: 'Roles & Permissions', icon: Users },
    { id: 'zones', label: 'Coverage & Zones', icon: Map },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'vehicles', label: 'Vehicle Management', icon: Car },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'delivery', label: 'Delivery', icon: Truck }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your application settings and preferences</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Mobile Tab Selector */}
        <div className="lg:hidden border-b border-gray-200">
          <div className="relative">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between px-6 py-4 text-left bg-gray-50"
            >
              <div className="flex items-center">
                {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || SettingsIcon, { className: "w-5 h-5 mr-3 text-blue-600" })}
                <span className="font-medium text-gray-900">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                isMobileMenuOpen ? 'transform rotate-180' : ''
              }`} />
            </button>
            
            {isMobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 z-10 max-h-80 overflow-y-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-6 py-4 text-left border-b border-gray-100 last:border-b-0 transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 bg-gray-50 border-r border-gray-100">
            <nav className="p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {tab.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex-1 p-4 lg:p-6">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="DeliveryPro Admin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Food Delivery</option>
                        <option>Package Delivery</option>
                        <option>Grocery Delivery</option>
                        <option>Multi-Service</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Asia/Kolkata (IST)</option>
                        <option>Asia/Dubai (GST)</option>
                        <option>UTC</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Admin Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="Admin User"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="admin@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Super Admin</option>
                        <option>Admin</option>
                        <option>Manager</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">New Orders</h4>
                        <p className="text-sm text-gray-600">Get notified when new orders are placed</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">Payment Alerts</h4>
                        <p className="text-sm text-gray-600">Receive alerts for payment transactions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">Partner Registrations</h4>
                        <p className="text-sm text-gray-600">Notifications for new partner sign-ups</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing & Promotions Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Pricing Rules & Promotions</h3>
                  
                  {/* Global Pricing */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 mb-6">
                    <h4 className="font-medium text-gray-900 mb-4">Global Pricing</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Base Fare</label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input 
                            type="number" 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                            defaultValue="40.00"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Per Km</label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input 
                            type="number" 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                            defaultValue="8.00"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Per Min</label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input 
                            type="number" 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                            defaultValue="1.50"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Fare</label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input 
                            type="number" 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                            defaultValue="60.00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Regional Rules */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                      <h4 className="font-medium text-gray-900">Regional Rules</h4>
                      <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 min-h-[44px] touch-manipulation">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Rule
                      </button>
                    </div>
                    
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Window</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Multiplier</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {[
                            { city: 'Bengaluru', vehicle: 'Bike', timeWindow: '07:00-10:00', multiplier: '1.4x', status: 'Active' },
                            { city: 'Bengaluru', vehicle: 'Mini Truck', timeWindow: '22:00-06:00', multiplier: '1.8x', status: 'Active' },
                            { city: 'Hyderabad', vehicle: 'Bike', timeWindow: '10:00-18:00', multiplier: '1.1x', status: 'Active' },
                            { city: 'Hyderabad', vehicle: 'Van', timeWindow: '18:00-22:00', multiplier: '1.3x', status: 'Inactive' }
                          ].map((rule, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.city}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{rule.vehicle}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{rule.timeWindow}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{rule.multiplier}</td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  rule.status === 'Active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {rule.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center space-x-2">
                                  <button className="text-blue-600 hover:text-blue-800 p-1">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-800 p-1">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                      {[
                        { city: 'Bengaluru', vehicle: 'Bike', timeWindow: '07:00-10:00', multiplier: '1.4x', status: 'Active' },
                        { city: 'Bengaluru', vehicle: 'Mini Truck', timeWindow: '22:00-06:00', multiplier: '1.8x', status: 'Active' },
                        { city: 'Hyderabad', vehicle: 'Bike', timeWindow: '10:00-18:00', multiplier: '1.1x', status: 'Active' },
                        { city: 'Hyderabad', vehicle: 'Van', timeWindow: '18:00-22:00', multiplier: '1.3x', status: 'Inactive' }
                      ].map((rule, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="font-medium text-gray-900">{rule.city}</span>
                            </div>
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              rule.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {rule.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Vehicle</p>
                              <p className="text-sm text-gray-900 mt-1">{rule.vehicle}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Multiplier</p>
                              <p className="text-sm font-medium text-blue-600 mt-1">{rule.multiplier}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Time Window</p>
                            <p className="text-sm text-gray-900 mt-1">{rule.timeWindow}</p>
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
                            <button className="flex items-center justify-center w-10 h-10 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg touch-manipulation">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg touch-manipulation">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Promotions */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                      <h4 className="font-medium text-gray-900">Promotions</h4>
                      <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 min-h-[44px] touch-manipulation">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Promotion
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg gap-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-green-600" />
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">WELCOME50</h5>
                              <p className="text-sm text-gray-500">50% up to ₹100 - New users</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end space-x-2">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                          <button className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg touch-manipulation">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg gap-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-yellow-600" />
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">Surge Pricing</h5>
                              <p className="text-sm text-gray-500">1.2x (max 2.5x) during peak hours</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end space-x-2">
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Scheduled</span>
                          <button className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg touch-manipulation">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Roles & Permissions Tab */}
            {activeTab === 'roles' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Roles & Permissions Management</h3>
                  <p className="text-gray-600 mb-6">Configure granular permissions for different user roles with interactive controls</p>
                  
                  {/* Enhanced Interactive Role Permissions Matrix */}
                  <RolePermissionsMatrix 
                    permissions={rolePermissions}
                    onPermissionsChange={(updatedPermissions) => {
                      setRolePermissions(updatedPermissions);
                      console.log('Permissions updated:', updatedPermissions);
                      // Handle permissions update - in real app, call API
                    }}
                    onSave={(permissions) => {
                      console.log('Saving permissions:', permissions);
                      showToast('Permissions saved successfully!');
                      // Handle save - in real app, call API
                    }}
                  />
                </div>
              </div>
            )}

            {/* Coverage & Zones Tab */}
            {activeTab === 'zones' && (
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Coverage & Zone Management</h3>
                  <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">Draw zones, merge polygons, and manage delivery coverage areas</p>
                  
                  {/* Interactive Coverage Map */}
                  <div className="mb-6 lg:mb-8">
                    <CoverageMap
                      zones={zones}
                      onZoneCreate={(zone) => {
                        console.log('Creating zone:', zone);
                        setZones(prev => [...prev, { ...zone, id: Date.now() }]);
                        showToast('Zone created successfully!');
                      }}
                      onZoneUpdate={(zoneId, updatedData) => {
                        console.log('Updating zone:', zoneId, updatedData);
                        setZones(prev => prev.map(z => z.id === zoneId ? { ...z, ...updatedData } : z));
                        showToast('Zone updated successfully!');
                      }}
                      onZoneDelete={(zoneId) => {
                        console.log('Deleting zone:', zoneId);
                        setZones(prev => prev.filter(z => z.id !== zoneId));
                        showToast('Zone deleted successfully!');
                      }}
                      onZonesMerge={(selectedZones, mergedZone) => {
                        console.log('Merging zones:', selectedZones, mergedZone);
                        setZones(prev => [
                          ...prev.filter(z => !selectedZones.some(sz => sz.id === z.id)),
                          { ...mergedZone, id: Date.now() }
                        ]);
                        showToast('Zones merged successfully!');
                      }}
                      className="h-64 sm:h-80 lg:h-96"
                    />
                  </div>
                  
                  {/* Zones Management - Mobile Optimized */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                      <h4 className="font-medium text-gray-900">Zone Management</h4>
                      <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 min-h-[44px] touch-manipulation">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Zone
                      </button>
                    </div>
                    
                    {/* Desktop Table View */}
                    <div className="hidden lg:block">
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone Name</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {[
                              { name: 'Koramangala', city: 'Bengaluru', priority: 'High', status: 'Active' },
                              { name: 'Indiranagar', city: 'Bengaluru', priority: 'Medium', status: 'Active' },
                              { name: 'Whitefield', city: 'Bengaluru', priority: 'Low', status: 'Active' },
                              { name: 'Gachibowli', city: 'Hyderabad', priority: 'Medium', status: 'Inactive' }
                            ].map((zone, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{zone.name}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{zone.city}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    zone.priority === 'High' ? 'bg-red-100 text-red-800' :
                                    zone.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {zone.priority}
                                  </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    zone.status === 'Active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {zone.status}
                                  </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div className="flex items-center space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800 p-1">
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 p-1">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                      {[
                        { name: 'Koramangala', city: 'Bengaluru', priority: 'High', status: 'Active' },
                        { name: 'Indiranagar', city: 'Bengaluru', priority: 'Medium', status: 'Active' },
                        { name: 'Whitefield', city: 'Bengaluru', priority: 'Low', status: 'Active' },
                        { name: 'Gachibowli', city: 'Hyderabad', priority: 'Medium', status: 'Inactive' }
                      ].map((zone, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="font-medium text-gray-900">{zone.name}</span>
                            </div>
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              zone.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {zone.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">City</p>
                              <p className="text-sm text-gray-900 mt-1">{zone.city}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Priority</p>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                                zone.priority === 'High' ? 'bg-red-100 text-red-800' :
                                zone.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {zone.priority}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
                            <button className="flex items-center justify-center w-10 h-10 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg touch-manipulation">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg touch-manipulation">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Advanced Notification Management</h3>
                  <p className="text-gray-600 mb-6">Configure comprehensive notification settings across multiple channels with advanced controls</p>
                  
                  {/* Enhanced Notification Settings Component */}
                  <NotificationSettings 
                    settings={notificationSettings}
                    onSettingsChange={(updatedSettings) => {
                      setNotificationSettings(updatedSettings);
                      console.log('Notification settings updated:', updatedSettings);
                      // Handle settings update - in real app, call API
                    }}
                    onSave={(settings) => {
                      console.log('Saving notification settings:', settings);
                      showToast('Notification settings saved successfully!');
                      // Handle save - in real app, call API
                    }}
                  />
                </div>
              </div>
            )}

            {/* Vehicle Management Tab */}
            {activeTab === 'vehicles' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Vehicle Management</h3>
                  
                  {/* Add/Edit Vehicle Form */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Add / Edit Vehicle Type</h4>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Save Vehicle Type
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">Manage type, capacity, base constraints</p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Bike"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (kg)</label>
                        <input 
                          type="number" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="15"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Distance (km)</label>
                        <input 
                          type="number" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Base Speed (km/h)</label>
                        <input 
                          type="number" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="35"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Types Table */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                      <h4 className="font-medium text-gray-900">Vehicle Types</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Distance</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Night Allowed</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {[
                            { type: 'Bike', capacity: '15 kg', maxDistance: '20 km', nightAllowed: 'Yes', status: 'Active' },
                            { type: 'Mini Truck', capacity: '1000 kg', maxDistance: '30 km', nightAllowed: 'Yes', status: 'Active' },
                            { type: 'Tempo', capacity: '2000 kg', maxDistance: '40 km', nightAllowed: 'Yes', status: 'Active' },
                            { type: 'Van', capacity: '500 kg', maxDistance: '25 km', nightAllowed: 'No', status: 'Active' },
                            { type: 'Truck', capacity: '5000 kg', maxDistance: '100 km', nightAllowed: 'Yes', status: 'Active' }
                          ].map((vehicle, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vehicle.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.capacity}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.maxDistance}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.nightAllowed}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                  {vehicle.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center space-x-2">
                                  <button className="text-blue-600 hover:text-blue-800">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-800">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Defaults Section */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Defaults</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bike Base Speed</label>
                        <div className="flex items-center">
                          <input 
                            type="number" 
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue="35"
                          />
                          <span className="ml-2 text-sm text-gray-500">km/h</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mini Truck Base Speed</label>
                        <div className="flex items-center">
                          <input 
                            type="number" 
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue="28"
                          />
                          <span className="ml-2 text-sm text-gray-500">km/h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Management</h3>
                  <div className="space-y-6">
                    {/* Payment Methods */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Accepted Payment Methods</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                            <span className="font-medium text-gray-900">Credit/Debit Cards</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">UPI</div>
                            <span className="font-medium text-gray-900">UPI Payments</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">CASH</div>
                            <span className="font-medium text-gray-900">Cash on Delivery</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Payment Settings */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Payment Settings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Fee (%)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue="2.5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Amount</label>
                          <input 
                            type="number" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue="50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Management</h3>
                  <div className="space-y-6">
                    {/* Available Reports */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Available Reports</h4>
                      <div className="space-y-3">
                        {[
                          { name: 'Daily Revenue Report', description: 'Daily earnings and transaction summary', lastGenerated: '2 hours ago' },
                          { name: 'Partner Performance Report', description: 'Partner ratings, trips, and earnings', lastGenerated: '1 day ago' },
                          { name: 'Customer Analytics Report', description: 'Customer behavior and order patterns', lastGenerated: '3 days ago' },
                          { name: 'Order Summary Report', description: 'Comprehensive order statistics', lastGenerated: '1 week ago' }
                        ].map((report, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div>
                              <h5 className="font-medium text-gray-900">{report.name}</h5>
                              <p className="text-sm text-gray-600">{report.description}</p>
                              <p className="text-xs text-gray-500 mt-1">Last generated: {report.lastGenerated}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </button>
                              <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Report Settings */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Automated Reports</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-200">
                          <div>
                            <h5 className="font-medium text-gray-900">Daily Email Reports</h5>
                            <p className="text-sm text-gray-600">Receive daily summary reports via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-200">
                          <div>
                            <h5 className="font-medium text-gray-900">Weekly Performance Reports</h5>
                            <p className="text-sm text-gray-600">Weekly partner and business performance</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Password Settings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <input 
                            type="password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <input 
                            type="password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between py-4 border border-gray-200 rounded-lg px-4">
                        <div>
                          <h5 className="font-medium text-gray-900">Enable 2FA</h5>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Tab */}
            {activeTab === 'delivery' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Default Delivery Fee</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Delivery Distance (km)</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Average Delivery Time (min)</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>24/7</option>
                        <option>6 AM - 10 PM</option>
                        <option>8 AM - 8 PM</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
              <button className="flex items-center px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
