/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "@/lib/api/admin/book";
import { revalidatePath } from "next/cache";

export const handleCreateBook = async (data: FormData) => {
  try {
    const response = await createBook(data);
    if (response.success) {
      revalidatePath("/admin/books");
      return {
        success: true,
        message: "New Book Created successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Failed to create book",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Book Creation action failed",
    };
  }
};

export const handleGetAllBooks = async (
  page: string,
  size: string,
  search?: string,
) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllBooks(currentPage, currentSize, search);
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

export const handleUpdateBook = async (id: string, data: FormData) => {
  try {
    const response = await updateBook(id, data);
    if (response.success) {
      // revalidatePath("/admin/books");
      return {
        success: true,
        message: "Update Book successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update Book failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Update Book action failed",
    };
  }
};

export const handleDeleteBook = async (id: string) => {
  try {
    const response = await deleteBook(id);
    if (response.success) {
      revalidatePath("/admin/books");
      return {
        success: true,
        message: "Delete Book successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete Book failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete Book action failed",
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
