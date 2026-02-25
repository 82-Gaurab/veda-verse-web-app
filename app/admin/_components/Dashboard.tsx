"use client";

import CircularProgress from "./CircularProgress";
import RecentOrders, { RecentOrder } from "./RecentOrderTable";
import RecentUsers, { RecentUser } from "./RecentUserTable";
import StatCard from "./StatCard";

interface DashboardProps {
  dashboardData: {
    totalUsers: number;
    totalBooks: number;
    totalOrders: number;
    totalReviews: number;
    pendingOrders: number;
    lowStockBooks: number;
    recentOrders?: RecentOrder[];
    recentUsers?: RecentUser[];
  };
}

export default function AdminDashboard({ dashboardData }: DashboardProps) {
  return (
    <div className="min-h-screen px-10 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          Overview & Analytics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <StatCard
          title="Total Users"
          color="bg-blue-500"
          value={dashboardData.totalUsers}
        />
        <StatCard
          title="Total Books"
          color="bg-purple-500"
          value={dashboardData.totalBooks}
        />
        <StatCard
          title="Total Orders"
          color="bg-green-500"
          value={dashboardData.totalOrders}
        />
        <StatCard
          title="Total Reviews"
          color="bg-pink-500"
          value={dashboardData.totalReviews}
        />
        <StatCard
          title="Pending Orders"
          color="bg-yellow-500"
          value={dashboardData.pendingOrders}
        />
        <StatCard
          title="Low Stock Books"
          color="bg-red-500"
          value={dashboardData.lowStockBooks}
        />
      </div>

      {/* Circular Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <CircularProgress
          value={dashboardData.pendingOrders}
          total={dashboardData.totalOrders}
          label="Pending Orders"
        />
        <CircularProgress
          value={dashboardData.lowStockBooks}
          total={dashboardData.totalBooks}
          label="Low Stock Books"
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <RecentOrders orders={dashboardData.recentOrders!} />
        <RecentUsers users={dashboardData.recentUsers!} />
      </div>
    </div>
  );
}
