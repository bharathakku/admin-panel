"use client";
import { useState, Fragment } from "react";
import { useParams, useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeft, Download, Mail, X, FileText } from "lucide-react";
import ThreeDotMenu from "@/components/ui/ThreeDotMenu";

// Mock partner data
const mockPartners = {
  'PTR-1001': {
    id: 'PTR-1001',
    name: 'Ravi Kumar',
    phone: '+91 9876543210',
    email: 'ravi@example.com',
    subscription: 'Pro',
    avgRating: 4.6,
    status: 'Active',
    totalTrips: 128,
    pendingIssues: 2,
    lastActive: '2h ago',
    joinDate: '2023-08-15',
    documents: [
      { 
        id: 'DL', 
        name: "Driver's License", 
        status: 'VERIFIED', 
        color: 'green',
        details: {
          documentNumber: 'TN-0123-4567-8901',
          issuedOn: '12 Mar 2021',
          expiryDate: '11 Mar 2031',
          issuedBy: 'RTO Chennai',
          nameOnDocument: 'Ravi Kumar',
          dob: '18 Aug 1992'
        }
      },
      { 
        id: 'ID', 
        name: 'ID Proof', 
        status: 'VERIFIED', 
        color: 'green',
        details: {
          documentNumber: 'AADHAAR-1234-5678-9012',
          issuedOn: '15 Jan 2020',
          expiryDate: 'Permanent',
          issuedBy: 'UIDAI',
          nameOnDocument: 'Ravi Kumar',
          dob: '18 Aug 1992'
        }
      },
      { 
        id: 'VR', 
        name: 'Vehicle Registration', 
        status: 'PENDING', 
        color: 'yellow',
        details: {
          documentNumber: 'TN-01-AB-1234',
          issuedOn: '05 Jun 2022',
          expiryDate: '04 Jun 2037',
          issuedBy: 'RTO Chennai',
          nameOnDocument: 'Ravi Kumar',
          vehicleType: 'Motorcycle'
        }
      },
      { 
        id: 'INS', 
        name: 'Insurance', 
        status: 'MISSING', 
        color: 'red',
        details: {
          documentNumber: 'Not Available',
          issuedOn: 'Not Available',
          expiryDate: 'Not Available',
          issuedBy: 'Not Available',
          nameOnDocument: 'Not Available',
          policyType: 'Two Wheeler Insurance'
        }
      }
    ]
  }
};

