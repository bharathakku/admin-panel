"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

// Mock customer data
const mockCustomers = {
  'CUST-004': {
    id: 'CUST-004',
    name: 'Anita Patel',
    email: 'anita@mail.com',
    phone: '+91 98xxxxxx',
    location: 'Banashankari, Bangalore',
    customerSince: 'Jan 2022',
    totalOrders: 120,
    pendingComplaints: 1,
    status: 'Active'
  },
  'CUST-001': {
    id: 'CUST-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'HSR Layout, Bangalore',
    customerSince: 'Jun 2023',
    totalOrders: 47,
    pendingComplaints: 0,
    status: 'Active'
  },
  'CUST-002': {
    id: 'CUST-002',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 98765 43211',
    location: 'Koramangala, Bangalore',
    customerSince: 'Aug 2023',
    totalOrders: 32,
    pendingComplaints: 1,
    status: 'Active'
  },
  'CUST-003': {
    id: 'CUST-003',
    name: 'Karthik Reddy',
    email: 'karthik.reddy@email.com',
    phone: '+91 98765 43212',
    location: 'Indiranagar, Bangalore',
    customerSince: 'May 2023',
    totalOrders: 28,
    pendingComplaints: 0,
    status: 'VIP'
  }
};

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id;
  const [activeTab, setActiveTab] = useState('payments');
  
  const customer = mockCustomers[customerId] || mockCustomers['CUST-004'];
  
  const tabs = [
    { id: 'orderHistory', label: 'Order History' },
    { id: 'complaints', label: 'Complaints' },
    { id: 'payments', label: 'Payments' },
    { id: 'reviewsFeedback', label: 'Reviews & Feedback' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            Customer Details — {customer.name}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
            Send Reminder
          </button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
            Block
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            Give Credits
          </button>
        </div>
      </div>

      {/* Customer Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Summary</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Name</p>
            <p className="font-medium text-gray-900">{customer.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Customer Since</p>
            <p className="font-medium text-gray-900">{customer.customerSince}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Phone</p>
            <p className="font-medium text-gray-900">{customer.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="font-medium text-gray-900">{customer.totalOrders}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="font-medium text-gray-900">{customer.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Pending Complaints</p>
            <p className="font-medium text-gray-900">{customer.pendingComplaints}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Tab Navigation */}
        <div className="border-b border-gray-100">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-gray-900 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'orderHistory' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Order History</h4>
              <div className="space-y-4">
                {[
                  {
                    id: 'ORD-1001',
                    date: '12 Aug 2023',
                    from: 'HSR Layout',
                    to: 'MG Road',
                    amount: '₹540',
                    status: 'Completed',
                    driver: 'Ravi Kumar'
                  },
                  {
                    id: 'ORD-1022',
                    date: '11 Jul 2023',
                    from: 'Koramangala',
                    to: 'Whitefield',
                    amount: '₹780',
                    status: 'Completed',
                    driver: 'Amit Singh'
                  },
                  {
                    id: 'ORD-1013',
                    date: '24 Jul 2023',
                    from: 'Indiranagar',
                    to: 'Electronic City',
                    amount: '₹340',
                    status: 'Completed',
                    driver: 'Priya Nair'
                  }
                ].map((order) => (
                  <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{order.id}</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">From</p>
                        <p className="font-medium text-gray-900">{order.from}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">To</p>
                        <p className="font-medium text-gray-900">{order.to}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Driver</p>
                        <p className="font-medium text-gray-900">{order.driver}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'complaints' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Complaints</h4>
              <div className="space-y-4">
                {[
                  {
                    id: 'COMP-001',
                    date: '15 Aug 2023',
                    subject: 'Driver was late for pickup',
                    description: 'The driver arrived 15 minutes late and did not inform me beforehand.',
                    status: 'Resolved',
                    orderId: 'ORD-1001'
                  },
                  {
                    id: 'COMP-002',
                    date: '10 Jul 2023',
                    subject: 'Incorrect billing amount',
                    description: 'I was charged extra amount that was not mentioned in the initial quote.',
                    status: 'Pending',
                    orderId: 'ORD-1022'
                  }
                ].map((complaint) => (
                  <div key={complaint.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">{complaint.subject}</h5>
                        <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                        <p className="text-xs text-gray-500">Order: {complaint.orderId} • {complaint.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Payments</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Txn ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      {
                        txnId: 'TXN-4501',
                        date: '12 Aug 2023',
                        method: 'Card',
                        amount: '₹540',
                        status: 'Success',
                        orderId: 'ORD-1001'
                      },
                      {
                        txnId: 'TXN-4410',
                        date: '11 Jul 2023',
                        method: 'UPI',
                        amount: '₹780',
                        status: 'Pending',
                        orderId: 'ORD-1022'
                      },
                      {
                        txnId: 'TXN-4309',
                        date: '24 Jul 2023',
                        method: 'Card',
                        amount: '₹340',
                        status: 'Refunded',
                        orderId: 'ORD-1013'
                      }
                    ].map((payment) => (
                      <tr key={payment.txnId} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{payment.txnId}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{payment.date}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{payment.method}</td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{payment.amount}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            payment.status === 'Success' ? 'bg-green-100 text-green-800' :
                            payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{payment.orderId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviewsFeedback' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Reviews & Feedback</h4>
              <div className="space-y-4">
                {[
                  {
                    id: 'REV-001',
                    date: '12 Aug 2023',
                    rating: 5,
                    comment: 'Excellent service! Driver was very professional and reached on time.',
                    orderId: 'ORD-1001',
                    driverName: 'Ravi Kumar'
                  },
                  {
                    id: 'REV-002',
                    date: '11 Jul 2023',
                    rating: 4,
                    comment: 'Good experience overall. Driver was polite and vehicle was clean.',
                    orderId: 'ORD-1022',
                    driverName: 'Amit Singh'
                  },
                  {
                    id: 'REV-003',
                    date: '24 Jul 2023',
                    rating: 3,
                    comment: 'Average service. Driver was late but journey was comfortable.',
                    orderId: 'ORD-1013',
                    driverName: 'Priya Nair'
                  }
                ].map((review) => (
                  <div key={review.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}>
                              ⭐
                            </span>
                          ))}
                          <span className="text-sm font-medium text-gray-600">{review.rating}/5</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                        <p className="text-xs text-gray-500">
                          Order: {review.orderId} • Driver: {review.driverName} • {review.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
