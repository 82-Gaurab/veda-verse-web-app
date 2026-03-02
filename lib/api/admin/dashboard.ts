/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from "../endpoint";
import axios from "../axios";

export const getDashboard = async () => {
  try {
    const response = await axios.get(API.ADMIN.DASHBOARD);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get dashboard failed",
    );
  }
};
