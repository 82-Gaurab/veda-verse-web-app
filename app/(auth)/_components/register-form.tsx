"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterData, registerSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {

  const {register, handleSubmit, formState: {errors}} = useForm<RegisterData>(
    {
      resolver: zodResolver(registerSchema)
    }
  );

  
  const onSubmit = async (data: RegisterData) => {
    alert(`${data.name}, ${data.email}`);
  }


  return (
    <div className="mx-auto max-w-md-border m-2 p-4 rounded w-2xs">
      <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit) }>
        <div className="m-1 flex flex-col">
          <input className="p-1 border rounded-2xl" placeholder="Full Name" {...register("name")}/>
          {
            errors.name && <span className="text-red-500">{errors.name.message}</span>
          }
        </div>
        <div className="m-1 flex flex-col">
          <input className="p-1 border rounded-2xl" placeholder="Email" {...register("email")}/>
          {
            errors.email && <span className="text-red-500">{errors.email.message}</span>
          }
        </div>

        <div className="m-1 flex flex-col">
          <input className="p-1 border rounded-2xl" placeholder="Password" {...register("password")}/>
          {
            errors.password && <span className="text-red-500">{errors.password.message}</span>
          }
        </div>
        <div className="m-1 flex flex-col">
          <input className="p-1 border rounded-2xl" placeholder="Confirm Password" {...register("confirmPassword")}/>
          {
            errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>
          }
        </div>
        <button type="submit" className="bg-[#488563] p-2 mt-2 text-white rounded-4xl border-none">Register</button>
        <div>
          Already have an account. 
          <Link href= "/login" className="text-blue-500 underline">Login</Link> 
        </div>
      </form>
    </div>
  );
}