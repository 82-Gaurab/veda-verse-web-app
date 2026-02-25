/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from "./endpoint";
import axios from "./axios";

export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(API.ORDER.CREATE, orderData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Create Order failed",
    );
  }
};

export const getOrderByUserId = async () => {
  try {
    const response = await axios.get(API.ORDER.GET_BY_USER_ID);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get Order By User Id Failed",
    );
  }
};
