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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-1">
          <label className="block mb-2 font-semibold">Email:</label>
          <input className="p-1 border" {...register("email")}/>
            {
            errors.email && // conditional rendering
            <span className="text-red-500">
              {errors.email.message}
            </span>
          }
        </div>

        <div className="m-1">
          <label className="block mb-2 font-semibold">Password:</label>
          <input className="p-1 border" {...register("password")}/>
            {
            errors.password && // conditional rendering
            <span className="text-red-500">
              {errors.password.message}
            </span>
          }
        </div>
        <button type="submit" className="bg-green-500 border rounded p-2 mt-2 text-white">Login</button>
        <div>
          Create an account. 
          <Link href= "/register" className="text-blue-500 underline"> Register</Link> 
        </div>
      </form>
    </div>
  );
}

