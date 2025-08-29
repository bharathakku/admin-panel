"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import Modal from "./Modal";

export default function SendReminderModal({ 
  isOpen, 
  onClose, 
  customer, 
  onSendReminder 
}) {
  const [reminderMessage, setReminderMessage] = useState('');
  
  // Predefined reminder messages
  const predefinedMessages = [
    "Dear customer, your order is ready for pickup. Please collect it at your earliest convenience.",
    "Hi! We noticed you have pending payments. Please complete your payment to avoid service interruption.",
    "Reminder: Your scheduled delivery is coming up soon. Please be available at the delivery location.",
    "Hello! We have great offers for you. Check out our latest services and book your next ride.",
    "Thank you for being our valued customer. Don't forget to rate your recent experience with us."
  ];
  
  const handleSend = () => {
    if (reminderMessage.trim()) {
      onSendReminder(reminderMessage);
      setReminderMessage('');
    }
  };

  const handleClose = () => {
    setReminderMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Send Reminder">
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-3">
          Send reminder to: <strong>{customer?.name}</strong>
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Phone: {customer?.phone} | Email: {customer?.email}
        </p>
      </div>
      
      {/* Predefined Messages */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Select:
        </label>
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Message:
        </label>
        <textarea
          value={reminderMessage}
          onChange={(e) => setReminderMessage(e.target.value)}
          placeholder="Type your custom reminder message here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
          maxLength="500"
        />
        <p className="text-xs text-gray-500 mt-1">
          {reminderMessage.length}/500 characters
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={handleClose}
          className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSend}
          disabled={!reminderMessage.trim()}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Reminder
        </button>
      </div>
    </Modal>
  );
}
