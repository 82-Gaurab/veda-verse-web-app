"use client";

import OrderCard, { Order } from "./OrderCard";

export default function OrderHistory({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
