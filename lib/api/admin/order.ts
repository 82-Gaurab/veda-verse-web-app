/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from "../endpoint";
import axios from "../axios";

export const getAllOrders = async (
  page: number,
  size: number,
  search?: string,
) => {
  try {
    const response = await axios.get(API.ADMIN.ORDERS.GET_ALL_ORDER, {
      params: { page, size, search },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get all Orders failed",
    );
  }
};

export const updateOrder = async (id: string, updateData: any) => {
  try {
    const response = await axios.put(API.ADMIN.ORDERS.UPDATE(id), updateData, {
      headers: {
        "Content-Type": "multipart/form-data", // for file upload/multer
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Update Order failed",
    );
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const response = await axios.delete(API.ADMIN.ORDERS.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Delete Order failed",
    );
  }
};
