"use client";
import { useState } from "react";
import { 
  MessageCircle, 
  Star, 
  Clock, 
  User, 
  Send, 
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Paperclip,
  Smile,
  Flag,
  Archive,
  Reply
} from "lucide-react";

export default function CustomerSupportPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [reviewFilter, setReviewFilter] = useState('all');

  // Mock data for active chats
  const activeChats = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      customerEmail: "sarah.j@email.com",
      lastMessage: "My order hasn't arrived yet, can you help?",
      timestamp: "2 min ago",
      status: "active",
      unreadCount: 2,
      priority: "high",
      avatar: "SJ"
    },
    {
      id: 2,
      customerName: "Mike Chen",
      customerEmail: "mike.chen@email.com",
      lastMessage: "Thanks for the quick response!",
      timestamp: "15 min ago",
      status: "resolved",
      unreadCount: 0,
      priority: "normal",
      avatar: "MC"
    },
    {
      id: 3,
      customerName: "Emma Davis",
      customerEmail: "emma.d@email.com",
      lastMessage: "The partner was very rude to me",
      timestamp: "1 hour ago",
      status: "pending",
      unreadCount: 1,
      priority: "high",
      avatar: "ED"
    },
    {
      id: 4,
      customerName: "John Smith",
      customerEmail: "john.smith@email.com",
      lastMessage: "Can I get a refund for order #1234?",
      timestamp: "2 hours ago",
      status: "active",
      unreadCount: 3,
      priority: "normal",
      avatar: "JS"
    }
  ];

  // Mock data for chat messages
  const chatMessages = {
    1: [
      {
        id: 1,
        sender: "customer",
        message: "Hi, I placed an order 2 hours ago but haven't received any updates",
        timestamp: "14:30",
        avatar: "SJ"
      },
      {
        id: 2,
        sender: "support",
        message: "Hi Sarah! I'm sorry to hear about the delay. Let me check your order status for you.",
        timestamp: "14:32",
        avatar: "CS"
      },
      {
        id: 3,
        sender: "customer",
        message: "My order ID is #ORD-2024-0156",
        timestamp: "14:33",
        avatar: "SJ"
      },
      {
        id: 4,
        sender: "support",
        message: "I can see your order is currently with our partner and should arrive within the next 20 minutes. I'll send you the tracking link.",
        timestamp: "14:35",
        avatar: "CS"
      },
      {
        id: 5,
        sender: "customer",
        message: "My order hasn't arrived yet, can you help?",
        timestamp: "14:58",
        avatar: "SJ"
      }
    ]
  };

  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      customerName: "Alice Williams",
      rating: 5,
      comment: "Excellent service! The partner was very professional and the food arrived hot and fresh.",
      orderId: "#ORD-2024-0145",
      timestamp: "2 hours ago",
      status: "published",
      partnerName: "Raj Kumar",
      category: "Food Delivery"
    },
    {
      id: 2,
      customerName: "Bob Martinez",
      rating: 2,
      comment: "The partner was late and the food was cold. Very disappointing experience.",
      orderId: "#ORD-2024-0142",
      timestamp: "5 hours ago",
      status: "pending",
      partnerName: "Priya Singh",
      category: "Food Delivery"
    },
    {
      id: 3,
      customerName: "Carol Lee",
      rating: 4,
      comment: "Good service overall, but took longer than expected. Partner was polite though.",
      orderId: "#ORD-2024-0138",
      timestamp: "1 day ago",
      status: "published",
      partnerName: "Mohammed Ali",
      category: "Package Delivery"
    },
    {
      id: 4,
      customerName: "David Brown",
      rating: 1,
      comment: "Terrible experience. Partner was rude and unprofessional. Will not use again.",
      orderId: "#ORD-2024-0135",
      timestamp: "2 days ago",
      status: "flagged",
      partnerName: "Anjali Sharma",
      category: "Food Delivery"
    }
  ];

  const filteredReviews = reviewFilter === 'all' ? reviews : reviews.filter(review => review.status === reviewFilter);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mobile-container sm:space-y-6">
      <div className="mobile-header sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="mobile-header-title sm:text-3xl sm:font-bold text-gray-900">Customer Support</h1>
          <p className="mobile-text-sm sm:text-gray-600 sm:mt-1">Manage customer reviews and provide real-time support</p>
        </div>
      </div>

      {/* Support Metrics */}
      <div className="mobile-grid-1 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Chats</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">+3</span>
              <span className="text-gray-600 ml-1">from yesterday</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">2.5 min</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">-30s</span>
              <span className="text-gray-600 ml-1">improvement</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <span className="text-yellow-600 font-medium">2 flagged</span>
              <span className="text-gray-600 ml-1">need attention</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">94.5%</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">+1.2%</span>
              <span className="text-gray-600 ml-1">this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mobile-card sm:bg-white sm:rounded-xl sm:border sm:border-gray-100 sm:shadow-sm sm:overflow-hidden">
        <div className="border-b border-gray-100">
          <nav className="mobile-btn-group sm:flex sm:space-x-8 mobile-container sm:px-6">
            <button
              onClick={() => setActiveTab('chat')}
              className={`mobile-nav-item sm:py-4 sm:px-1 sm:border-b-2 font-medium mobile-text-sm sm:text-sm transition-colors ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-600 bg-blue-600 text-white sm:bg-transparent sm:text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Live Chat Support
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`mobile-nav-item sm:py-4 sm:px-1 sm:border-b-2 font-medium mobile-text-sm sm:text-sm transition-colors ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600 bg-blue-600 text-white sm:bg-transparent sm:text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Star className="w-4 h-4 inline mr-2" />
              Reviews Management
            </button>
          </nav>
        </div>

        {/* Chat Support Tab */}
        {activeTab === 'chat' && (
          <div className="mobile-stack sm:flex h-auto sm:h-[600px]">
            {/* Chat List */}
            <div className="mobile-full-width sm:w-1/3 sm:border-r sm:border-gray-100 flex flex-col mobile-card-compact sm:bg-transparent sm:border-none sm:rounded-none sm:shadow-none sm:p-0 sm:m-0">
              <div className="mobile-container sm:p-4 sm:border-b sm:border-gray-100">
                <div className="mobile-search-container sm:relative">
                  <Search className="mobile-search-icon sm:absolute sm:left-3 sm:top-1/2 sm:transform sm:-translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="mobile-search-input sm:w-full sm:pl-10 sm:pr-4 sm:py-2 sm:border sm:border-gray-200 sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {activeChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 ${
                      selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-100' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {chat.avatar}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {chat.customerName}
                          </p>
                          <div className="flex items-center space-x-1">
                            {chat.unreadCount > 0 && (
                              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                                {chat.unreadCount}
                              </span>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(chat.status)}`}>
                              {chat.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 truncate mt-1">
                          {chat.lastMessage}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">{chat.timestamp}</span>
                          {chat.priority === 'high' && (
                            <Flag className="w-3 h-3 text-red-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {selectedChat.avatar}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{selectedChat.customerName}</h3>
                          <p className="text-sm text-gray-500">{selectedChat.customerEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {(chatMessages[selectedChat.id] || []).map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'support' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.sender === 'support' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                            {msg.avatar}
                          </div>
                          <div className={`px-4 py-2 rounded-lg ${
                            msg.sender === 'support' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'support' ? 'text-blue-100' : 'text-gray-500'}`}>
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Smile className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose a chat from the list to start helping customers</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews Management Tab */}
        {activeTab === 'reviews' && (
          <div className="mobile-container sm:p-6">
            {/* Reviews Header */}
            <div className="mobile-stack sm:flex sm:items-center sm:justify-between mb-6">
              <div className="mobile-stack sm:flex sm:items-center sm:space-x-4">
                <div className="mobile-search-container sm:relative">
                  <Search className="mobile-search-icon sm:absolute sm:left-3 sm:top-1/2 sm:transform sm:-translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    className="mobile-search-input sm:pl-10 sm:pr-4 sm:py-2 sm:border sm:border-gray-200 sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={reviewFilter}
                  onChange={(e) => setReviewFilter(e.target.value)}
                  className="mobile-btn sm:px-4 sm:py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Reviews</option>
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
            </div>

            {/* Reviews List */}
            <div className="mobile-spacing-normal">
              {filteredReviews.map((review) => (
                <div key={review.id} className="mobile-card sm:bg-gray-50 sm:rounded-lg sm:p-6 sm:border sm:border-gray-100">
                  <div className="mobile-stack sm:flex sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mobile-stack sm:flex sm:items-center sm:space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                            {review.customerName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{review.customerName}</h4>
                            <p className="mobile-text-sm text-gray-500">{review.timestamp}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? `fill-current ${getRatingColor(review.rating)}`
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 mobile-text-sm font-medium text-gray-600">
                            ({review.rating}.0)
                          </span>
                        </div>

                        <span className={`px-3 py-1 rounded-full mobile-text-xs font-medium ${
                          review.status === 'published' ? 'bg-green-100 text-green-800' :
                          review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {review.status}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      
                      <div className="mobile-stack sm:flex sm:items-center sm:space-x-6 mobile-text-sm text-gray-500">
                        <span>Order: {review.orderId}</span>
                        <span>Partner: {review.partnerName}</span>
                        <span>Category: {review.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-2 sm:ml-4 mt-4 sm:mt-0">
                      <button className="mobile-touch-target p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Reply className="w-4 h-4" />
                      </button>
                      <button className="mobile-touch-target p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="mobile-touch-target p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                        <Flag className="w-4 h-4" />
                      </button>
                      <button className="mobile-touch-target p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                        <Archive className="w-4 h-4" />
                      </button>
                      <button className="mobile-touch-target p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
