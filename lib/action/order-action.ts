/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { createOrder, getOrderByUserId } from "@/lib/api/order";

export const handleCreateOrder = async () => {
  try {
    const response = await createOrder();
    if (response.success) {
      return {
        success: true,
        message: "Order Creation successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Order Creation failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Order Creation action failed",
    };
  }
};

export const handleGetOrderByUserId = async () => {
  try {
    const response = await getOrderByUserId();
    if (response.success) {
      return {
        success: true,
        message: "Get Book by User id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get Book by User id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get Book by User id action failed",
    };
  }
};
