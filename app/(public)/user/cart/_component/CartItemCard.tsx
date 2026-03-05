"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import {
  handleUpdateCartItem,
  handleDeleteCartItem,
} from "@/lib/action/auth-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface CartBook {
  _id: string;
  title: string;
  author: string;
  price: number;
  publishedYear: string;
  coverImg: string;
}

export interface CartItem {
  _id: string;
  quantity: number;
  bookId: CartBook;
}

export default function CartItemCard({ item }: { item: CartItem }) {
  const router = useRouter();

  const updateQuantity = async (newQty: number) => {
    if (newQty < 1) return;

    const response = await handleUpdateCartItem({
      product: item.bookId._id,
      quantity: newQty,
    });

    if (response?.success) {
      router.refresh();
    } else {
      toast.error(response?.message || "Failed to update cart");
    }
  };

  const removeItem = async () => {
    const response = await handleDeleteCartItem({
      product: item.bookId._id,
    });

    if (response?.success) {
      toast.success("Item removed");
      router.refresh();
    } else {
      toast.error(response?.message || "Failed to remove item");
    }
  };

  return (
    <div
      className="
        group flex gap-6 items-center p-5 rounded-2xl
        bg-emerald-50/70 backdrop-blur-md
        shadow-[6px_6px_16px_rgba(0,0,0,0.06),-6px_-6px_16px_rgba(255,255,255,0.8)]
        transition-all duration-300 ease-out
        hover:shadow-[8px_8px_20px_rgba(0,0,0,0.08),-8px_-8px_20px_rgba(255,255,255,0.9)]
        hover:-translate-y-1 hover:scale-[1.02]
      "
    >
      {/* Cover Image */}
      <div className="relative w-24 h-32 shrink-0 rounded-xl overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.bookId.coverImg}`}
          alt={item.bookId.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Book Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-serif text-lg text-emerald-900 leading-snug line-clamp-2">
            {item.bookId.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
            by {item.bookId.author}
          </p>
          <p className="text-emerald-800 font-semibold mt-1">
            Rs.{item.bookId.price}
          </p>
        </div>

        <Link
          href={`/user/dashboard/${item.bookId._id}`}
          className="
            mt-3 inline-block px-4 py-2 rounded-xl
            bg-emerald-100 text-emerald-800
            shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
            transition duration-300 hover:bg-emerald-200 active:scale-95
            text-sm
          "
        >
          View Book
        </Link>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-2">
        {/* Quantity Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.quantity - 1)}
            className="
              p-2 rounded-lg bg-white shadow
              hover:bg-gray-100 transition
            "
          >
            <Minus size={16} />
          </button>

          <span className="font-semibold text-emerald-900 w-6 text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => updateQuantity(item.quantity + 1)}
            className="
              p-2 rounded-lg bg-white shadow
              hover:bg-gray-100 transition
            "
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Total Price */}
        <p className="text-emerald-900 font-semibold">
          Rs.{item.bookId.price * item.quantity}
        </p>

        {/* Remove Button */}
        <button
          onClick={removeItem}
          className="
            flex items-center gap-1 text-red-500 text-sm
            hover:text-red-600 transition
          "
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}
