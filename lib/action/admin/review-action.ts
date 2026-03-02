/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getAllReviews } from "@/lib/api/admin/review";

export const handleGetAllReviews = async (
  page: string,
  size: string,
  search?: string,
) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllReviews(currentPage, currentSize, search);
    if (response.success) {
      return {
        success: true,
        message: "Get all Reviews successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all Reviews failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all Reviews action failed",
    };
  }
};
