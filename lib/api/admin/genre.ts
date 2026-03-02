/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from "../endpoint";
import axios from "../axios";

export const createGenre = async (genreData: any) => {
  try {
    const response = await axios.post(API.ADMIN.GENRES.CREATE_GENRE, genreData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Create genre failed",
    );
  }
};

export const getAllGenresPaginated = async (
  page: number,
  size: number,
  search?: string,
) => {
  try {
    const response = await axios.get(API.ADMIN.GENRES.GET_ALL_GENRE_PAGINATED, {
      params: { page, size, search },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get all Genres Paginated failed",
    );
  }
};

export const getAllGenres = async () => {
  try {
    const response = await axios.get(API.ADMIN.GENRES.GET_ALL_GENRE);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get all Genres failed",
    );
  }
};

export const updateGenre = async (id: string, updateData: any) => {
  try {
    const response = await axios.put(API.ADMIN.GENRES.UPDATE(id), updateData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Update Genre failed",
    );
  }
};

export const deleteGenre = async (id: string) => {
  try {
    const response = await axios.delete(API.ADMIN.GENRES.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Delete Genre failed",
    );
  }
};

export const getGenreById = async (id: string) => {
  try {
    const response = await axios.get(API.ADMIN.GENRES.GET_ONE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get Genre By Id Failed",
    );
  }
};
