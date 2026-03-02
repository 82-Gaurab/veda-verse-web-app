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

export default function ChangePassword({ email }: { email: string }) {
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
        const response = await handleChangePassword(email, data.newPassword);

        if (!response.success) {
          throw new Error(response.message);
        }

        toast.success("Password updated successfully");
        reset();
      } catch (error: Error | any) {
        toast.error(error.message || "Failed to update password");
      }
    });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-emerald-800">
            Current Password
          </label>
          <input
            type="password"
            {...register("currentPassword")}
            className="
             w-full px-4 py-3 rounded-xl outline-none
           bg-emerald-50
border border-emerald-400
shadow-[inset_4px_4px_10px_rgba(0,0,0,0.06),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]
focus:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.08),inset_-2px_-2px_6px_rgba(255,255,255,1)]
            "
            placeholder="Enter current password"
          />
          {errors.currentPassword && (
            <p className="text-xs text-red-600">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-emerald-800">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword")}
            className="
              w-full px-4 py-3 rounded-xl outline-none
           bg-emerald-50
border border-emerald-400
shadow-[inset_4px_4px_10px_rgba(0,0,0,0.06),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]
focus:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.08),inset_-2px_-2px_6px_rgba(255,255,255,1)]
            "
            placeholder="Enter new password"
          />
          {errors.newPassword && (
            <p className="text-xs text-red-600">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-emerald-800">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="
              w-full px-4 py-3 rounded-xl outline-none
           bg-emerald-50
border border-emerald-400
shadow-[inset_4px_4px_10px_rgba(0,0,0,0.06),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]
focus:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.08),inset_-2px_-2px_6px_rgba(255,255,255,1)]
            "
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || pending}
          className="
            w-full py-3 rounded-xl
            bg-emerald-700
            text-white text-sm font-semibold
            shadow-lg
            hover:bg-emerald-800
            active:scale-[0.98]
            transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isSubmitting || pending ? "Updating Password..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
