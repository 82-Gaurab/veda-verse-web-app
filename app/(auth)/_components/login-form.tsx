"use client";
import Link from "next/link";
import {useForm} from "react-hook-form";

import { LoginData, loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const router = useRouter();

  const {register, handleSubmit, formState: { errors}} = useForm<LoginData>(
    {
      resolver: zodResolver(loginSchema)
    }
  );


  
  const onSubmit = async (data: LoginData) => {
    alert(`Successfully logged in with ${data.email}`);
    router.push("/auth/dashboard");
  }


  return (
    <div className="mx-auto max-w-md-border m-1 p-4 rounded">

      <form className="flex flex-col gap-1 w-2xs" onSubmit={handleSubmit(onSubmit)}>
        <div className="m-1 flex flex-col">
          <input className="px-5 py-1.5 border-none bg-gray-700 rounded-2xl outline-[#BE9D68] outline-1" placeholder="Email" {...register("email")}/>
            {
            errors.email && // conditional rendering
            <span className="text-red-500">
              {errors.email.message}
            </span>
          }
        </div>

        <div className="m-1 flex flex-col">
          <input className="px-5 py-2 border-none bg-gray-700 text-white rounded-2xl outline-[#BE9D68] outline-1" placeholder="Password" {...register("password")}/>
            {
            errors.password && // conditional rendering
            <span className="text-red-500">
              {errors.password.message}
            </span>
          }
        </div>
        <button type="submit" className="bg-[#488563] rounded-4xl p-2 mt-2 text-white border-none cursor-pointer">Login</button>
      </form>

        <div className="my-2 text-center text-[20px]">
          Create an account. 
          <Link href= "/register" className="text-[#BE9D68]"> Register</Link> 
        </div>
    </div>
  );
}

