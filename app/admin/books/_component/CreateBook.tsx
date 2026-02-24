/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookData, BookSchema } from "../schema";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { handleCreateBook } from "@/lib/action/admin/book-action";
import DatePicker from "react-datepicker";

interface Genre {
  _id: string;
  name: string;
}

export default function CreateBookForm({ genres }: { genres: Genre[] }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookData>({
    resolver: zodResolver(BookSchema),
  });

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreview(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: BookData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("author", data.author);
        if (data.publishedYear)
          formData.append("publishedYear", data.publishedYear);

        formData.append("price", data.price.toString());
        formData.append("stockAmount", data.stockAmount.toString());
        formData.append("description", data.description);

        const selectedGenreNames = genres
          .filter((g) => data.genre?.includes(g._id))
          .map((g) => g.name);

        if (selectedGenreNames.length > 0) {
          selectedGenreNames.forEach((g) => formData.append("genre", g));
        }

        if (data.coverImg) formData.append("coverImg", data.coverImg);

        const response = await handleCreateBook(formData);

        if (!response.success) {
          throw new Error(response.message || "Create book failed");
        }

        reset();
        handleDismissImage();
        toast.success("Book created successfully");
      } catch (error: Error | any) {
        toast.error(error.message || "Create book failed");
      }
    });
  };

  return (
    <div
      className="max-w-5xl mx-auto p-10 rounded-3xl
                 bg-[#eef2f7]
                 shadow-[10px_10px_30px_#c8d0e0,-10px_-10px_30px_#ffffff]"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-8">
        Create New Book
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-12"
      >
        {/* LEFT - COVER IMAGE */}
        <div className="md:w-1/3 flex flex-col items-center">
          <div
            className="w-64 h-80 rounded-2xl
                       bg-[#eef2f7]
                       shadow-[inset_6px_6px_12px_#c8d0e0,inset_-6px_-6px_12px_#ffffff]
                       flex items-center justify-center
                       overflow-hidden relative"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover rounded-2xl"
                sizes="256px"
              />
            ) : (
              <span className="text-gray-500 text-sm text-center px-4">
                Upload Cover Image
              </span>
            )}
          </div>

          <Controller
            name="coverImg"
            control={control}
            render={({ field: { onChange } }) => (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                    else setPreview(null);
                    onChange(file);
                  }}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-6 px-5 py-2.5 rounded-xl
                             bg-slate-700 hover:bg-slate-800
                             text-white text-sm font-medium
                             shadow-md
                             active:scale-95 transition"
                >
                  Choose Cover
                </button>

                {preview && (
                  <button
                    type="button"
                    onClick={() => handleDismissImage(onChange)}
                    className="mt-3 px-5 py-2 rounded-xl
                               bg-red-500 hover:bg-red-600
                               text-white text-sm
                               shadow-md
                               active:scale-95 transition"
                  >
                    Remove Image
                  </button>
                )}

                {errors.coverImg && (
                  <p className="text-xs text-red-600 mt-2">
                    {errors.coverImg.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* RIGHT - FORM FIELDS */}
        <div className="md:w-2/3 space-y-6">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Title
            </label>
            <input
              {...register("title")}
              className="w-full px-4 py-3 rounded-xl
                         bg-[#eef2f7]
                         shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                         outline-none text-sm text-gray-700
                         transition
                         focus:shadow-[inset_2px_2px_4px_#c8d0e0,inset_-2px_-2px_4px_#ffffff]"
            />
            {errors.title && (
              <p className="text-xs text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Author
            </label>
            <input
              {...register("author")}
              className="w-full px-4 py-3 rounded-xl
                         bg-[#eef2f7]
                         shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                         outline-none text-sm text-gray-700"
            />
          </div>

          {/* Genres */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Genres
            </label>
            <Controller
              name="genre"
              control={control}
              render={({ field }) => {
                const selected = field.value || [];
                return (
                  <div className="flex flex-wrap gap-4">
                    {genres.map((genre) => (
                      <label
                        key={genre._id}
                        className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selected.includes(genre._id)}
                          onChange={(e) => {
                            if (e.target.checked)
                              field.onChange([...selected, genre._id]);
                            else
                              field.onChange(
                                selected.filter((g: string) => g !== genre._id),
                              );
                          }}
                          className="accent-slate-700"
                        />
                        {genre.name}
                      </label>
                    ))}
                  </div>
                );
              }}
            />
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Price
            </label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="w-full px-4 py-3 rounded-xl
                         bg-[#eef2f7]
                         shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                         outline-none text-sm text-gray-700"
            />
          </div>

          {/* Stock */}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Stock Amount
            </label>
            <input
              type="number"
              {...register("stockAmount", { valueAsNumber: true })}
              className="w-full px-4 py-3 rounded-xl
                         bg-[#eef2f7]
                         shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                         outline-none text-sm text-gray-700"
            />
          </div>

          {/* Published Year */}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-gray-500 block">
              Published Year
            </label>

            <Controller
              name="publishedYear"
              control={control}
              render={({ field }) => {
                const selectedDate = field.value
                  ? new Date(`${field.value}-01-01`)
                  : null;

                return (
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => {
                      if (date) field.onChange(date.getFullYear().toString());
                      else field.onChange("");
                    }}
                    showYearPicker
                    dateFormat="yyyy"
                    placeholderText="Select Year"
                    className="w-full px-4 py-3 rounded-xl
                               bg-[#eef2f7]
                               shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                               outline-none text-sm text-gray-700"
                  />
                );
              }}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-gray-500 block">
              Description
            </label>
            <textarea
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-[#eef2f7]
          shadow-[inset_4px_4px_8px_#c9d4e3,inset_-4px_-4px_8px_#ffffff]
          outline-none text-sm text-gray-700"
              placeholder="Write book description..."
            />
          </div>

          {/* Submit */}
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
            {isSubmitting || pending ? "Creating book..." : "Create Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
