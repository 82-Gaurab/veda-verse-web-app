"use client";

import MyReviewCard, { Review } from "./MyReviewCard";

export default function MyReviews({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) {
    return (
      <div className="text-center text-gray-500 mt-10">No Reviews Yet</div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <MyReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
}
