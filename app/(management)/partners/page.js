"use client";
import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import DataTable from "@/components/ui/DataTable";
import { Search, Plus, MoreVertical, Eye, UserX, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock partners data
const partnersData = [
  {
    id: 'PTR-1001',
    name: 'Ravi Kumar',
    contact: '+91 98xxxxxx',
    status: 'Active',
    subscription: 'Pro',
    rating: 4.6,
    totalTrips: 128,
    pendingIssues: 2,
    lastActive: '2h ago',
    email: 'ravi@example.com'
  },
  {
    id: 'PTR-1002', 
    name: 'Sneha Sharma',
    contact: '+91 99xxxxxx',
    status: 'Verification',
    subscription: 'Basic',
    rating: 4.2,
    totalTrips: 45,
    pendingIssues: 1,
    lastActive: '1d ago',
    email: 'sneha@example.com'
  },
  {
    id: 'PTR-1003',
    name: 'Amit Patel',
    contact: '+91 97xxxxxx', 
    status: 'Active',
    subscription: 'Premium',
    rating: 4.8,
    totalTrips: 234,
    pendingIssues: 0,
    lastActive: '30min ago',
    email: 'amit@example.com'
  },
  {
    id: 'PTR-1004',
    name: 'Priya Singh',
    contact: '+91 96xxxxxx',
    status: 'Suspended',
    subscription: 'Pro',
    rating: 3.9,
    totalTrips: 89,
    pendingIssues: 3,
    lastActive: '3d ago',
    email: 'priya@example.com'
  }
];

const partnerColumns = [
  { 
    key: 'name', 
    label: 'Name',
    render: (name, row) => (
      <Link 
        href={`/partners/${row.id}`}
        className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
      >
        {name}
      </Link>
    )
  },
  { key: 'contact', label: 'Contact' },
  {
    key: 'status',
    label: 'Status', 
    render: (status) => {
      const statusColors = {
        'Active': 'bg-green-50 text-green-600 border-green-200',
        'Verification': 'bg-yellow-50 text-yellow-600 border-yellow-200', 
        'Suspended': 'bg-red-50 text-red-600 border-red-200',
        'Inactive': 'bg-gray-50 text-gray-600 border-gray-200'
      };
      return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
          {status}
        </span>
      );
    }
  },
  {
    key: 'subscription',
    label: 'Subscription',
    render: (subscription) => {
      const subColors = {
        'Basic': 'bg-gray-50 text-gray-600',
        'Pro': 'bg-blue-50 text-blue-600', 
        'Premium': 'bg-purple-50 text-purple-600'
      };
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded ${subColors[subscription] || 'bg-gray-50 text-gray-600'}`}>
          {subscription}
        </span>
      );
    }
  },
  {
    key: 'rating',
    label: 'Rating',
    render: (rating) => (
      <span className="text-sm font-medium text-gray-900">{rating}</span>
    )
  }
];

// Partner Actions Menu Component
function PartnerActionsMenu({ partnerId, partnerName, onDelete, onSuspend }) {
  const router = useRouter();
  
  const handleView = () => {
    router.push(`/partners/${partnerId}`);
  };

  const handleSuspend = () => {
    if (onSuspend) {
      onSuspend(partnerId, partnerName);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(partnerId, partnerName);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-xl ring-1 ring-black/5 focus:outline-none z-50">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleView}
                  className={`flex items-center w-full px-3 py-2 text-sm ${
                    active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  <Eye className="w-4 h-4 mr-3 text-gray-400" />
                  View Details
                </button>
              )}
            </Menu.Item>
            
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSuspend}
                  className={`flex items-center w-full px-3 py-2 text-sm ${
                    active ? 'bg-gray-50 text-orange-600' : 'text-orange-600'
                  }`}
                >
                  <UserX className="w-4 h-4 mr-3 text-orange-400" />
                  Suspend
                </button>
              )}
            </Menu.Item>
            
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDelete}
                  className={`flex items-center w-full px-3 py-2 text-sm ${
                    active ? 'bg-gray-50 text-red-600' : 'text-red-600'
                  }`}
                >
                  <Trash2 className="w-4 h-4 mr-3 text-red-400" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function PartnersPage() {
  const [partners, setPartners] = useState(partnersData);

  const handleDeletePartner = (partnerId, partnerName) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${partnerName}? This action cannot be undone.`);
    if (confirmed) {
      setPartners(partners.filter(p => p.id !== partnerId));
      // Here you would also make an API call to delete the partner
      console.log(`Deleted partner: ${partnerId}`);
    }
  };

  const handleSuspendPartner = (partnerId, partnerName) => {
    const confirmed = window.confirm(`Are you sure you want to suspend ${partnerName}?`);
    if (confirmed) {
      setPartners(partners.map(p => 
        p.id === partnerId 
          ? { ...p, status: p.status === 'Suspended' ? 'Active' : 'Suspended' }
          : p
      ));
      // Here you would also make an API call to update partner status
      console.log(`Suspended partner: ${partnerId}`);
    }
  };

  return (
    <div className="mobile-container sm:space-y-6">
      {/* Header */}
      <div className="mobile-header sm:flex sm:items-center sm:justify-between">
        <h1 className="mobile-header-title sm:text-2xl sm:font-bold text-gray-900">Partners</h1>
        <button className="mobile-btn sm:flex sm:items-center sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </button>
      </div>

      {/* Partners Table */}
      <DataTable
        title="Partners List"
        description="Manage your delivery partners and their information"
        columns={partnerColumns}
        data={partners}
        actions={true}
        searchable={true}
        filterable={true}
        entityType="partner"
      />
    </div>
  );
}
