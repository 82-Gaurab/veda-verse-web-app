"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterData, registerSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";


export default function RegisterForm() {
  const router = useRouter();

  const {register, handleSubmit, formState: {errors}} = useForm<RegisterData>(
    {
      resolver: zodResolver(registerSchema)
    }
  );

  
  const onSubmit = async (data: RegisterData) => {
    alert(`Create a new account with name: ${data.name} \nEmail: ${data.email}`);
    router.push("/login");
  }


  return (
    <div className="mx-auto max-w-md-border m-2 p-4 rounded">
      <form className="flex flex-col gap-1 w-2xs" onSubmit={handleSubmit(onSubmit) }>
        <div className="m-1 flex flex-col">
          <input className="px-5 py-1.5 border-none bg-gray-700 rounded-2xl outline-[#BE9D68] outline-1" placeholder="Full Name" {...register("name")}/>
          {
            errors.name && <span className="text-red-500">{errors.name.message}</span>
          }
        </div>
        <div className="m-1 flex flex-col">
          <input className="px-5 py-1.5 border-none bg-gray-700 rounded-2xl outline-[#BE9D68] outline-1" placeholder="Email" {...register("email")}/>
          {
            errors.email && <span className="text-red-500">{errors.email.message}</span>
          }
        </div>

        <div className="m-1 flex flex-col">
          <input type="password" className="px-5 py-1.5 border-none bg-gray-700 rounded-2xl outline-[#BE9D68] outline-1" placeholder="Password" {...register("password")}/>
          {
            errors.password && <span className="text-red-500">{errors.password.message}</span>
          }
        </div>
        <div className="m-1 flex flex-col">
          <input type="password" className="px-5 py-1.5 border-none bg-gray-700 rounded-2xl outline-[#BE9D68] outline-1" placeholder="Confirm Password" {...register("confirmPassword")}/>
          {
            errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>
          }
        </div>
        <button type="submit" className="bg-[#488563] p-2 mt-2 text-white rounded-4xl border-none cursor-pointer">Register</button>
        <div className="my-2 text-center text-[20px]">
          Already have an account.
          <Link href= "/login" className="text-[#BE9D68]"> Login</Link> 
        </div>
      </form>
    </div>
  );
}