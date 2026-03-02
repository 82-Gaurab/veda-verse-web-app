/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { GenreEditData, GenreEditSchema } from "../schema";
import {
  handleCreateGenre,
  handleUpdateGenre,
} from "@/lib/action/admin/genre-action";

interface UpdateGenreProps {
  genre: {
    _id: string;
    name: string;
  };
}

export default function UpdateGenreForm({ genre }: UpdateGenreProps) {
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GenreEditData>({
    resolver: zodResolver(GenreEditSchema),
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: GenreEditData) => {
    setError(null);
    startTransition(async () => {
      try {
        const name = data.name!;
        const response = await handleUpdateGenre(genre._id, { name: name });

        if (!response.success) {
          throw new Error(response.message || "Update genre failed");
        }
        reset();
        toast.success("Genre Updated successfully");
      } catch (error: Error | any) {
        toast.error(error.message || "Update genre failed");
        setError(error.message || "Update genre failed");
      }
    });
  };
  console.log(errors);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6 p-8 rounded-3xl 
             bg-[#eef2f7] 
             shadow-[10px_10px_30px_#c8d0e0,-10px_-10px_30px_#ffffff]"
      >
        <div className="space-y-1">
          <label
            className="text-xs uppercase tracking-wider text-gray-500"
            htmlFor="name"
          >
            Genre Label
          </label>
          <input
            id="name"
            type="text"
            autoComplete="username"
            className="w-full px-4 py-3 rounded-xl 
                     bg-[#eef2f7] 
                     shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                     outline-none
                     text-sm text-gray-700
                     placeholder:text-gray-400
                     transition
                     focus:shadow-[inset_2px_2px_4px_#c8d0e0,inset_-2px_-2px_4px_#ffffff]"
            {...register("name")}
            placeholder={genre.name}
          />
          {errors.name?.message && (
            <p className="text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || pending}
          className="w-full py-3 rounded-xl
                      bg-green-600
                      text-white text-sm font-semibold
                      shadow-lg
                      hover:bg-green-700 focus:outline-none 
                      focus:ring-2 focus:ring-green-400 
                      focus:ring-offset-2 duration-200
                      active:scale-[0.98]
                      transition
                      disabled:opacity-50"
        >
          {isSubmitting || pending ? "Updating genre..." : "Update genre"}
        </button>
      </form>
    </div>
  );
}
