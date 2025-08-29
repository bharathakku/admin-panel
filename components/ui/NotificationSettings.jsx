"use client";
import { useState } from "react";
import { Bell, Mail, Smartphone, Save, Settings, AlertCircle, Check, Users } from "lucide-react";

export default function NotificationSettings({ 
  settings = {},
  onSettingsChange,
  onSave,
  className = ""
}) {
  const [notificationSettings, setNotificationSettings] = useState({
    orders: {
      orderPlaced: { email: true, sms: false, push: true },
      orderCancelled: { email: true, sms: true, push: true },
      orderDelayed: { email: true, sms: false, push: true },
      orderDelivered: { email: false, sms: false, push: true },
      refundIssued: { email: true, sms: true, push: false },
      paymentFailed: { email: true, sms: true, push: true }
    },
    partners: {
      partnerAssigned: { email: true, sms: false, push: true },
      etaUpdated: { email: false, sms: false, push: true },
      locationLost: { email: true, sms: true, push: true },
      deliveryCompleted: { email: false, sms: false, push: true },
      partnerOnline: { email: false, sms: false, push: false },
      partnerOffline: { email: true, sms: false, push: true }
    },
    customers: {
      customerRegistered: { email: true, sms: false, push: false },
      customerComplaint: { email: true, sms: false, push: true },
      feedbackSubmitted: { email: false, sms: false, push: false },
      loyaltyMilestone: { email: true, sms: true, push: true }
    },
    system: {
      billingUpdates: { email: true, sms: false, push: false },
      weeklyReports: { email: true, sms: false, push: false },
      securityAlerts: { email: true, sms: true, push: true },
      featureAnnouncements: { email: false, sms: false, push: false },
      systemMaintenance: { email: true, sms: true, push: true },
      dataBackupStatus: { email: true, sms: false, push: false }
    },
    customRules: {
      highValueOrder: { email: true, sms: true, push: true, threshold: 1000 },
      stuckInTransit: { email: true, sms: true, push: true, duration: 120 },
      cashCollectionPending: { email: true, sms: false, push: true },
      unusualActivity: { email: true, sms: true, push: true },
      lowDriverAvailability: { email: true, sms: false, push: true }
    },
    ...settings
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateNotificationSetting = (category, setting, channel, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: {
          ...prev[category][setting],
          [channel]: value
        }
      }
    }));
    setHasChanges(true);
    onSettingsChange?.(notificationSettings);
  };

  const updateCustomRule = (setting, field, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      customRules: {
        ...prev.customRules,
        [setting]: {
          ...prev.customRules[setting],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const toggleAllForCategory = (category, channel, enabled) => {
    setNotificationSettings(prev => {
      const updated = { ...prev };
      Object.keys(updated[category]).forEach(setting => {
        if (updated[category][setting][channel] !== undefined) {
          updated[category][setting][channel] = enabled;
        }
      });
      return updated;
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.(notificationSettings);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const NotificationToggle = ({ checked, onChange, channel }) => {
    const getChannelIcon = () => {
      switch (channel) {
        case 'email': return <Mail className="w-3 h-3" />;
        case 'sms': return <Smartphone className="w-3 h-3" />;
        case 'push': return <Bell className="w-3 h-3" />;
        default: return null;
      }
    };

    return (
      <button
        onClick={() => onChange(!checked)}
        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
          checked
            ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        title={`${channel} notifications`}
      >
        {checked ? <Check className="w-4 h-4" /> : getChannelIcon()}
      </button>
    );
  };

  const NotificationSection = ({ title, category, icon: Icon, settings }) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 flex items-center">
            <Icon className="w-5 h-5 mr-2 text-blue-600" />
            {title}
          </h4>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-500">Bulk:</span>
            <button
              onClick={() => toggleAllForCategory(category, 'email', true)}
              className="text-blue-600 hover:text-blue-800"
            >
              Enable Email
            </button>
            <button
              onClick={() => toggleAllForCategory(category, 'email', false)}
              className="text-red-600 hover:text-red-800"
            >
              Disable Email
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 border-b border-gray-100 pb-2">
            <div className="col-span-6">Notification Type</div>
            <div className="col-span-2 text-center">Email</div>
            <div className="col-span-2 text-center">SMS</div>
            <div className="col-span-2 text-center">Push</div>
          </div>
          
          {Object.entries(settings).map(([key, config]) => (
            <div key={key} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-6">
                <div className="text-sm font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
                {config.description && (
                  <div className="text-xs text-gray-500 mt-1">{config.description}</div>
                )}
              </div>
              
              <div className="col-span-2 flex justify-center">
                <NotificationToggle
                  checked={config.email}
                  onChange={(value) => updateNotificationSetting(category, key, 'email', value)}
                  channel="email"
                />
              </div>
              
              <div className="col-span-2 flex justify-center">
                <NotificationToggle
                  checked={config.sms}
                  onChange={(value) => updateNotificationSetting(category, key, 'sms', value)}
                  channel="sms"
                />
              </div>
              
              <div className="col-span-2 flex justify-center">
                <NotificationToggle
                  checked={config.push}
                  onChange={(value) => updateNotificationSetting(category, key, 'push', value)}
                  channel="push"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
          <p className="text-gray-600 mt-1">Control how and when notifications are delivered across different channels</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationSection
          title="Order Notifications"
          category="orders"
          icon={Bell}
          settings={notificationSettings.orders}
        />
        
        <NotificationSection
          title="Partner Notifications"
          category="partners"
          icon={Users}
          settings={notificationSettings.partners}
        />
        
        <NotificationSection
          title="Customer Notifications"
          category="customers"
          icon={Users}
          settings={notificationSettings.customers}
        />
        
        <NotificationSection
          title="System Notifications"
          category="system"
          icon={Settings}
          settings={notificationSettings.system}
        />
      </div>

      {/* Custom Rules Section */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-orange-50 border-b border-orange-200">
          <h4 className="font-medium text-gray-900 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
            Custom Notification Rules
          </h4>
          <p className="text-sm text-gray-600 mt-1">Configure advanced notification triggers with custom thresholds</p>
        </div>
        
        <div className="p-4 space-y-6">
          {Object.entries(notificationSettings.customRules).map(([key, config]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h5>
              </div>
              
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4">
                  {config.threshold !== undefined && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Threshold</label>
                      <input
                        type="number"
                        value={config.threshold}
                        onChange={(e) => updateCustomRule(key, 'threshold', parseInt(e.target.value))}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Amount"
                      />
                    </div>
                  )}
                  {config.duration !== undefined && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Duration (minutes)</label>
                      <input
                        type="number"
                        value={config.duration}
                        onChange={(e) => updateCustomRule(key, 'duration', parseInt(e.target.value))}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Minutes"
                      />
                    </div>
                  )}
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <NotificationToggle
                    checked={config.email}
                    onChange={(value) => updateNotificationSetting('customRules', key, 'email', value)}
                    channel="email"
                  />
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <NotificationToggle
                    checked={config.sms}
                    onChange={(value) => updateNotificationSetting('customRules', key, 'sms', value)}
                    channel="sms"
                  />
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <NotificationToggle
                    checked={config.push}
                    onChange={(value) => updateNotificationSetting('customRules', key, 'push', value)}
                    channel="push"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Channels Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">Channel Configuration</h4>
          <p className="text-sm text-gray-600 mt-1">Configure delivery channels and settings</p>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Settings */}
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email Settings
            </h5>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">From Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="noreply@yourapp.com"
                  defaultValue="noreply@deliveryapp.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Reply-To</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="support@yourapp.com"
                  defaultValue="support@deliveryapp.com"
                />
              </div>
            </div>
          </div>

          {/* SMS Settings */}
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900 flex items-center">
              <Smartphone className="w-4 h-4 mr-2" />
              SMS Settings
            </h5>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">SMS Provider</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Twilio</option>
                  <option>AWS SNS</option>
                  <option>TextLocal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Sender ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="DELIVERY"
                  defaultValue="DLVAPP"
                />
              </div>
            </div>
          </div>

          {/* Push Settings */}
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900 flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Push Settings
            </h5>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Provider</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Firebase FCM</option>
                  <option>Apple APNS</option>
                  <option>OneSignal</option>
                </select>
              </div>
              <div>
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  Badge Updates
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Notifications */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-4">Test Notifications</h4>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
            Send Test Email
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
            Send Test SMS
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm">
            Send Test Push
          </button>
        </div>
      </div>

      {/* Save Changes Banner */}
      {hasChanges && (
        <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-yellow-800">
                You have unsaved changes
              </span>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="ml-4 px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
