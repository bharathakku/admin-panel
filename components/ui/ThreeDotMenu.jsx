"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MoreVertical, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Eye, 
  Edit,
  Trash2,
  Download,
  Share,
  Flag,
  Clock,
  Navigation,
  Star,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  Route
} from 'lucide-react';

export default function ThreeDotMenu({ 
  type = "order", // "order" | "partner" | "customer" | "general"
  itemId,
  itemData = {},
  onAction,
  className = "",
  size = "md" // "sm" | "md" | "lg"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  const buttonSizes = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3"
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleAction = (actionType, data = {}) => {
    setIsOpen(false);
    
    // Handle navigation actions
    if (actionType === 'track') {
      if (type === 'partner') {
        router.push(`/partners/${itemId}/track`);
      } else if (type === 'order') {
        router.push(`/orders/${itemId}/track`);
      }
      return;
    }

    if (actionType === 'view') {
      if (type === 'order') {
        router.push(`/orders/${itemId}`);
      } else if (type === 'partner') {
        router.push(`/partners/${itemId}`);
      } else if (type === 'customer') {
        router.push(`/customers/${itemId}`);
      }
      return;
    }

    // Call parent action handler
    if (onAction) {
      onAction(actionType, { itemId, itemData, ...data });
    }
  };

  const getMenuItems = () => {
    const commonItems = [
      { 
        id: 'view', 
        label: 'View Details', 
        icon: Eye, 
        action: () => handleAction('view'),
        description: 'View complete information'
      },
      { 
        id: 'edit', 
        label: 'Edit', 
        icon: Edit, 
        action: () => handleAction('edit'),
        description: 'Modify details'
      }
    ];

    switch (type) {
      case 'order':
        return [
          ...commonItems,
          { type: 'divider' },
          { 
            id: 'track', 
            label: 'Track Order', 
            icon: MapPin, 
            action: () => handleAction('track'),
            description: 'Real-time tracking',
            highlighted: true
          },
          { 
            id: 'route', 
            label: 'View Route', 
            icon: Route, 
            action: () => handleAction('route'),
            description: 'Show delivery route'
          },
          { 
            id: 'call_customer', 
            label: 'Call Customer', 
            icon: Phone, 
            action: () => handleAction('call', { target: 'customer' }),
            description: itemData.customer?.phone || 'Contact customer'
          },
          { 
            id: 'call_driver', 
            label: 'Call Driver', 
            icon: Phone, 
            action: () => handleAction('call', { target: 'driver' }),
            description: itemData.driver?.phone || 'Contact driver'
          },
          { type: 'divider' },
          { 
            id: 'update_status', 
            label: 'Update Status', 
            icon: RefreshCw, 
            action: () => handleAction('updateStatus'),
            description: 'Change order status'
          },
          { 
            id: 'reassign', 
            label: 'Reassign Driver', 
            icon: Navigation, 
            action: () => handleAction('reassign'),
            description: 'Assign different driver'
          },
          { 
            id: 'priority', 
            label: 'Mark Priority', 
            icon: Flag, 
            action: () => handleAction('priority'),
            description: 'Set as high priority'
          },
          { type: 'divider' },
          { 
            id: 'download', 
            label: 'Download Receipt', 
            icon: Download, 
            action: () => handleAction('download'),
            description: 'PDF receipt'
          },
          { 
            id: 'share', 
            label: 'Share', 
            icon: Share, 
            action: () => handleAction('share'),
            description: 'Share order details'
          },
          { type: 'divider' },
          { 
            id: 'cancel', 
            label: 'Cancel Order', 
            icon: XCircle, 
            action: () => handleAction('cancel'),
            description: 'Cancel this order',
            danger: true
          }
        ];

      case 'partner':
        return [
          ...commonItems,
          { type: 'divider' },
          { 
            id: 'track', 
            label: 'Track Live Location', 
            icon: MapPin, 
            action: () => handleAction('track'),
            description: 'Real-time GPS tracking',
            highlighted: true
          },
          { 
            id: 'call', 
            label: 'Call Partner', 
            icon: Phone, 
            action: () => handleAction('call'),
            description: itemData.phone || 'Contact partner'
          },
          { 
            id: 'message', 
            label: 'Send Message', 
            icon: MessageSquare, 
            action: () => handleAction('message'),
            description: 'Send notification'
          },
          { type: 'divider' },
          { 
            id: 'approve', 
            label: 'Approve Partner', 
            icon: CheckCircle, 
            action: () => handleAction('approve'),
            description: 'Approve for delivery'
          },
          { 
            id: 'suspend', 
            label: 'Suspend', 
            icon: Pause, 
            action: () => handleAction('suspend'),
            description: 'Temporarily suspend'
          },
          { 
            id: 'activate', 
            label: 'Activate', 
            icon: Play, 
            action: () => handleAction('activate'),
            description: 'Make active'
          },
          { 
            id: 'performance', 
            label: 'View Performance', 
            icon: Star, 
            action: () => handleAction('performance'),
            description: 'Ratings and reviews'
          },
          { type: 'divider' },
          { 
            id: 'download_docs', 
            label: 'Download Documents', 
            icon: Download, 
            action: () => handleAction('downloadDocs'),
            description: 'All partner documents'
          },
          { 
            id: 'report', 
            label: 'Report Issue', 
            icon: AlertTriangle, 
            action: () => handleAction('report'),
            description: 'Report a problem',
            danger: true
          },
          { 
            id: 'remove', 
            label: 'Remove Partner', 
            icon: Trash2, 
            action: () => handleAction('remove'),
            description: 'Permanently remove',
            danger: true
          }
        ];

      case 'customer':
        return [
          ...commonItems,
          { type: 'divider' },
          { 
            id: 'call', 
            label: 'Call Customer', 
            icon: Phone, 
            action: () => handleAction('call'),
            description: itemData.phone || 'Contact customer'
          },
          { 
            id: 'message', 
            label: 'Send Message', 
            icon: MessageSquare, 
            action: () => handleAction('message'),
            description: 'Send notification'
          },
          { 
            id: 'orders', 
            label: 'View Orders', 
            icon: Clock, 
            action: () => handleAction('viewOrders'),
            description: 'Order history'
          },
          { type: 'divider' },
          { 
            id: 'block', 
            label: 'Block Customer', 
            icon: XCircle, 
            action: () => handleAction('block'),
            description: 'Block from platform',
            danger: true
          }
        ];

      default:
        return commonItems.concat([
          { type: 'divider' },
          { 
            id: 'delete', 
            label: 'Delete', 
            icon: Trash2, 
            action: () => handleAction('delete'),
            description: 'Remove permanently',
            danger: true
          }
        ]);
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonSizes[size]} text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors`}
        aria-label="More actions"
      >
        <MoreVertical className={sizes[size]} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-40 md:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
            {menuItems.map((item, index) => {
              if (item.type === 'divider') {
                return <div key={index} className="h-px bg-gray-100 my-2" />;
              }

              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start space-x-3 ${
                    item.danger 
                      ? 'text-red-600 hover:bg-red-50' 
                      : item.highlighted 
                        ? 'text-blue-600' 
                        : 'text-gray-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    item.danger 
                      ? 'text-red-500' 
                      : item.highlighted 
                        ? 'text-blue-500' 
                        : 'text-gray-400'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm font-medium ${
                      item.danger ? 'text-red-600' : item.highlighted ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="text-xs text-gray-500 mt-0.5 truncate">
                        {item.description}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
