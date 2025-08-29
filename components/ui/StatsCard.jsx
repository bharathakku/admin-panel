"use client";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "positive", 
  icon: Icon,
  color = "blue" 
}) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    green: "text-green-600 bg-green-50 border-green-100", 
    red: "text-red-600 bg-red-50 border-red-100",
    yellow: "text-yellow-600 bg-yellow-50 border-yellow-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100"
  };

  // Create unique IDs for accessibility
  const valueId = `stat-${title.replace(/\s+/g, '-').toLowerCase()}-value`;
  const changeId = `stat-${title.replace(/\s+/g, '-').toLowerCase()}-change`;

  return (
    <article 
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      role="region"
      aria-labelledby={valueId}
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className={`p-3 rounded-lg ${colorClasses[color]}`}
          role="img"
          aria-label={`${title} icon`}
        >
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
        {change && (
          <div 
            className={`flex items-center text-sm font-medium ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}
            id={changeId}
            aria-label={`Change: ${change} ${changeType === "positive" ? "increase" : "decrease"}`}
          >
            {changeType === "positive" ? (
              <TrendingUp className="w-4 h-4 mr-1" aria-hidden="true" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" aria-hidden="true" />
            )}
            <span aria-hidden="true">{change}</span>
          </div>
        )}
      </div>
      <div>
        <p 
          className="text-2xl font-bold text-gray-900 mb-1" 
          id={valueId}
          aria-label={`${title}: ${value}`}
        >
          {value}
        </p>
        <p 
          className="text-sm text-gray-600"
          role="caption"
        >
          {title}
        </p>
      </div>
    </article>
  );
}
