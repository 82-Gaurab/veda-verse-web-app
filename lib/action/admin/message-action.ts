/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  deleteMessages,
  getAllMessages,
  updateMessage,
} from "@/lib/api/admin/message";
import { revalidatePath } from "next/cache";

export const handleGetAllMessages = async (
  page: string,
  size: string,
  search?: string,
) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllMessages(currentPage, currentSize, search);
    if (response.success) {
      return {
        success: true,
        message: "Get all messages successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all messages failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all messages action failed",
    };
  }
};

export const handleDeleteMessage = async (id: string) => {
  try {
    const response = await deleteMessages(id);
    if (response.success) {
      revalidatePath("/admin/messages");
      return {
        success: true,
        message: "Delete message successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete message failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete message action failed",
    };
  }
};

export const handleUpdateMessage = async (
  id: string,
  isTestimonial: boolean,
) => {
  try {
    const response = await updateMessage(id, { isTestimonial });
    if (response.success) {
      revalidatePath("/admin/messages");
      return {
        success: true,
        message: "Update Message successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update Message failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Update Message action failed",
    };
  }
};
