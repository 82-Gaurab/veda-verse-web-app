/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "./axios";
import { API } from "./endpoint";

export const getAllBooks = async (search?: string) => {
  try {
    const response = await axios.get(API.BOOKS.GET_ALL_BOOK, {
      params: { search },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get all Books failed",
    );
  }
};

export const getBookById = async (id: string) => {
  try {
    const response = await axios.get(API.BOOKS.GET_ONE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get Book By Id Failed",
    );
  }
};

export const getBookByGenreId = async (id: string) => {
  try {
    const response = await axios.get(API.BOOKS.GET_BY_GENRE_ID(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get Book By Genre Id Failed",
    );
  }
};
