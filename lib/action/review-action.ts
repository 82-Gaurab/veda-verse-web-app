/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  getMyReviews,
  getReviewByBookId,
  createReview,
} from "@/lib/api/review";

export const handleGetReviewByBookId = async (bookId: string) => {
  try {
    const response = await getReviewByBookId(bookId);
    if (response.success) {
      return {
        success: true,
        message: "Get review by book id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get review by book id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get review by book id action failed",
    };
  }
};

export const handleGetMyReviews = async () => {
  try {
    const response = await getMyReviews();
    if (response.success) {
      return {
        success: true,
        message: "Get My Reviews successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get My Reviews failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get My Reviews action failed",
    };
  }
};

export const handleCreateReview = async (data: any) => {
  try {
    const response = await createReview(data);
    if (response.success) {
      return {
        success: true,
        message: "Review Creation successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Review Creation failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Review Creation action failed",
    };
  }
};
