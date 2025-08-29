"use client";
import DataTable from "@/components/ui/DataTable";
import StatsCard from "@/components/ui/StatsCard";
import { Star, MessageSquare, TrendingUp, ThumbsUp } from "lucide-react";

const reviews = [
  {
    id: "REV-001",
    customer: "Rahul Sharma",
    driver: "Deepak Singh",
    rating: 5,
    comment: "Excellent service! Fast delivery and very professional driver.",
    date: "2024-01-15",
    order: "ORD-912340"
  },
  {
    id: "REV-002", 
    customer: "Priya Patel",
    driver: "Amit Kumar",
    rating: 4,
    comment: "Good service, but delivery was slightly delayed.",
    date: "2024-01-14",
    order: "ORD-912341"
  }
];

const reviewColumns = [
  {
    key: "customer",
    label: "Customer",
    render: (customer, row) => (
      <div>
        <p className="font-semibold text-gray-900">{customer}</p>
        <p className="text-sm text-gray-500">{row.order}</p>
      </div>
    )
  },
  { key: "driver", label: "Driver" },
  {
    key: "rating",
    label: "Rating",
    render: (rating) => (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 font-medium">{rating}/5</span>
      </div>
    )
  },
  {
    key: "comment",
    label: "Comment",
    render: (comment) => (
      <p className="text-sm text-gray-600 max-w-xs truncate">{comment}</p>
    )
  },
  { key: "date", label: "Date" }
];

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-600 mt-1">Manage customer feedback and ratings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Average Rating"
          value="4.7"
          change="+0.2"
          changeType="positive"
          icon={Star}
          color="yellow"
        />
        <StatsCard
          title="Total Reviews"
          value="1,847"
          change="+23"
          changeType="positive"
          icon={MessageSquare}
          color="blue"
        />
        <StatsCard
          title="5-Star Reviews"
          value="68%"
          change="+5%"
          changeType="positive"
          icon={ThumbsUp}
          color="green"
        />
        <StatsCard
          title="Response Rate"
          value="94%"
          change="+3%"
          changeType="positive"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <DataTable
        title="Recent Reviews"
        description="Latest customer feedback and ratings"
        columns={reviewColumns}
        data={reviews}
        actions={true}
        searchable={true}
        filterable={true}
      />
    </div>
  );
}
