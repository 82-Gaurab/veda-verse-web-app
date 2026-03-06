/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { RegisterData, registerSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/lib/action/auth-action";
import { useState, useTransition } from "react";

interface RegisterModalProps {
  onOpenLogin: () => void;
}

export default function RegisterForm({ onOpenLogin }: RegisterModalProps) {
  const [pending, setTransition] = useTransition();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const res = await handleRegister(data);
      if (!res.success) {
        throw new Error(res.message || "Registration failed");
      }
      toast.success("Registration successful");
    } catch (err: Error | any) {
      setError(err.message || "Registration failed");
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-md-border m-2 rounded text-black">
      <div
        className="w-24 h-24 rounded-full bg-black flex items-center justify-center
              shadow-[6px_6px_10px_#a3b1c6,-6px_-6px_10px_#ffffff] mb-4"
      >
        <Image src="/icons/logo.png" height={70} width={70} alt="logo" />
      </div>
      <p className="text-center text-[25px] mb-4">Create a new Account</p>

      <form
        className="flex flex-col gap-1 w-2xs"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="m-1 mb-2 flex flex-col">
          <input
            className="w-full px-4 py-2.5 rounded-2xl bg-[#e0e5ec] outline-none
          shadow-[inset_6px_6px_10px_#a3b1c6,inset_-6px_-6px_10px_#ffffff]
          text-gray-700"
            placeholder="Full Name"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="m-1 mb-2 flex flex-col">
          <input
            className="w-full px-4 py-2.5 rounded-2xl bg-[#e0e5ec] outline-none
          shadow-[inset_6px_6px_10px_#a3b1c6,inset_-6px_-6px_10px_#ffffff]
          text-gray-700"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="m-1 mb-2 flex flex-col relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2.5 rounded-2xl bg-[#e0e5ec] outline-none
          shadow-[inset_6px_6px_10px_#a3b1c6,inset_-6px_-6px_10px_#ffffff]
          text-gray-700"
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="m-1 mb-2 flex flex-col relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full px-4 py-2.5 rounded-2xl bg-[#e0e5ec] outline-none
          shadow-[inset_6px_6px_10px_#a3b1c6,inset_-6px_-6px_10px_#ffffff]
          text-gray-700"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-3 text-gray-400 hover:text-gray-700"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-full text-white font-semibold
        bg-linear-to-r from-[#63ad84] to-[#488563]
        shadow-[6px_6px_10px_#a3b1c6,-6px_-6px_10px_#ffffff]
        hover:scale-[1.02] transition"
        >
          Register
        </button>
        <div className="my-5 text-center text-gray-500 text-[15px]">
          Already have an account.
          <button
            className="text-[#BE9D68] ml-1 cursor-pointer"
            onClick={onOpenLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
