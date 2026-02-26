/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { ReviewData } from "../../user/reviews/schema";
import { useForm } from "react-hook-form";
import { handleCreateReview } from "@/lib/action/review-action";
import { useTransition } from "react";

export default function ReviewForm({ bookId }: { bookId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewData>();

  const [pending, startTransition] = useTransition();

  const onSubmitReview = async (data: ReviewData) => {
    startTransition(async () => {
      try {
        console.log({ ...data });
        const response = await handleCreateReview({ ...data, bookId: bookId });

        if (!response.success) {
          throw new Error(response.message || "Create Review failed");
        }

        reset();
        toast.success("Review Created successfully");
      } catch (error: any) {
        toast.error(error.message || "Create review failed");
      }
    });
  };

  return (
    <div className="w-full mx-auto p-6 rounded-3xl bg-[#eef2f7] shadow-[10px_10px_30px_#c8d0e0,-10px_-10px_30px_#ffffff] mb-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Write a Review
      </h3>
      <form
        onSubmit={handleSubmit(onSubmitReview)}
        className="flex flex-col gap-4"
      >
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-gray-500">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-3 rounded-xl bg-[#eef2f7] shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff] outline-none text-sm text-gray-700 transition focus:shadow-[inset_2px_2px_4px_#c8d0e0,inset_-2px_-2px_4px_#ffffff]"
            placeholder="Review Title"
          />
          {errors.title && (
            <p className="text-xs text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-gray-500">
            Comment
          </label>
          <textarea
            {...register("comment", { required: "Comment is required" })}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-[#eef2f7] shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff] outline-none text-sm text-gray-700"
            placeholder="Write your comment..."
          />
          {errors.comment && (
            <p className="text-xs text-red-600">{errors.comment.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-gray-500">
            Rating
          </label>
          <input
            type="number"
            min={1}
            max={5}
            step={0.5}
            {...register("rating", {
              required: "Rating is required",
              min: 1,
              max: 5,
              valueAsNumber: true,
            })}
            className="w-full px-4 py-3 rounded-xl bg-[#eef2f7] 
             shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff] 
             outline-none text-sm text-gray-700"
            placeholder="Rate 1-5"
          />
          {errors.rating && (
            <p className="text-xs text-red-600">{errors.rating.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-green-600 text-white text-sm font-semibold shadow-lg hover:bg-green-700 active:scale-95 transition disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
