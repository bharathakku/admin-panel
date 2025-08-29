"use client";
import { useState } from "react";
import { Gift, Plus, Minus } from "lucide-react";
import Modal from "./Modal";

export default function GiveCreditsModal({ 
  isOpen, 
  onClose, 
  customer, 
  onGiveCredits 
}) {
  const [creditAmount, setCreditAmount] = useState('');
  const [creditReason, setCreditReason] = useState('');
  
  // Predefined credit amounts
  const quickAmounts = [50, 100, 200, 500, 1000];
  
  // Predefined reasons
  const predefinedReasons = [
    "Welcome bonus",
    "Referral reward",
    "Loyalty bonus",
    "Service compensation",
    "Promotional credit",
    "Special occasion gift",
    "Customer retention"
  ];

  const handleAmountChange = (value) => {
    // Only allow positive numbers
    const numValue = Math.abs(parseFloat(value)) || '';
    setCreditAmount(numValue.toString());
  };

  const adjustAmount = (increment) => {
    const current = parseFloat(creditAmount) || 0;
    const newAmount = Math.max(0, current + increment);
    setCreditAmount(newAmount.toString());
  };

  const handleGiveCredits = () => {
    const amount = parseFloat(creditAmount);
    if (amount > 0 && creditReason.trim()) {
      onGiveCredits({
        amount,
        reason: creditReason,
        timestamp: new Date().toISOString(),
        customerId: customer?.id
      });
      setCreditAmount('');
      setCreditReason('');
    }
  };

  const handleClose = () => {
    setCreditAmount('');
    setCreditReason('');
    onClose();
  };

  const isValid = parseFloat(creditAmount) > 0 && creditReason.trim();

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Give Credits">
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-3">
          Give credits to: <strong>{customer?.name}</strong>
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Current Balance: <span className="font-medium text-green-600">
            ₹{customer?.credits || 0}
          </span>
        </p>
      </div>
      
      {/* Credit Amount */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Credit Amount (₹)
        </label>
        
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-5 gap-2 mb-3">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setCreditAmount(amount.toString())}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              ₹{amount}
            </button>
          ))}
        </div>
        
        {/* Custom Amount Input */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => adjustAmount(-50)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={parseFloat(creditAmount) <= 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <input
            type="number"
            value={creditAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Enter amount"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
            min="0"
            step="10"
          />
          
          <button
            type="button"
            onClick={() => adjustAmount(50)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {creditAmount && (
          <p className="text-xs text-gray-500 mt-1">
            New balance will be: ₹{(parseFloat(customer?.credits || 0) + parseFloat(creditAmount || 0)).toFixed(2)}
          </p>
        )}
      </div>
      
      {/* Reason */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reason for Credit
        </label>
        
        {/* Predefined Reasons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {predefinedReasons.map((reason, index) => (
            <button
              key={index}
              onClick={() => setCreditReason(reason)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
            >
              {reason}
            </button>
          ))}
        </div>
        
        {/* Custom Reason */}
        <input
          type="text"
          value={creditReason}
          onChange={(e) => setCreditReason(e.target.value)}
          placeholder="Or enter custom reason..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength="100"
        />
        <p className="text-xs text-gray-500 mt-1">
          {creditReason.length}/100 characters
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
          onClick={handleGiveCredits}
          disabled={!isValid}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center"
        >
          <Gift className="w-4 h-4 mr-2" />
          Give Credits
        </button>
      </div>
    </Modal>
  );
}
