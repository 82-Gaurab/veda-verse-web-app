/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "./axios";
import { API } from "./endpoint";

export const getAllGenres = async () => {
  try {
    const response = await axios.get(API.GENRES.GET_ALL);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get all Genres failed",
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
