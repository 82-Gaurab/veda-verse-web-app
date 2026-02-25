/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  getAllGenresPaginated,
  getGenreById,
  updateGenre,
} from "@/lib/api/admin/genre";
import { revalidatePath } from "next/cache";

export const handleCreateGenre = async (data: { name: string }) => {
  try {
    const response = await createGenre(data);
    if (response.success) {
      revalidatePath("/admin/genres");
      return {
        success: true,
        message: "Genre Creation successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Genre Creation failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Genre Creation action failed",
    };
  }
};

export const handleGetAllGenresPaginated = async (
  page: string,
  size: string,
  search?: string,
) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllGenresPaginated(
      currentPage,
      currentSize,
      search,
    );
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
      message: response.message || "Get all Genres Paginated failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all Genres Paginated action failed",
    };
  }
};

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

export const handleUpdateGenre = async (
  id: string,
  data: { name: string | undefined },
) => {
  try {
    const response = await updateGenre(id, data);
    if (response.success) {
      revalidatePath("/admin/genres");
      return {
        success: true,
        message: "Update Genre successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update Genre failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Update Genre action failed",
    };
  }
};

export const handleDeleteGenre = async (id: string) => {
  try {
    const response = await deleteGenre(id);
    if (response.success) {
      revalidatePath("/admin/genres");
      return {
        success: true,
        message: "Delete Genre successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete Genre failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete Genre action failed",
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
