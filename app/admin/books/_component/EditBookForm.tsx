/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { BookEditData, BookEditSchema } from "@/app/admin/books/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Edit2 } from "lucide-react";
import { handleUpdateBook } from "@/lib/action/admin/book-action";

interface Genre {
  _id: string;
  name: string;
}

interface EditBookFormProps {
  book: {
    _id: string;
    title: string;
    author: string;
    description: string;
    genre?: string[];
    price: number;
    stockAmount: number;
    publishedYear?: string;
    coverImg?: string | null;
  };
  genres: Genre[];
}

export default function EditBookForm({ book, genres }: EditBookFormProps) {
  const [pending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(
    book.coverImg || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookEditData>({
    resolver: zodResolver(BookEditSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      description: book.description,
      genre: book.genre || [],
      price: book.price,
      stockAmount: book.stockAmount,
      publishedYear: book.publishedYear || "",
    },
  });

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
    onChange(file);
  };

  const onSubmit = async (data: BookEditData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        if (data.title) formData.append("title", data.title);
        if (data.author) formData.append("author", data.author);
        if (data.description) formData.append("description", data.description);
        if (data.price !== undefined)
          formData.append("price", data.price.toString());
        if (data.stockAmount !== undefined)
          formData.append("stockAmount", data.stockAmount.toString());
        if (data.publishedYear)
          formData.append("publishedYear", data.publishedYear);

        if (data.genre && data.genre.length > 0) {
          data.genre.forEach((name) => {
            formData.append("genre", name);
          });
        } else {
          // Send empty indicator so backend clears genres
          formData.append("genre", "");
        }

        if (data.coverImg) {
          formData.append("coverImg", data.coverImg);
        }

        console.log([...formData.entries()]);

        const response = await handleUpdateBook(book._id, formData);

        if (!response.success) {
          throw new Error(response.message || "Update failed");
        }

        toast.success("Book updated successfully");
      } catch (error: any) {
        toast.error(error.message || "Update failed");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-10 rounded-3xl
      bg-[#eef2f7]
      shadow-[10px_10px_25px_#c9d4e3,-10px_-10px_25px_#ffffff]
      space-y-8"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Book</h2>

      {/* Cover Preview */}
      <div className="flex justify-center">
        <div className="relative w-40 h-60">
          {previewImage ? (
            <Image
              src={
                previewImage.startsWith("blob:")
                  ? previewImage
                  : `${process.env.NEXT_PUBLIC_API_BASE_URL}${previewImage}`
              }
              alt="Cover Preview"
              fill
              className="object-cover rounded-2xl border-4 border-white shadow-md"
              unoptimized
            />
          ) : (
            <div className="w-40 h-60 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-400 text-sm">
              No Cover
            </div>
          )}

          <Controller
            name="coverImg"
            control={control}
            render={({ field: { onChange } }) => (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0], onChange)
                  }
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 bg-slate-700 hover:bg-slate-800 text-white p-2 rounded-full shadow-md transition"
                >
                  <Edit2 size={16} />
                </button>
              </>
            )}
          />
        </div>
      </div>

      {/* Title */}
      <FormInput
        label="Title"
        id="title"
        register={register("title")}
        error={errors.title?.message}
      />

      {/* Author */}
      <FormInput
        label="Author"
        id="author"
        register={register("author")}
        error={errors.author?.message}
      />

      {/* Description */}
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-[#eef2f7]
          shadow-[inset_4px_4px_8px_#c9d4e3,inset_-4px_-4px_8px_#ffffff]
          outline-none text-sm text-gray-700"
        />
        {errors.description?.message && (
          <p className="text-xs text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Genres */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider">Genres</label>

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
                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(genre.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([...selected, genre.name]);
                        } else {
                          field.onChange(
                            selected.filter((g: string) => g !== genre.name),
                          );
                        }
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

        {errors.genre && (
          <p className="text-xs text-red-600">{errors.genre.message}</p>
        )}
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-2 gap-6">
        <FormInput
          label="Price"
          id="price"
          type="number"
          register={register("price", { valueAsNumber: true })}
          error={errors.price?.message}
        />
        <FormInput
          label="Stock"
          id="stockAmount"
          type="number"
          register={register("stockAmount", { valueAsNumber: true })}
          error={errors.stockAmount?.message}
        />
      </div>

      {/* Published Year */}
      <FormInput
        label="Published Year"
        id="publishedYear"
        register={register("publishedYear")}
        error={errors.publishedYear?.message}
      />

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
        {isSubmitting || pending ? "Updating..." : "Update Book"}
      </button>
    </form>
  );
}

/* Reusable Input */
function FormInput({ label, id, register, error, type = "text" }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-wider" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        className="w-full px-4 py-3 rounded-xl 
        bg-[#eef2f7] 
        shadow-[inset_4px_4px_8px_#c9d4e3,inset_-4px_-4px_8px_#ffffff]
        outline-none text-sm text-gray-700"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
