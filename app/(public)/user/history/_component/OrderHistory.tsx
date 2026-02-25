"use client";
import OrderCard, { Order } from "./OrderCard";

export default function OrderHistory({ orders }: { orders: Order[] }) {
  return (
    <>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </>
  );
}
