/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, useForm } from "react-hook-form";
import { UserEditData, UserEditSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { handleUpdateUser } from "@/lib/action/admin/user-action";
import { Edit2 } from "lucide-react";

interface UpdateUserFormProps {
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    username: string;
    role: string;
    profilePicture?: string | null;
  };
}

export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [pending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profilePicture || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserEditData>({
    resolver: zodResolver(UserEditSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      username: user.username,
      role: user.role,
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

  const handleDismissImage = (onChange?: (file?: File) => void) => {
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

        if (data.role) formData.append("role", user.role);

        if (data.profilePicture) {
          formData.append("profilePicture", data.profilePicture);
        }

        const response = await handleUpdateUser(user.id, formData);

        if (!response.success) {
          throw new Error(response.message || "Update failed");
        }

        toast.success("User updated successfully");
      } catch (error: any) {
        toast.error(error.message || "Update failed");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto space-y-6 p-8 rounded-3xl 
             bg-[#eef2f7] 
             shadow-[10px_10px_25px_#c9d4e3,-10px_-10px_25px_#ffffff]"
    >
      {/* Profile Preview */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-28 h-28">
          {/* Profile Image */}
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />
          ) : (
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-400">
              <span className="text-sm">No Image</span>
            </div>
          )}

          <Controller
            name="profilePicture"
            control={control}
            render={({ field: { onChange } }) => {
              const isNewImage =
                previewImage && previewImage !== user.profilePicture;

              return (
                <>
                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(e) =>
                      handleImageChange(e.target.files?.[0], onChange)
                    }
                    className="hidden"
                  />

                  {/* Edit Icon */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition"
                  >
                    <Edit2 size={16} />
                  </button>

                  {/* Remove Icon (Only when new image selected) */}
                  {isNewImage && (
                    <button
                      type="button"
                      onClick={() => {
                        handleDismissImage(onChange);
                        setPreviewImage(user.profilePicture || null);
                      }}
                      className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-md transition"
                    >
                      ✕
                    </button>
                  )}
                </>
              );
            }}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          className="text-xs uppercase tracking-wider "
          htmlFor="firstName"
        >
          First name
        </label>
        <input
          id="firstName"
          type="text"
          autoComplete="given-name"
          className="w-full px-4 py-3 rounded-xl 
           bg-[#eef2f7] 
           shadow-[inset_4px_4px_8px_#c9d4e3,inset_-4px_-4px_8px_#ffffff]
           outline-none
           focus:shadow-[inset_2px_2px_4px_#c9d4e3,inset_-2px_-2px_4px_#ffffff]
           transition text-sm text-gray-700 placeholder:text-gray-400"
          {...register("firstName")}
          placeholder="Jane"
        />
        {errors.firstName?.message && (
          <p className="text-xs text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider " htmlFor="lastName">
          Last name
        </label>
        <input
          id="lastName"
          type="text"
          autoComplete="family-name"
          className="w-full px-4 py-3 rounded-xl 
           bg-[#eef2f7] 
           shadow-[inset_4px_4px_8px_#c9d4e3,inset_-4px_-4px_8px_#ffffff]
           outline-none
           focus:shadow-[inset_2px_2px_4px_#c9d4e3,inset_-2px_-2px_4px_#ffffff]
           transition text-sm text-gray-700 placeholder:text-gray-400"
          {...register("lastName")}
          placeholder="Doe"
        />
        {errors.lastName?.message && (
          <p className="text-xs text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider " htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="w-full px-4 py-3 rounded-xl 
           bg-[#eef2f7] 
           shadow-[inset_4px_4px_8px_#c9d4e3,inset_-4px_-4px_8px_#ffffff]
           outline-none
           focus:shadow-[inset_2px_2px_4px_#c9d4e3,inset_-2px_-2px_4px_#ffffff]
           transition text-sm text-gray-700 placeholder:text-gray-400"
          {...register("email")}
          placeholder="you@example.com"
        />
        {errors.email?.message && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider " htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          className="w-full px-4 py-3 rounded-xl 
           bg-[#eef2f7] 
           shadow-[inset_4px_4px_8px_#c9d4e3,inset_-4px_-4px_8px_#ffffff]
           outline-none
           focus:shadow-[inset_2px_2px_4px_#c9d4e3,inset_-2px_-2px_4px_#ffffff]
           transition text-sm text-gray-700 placeholder:text-gray-400"
          {...register("username")}
          placeholder="Jane Doe"
        />
        {errors.username?.message && (
          <p className="text-xs text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider " htmlFor="role">
          Role
        </label>

        <div className="relative">
          <select
            id="role"
            className="w-full px-4 py-3 rounded-xl 
               bg-[#eef2f7] 
               shadow-[inset_4px_4px_8px_#c9d4e3,inset_-4px_-4px_8px_#ffffff]
               outline-none appearance-none
               text-sm text-gray-700 transition"
            {...register("role")}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500 text-xs">
            ▼
          </div>
        </div>

        {errors.role?.message && (
          <p className="text-xs text-red-600">{errors.role.message}</p>
        )}
      </div>

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
        {isSubmitting || pending ? "Updating..." : "Update User"}
      </button>
    </form>
  );
}
