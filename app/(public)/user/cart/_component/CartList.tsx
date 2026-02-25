"use client";

import CartItemCard, { CartItem } from "./CartItemCard";

export default function CartList({ cart }: { cart: CartItem[] }) {
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.bookId.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
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
    </div>
  );
}
