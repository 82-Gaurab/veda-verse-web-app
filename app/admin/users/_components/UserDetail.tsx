"use client";

import Image from "next/image";

interface UserDetailProps {
  user: {
    firstName?: string;
    lastName?: string;
    username: string;
    email: string;
    role: "user" | "admin";
    profilePicture?: string | null;
    wishlist: string[]; // or populated books if needed
    cart: {
      bookId: string;
      quantity: number;
    }[];
    createdAt: string;
    updatedAt: string;
  };
}

export default function UserDetail({ user }: UserDetailProps) {
  const fullName =
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.username;

  const totalCartItems =
    user.cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto bg-blue-100/20 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 p-10">
          {/* Profile Section */}
          <div className="flex justify-center">
            <div
              className="relative w-80 h-96 rounded-2xl overflow-hidden 
              bg-blue-100/40 border border-blue-200
              shadow-[8px_8px_20px_rgba(0,0,0,0.05),-8px_-8px_20px_rgba(255,255,255,0.6)]
              flex items-center justify-center"
            >
              {user.profilePicture ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePicture}`}
                  alt={user.username}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                  unoptimized
                />
              ) : (
                <span className="text-6xl font-semibold text-blue-800">
                  {user.username[0].toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <h1 className="text-4xl font-semibold text-blue-900 tracking-tight">
                  {fullName}
                </h1>
                <p className="text-blue-800/80 mt-2">@{user.username}</p>
              </div>

              {/* Role Badge */}
              <div className="flex gap-3">
                <span
                  className={`px-4 py-1.5 text-xs uppercase tracking-wide
                  rounded-full border shadow-inner
                  ${
                    user.role === "admin"
                      ? "bg-red-100/50 text-red-700 border-red-200"
                      : "bg-green-100/50 text-green-700 border-green-200"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              {/* Email */}
              <p className="text-gray-700 leading-relaxed text-sm">
                <span className="font-semibold text-blue-900">Email:</span>{" "}
                {user.email}
              </p>

              {/* Meta Info Cards */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="bg-white/60 border border-blue-200 rounded-xl p-4 shadow-inner">
                  <p className="uppercase text-xs tracking-wide text-blue-800 mb-1">
                    Wishlist
                  </p>
                  <p className="text-gray-800 font-medium">
                    {user.wishlist?.length || 0} items
                  </p>
                </div>

                <div className="bg-white/60 border border-blue-200 rounded-xl p-4 shadow-inner">
                  <p className="uppercase text-xs tracking-wide text-blue-800 mb-1">
                    Cart
                  </p>
                  <p className="text-gray-800 font-medium">
                    {totalCartItems} items
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="bg-white/60 border border-blue-200 rounded-xl p-4 shadow-inner">
                  <p className="uppercase text-xs tracking-wide text-blue-800 mb-1">
                    Joined
                  </p>
                  <p className="text-gray-800 font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-white/60 border border-blue-200 rounded-xl p-4 shadow-inner">
                  <p className="uppercase text-xs tracking-wide text-blue-800 mb-1">
                    Last Updated
                  </p>
                  <p className="text-gray-800 font-medium">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between pt-8 border-t border-blue-200">
              <div className="text-lg font-medium text-blue-900">
                Account Status: Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
