/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginData, loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/lib/action/auth-action";
import { useState, useTransition } from "react";

interface LoginFormProps {
  onOpenRegister: () => void;
  onForgotPassword: () => void;
}

export default function LoginForm({
  onOpenRegister,
  onForgotPassword,
}: LoginFormProps) {
  const router = useRouter();
  const [pending, setTransition] = useTransition();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await handleLogin(data);
      if (!res.success) {
        throw new Error(res.message || "Login Failed");
      }

      if (res.success) {
        toast.success("Login success");
        if (res.data?.role == "admin") {
          return router.replace("/admin");
        }
        if (res.data?.role === "user") {
          return router.replace("/user/dashboard");
        }
        return router.replace("/");
      } else {
        setError("Login failed");
      }

      setTransition(() => {
        router.push("/auth/dashboard");
      });
    } catch (error: Error | any) {
      setError(error.message || "Login Failed");
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-md-border m-1 rounded text-black">
      <div
        className="w-24 h-24 rounded-full bg-black flex items-center justify-center
        shadow-[6px_6px_10px_#a3b1c6,-6px_-6px_10px_#ffffff] mb-4"
      >
        <Image src="/icons/logo.png" height={70} width={70} alt="logo" />
      </div>
      <p className="text-center m-0 text-[25px] mb-4">Welcome Back</p>
      <form
        className="flex flex-col gap-1 w-2xs"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="m-1 mb-2 flex flex-col">
          <input
            placeholder="username"
            {...register("email")}
            className="w-full px-4 py-2.5 rounded-2xl bg-[#e0e5ec] outline-none
          shadow-[inset_6px_6px_10px_#a3b1c6,inset_-6px_-6px_10px_#ffffff]
          text-gray-700"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="m-1 mb-2 flex flex-col relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            {...register("password")}
            className="w-full px-4 py-2.5 rounded-2xl bg-[#e0e5ec] outline-none
          shadow-[inset_6px_6px_10px_#a3b1c6,inset_-6px_-6px_10px_#ffffff]
          text-gray-700"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && ( // conditional rendering
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
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
          {isSubmitting || pending ? "Logging in..." : "Log In"}
        </button>
      </form>
      <div className="my-6 text-center text-gray-500 text-[15px]">
        <button
          onClick={onForgotPassword}
          className="font-semibold hover:underline cursor-pointer"
        >
          Forgot Password?
        </button>
        <span> or </span>
        <button
          type="button"
          className="text-[#BE9D68] ml-1 cursor-pointer"
          onClick={onOpenRegister}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
