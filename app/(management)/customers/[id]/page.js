"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, MapPin, X, Send, CreditCard, Check } from "lucide-react";

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
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');
  const [selectedCreditAmount, setSelectedCreditAmount] = useState(null);
  
  const customer = mockCustomers[customerId] || mockCustomers['CUST-004'];
  
  // Predefined reminder messages
  const predefinedMessages = [
    "Dear customer, your order is ready for pickup. Please collect it at your earliest convenience.",
    "Hi! We noticed you have pending payments. Please complete your payment to avoid service interruption.",
    "Reminder: Your scheduled delivery is coming up soon. Please be available at the delivery location.",
    "Hello! We have great offers for you. Check out our latest services and book your next ride.",
    "Thank you for being our valued customer. Don't forget to rate your recent experience with us."
  ];
  
  // Credit amount options
  const creditOptions = [
    { amount: 50, label: "₹50 - Welcome Credit", description: "New customer welcome bonus" },
    { amount: 100, label: "₹100 - Loyalty Reward", description: "For loyal customers" },
    { amount: 200, label: "₹200 - Compensation", description: "Service issue compensation" },
    { amount: 500, label: "₹500 - Premium Credit", description: "Special occasion credit" },
    { amount: 'custom', label: "Custom Amount", description: "Enter custom credit amount" }
  ];
  
  const [customCreditAmount, setCustomCreditAmount] = useState('');
  
  const handleSendReminder = () => {
    if (reminderMessage.trim()) {
      // Here you would typically send the reminder via API
      console.log('Sending reminder:', reminderMessage);
      alert(`Reminder sent to ${customer.name}!`);
      setShowReminderModal(false);
      setReminderMessage('');
    }
  };
  
  const handleGiveCredits = () => {
    const creditAmount = selectedCreditAmount === 'custom' ? customCreditAmount : selectedCreditAmount;
    if (creditAmount) {
      // Here you would typically add credits via API
      console.log('Adding credits:', creditAmount);
      alert(`₹${creditAmount} credits added to ${customer.name}'s account!`);
      setShowCreditsModal(false);
      setSelectedCreditAmount(null);
      setCustomCreditAmount('');
    }
  };
  
  const tabs = [
    { id: 'orderHistory', label: 'Order History' },
    { id: 'complaints', label: 'Complaints' },
    { id: 'payments', label: 'Payments' },
    { id: 'reviewsFeedback', label: 'Reviews & Feedback' }
  ];

  return (
    <div className="mobile-container sm:space-y-6">
      {/* Header */}
      <div className="mobile-header sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="mobile-touch-target p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="mobile-header-title sm:text-xl sm:font-bold text-gray-900">
            Customer Details — {customer.name}
          </h1>
        </div>
        <div className="mobile-btn-group sm:flex sm:items-center sm:space-x-3">
          <button 
            onClick={() => setShowReminderModal(true)}
            className="mobile-btn sm:px-4 sm:py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Reminder
          </button>
          <button className="mobile-btn sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
            Block
          </button>
          <button 
            onClick={() => setShowCreditsModal(true)}
            className="mobile-btn sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            <CreditCard className="w-4 h-4 mr-2" />
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
          <nav className="mobile-nav-tabs sm:flex sm:space-x-8 sm:px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`mobile-nav-tab sm:py-4 sm:px-1 font-medium mobile-text-sm sm:text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-gray-900 text-gray-900 bg-black text-white sm:bg-transparent sm:text-gray-900'
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
              
              {/* Desktop Table */}
              <div className="responsive-hide-mobile overflow-x-auto">
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
              
              {/* Mobile Card View */}
              <div className="responsive-show-mobile space-y-4">
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
                  <div key={payment.txnId} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{payment.txnId}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          payment.status === 'Success' ? 'bg-green-100 text-green-800' :
                          payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{payment.amount}</p>
                        <p className="text-xs text-gray-500">{payment.date}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Method</p>
                        <p className="font-medium text-gray-900">{payment.method}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Order</p>
                        <p className="font-medium text-gray-900">{payment.orderId}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
      
      {/* Send Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Send Reminder</h3>
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="mobile-touch-target p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">Send reminder to: <strong>{customer.name}</strong></p>
                <p className="text-sm text-gray-500 mb-4">Phone: {customer.phone} | Email: {customer.email}</p>
              </div>
              
              {/* Predefined Messages */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Select:</label>
                <div className="space-y-2">
                  {predefinedMessages.map((message, index) => (
                    <button
                      key={index}
                      onClick={() => setReminderMessage(message)}
                      className="w-full text-left p-3 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    >
                      {message.substring(0, 60)}...
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Custom Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Message:</label>
                <textarea
                  value={reminderMessage}
                  onChange={(e) => setReminderMessage(e.target.value)}
                  placeholder="Type your custom reminder message here..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                />
                <p className="text-xs text-gray-500 mt-1">{reminderMessage.length}/500 characters</p>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReminder}
                  disabled={!reminderMessage.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Give Credits Modal */}
      {showCreditsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Give Credits</h3>
                <button
                  onClick={() => setShowCreditsModal(false)}
                  className="mobile-touch-target p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Add credits to: <strong>{customer.name}</strong></p>
                <p className="text-sm text-gray-500 mb-4">Customer ID: {customer.id}</p>
              </div>
              
              {/* Credit Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Credit Amount:</label>
                <div className="space-y-2">
                  {creditOptions.map((option, index) => (
                    <div key={index}>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="creditAmount"
                          value={option.amount}
                          checked={selectedCreditAmount === option.amount}
                          onChange={(e) => setSelectedCreditAmount(e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                        {selectedCreditAmount === option.amount && (
                          <Check className="w-5 h-5 text-green-600" />
                        )}
                      </label>
                      
                      {/* Custom Amount Input */}
                      {option.amount === 'custom' && selectedCreditAmount === 'custom' && (
                        <div className="mt-2 ml-8">
                          <input
                            type="number"
                            value={customCreditAmount}
                            onChange={(e) => setCustomCreditAmount(e.target.value)}
                            placeholder="Enter amount (₹)"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="1"
                            max="10000"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreditsModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGiveCredits}
                  disabled={!selectedCreditAmount || (selectedCreditAmount === 'custom' && !customCreditAmount)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add Credits
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
