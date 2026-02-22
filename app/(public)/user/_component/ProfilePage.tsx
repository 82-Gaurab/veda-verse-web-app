/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
import { Edit2, Lock } from "lucide-react";
import EditUserForm from "./EditProfile";
import { Controller, useForm } from "react-hook-form";
import { UserEditData, UserEditSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ChangePassword from "./ChangePassword";

export const ProfilePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const { control } = useForm<UserEditData>({
    resolver: zodResolver(UserEditSchema),
  });

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImgSrc(previewUrl);
    }

    onChange(file);
  };

  const [imgSrc, setImgSrc] = useState(
    // user?.profilePicture
    //   ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePicture}`      :
    "/icons/default-profile.png",
  );
  return (
    <div className="min-h-screen bg-[#FDF6E3] text-[#3A3A3A] overflow-hidden max-w-7xl pb-10">
      {/* Navbar */}
      <nav className="flex justify-center items-center px-6 py-4 border-b border-gray-800">
        <h1 className="text-3xl font-semibold">User Profile</h1>
      </nav>

      {/* Profile Header */}
      <div className="flex flex-col items-center mt-12">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full border-4 border-gray-700 relative group">
          <img
            src={imgSrc}
            alt="avatar"
            className="w-full h-full object-cover"
          />
          <Controller
            name="profilePicture"
            control={control}
            render={({ field: { onChange } }) => (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0], onChange)
                  }
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-black text-white text-xs px-3 py-1 rounded-full shadow-md hover:scale-105 transition"
                >
                  Change
                </button>
              </>
            )}
          />
        </div>

        {/* Name */}
        <div className="flex items-center gap-2 mt-4">
          <h2 className="text-3xl font-bold">Birkhe</h2>
        </div>

        {/* Username */}
        <p className="text-gray-400 mt-1">@messikc619</p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => {
              setShowEditProfile((prev) => !prev);
              setShowChangePassword(false);
            }}
            className="flex items-center gap-2 px-6 py-2 text-white bg-[#C6A75E] border border-[#FFECC0] rounded-full hover:bg-[#ab9665] transition"
          >
            <Edit2 size={18} />
            Edit profile
          </button>
          <button
            onClick={() => {
              setShowChangePassword((prev) => !prev);
              setShowEditProfile(false);
            }}
            className="flex items-center gap-2 px-6 py-2 text-white bg-[#C6A75E] border border-[#FFECC0] rounded-full hover:bg-[#ab9665] transition"
          >
            <Lock size={18} />
            Change Password
          </button>
        </div>

        <div className="flex gap-8 my-10 border-b border-gray-800 w-full justify-center"></div>
        {showEditProfile ? <EditUserForm /> : null}

        {showChangePassword ? <ChangePassword /> : null}
      </div>
    </div>
  );
};

export default ProfilePage;
