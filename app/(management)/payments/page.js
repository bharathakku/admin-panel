"use client";
import StatsCard from "@/components/ui/StatsCard";
import { CreditCard, DollarSign, TrendingUp, RefreshCw } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Track payments, transactions and financial reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="₹2.4L"
          change="+18.7%"
          changeType="positive"
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Transactions"
          value="1,234"
          change="+12.5%"
          changeType="positive"
          icon={CreditCard}
          color="blue"
        />
        <StatsCard
          title="Success Rate"
          value="98.5%"
          change="+1.2%"
          changeType="positive"
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Pending"
          value="12"
          change="-3"
          changeType="positive"
          icon={RefreshCw}
          color="yellow"
        />
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Analytics</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Payment analytics and transaction details</p>
          </div>
        </div>
      </div>
    </div>
  );
}
