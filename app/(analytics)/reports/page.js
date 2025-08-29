"use client";
import { FileText, Download, Calendar, BarChart } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { name: "Daily Sales Report", description: "Comprehensive daily sales analysis", type: "PDF", date: "2024-01-15" },
    { name: "Customer Analytics", description: "Customer behavior and preferences", type: "Excel", date: "2024-01-14" },
    { name: "Driver Performance", description: "Driver efficiency and ratings", type: "PDF", date: "2024-01-13" },
    { name: "Monthly Summary", description: "Complete monthly business overview", type: "PDF", date: "2024-01-01" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate and download business reports</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Daily Reports</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Reports</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Reports</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <BarChart className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Downloads</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <Download className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {reports.map((report, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{report.type}</p>
                  <p className="text-xs text-gray-500">{report.date}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
