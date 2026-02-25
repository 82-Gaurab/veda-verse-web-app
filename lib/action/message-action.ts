/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getTestimonials } from "../api/message";

export const handleGetTestimonials = async () => {
  try {
    const response = await getTestimonials();
    if (response.success) {
      return {
        success: true,
        message: "Get testimonials successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all Testimonials failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all Testimonials action failed",
    };
  }
};
