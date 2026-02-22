"use client";
import React, { useState } from "react";
import { Edit2, ChevronDown } from "lucide-react";

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"created" | "saved">("saved");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h1 className="text-lg font-semibold">Profile</h1>

        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            Settings
            <ChevronDown size={18} />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 transition">
                Security
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 transition">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 transition">
                Update Profile
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Profile Header */}
      <div className="flex flex-col items-center mt-12">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700">
          <img
            src="/icons/default-profile.png"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <div className="flex items-center gap-2 mt-4">
          <h2 className="text-3xl font-bold">Birkhe</h2>
          {/* <Lock size={20} className="text-gray-400" /> */}
        </div>

        {/* Username */}
        <p className="text-gray-400 mt-1">@messikc619</p>

        {/* Following */}
        <p className="mt-2 font-medium">4 following</p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 px-6 py-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
            <Edit2 size={18} />
            Edit profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mt-10 border-b border-gray-800 w-full justify-center">
          <button
            onClick={() => setActiveTab("created")}
            className={`pb-3 ${
              activeTab === "created"
                ? "border-b-2 border-white font-semibold"
                : "text-gray-400"
            }`}
          >
            Created
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 ${
              activeTab === "saved"
                ? "border-b-2 border-white font-semibold"
                : "text-gray-400"
            }`}
          >
            Saved
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8 text-center text-gray-400">
        {activeTab === "created"
          ? "No created items yet."
          : "No saved items yet."}
      </div>
    </div>
  );
};

export default ProfilePage;
