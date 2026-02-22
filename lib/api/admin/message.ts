/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../axios";
import { API } from "../endpoint";

export const getAllMessages = async (
  page: number,
  size: number,
  search?: string,
) => {
  try {
    const response = await axios.get(API.ADMIN.MESSAGES.GET_ALL_MESSAGE, {
      params: { page, size, search },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get all messages failed",
    );
  }
};

export const deleteMessages = async (id: string) => {
  try {
    const response = await axios.delete(API.ADMIN.MESSAGES.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Delete message failed",
    );
  }
};
