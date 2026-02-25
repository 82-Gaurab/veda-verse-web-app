"use client";

import React from "react";

interface RecentOrder {
  _id: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

interface RecentUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface DashboardProps {
  totalUsers: number;
  totalBooks: number;
  totalOrders: number;
  totalReviews: number;
  pendingOrders: number;
  lowStockBooks: number;
  recentOrders?: RecentOrder[];
  recentUsers?: RecentUser[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard({
  totalUsers,
  totalBooks,
  totalOrders,
  totalReviews,
  pendingOrders,
  lowStockBooks,
  recentOrders = [],
  recentUsers = [],
}: DashboardProps) {
  return (
    <div className="p-6 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card title="Total Users" value={totalUsers} color="green" />
        <Card title="Total Books" value={totalBooks} color="blue" />
        <Card title="Total Orders" value={totalOrders} color="purple" />
        <Card title="Total Reviews" value={totalReviews} color="indigo" />
        <Card title="Pending Orders" value={pendingOrders} color="yellow" />
        <Card title="Low Stock Books" value={lowStockBooks} color="red" />
      </div>

      {/* Recent Orders */}
      {recentOrders.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">Total Price</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 text-gray-700">{order._id}</td>
                    <td className="px-4 py-2 text-gray-700">{order.userId}</td>
                    <td className="px-4 py-2 text-gray-700">
                      ${order.totalPrice}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Users */}
      {recentUsers.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 text-gray-700">{user._id}</td>
                    <td className="px-4 py-2 text-gray-700">{user.name}</td>
                    <td className="px-4 py-2 text-gray-700">{user.email}</td>
                    <td className="px-4 py-2 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/** Card Component */
const Card = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
  const colorMap: Record<string, string> = {
    green: "bg-green-50 text-green-800",
    blue: "bg-blue-50 text-blue-800",
    purple: "bg-purple-50 text-purple-800",
    indigo: "bg-indigo-50 text-indigo-800",
    yellow: "bg-yellow-50 text-yellow-800",
    red: "bg-red-50 text-red-800",
  };

  return (
    <div
      className={`rounded-xl shadow p-5 flex flex-col justify-between ${colorMap[color]}`}
    >
      <p className="text-xs font-semibold uppercase">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
};
