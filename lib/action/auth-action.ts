/* eslint-disable @typescript-eslint/no-explicit-any */
// note: server side processing

"use server";

import { revalidatePath } from "next/cache";
import {
  register,
  login,
  updateUser,
  requestPasswordReset,
  resetPassword,
  changePassword,
  sendMessage,
  getUserById,
  addToCart,
  getMyData,
} from "../api/auth";
import { setAuthToken, setUserData } from "../cookie";

export const handleRegister = async (formData: any) => {
  try {
    // info: how data sent from component to backend api
    const res = await register(formData);
    // component return logic
    if (res.success) {
      return {
        success: true,
        data: res.data,
        message: "Registration successful",
      };
    }
    return { success: false, message: res.message || "Registration failed" };
  } catch (error: Error | any) {
    // console.log("Auth action ko error bitra aayo");

    return { success: false, message: error.message || "Registration failed" };
  }
};

export const handleLogin = async (formData: any) => {
  try {
    // info: how data sent from component to backend api
    const res = await login(formData);
    // component return logic
    if (res.success) {
      const token = res.token;
      await setAuthToken(token);
      await setUserData(res.data);
      return {
        success: true,
        data: res.data,
        message: "Login successful",
      };
    }
    return { success: false, message: res.message || "Login failed" };
  } catch (error: Error | any) {
    return { success: false, message: error.message || "Login failed" };
  }
};

export const handleUpdateMyself = async (data: FormData) => {
  try {
    const response = await updateUser(data);
    if (response.success) {
      revalidatePath("/user/profile");
      return {
        success: true,
        message: "Update successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Update action failed",
    };
  }
};

export const handleRequestPasswordReset = async (email: string) => {
  try {
    const response = await requestPasswordReset(email);
    if (response.success) {
      return {
        success: true,
        message: "Password reset email sent successfully",
      };
    }
    return {
      success: false,
      message: response.message || "Request password reset failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Request password reset action failed",
    };
  }
};

export const handleResetPassword = async (
  token: string,
  newPassword: string,
) => {
  try {
    const response = await resetPassword(token, newPassword);
    if (response.success) {
      return {
        success: true,
        message: "Password has been reset successfully",
      };
    }
    return {
      success: false,
      message: response.message || "Reset password failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Reset password action failed",
    };
  }
};

export const handleChangePassword = async (
  email: string,
  newPassword: string,
) => {
  try {
    const response = await changePassword(newPassword, email);
    if (response.success) {
      return {
        success: true,
        message: "Password has been changed successfully",
      };
    }
    return {
      success: false,
      message: response.message || "Change password failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Change password action failed",
    };
  }
};

export const handleUserMessage = async (formData: any) => {
  try {
    const res = await sendMessage(formData);
    if (res.success) {
      return {
        success: true,
        data: res.data,
        message: "Message sent successful",
      };
    }
    return { success: false, message: res.message || "Failed to Send Message" };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Failed to Send Message",
    };
  }
};

export const handleGetOneUser = async (id: string) => {
  try {
    const response = await getUserById(id);
    if (response.success) {
      return {
        success: true,
        message: "Get user by id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get user by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get user by id action failed",
    };
  }
};

export const handleAddToCart = async (data: any) => {
  try {
    const response = await addToCart(data);
    if (response.success) {
      return {
        success: true,
        message: "Add to Cart successful",
        data: response.data,
      };
    }
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Add To Cart action failed",
    };
  }
};

export const handleGetMyData = async () => {
  try {
    const response = await getMyData();
    if (response.success) {
      return {
        success: true,
        message: "Get My Data successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get My Data failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get My Data action failed",
    };
  }
};
