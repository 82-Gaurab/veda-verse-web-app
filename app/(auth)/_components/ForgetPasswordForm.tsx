/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { forgetPasswordSchema, ForgetPasswordData } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleRequestPasswordReset } from "@/lib/action/auth-action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ForgotPasswordFormProps {
  onOpenLogin: () => void;
}

const ForgetPasswordForm = ({ onOpenLogin }: ForgotPasswordFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordData>({
    mode: "onSubmit",
    resolver: zodResolver(forgetPasswordSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, setTransition] = useTransition();
  const submit = (values: ForgetPasswordData) => {
    setError(null);
    setTransition(async () => {
      try {
        const result = await handleRequestPasswordReset(values.email);
        if (result.success) {
          toast.success(
            "If the email is registered, a reset link has been sent.",
          );
          return router.push("/");
        } else {
          throw new Error(result.message || "Failed to send reset link");
        }
      } catch (err: Error | any) {
        toast.error(err.message || "Failed to send reset link");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 text-black">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="space-y-1">
        <label className="text-[17px] font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="w-full px-4 py-2.5 mt-2 rounded-2xl bg-[#e0e5ec] outline-none
          shadow-[inset_6px_6px_10px_#a3b1c6,inset_-6px_-6px_10px_#ffffff]
          text-gray-700"
          {...register("email")}
          placeholder="you@example.com"
        />
        {errors.email?.message && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="w-full py-2 rounded-full text-white font-semibold
        bg-linear-to-r from-[#63ad84] to-[#488563]
        shadow-[6px_6px_10px_#a3b1c6,-6px_-6px_10px_#ffffff]
        hover:scale-[1.02] transition"
      >
        {isSubmitting || pending ? "Sending..." : "Send Link"}
      </button>

      <div className="my-2 text-center text-[15px]">
        Already have an account.
        <button
          className="text-[#BE9D68] ml-1 cursor-pointer"
          onClick={onOpenLogin}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
