/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { handleGetReviewByBookId } from "@/lib/action/review-action";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReviewCard from "../../_component/ReviewCard";
import toast from "react-hot-toast";
import { handleAddToCart } from "@/lib/action/auth-action";
import ReviewForm from "./ReviewForm";

interface PublicBookDetailsProps {
  book: {
    _id: string;
    title: string;
    author: string;
    description: string;
    genre: string[];
    price: number;
    publishedYear?: string;
    coverImg?: string | null;
  };
  isLoggedIn: boolean;
}

type ReviewWithUser = {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profilePicture?: string | null;
  };
  rating: number;
  title: string;
  comment: string;
};

export default function PublicBookDetails({
  book,
  isLoggedIn,
}: PublicBookDetailsProps) {
  const [loading, setLoading] = useState(false);
  const handleAddToCartAction = async () => {
    try {
      setLoading(true);
      const response = await handleAddToCart({
        product: book._id,
        quantity: 1,
      });

      if (!response?.success) {
        toast.error(response?.message);
      }
      toast.success("Item Added to Cart");
    } catch (error: Error | any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await handleGetReviewByBookId(book._id);
        const reviewsData: ReviewWithUser[] = reviewsResponse.data;
        setReviews(reviewsData);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [book._id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto bg-green-100/20 backdrop-blur-sm rounded-2xl border border-green-200 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 p-10">
          {/* Book Cover */}
          <div className="flex justify-center">
            <div
              className="relative w-80 h-120 rounded-2xl overflow-hidden 
                         bg-green-100/40 border border-green-200
                         shadow-[8px_8px_20px_rgba(0,0,0,0.05),-8px_-8px_20px_rgba(255,255,255,0.6)]"
            >
              {book.coverImg && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${book.coverImg}`}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                  unoptimized
                />
              )}
            </div>
          </div>

          {/* Book Info */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-4xl font-semibold text-green-900 tracking-tight">
                  {book.title}
                </h1>
                <p className="text-green-800/80 mt-2">
                  by <span className="font-medium">{book.author}</span>
                </p>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-3">
                {book.genre.map((g, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 text-xs uppercase tracking-wide
                               bg-green-100/50 text-green-800
                               border border-green-200
                               rounded-full
                               shadow-inner"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed text-sm">
                {book.description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="bg-white/60 border border-green-200 rounded-xl p-4 shadow-inner">
                  <p className="uppercase text-xs tracking-wide text-green-800 mb-1">
                    Published
                  </p>
                  <p className="text-gray-800 font-medium">
                    {book.publishedYear}
                  </p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-8 border-t border-green-200">
              <div className="text-3xl font-semibold text-green-900">
                Rs. {book.price.toFixed(2)}
              </div>
              {isLoggedIn ? (
                <button
                  disabled={loading}
                  onClick={handleAddToCartAction}
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
            "
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
              ) : null}
            </div>
          </div>

          {isLoggedIn && (
            <div className="w-full flex justify-center mt-10">
              <ReviewForm bookId={book._id} />
            </div>
          )}

          {/* Reviews */}
          <div className="mt-12 space-y-4 md:col-span-2">
            <h2 className="text-2xl font-semibold text-green-900 mb-4">
              Reviews
            </h2>
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {reviews.map((rev) => (
                  <ReviewCard
                    key={rev._id}
                    username={rev.userId.username}
                    profilePicture={rev.userId.profilePicture}
                    rating={rev.rating}
                    comment={rev.comment}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
