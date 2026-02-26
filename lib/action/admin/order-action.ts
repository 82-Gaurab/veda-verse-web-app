/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  getAllOrders,
  deleteOrder,
  updateOrder,
  getOrderByUserId,
} from "@/lib/api/admin/order";
import { revalidatePath } from "next/cache";

export const handleGetAllOrders = async (
  page: string,
  size: string,
  search?: string,
) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllOrders(currentPage, currentSize, search);
    if (response.success) {
      return {
        success: true,
        message: "Get all Orders successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all Orders failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all Orders action failed",
    };
  }
};

export const handleUpdateOrder = async (id: string, status: string) => {
  try {
    const response = await updateOrder(id, { status });
    if (response.success) {
      revalidatePath("/admin/orders");
      return {
        success: true,
        message: "Update Order successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update Order failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Update Order action failed",
    };
  }
};

export const handleDeleteOrder = async (id: string) => {
  try {
    const response = await deleteOrder(id);
    if (response.success) {
      revalidatePath("/admin/orders");
      return {
        success: true,
        message: "Delete Order successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete Order failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete Order action failed",
    };
  }
};

export const handleGetOrderByUserId = async (id: string) => {
  try {
    const response = await getOrderByUserId(id);
    if (response.success) {
      revalidatePath("/admin/orders");
      return {
        data: response.data,
        success: true,
        message: "Delete Order successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete Order failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete Order action failed",
    };
  }
};
