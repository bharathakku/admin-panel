"use client";
import { useState } from "react";
import { Save, Settings, Globe, Clock, DollarSign, Smartphone, MapPin, Truck, Star, Shield } from "lucide-react";

export default function DeliverySettings({ 
  settings = {},
  onSettingsChange,
  onSave,
  className = ""
}) {
  const [deliverySettings, setDeliverySettings] = useState({
    // Company Information
    company: {
      name: 'DeliveryPro',
      logo: '/logo.png',
      tagline: 'Fast, Reliable, Everywhere',
      website: 'https://deliverypro.com',
      supportEmail: 'support@deliverypro.com',
      supportPhone: '+91 1800 123 4567',
      address: '123 Tech Park, Bangalore, India',
      ...settings?.company
    },
    
    // App Configuration
    app: {
      name: 'DeliveryPro',
      version: '2.1.0',
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      fontFamily: 'Inter',
      language: 'English',
      currency: 'INR',
      currencySymbol: '₹',
      timeZone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24-hour',
      enableDarkMode: true,
      ...settings?.app
    },

    // Operational Settings
    operational: {
      isActive: true,
      is24x7: false,
      operatingHours: {
        start: '06:00',
        end: '23:00',
        breakStart: '14:00',
        breakEnd: '15:00'
      },
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      deliveryRadius: 50,
      maxOrdersPerDriver: 5,
      estimatedDeliveryTime: 30,
      automaticAssignment: true,
      allowScheduledDelivery: true,
      maxScheduleDays: 7,
      ...settings?.operational
    },

    // Features
    features: {
      realTimeTracking: true,
      pushNotifications: true,
      smsNotifications: true,
      emailNotifications: true,
      voiceAlerts: false,
      multiLanguageSupport: false,
      offlineMode: true,
      biometricAuth: true,
      socialLogin: true,
      guestCheckout: true,
      loyaltyProgram: true,
      referralProgram: true,
      ratingSystem: true,
      reviewSystem: true,
      chatSupport: true,
      videoCall: false,
      ...settings?.features
    },

    // Delivery Options
    delivery: {
      standardDelivery: true,
      expressDelivery: true,
      scheduledDelivery: true,
      contactlessDelivery: true,
      signatureRequired: false,
      photoProof: true,
      ageVerification: false,
      packageInspection: true,
      returnOption: true,
      multipleAttempts: 3,
      ...settings?.delivery
    },

    // Payment Settings
    payment: {
      cashOnDelivery: true,
      digitalPayments: true,
      walletPayments: true,
      bankTransfer: false,
      creditPayments: false,
      splitPayments: true,
      tipOption: true,
      refundPolicy: 'auto',
      paymentTimeout: 300,
      ...settings?.payment
    },

    // Security & Privacy
    security: {
      dataEncryption: true,
      twoFactorAuth: false,
      deviceTracking: true,
      fraudDetection: true,
      privacyMode: true,
      dataRetention: 365,
      anonymizeData: true,
      gdprCompliant: true,
      sessionTimeout: 1800,
      ...settings?.security
    },

    // Integrations
    integrations: {
      mapProvider: 'Google Maps',
      paymentGateways: ['Razorpay', 'Stripe', 'PayU'],
      smsProvider: 'Twilio',
      emailProvider: 'SendGrid',
      pushProvider: 'Firebase FCM',
      analyticsProvider: 'Google Analytics',
      crashReporting: 'Sentry',
      socialPlatforms: ['Facebook', 'Google', 'Apple'],
      ...settings?.integrations
    },

    // Performance
    performance: {
      cacheEnabled: true,
      compressionEnabled: true,
      cdnEnabled: true,
      lazyLoadingEnabled: true,
      prefetchEnabled: true,
      backgroundSync: true,
      offlineStorage: '50MB',
      maxConcurrentRequests: 10,
      ...settings?.performance
    },

    ...settings
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('company');

  const updateSetting = (section, key, value) => {
    setDeliverySettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
    onSettingsChange?.(deliverySettings);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.(deliverySettings);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const sections = [
    { id: 'company', label: 'Company Info', icon: Settings },
    { id: 'app', label: 'App Config', icon: Smartphone },
    { id: 'operational', label: 'Operations', icon: Clock },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'payment', label: 'Payments', icon: DollarSign },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'performance', label: 'Performance', icon: MapPin }
  ];

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <label className="text-sm font-medium text-gray-900">{label}</label>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'company':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">Company Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={deliverySettings.company.name}
                  onChange={(e) => updateSetting('company', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={deliverySettings.company.tagline}
                  onChange={(e) => updateSetting('company', 'tagline', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                <input
                  type="url"
                  value={deliverySettings.company.website}
                  onChange={(e) => updateSetting('company', 'website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                <input
                  type="email"
                  value={deliverySettings.company.supportEmail}
                  onChange={(e) => updateSetting('company', 'supportEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                <input
                  type="tel"
                  value={deliverySettings.company.supportPhone}
                  onChange={(e) => updateSetting('company', 'supportPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                <textarea
                  value={deliverySettings.company.address}
                  onChange={(e) => updateSetting('company', 'address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
            </div>
          </div>
        );

      case 'app':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">App Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                <input
                  type="text"
                  value={deliverySettings.app.name}
                  onChange={(e) => updateSetting('app', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
                <input
                  type="text"
                  value={deliverySettings.app.version}
                  onChange={(e) => updateSetting('app', 'version', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={deliverySettings.app.primaryColor}
                    onChange={(e) => updateSetting('app', 'primaryColor', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={deliverySettings.app.primaryColor}
                    onChange={(e) => updateSetting('app', 'primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={deliverySettings.app.currency}
                  onChange={(e) => updateSetting('app', 'currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                <select
                  value={deliverySettings.app.timeZone}
                  onChange={(e) => updateSetting('app', 'timeZone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={deliverySettings.app.language}
                  onChange={(e) => updateSetting('app', 'language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'operational':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">Operational Settings</h4>
            
            <div className="space-y-4">
              <ToggleSwitch
                checked={deliverySettings.operational.isActive}
                onChange={(value) => updateSetting('operational', 'isActive', value)}
                label="Service Active"
                description="Enable/disable delivery services"
              />
              
              <ToggleSwitch
                checked={deliverySettings.operational.is24x7}
                onChange={(value) => updateSetting('operational', 'is24x7', value)}
                label="24x7 Operations"
                description="Operate round the clock"
              />
              
              <ToggleSwitch
                checked={deliverySettings.operational.automaticAssignment}
                onChange={(value) => updateSetting('operational', 'automaticAssignment', value)}
                label="Automatic Driver Assignment"
                description="Auto-assign nearest available driver"
              />
              
              <ToggleSwitch
                checked={deliverySettings.operational.allowScheduledDelivery}
                onChange={(value) => updateSetting('operational', 'allowScheduledDelivery', value)}
                label="Scheduled Delivery"
                description="Allow customers to schedule deliveries"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Radius (km)</label>
                <input
                  type="number"
                  value={deliverySettings.operational.deliveryRadius}
                  onChange={(e) => updateSetting('operational', 'deliveryRadius', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Orders Per Driver</label>
                <input
                  type="number"
                  value={deliverySettings.operational.maxOrdersPerDriver}
                  onChange={(e) => updateSetting('operational', 'maxOrdersPerDriver', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Est. Delivery Time (min)</label>
                <input
                  type="number"
                  value={deliverySettings.operational.estimatedDeliveryTime}
                  onChange={(e) => updateSetting('operational', 'estimatedDeliveryTime', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Schedule Days</label>
                <input
                  type="number"
                  value={deliverySettings.operational.maxScheduleDays}
                  onChange={(e) => updateSetting('operational', 'maxScheduleDays', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {!deliverySettings.operational.is24x7 && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-4">Operating Hours</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={deliverySettings.operational.operatingHours.start}
                      onChange={(e) => updateSetting('operational', 'operatingHours', {
                        ...deliverySettings.operational.operatingHours,
                        start: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Time</label>
                    <input
                      type="time"
                      value={deliverySettings.operational.operatingHours.end}
                      onChange={(e) => updateSetting('operational', 'operatingHours', {
                        ...deliverySettings.operational.operatingHours,
                        end: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Break Start</label>
                    <input
                      type="time"
                      value={deliverySettings.operational.operatingHours.breakStart}
                      onChange={(e) => updateSetting('operational', 'operatingHours', {
                        ...deliverySettings.operational.operatingHours,
                        breakStart: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Break End</label>
                    <input
                      type="time"
                      value={deliverySettings.operational.operatingHours.breakEnd}
                      onChange={(e) => updateSetting('operational', 'operatingHours', {
                        ...deliverySettings.operational.operatingHours,
                        breakEnd: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">App Features</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(deliverySettings.features).map(([key, value]) => (
                <ToggleSwitch
                  key={key}
                  checked={value}
                  onChange={(newValue) => updateSetting('features', key, newValue)}
                  label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                />
              ))}
            </div>
          </div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Delivery App Settings</h3>
          <p className="text-sm text-gray-600 mt-1">Configure your delivery application settings</p>
        </div>
        
        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200">
          <nav className="p-4">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors mb-1 ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
