/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, useForm } from "react-hook-form";
import { UserEditData, UserEditSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { handleUpdateUser } from "@/lib/action/admin/user-action";

interface UpdateUserFormProps {
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    username: string;
    profilePicture?: string | null;
  };
  onClose?: () => void;
}

export default function UpdateUserForm({ user, onClose }: UpdateUserFormProps) {
  const [pending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profilePicture || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserEditData>({
    resolver: zodResolver(UserEditSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      username: user.username,
    },
  });

  useEffect(() => {
    reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      username: user.username,
    });
  }, [user, reset]);

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

  const handleDismissImage = (onChange?: (file?: File) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: UserEditData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("id", user.id);

        if (data.firstName) formData.append("firstName", data.firstName);

        if (data.lastName) formData.append("lastName", data.lastName);

        if (data.email) formData.append("email", data.email);

        if (data.username) formData.append("username", data.username);

        // Only update password if provided
        if (data.password) {
          formData.append("password", data.password);

          if (data.confirmPassword) {
            formData.append("confirmPassword", data.confirmPassword);
          }
        }

        if (data.profilePicture) {
          formData.append("profilePicture", data.profilePicture);
        }

        const response = await handleUpdateUser(user.id, formData);

        if (!response.success) {
          throw new Error(response.message || "Update failed");
        }

        toast.success("User updated successfully");
        onClose?.();
      } catch (error: any) {
        toast.error(error.message || "Update failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Profile Preview */}
      <div className="mb-4">
        {previewImage ? (
          <div className="relative w-24 h-24">
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
            <Controller
              name="profilePicture"
              control={control}
              render={({ field: { onChange } }) => (
                <button
                  type="button"
                  onClick={() => handleDismissImage(onChange)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  ✕
                </button>
              )}
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
      </div>

      {/* Image Upload */}
      <Controller
        name="profilePicture"
        control={control}
        render={({ field: { onChange } }) => (
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
          />
        )}
      />

      {/* First & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <input
          {...register("firstName")}
          placeholder="First name"
          className="input"
        />
        <input
          {...register("lastName")}
          placeholder="Last name"
          className="input"
        />
      </div>

      {/* Email */}
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="input"
      />

      {/* Username */}
      <input
        {...register("username")}
        placeholder="Username"
        className="input"
      />

      {/* Optional Password */}
      <input
        {...register("password")}
        type="password"
        placeholder="New password (optional)"
        className="input"
      />

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm new password"
        className="input"
      />

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-10 w-full rounded-md bg-foreground text-background"
      >
        {isSubmitting || pending ? "Updating..." : "Update User"}
      </button>
    </form>
  );
}
