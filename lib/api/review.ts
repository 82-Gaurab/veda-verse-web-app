/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axios";
import { API } from "./endpoint";

export const getReviewByBookId = async (bookId: string) => {
  try {
    const response = await axios.get(API.REVIEWS.GET_BY_BOOK_ID(bookId));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get Review by book id failed",
    );
  }
};

export const getMyReviews = async () => {
  try {
    const response = await axios.get(API.REVIEWS.MY_REVIEWS);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get My Reviews Failed",
    );
  }
};

export const createReview = async (reviewData: any) => {
  try {
    const response = await axios.post(API.REVIEWS.CREATE, reviewData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Create Review failed",
    );
  }
};
