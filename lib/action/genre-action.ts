/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getAllGenres, getGenreById } from "@/lib/api/genre";

export const handleGetAllGenres = async () => {
  try {
    const response = await getAllGenres();
    if (response.success) {
      return {
        success: true,
        message: "Get all Genres successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all Genres failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all Genres action failed",
    };
  }
};

export const handleGetOneGenre = async (id: string) => {
  try {
    const response = await getGenreById(id);
    if (response.success) {
      return {
        success: true,
        message: "Get Genre by id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get Genre by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get Genre by id action failed",
    };
  }
};
