"use client";
import Link from "next/link";
import {useForm} from "react-hook-form";

import { LoginData, loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";


export default function LoginForm() {

  const {register, handleSubmit, formState: { errors}} = useForm<LoginData>(
    {
      resolver: zodResolver(loginSchema)
    }
  );


  
  const onSubmit = async (data: LoginData) => {
    alert(data.email);
  }


  return (
    <div className="mx-auto max-w-md-border m-2 p-4 rounded">
      <div className="mb-2">
          Create an account. 
          <Link href= "/register" className="text-blue-500 "> Register</Link> 
        </div>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="m-1 flex flex-col">
          <input className="px-4 py-1 border border-gray-400 bg-gray-700 placeholder-[#BE9D68] rounded-2xl" placeholder="Email" {...register("email")}/>
            {
            errors.email && // conditional rendering
            <span className="text-red-500">
              {errors.email.message}
            </span>
          }
        </div>

        <div className="m-1 flex flex-col">
          <input className="px-4 py-1 border rounded-2xl" placeholder="Password" {...register("password")}/>
            {
            errors.password && // conditional rendering
            <span className="text-red-500">
              {errors.password.message}
            </span>
          }
        </div>
        <button type="submit" className="bg-[#488563] rounded-4xl p-2 mt-2 text-white border-none">Login</button>
        
      </form>
    </div>
  );
}

