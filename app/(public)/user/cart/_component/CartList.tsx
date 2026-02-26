/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { handleCreateOrder } from "@/lib/action/order-action";
import CartItemCard, { CartItem } from "./CartItemCard";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartList({ cart }: { cart: CartItem[] }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createOrder = async () => {
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const response = await handleCreateOrder();

      // Fallback if no response
      if (!response) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (!response.success) {
        toast.error(response.message || "Failed to create order.");
        return;
      }

      toast.success("Order created successfully");

      router.refresh();
    } catch (error: any) {
      console.error("Create order error:", error);
      toast.error(
        error?.message || "Unexpected error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const totalAmount =
    cart?.reduce(
      (acc, item) => acc + (item?.bookId?.price || 0) * item.quantity,
      0,
    ) || 0;

  if (!cart || cart.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
    );
  }

  return (
    <div className="space-y-6">
      {cart.map((item) => (
        <CartItemCard key={item._id} item={item} />
      ))}

      <div
        className="
          mt-10 p-5 rounded-2xl bg-emerald-50/70 backdrop-blur-md
          shadow-[6px_6px_16px_rgba(0,0,0,0.06),-6px_-6px_16px_rgba(255,255,255,0.8)]
          text-right font-bold text-xl text-emerald-900
        "
      >
        Grand Total: Rs.{totalAmount}
      </div>

      <button
        disabled={loading}
        onClick={createOrder}
        className="
          text-sm
          px-4
          py-2
          rounded-xl
          bg-emerald-600
          text-white
          shadow-md
          transition
          duration-300
          hover:bg-emerald-700
          active:scale-95
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading ? "Creating Order..." : "Create Order"}
      </button>
    </div>
  );
}
