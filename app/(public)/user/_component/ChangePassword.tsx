/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChangePasswordData,
  ChangePasswordSchema,
} from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { handleChangePassword } from "@/lib/action/auth-action";
import { getAuthToken } from "@/lib/cookie";
// import { handleChangePassword } from "@/lib/action/auth-action";

export default function ChangePassword() {
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordData) => {
    startTransition(async () => {
      try {
        const token = await getAuthToken();
        if (!token) {
          throw new Error("Invalid or missing token");
        }
        console.log(data);

        const response = await handleChangePassword(
          token,
          data.currentPassword,
          data.newPassword,
          data.confirmPassword,
        );

        // if (!response.success) {
        //   throw new Error(response.message);
        // }

        toast.success("Password updated successfully");
        reset();
      } catch (error: Error | any) {
        toast.error(error.message || "Failed to update password");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto shadow-xl rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Change Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="text-sm font-medium">Current Password</label>
          <input
            type="password"
            {...register("currentPassword")}
            className="mt-1 w-full h-10 rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent px-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
            placeholder="Enter current password"
          />
          {errors.currentPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            className="mt-1 w-full h-10 rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent px-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
            placeholder="Enter new password"
          />
          {errors.newPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="mt-1 w-full h-10 rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent px-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || pending}
          className="w-full h-11 rounded-lg bg-black text-white font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting || pending ? "Updating Password..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
