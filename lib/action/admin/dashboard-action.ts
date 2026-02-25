/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getDashboard } from "@/lib/api/admin/dashboard";

export const handleGetDashboard = async () => {
  try {
    const response = await getDashboard();
    if (response.success) {
      return {
        success: true,
        message: "Get Dashboard successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get Dashboard by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get Dashboard by id action failed",
    };
  }
};
