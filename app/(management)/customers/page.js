"use client";
import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/DataTable";
import StatsCard from "@/components/ui/StatsCard";
import { 
  Users, 
  UserPlus, 
  Star, 
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Eye,
  Download,
  Plus,
  MoreVertical,
  UserX,
  Trash2,
  Search
} from "lucide-react";
import Link from "next/link";

// Mock customers data
const customers = [
  {
    id: 'CUST-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'HSR Layout, Bangalore',
    totalOrders: 47,
    totalSpent: 12450,
    rating: 4.8,
    joinDate: '2023-06-15',
    lastOrder: '2024-01-15',
    status: 'Active'
  },
  {
    id: 'CUST-002',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 98765 43211',
    location: 'Koramangala, Bangalore',
    totalOrders: 32,
    totalSpent: 8960,
    rating: 4.6,
    joinDate: '2023-08-22',
    lastOrder: '2024-01-14',
    status: 'Active'
  },
  {
    id: 'CUST-003',
    name: 'Karthik Reddy',
    email: 'karthik.reddy@email.com',
    phone: '+91 98765 43212',
    location: 'Indiranagar, Bangalore',
    totalOrders: 28,
    totalSpent: 7340,
    rating: 4.9,
    joinDate: '2023-05-10',
    lastOrder: '2024-01-13',
    status: 'Active'
  },
  {
    id: 'CUST-004',
    name: 'Anita Desai',
    email: 'anita.desai@email.com',
    phone: '+91 98765 43215',
    location: 'Banashankari, Bangalore',
    totalOrders: 52,
    totalSpent: 16800,
    rating: 4.7,
    joinDate: '2023-04-03',
    lastOrder: '2024-01-12',
    status: 'VIP'
  }
];

const customerColumns = [
  { 
    key: 'name', 
    label: 'Customer',
    render: (name, row) => (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
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
    key: 'totalOrders', 
    label: 'Orders',
    render: (totalOrders, row) => (
      <div>
        <p className="font-semibold text-gray-900">{totalOrders}</p>
        <p className="text-xs text-gray-500">₹{row.totalSpent.toLocaleString()}</p>
      </div>
    )
  },
  { 
    key: 'rating', 
    label: 'Rating',
    render: (rating) => (
      <div className="flex items-center">
        <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
        <span className="font-medium text-gray-900">{rating}</span>
      </div>
    )
  },
  { 
    key: 'status', 
    label: 'Status',
    render: (status) => {
      const statusColors = {
        'Active': 'bg-green-50 text-green-600 border-green-200',
        'Inactive': 'bg-gray-50 text-gray-600 border-gray-200',
        'VIP': 'bg-purple-50 text-purple-600 border-purple-200'
      };
      return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[status]}`}>
          {status}
        </span>
      );
    }
  }
];

// Customer Actions Menu Component
function CustomerActionsMenu({ customerId, customerName, onDelete, onSuspend }) {
  const router = useRouter();
  
  const handleView = () => {
    router.push(`/customers/${customerId}`);
  };

  const handleSuspend = () => {
    if (onSuspend) {
      onSuspend(customerId, customerName);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(customerId, customerName);
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

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customersList, setCustomersList] = useState(customers);

  const handleDeleteCustomer = (customerId, customerName) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${customerName}? This action cannot be undone.`);
    if (confirmed) {
      setCustomersList(customersList.filter(c => c.id !== customerId));
      console.log(`Deleted customer: ${customerId}`);
    }
  };

  const handleSuspendCustomer = (customerId, customerName) => {
    const confirmed = window.confirm(`Are you sure you want to suspend ${customerName}?`);
    if (confirmed) {
      setCustomersList(customersList.map(c => 
        c.id === customerId 
          ? { ...c, status: c.status === 'Suspended' ? 'Active' : 'Suspended' }
          : c
      ));
      console.log(`Suspended customer: ${customerId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Manage your customer base and track their activity</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Customers"
          value={customers.length.toString()}
          change="+12"
          changeType="positive"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Active Customers"
          value={customers.filter(c => c.status === 'Active' || c.status === 'VIP').length.toString()}
          change="+8"
          changeType="positive"
          icon={UserPlus}
          color="green"
        />
        <StatsCard
          title="Total Revenue"
          value="₹45K"
          change="+15.3%"
          changeType="positive"
          icon={ShoppingBag}
          color="purple"
        />
        <StatsCard
          title="Avg Rating"
          value="4.7"
          change="+0.2"
          changeType="positive"
          icon={Star}
          color="yellow"
        />
      </div>

      {/* Search */}
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">All Customers</h2>
          <p className="text-sm text-gray-600 mt-1">Complete list of registered customers</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customersList
                .filter(customer => 
                  customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  customer.phone.includes(searchTerm)
                )
                .map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <Link 
                          href={`/customers/${customer.id}`}
                          className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                        >
                          {customer.name}
                        </Link>
                        <p className="text-sm text-gray-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center text-sm text-gray-900 mb-1">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-semibold text-gray-900">{customer.totalOrders}</p>
                      <p className="text-xs text-gray-500">₹{customer.totalSpent.toLocaleString()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                      <span className="font-medium text-gray-900">{customer.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                      customer.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' :
                      customer.status === 'VIP' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                      customer.status === 'Suspended' ? 'bg-red-50 text-red-600 border-red-200' :
                      'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <CustomerActionsMenu 
                      customerId={customer.id}
                      customerName={customer.name}
                      onDelete={handleDeleteCustomer}
                      onSuspend={handleSuspendCustomer}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
