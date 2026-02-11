/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { createUser, getAllUsers } from "@/lib/api/admin/user";
import { revalidatePath } from "next/cache";

export const handleCreateUser = async (data: FormData) => {
  try {
    const response = await createUser(data);
    if (response.success) {
      revalidatePath("/admin/users");
      return {
        success: true,
        message: "Registration successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Registration failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Registration action failed",
    };
  }
};

export const handleGetAllUsers = async (
  page: string,
  size: string,
  search?: string,
) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllUsers(currentPage, currentSize, search);
    if (response.success) {
      return {
        success: true,
        message: "Get all users successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all users failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all users action failed",
    };
  }
};
