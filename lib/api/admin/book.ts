/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from "../endpoint";
import axios from "../axios";

export const createBook = async (bookData: any) => {
  try {
    const response = await axios.post(API.ADMIN.BOOKS.CREATE_BOOK, bookData, {
      headers: {
        "Content-Type": "multipart/form-data", // for file upload/multer
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Create Book failed",
    );
  }
};

export const getAllBooks = async (
  page: number,
  size: number,
  search?: string,
) => {
  try {
    const response = await axios.get(API.ADMIN.BOOKS.GET_ALL_BOOK, {
      params: { page, size, search },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get all Books failed",
    );
  }
};

export const updateBook = async (id: string, updateData: any) => {
  try {
    const response = await axios.put(API.ADMIN.BOOKS.UPDATE(id), updateData, {
      headers: {
        "Content-Type": "multipart/form-data", // for file upload/multer
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Update Book failed",
    );
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await axios.delete(API.ADMIN.BOOKS.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Delete Book failed",
    );
  }
};
