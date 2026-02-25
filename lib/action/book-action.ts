/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getAllBooks, getBookByGenreId, getBookById } from "../api/book";

export const handleGetAllBooks = async (search?: string) => {
  try {
    const response = await getAllBooks(search);
    if (response.success) {
      return {
        success: true,
        message: "Get all Books successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all Books failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all Books action failed",
    };
  }
};

export const handleGetOneBook = async (id: string) => {
  try {
    const response = await getBookById(id);
    if (response.success) {
      return {
        success: true,
        message: "Get Book by id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get Book by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get Book by id action failed",
    };
  }
};

export const handleGetBookByGenre = async (id: string) => {
  try {
    const response = await getBookByGenreId(id);
    if (response.success) {
      return {
        success: true,
        message: "Get Book by Genre id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get Book by Genre id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get Book by Genre id action failed",
    };
  }
};