export default function PartnerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const partnerId = params.id;
  const [activeTab, setActiveTab] = useState('documents');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  
  const partner = mockPartners[partnerId] || mockPartners['PTR-1001'];
  
  const handleDocumentView = (document) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };
  
  const handleMarkAsVerified = () => {
    // Here you would make an API call to update the document status
    console.log('Mark as verified:', selectedDocument?.id);
    setIsDocumentModalOpen(false);
  };
  
  const handleRejectDocument = () => {
    // Here you would make an API call to reject the document
    console.log('Reject document:', selectedDocument?.id);
    setIsDocumentModalOpen(false);
  };
  
  const handleDownloadDocument = () => {
    // Here you would trigger document download
    console.log('Download document:', selectedDocument?.id);
  };
  
  const tabs = [
    { id: 'documents', label: 'Documents' },
    { id: 'tripHistory', label: 'Trip History' },
    { id: 'reviews', label: 'Reviews' }
  ];

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'VERIFIED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'; 
      case 'MISSING': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            Partner Details — {partner.name}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
            Approve
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
            Suspend
          </button>
          <button 
            onClick={() => router.push(`/partners/${partnerId}/track`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Track Live
          </button>
          <ThreeDotMenu
            type="partner"
            itemId={partnerId}
            itemData={partner}
            onAction={(action, data) => {
              console.log('Partner action:', action, data);
              // Handle various actions
              switch (action) {
                case 'call':
                  window.open(`tel:${partner.phone}`);
                  break;
                case 'message':
                  alert('Send message functionality would be implemented here');
                  break;
                case 'approve':
                  alert('Partner approval functionality would be implemented here');
                  break;
                case 'suspend':
                  if (confirm('Are you sure you want to suspend this partner?')) {
                    alert('Partner suspension functionality would be implemented here');
                  }
                  break;
                case 'downloadDocs':
                  alert('Download documents functionality would be implemented here');
                  break;
                case 'remove':
                  if (confirm('Are you sure you want to remove this partner permanently?')) {
                    alert('Partner removal functionality would be implemented here');
                  }
                  break;
                default:
                  alert(`${action} functionality would be implemented here`);
              }
            }}
          />
        </div>
      </div>

      {/* Partner Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Partner Summary</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Name</p>
            <p className="font-medium text-gray-900">{partner.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Phone</p>
            <p className="font-medium text-gray-900">{partner.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="font-medium text-gray-900">{partner.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              partner.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {partner.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Subscription</p>
            <p className="font-medium text-gray-900">{partner.subscription}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
            <p className="font-medium text-gray-900">{partner.avgRating}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Trips</p>
            <p className="font-medium text-gray-900">{partner.totalTrips}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Last Active</p>
            <p className="font-medium text-gray-900">{partner.lastActive}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Pending Issues</p>
            <p className="font-medium text-gray-900">{partner.pendingIssues}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-100">
          <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
            Download All
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
            Send Reminder
          </button>
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
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'documents' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Documents</h4>
              <div className="space-y-4">
                {partner.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getDocumentStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleDocumentView(doc)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tripHistory' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Trip History</h4>
              <div className="space-y-4">
                {[
                  {
                    id: 'TRP-001',
                    date: '2024-01-15',
                    time: '10:30 AM',
                    from: 'HSR Layout',
                    to: 'MG Road',
                    duration: '25 min',
                    distance: '12.5 km',
                    amount: '₹245',
                    status: 'Completed',
                    rating: 4.5
                  },
                  {
                    id: 'TRP-002', 
                    date: '2024-01-14',
                    time: '3:15 PM',
                    from: 'Koramangala',
                    to: 'Whitefield',
                    duration: '35 min',
                    distance: '18.2 km',
                    amount: '₹380',
                    status: 'Completed',
                    rating: 4.8
                  },
                  {
                    id: 'TRP-003',
                    date: '2024-01-13',
                    time: '11:45 AM',
                    from: 'Indiranagar',
                    to: 'Electronic City',
                    duration: '40 min',
                    distance: '22.1 km',
                    amount: '₹450',
                    status: 'Completed',
                    rating: 4.2
                  }
                ].map((trip) => (
                  <div key={trip.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{trip.id}</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {trip.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{trip.amount}</p>
                        <p className="text-xs text-gray-500">{trip.date} • {trip.time}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">From</p>
                        <p className="font-medium text-gray-900">{trip.from}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">To</p>
                        <p className="font-medium text-gray-900">{trip.to}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Duration</p>
                        <p className="font-medium text-gray-900">{trip.duration} • {trip.distance}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Rating</p>
                        <p className="font-medium text-gray-900">{trip.rating} ⭐</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Reviews</h4>
              <div className="space-y-4">
                {[
                  {
                    id: 'REV-001',
                    customerName: 'Sana Prakash',
                    date: '2024-01-15',
                    rating: 5,
                    comment: 'Excellent service! Very professional driver and reached on time.',
                    tripId: 'TRP-001'
                  },
                  {
                    id: 'REV-002',
                    customerName: 'Rajesh Kumar',
                    date: '2024-01-14', 
                    rating: 4,
                    comment: 'Good experience overall. Driver was polite and helpful.',
                    tripId: 'TRP-002'
                  },
                  {
                    id: 'REV-003',
                    customerName: 'Priya Singh',
                    date: '2024-01-13',
                    rating: 4,
                    comment: 'Smooth ride and safe driving. Would recommend.',
                    tripId: 'TRP-003'
                  },
                  {
                    id: 'REV-004',
                    customerName: 'Amit Sharma',
                    date: '2024-01-12',
                    rating: 5,
                    comment: 'Outstanding service! Driver was very courteous and the vehicle was clean.',
                    tripId: 'TRP-004'
                  }
                ].map((review) => (
                  <div key={review.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {review.customerName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{review.customerName}</p>
                          <p className="text-xs text-gray-500">{review.date} • Trip {review.tripId}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}>
                            ⭐
                          </span>
                        ))}
                        <span className="text-sm font-medium text-gray-600 ml-2">{review.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Document Viewer Modal */}
      <Transition appear show={isDocumentModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsDocumentModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedDocument?.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedDocument?.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                        selectedDocument?.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedDocument?.status}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsDocumentModalOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Document Details */}
                    <div className="p-6 border-r border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-6">Document Details</h4>
                      <div className="space-y-4">
                        {selectedDocument?.details && Object.entries(selectedDocument.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-start">
                            <span className="text-sm text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right max-w-48">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Document Preview */}
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-6">Preview</h4>
                      <div className="space-y-4">
                        {/* Front Preview */}
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Front</p>
                          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                            <div className="text-center">
                              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Document Preview</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Back Preview */}
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Back</p>
                          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                            <div className="text-center">
                              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Document Preview</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <button
                      onClick={handleDownloadDocument}
                      className="flex items-center px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleRejectDocument}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                      >
                        Reject
                      </button>
                      <button
                        onClick={handleMarkAsVerified}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                      >
                        Mark as Verified
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
