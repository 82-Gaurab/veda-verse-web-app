/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { handleCreateUser } from "@/lib/action/admin/user-action";
import { Edit2 } from "lucide-react";
export default function CreateUserForm() {
  const [pending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
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

  const onSubmit = async (data: UserData) => {
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

        formData.append("email", data.email);
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);

        if (data.profilePicture) {
          formData.append("profilePicture", data.profilePicture);
        }
        console.log([...formData.entries()]);

        const response = await handleCreateUser(formData);

        if (!response.success) {
          throw new Error(response.message || "Create profile failed");
        }
        reset();
        handleDismissImage();
        toast.success("Profile Created successfully");
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
      className="max-w-2xl mx-auto space-y-6 p-8 rounded-3xl 
               bg-[#eef2f7] 
               shadow-[10px_10px_30px_#c8d0e0,-10px_-10px_30px_#ffffff]"
    >
      {/* Profile Avatar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-28 h-28">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-28 h-28 rounded-full object-cover 
                       border-4 border-[#eef2f7] 
                       shadow-[6px_6px_12px_#c8d0e0,-6px_-6px_12px_#ffffff]"
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
              const isNewImage = previewImage && previewImage !== null;

              return (
                <>
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
                    className="absolute bottom-0 right-0 
                             bg-slate-700 hover:bg-slate-800 
                             text-white p-2 rounded-full 
                             shadow-md transition active:scale-95"
                  >
                    <Edit2 size={16} />
                  </button>

                  {/* Remove Icon */}
                  {isNewImage && (
                    <button
                      type="button"
                      onClick={() => {
                        handleDismissImage(onChange);
                        setPreviewImage(null);
                      }}
                      className="absolute top-0 right-0 
                               bg-red-500 hover:bg-red-600 
                               text-white w-7 h-7 rounded-full 
                               flex items-center justify-center 
                               text-sm shadow-md transition active:scale-95"
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

      {/* Name Fields Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <label
            className="text-xs uppercase tracking-wider text-gray-500"
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
                     shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                     outline-none
                     text-sm text-gray-700
                     placeholder:text-gray-400
                     transition
                     focus:shadow-[inset_2px_2px_4px_#c8d0e0,inset_-2px_-2px_4px_#ffffff]"
            {...register("firstName")}
            placeholder="Jane"
          />
          {errors.firstName?.message && (
            <p className="text-xs text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label
            className="text-xs uppercase tracking-wider text-gray-500"
            htmlFor="lastName"
          >
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            className="w-full px-4 py-3 rounded-xl 
                     bg-[#eef2f7] 
                     shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                     outline-none
                     text-sm text-gray-700
                     placeholder:text-gray-400
                     transition
                     focus:shadow-[inset_2px_2px_4px_#c8d0e0,inset_-2px_-2px_4px_#ffffff]"
            {...register("lastName")}
            placeholder="Doe"
          />
          {errors.lastName?.message && (
            <p className="text-xs text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label
          className="text-xs uppercase tracking-wider text-gray-500"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="w-full px-4 py-3 rounded-xl 
                   bg-[#eef2f7] 
                   shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                   outline-none
                   text-sm text-gray-700
                   placeholder:text-gray-400
                   transition
                   focus:shadow-[inset_2px_2px_4px_#c8d0e0,inset_-2px_-2px_4px_#ffffff]"
          {...register("email")}
          placeholder="you@example.com"
        />
        {errors.email?.message && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-1">
        <label
          className="text-xs uppercase tracking-wider text-gray-500"
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
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
          {...register("username")}
          placeholder="Jane Doe"
        />
        {errors.username?.message && (
          <p className="text-xs text-red-600">{errors.username.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1 relative">
        <label
          className="text-xs uppercase tracking-wider text-gray-500"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            className="w-full px-4 py-3 rounded-xl 
                 bg-[#eef2f7] 
                 shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                 outline-none
                 text-sm text-gray-700
                 placeholder:text-gray-400
                 transition
                 focus:shadow-[inset_2px_2px_4px_#c8d0e0,inset_-2px_-2px_4px_#ffffff]"
            {...register("password")}
            placeholder="••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password?.message && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1 relative">
        <label
          className="text-xs uppercase tracking-wider text-gray-500"
          htmlFor="confirmPassword"
        >
          Confirm password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            className="w-full px-4 py-3 rounded-xl 
                bg-[#eef2f7] 
                shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
                outline-none
                text-sm text-gray-700
                placeholder:text-gray-400
                transition
                focus:shadow-[inset_2px_2px_4px_#c8d0e0,inset_-2px_-2px_4px_#ffffff]"
            {...register("confirmPassword")}
            placeholder="••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.confirmPassword?.message && (
          <p className="text-xs text-red-600">
            {errors.confirmPassword.message}
          </p>
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
        {isSubmitting || pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
