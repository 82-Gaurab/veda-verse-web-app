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
    <div className="flex flex-col items-center mx-auto max-w-md-border m-1 p-3 rounded">
      <Image src="/icons/logo.png" height={130} width={130} alt="logo" />
      <p className="text-center m-0 text-3xl mb-4">Welcome Back</p>
      <form
        className="flex flex-col gap-1 w-2xs"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="m-1 flex flex-col">
          <input
            className="px-5 py-1.5 border-none bg-gray-700 rounded-2xl outline-[#BE9D68] outline-1"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && ( // conditional rendering
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="m-1 flex flex-col relative">
          <input
            type={showPassword ? "text" : "password"}
            className="px-5 py-2 border-none bg-gray-700 text-white rounded-2xl outline-[#BE9D68] outline-1"
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
          {errors.password && ( // conditional rendering
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting || pending}
          className="bg-[#488563] rounded-4xl p-2 mt-2 text-white border-none cursor-pointer"
        >
          {isSubmitting || pending ? "Logging in..." : "Log In"}
        </button>
      </form>
      <div className="my-2 text-center text-[20px]">
        Create an account.
        <button
          type="button"
          className="text-[#BE9D68] ml-1 cursor-pointer"
          onClick={onOpenRegister}
        >
          Register
        </button>
        <div className="mt-2 text-center text-sm">
          <button
            onClick={onForgotPassword}
            className="font-semibold text-red-400 hover:underline cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
