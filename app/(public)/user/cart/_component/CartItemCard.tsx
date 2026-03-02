"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <div
      className="
        group
        flex gap-6 items-center p-5 rounded-2xl
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

        {/* View Book Button */}
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

      {/* Quantity + Total */}
      <div className="flex flex-col text-right">
        <p className="text-gray-600">Qty: {item.quantity}</p>
        <p className="text-emerald-900 font-semibold">
          Rs.{item.bookId.price * item.quantity}
        </p>
      </div>
    </div>
  );
}
