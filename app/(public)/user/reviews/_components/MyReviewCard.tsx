"use client";

import { format } from "date-fns";

export interface Review {
  _id: string;
  userId: string;
  bookId: {
    _id: string;
    title: string;
    price: number;
  };
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface MyReviewCardProps {
  review: Review;
}

export default function MyReviewCard({ review }: MyReviewCardProps) {
  return (
    <div
      className="
        group
        relative
        bg-emerald-50/70 backdrop-blur-md
        rounded-2xl p-6
        shadow-[6px_6px_16px_rgba(0,0,0,0.06),-6px_-6px_16px_rgba(255,255,255,0.8)]
        transition-all duration-300 ease-out
        hover:shadow-[8px_8px_20px_rgba(0,0,0,0.08),-8px_-8px_20px_rgba(255,255,255,0.9)]
        hover:-translate-y-1 hover:scale-[1.01]
        flex flex-col gap-4
      "
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs uppercase">Book:</span>
          <h2 className="font-semibold text-lg text-emerald-900">
            {review.bookId.title}
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          ⭐ {review.rating.toFixed(1)}
        </span>
      </div>

      <p className="text-gray-700">{review.comment}</p>

      <div className="text-gray-500 text-sm mt-2">
        Reviewed on: {format(new Date(review.createdAt), "dd MMM yyyy")}
      </div>
    </div>
  );
}
