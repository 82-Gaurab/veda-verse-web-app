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
      // handle redirect (optional)
      setTransition(() => {
        router.push("/login");
      });
    } catch (err: Error | any) {
      setError(err.message || "Registration failed");
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-md-border m-2 p-4 rounded">
      <Image src="/icons/logo.png" height={130} width={130} alt="logo" />
      <p className="text-center text-3xl mb-4">Create a new Account</p>

      <form
        className="flex flex-col gap-1 w-2xs"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="m-1 flex flex-col">
          <input
            className="px-5 py-1.5 border-none bg-gray-700 rounded-2xl outline-[#BE9D68] outline-1"
            placeholder="Full Name"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
        <div className="m-1 flex flex-col">
          <input
            className="px-5 py-1.5 border-none bg-gray-700 rounded-2xl outline-[#BE9D68] outline-1"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="m-1 flex flex-col relative">
          <input
            type={showPassword ? "text" : "password"}
            className="px-5 py-1.5 border-none bg-gray-700 rounded-2xl outline-[#BE9D68] outline-1"
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="m-1 flex flex-col relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="px-5 py-1.5 border-none bg-gray-700 rounded-2xl outline-[#BE9D68] outline-1"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-400 hover:text-gray-200"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#488563] p-2 mt-2 text-white rounded-4xl border-none cursor-pointer"
        >
          Register
        </button>
        <div className="my-2 text-center text-[20px]">
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
