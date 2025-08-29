"use client";
import { Bell, AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Order Completed",
      message: "Order #ORD-912340 has been successfully delivered",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "warning", 
      title: "Driver Delayed",
      message: "Driver Amit Kumar is running 15 minutes behind schedule",
      time: "5 minutes ago",
      read: false
    },
    {
      id: 3,
      type: "info",
      title: "New Customer Registration", 
      message: "A new customer has registered: John Doe",
      time: "10 minutes ago",
      read: true
    },
    {
      id: 4,
      type: "error",
      title: "Payment Failed",
      message: "Payment for order #ORD-912341 has failed",
      time: "15 minutes ago", 
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning": return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "error": return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Stay updated with system alerts and messages</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-blue-50 text-blue-600 px-3 py-2 rounded-lg">
            <Bell className="w-4 h-4 mr-2" />
            <span className="font-medium">{unreadCount} Unread</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
        </div>
        
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`px-6 py-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50/30' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full absolute left-2 top-6"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
