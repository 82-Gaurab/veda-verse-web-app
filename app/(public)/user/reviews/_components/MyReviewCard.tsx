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
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-3 border border-gray-100">
      {/* Review header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm">Book:</span>
          <h2 className="font-semibold text-lg text-gray-800">
            {review.bookId.title}
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          ⭐ {review.rating.toFixed(1)}
        </span>
      </div>

      {/* Review content */}
      <p className="text-gray-700">{review.comment}</p>

      {/* Review date */}
      <div className="text-gray-500 text-sm mt-2">
        Reviewed on: {format(new Date(review.createdAt), "dd MMM yyyy")}
      </div>
    </div>
  );
}
