/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { UserEditData, UserEditSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { handleUpdateUser } from "@/lib/action/auth-action";

export default function EditUserForm() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserEditData>({
    resolver: zodResolver(UserEditSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      setPreviewImage(null);
    }

    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: UserEditData) => {
    setError(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        if (data.firstName) {
          formData.append("firstName", data.firstName);
        }
        if (data.lastName) {
          formData.append("lastName", data.lastName);
        }
        if (data.username) {
          formData.append("username", data.username);
        }
        if (data.profilePicture) {
          formData.append("profilePicture", data.profilePicture);
        }
        console.log([...formData.entries()]);

        const response = await handleUpdateUser(formData);

        if (!response.success) {
          throw new Error(response.message || "Update profile failed");
        }
        reset();
        handleDismissImage();
        toast.success("Profile Updated successfully");
      } catch (error: Error | any) {
        toast.error(error.message || "Create profile failed");
        setError(error.message || "Create profile failed");
      }
    });
  };
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 shadow-xl rounded-2xl p-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            className="mt-1 w-full h-10 rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent px-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
            {...register("firstName")}
            placeholder="Jane"
          />
          {errors.firstName?.message && (
            <p className="text-xs text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            className="mt-1 w-full h-10 rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent px-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
            {...register("lastName")}
            placeholder="Doe"
          />
          {errors.lastName?.message && (
            <p className="text-xs text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          className="mt-1 w-full h-10 rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent px-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
          {...register("username")}
          placeholder="Jane Doe"
        />
        {errors.username?.message && (
          <p className="text-xs text-red-600">{errors.username.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Updating profile..." : "Update Profile"}
      </button>
    </form>
  );
}
