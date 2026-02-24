/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../axios";
import { API } from "../endpoint";

export const getAllReviews = async (
  page: number,
  size: number,
  search?: string,
) => {
  try {
    const response = await axios.get(API.ADMIN.REVIEWS.GET_ALL_REVIEW, {
      params: { page, size, search },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get all Reviews failed",
    );
  }
};
