/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axios";
import { API } from "./endpoint";

export const getTestimonials = async () => {
  try {
    const response = await axios.get(API.TESTIMONIAL);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get Testimonials failed",
    );
  }
};
