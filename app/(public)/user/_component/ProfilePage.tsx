"use client";
import React, { useState, useRef } from "react";

function ConfirmationModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] p-6 rounded-lg max-w-sm w-full text-gray-200 shadow-lg">
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Edit profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // For image preview & file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState("/icons/default-profile.png");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImgSrc(URL.createObjectURL(file));
  };

  // Simple form state for demo
  const [form, setForm] = useState({
    firstName: "Birkhe",
    lastName: "",
    about: "",
    pronouns: "",
    website: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      about: "",
      pronouns: "",
      website: "",
    });
    setImgSrc("/icons/default-profile.png");
  };

  const handleSave = () => {
    alert("Profile saved (demo)");
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    // Add your logout logic here, e.g., clear auth, redirect, etc.
    alert("Logged out (demo)");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 flex font-sans">
      {/* Sidebar */}
      <aside className="w-60 border-r border-gray-700 px-6 pt-12 flex flex-col gap-6">
        <button
          onClick={() => setActiveTab("Edit profile")}
          className={`text-left font-semibold text-sm leading-snug transition-colors duration-200 ${
            activeTab === "Edit profile"
              ? "text-white font-bold"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Edit profile
        </button>
        <button
          onClick={() => setActiveTab("Update password")}
          className={`text-left font-semibold text-sm leading-snug transition-colors duration-200 ${
            activeTab === "Update password"
              ? "text-white font-bold"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Update password
        </button>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="mt-auto text-left font-semibold text-sm text-red-500 hover:text-red-400"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 max-w-4xl">
        {activeTab === "Edit profile" && (
          <>
            <h1 className="text-2xl font-bold mb-2">Edit profile</h1>
            <p className="mb-8 text-gray-400 max-w-lg">
              Keep your personal details private. Information you add here is
              visible to anyone who can view your profile.
            </p>

            {/* Profile photo & change button */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-600 bg-gray-800">
                <img
                  src={imgSrc}
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-3 py-1 rounded-md text-sm"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-6 max-w-lg"
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs font-semibold mb-1"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="w-full bg-[#1E1E1E] border border-gray-700 rounded-md py-2 px-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5c88f6]"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs font-semibold mb-1"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full bg-[#1E1E1E] border border-gray-700 rounded-md py-2 px-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5c88f6]"
                />
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-xs font-semibold mb-1"
                >
                  About
                </label>
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={form.about}
                  onChange={handleInputChange}
                  placeholder="Tell your story"
                  className="w-full bg-[#1E1E1E] border border-gray-700 rounded-md py-2 px-3 text-sm placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#5c88f6]"
                />
              </div>

              <div>
                <label
                  htmlFor="pronouns"
                  className="block text-xs font-semibold mb-1"
                >
                  Pronouns
                </label>
                <select
                  id="pronouns"
                  name="pronouns"
                  value={form.pronouns}
                  onChange={handleInputChange}
                  className="w-full bg-[#1E1E1E] border border-gray-700 rounded-md py-2 px-3 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5c88f6]"
                >
                  <option value="" disabled>
                    Add your pronouns
                  </option>
                  <option value="she/her">She/Her</option>
                  <option value="he/him">He/Him</option>
                  <option value="they/them">They/Them</option>
                  <option value="other">Other</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Choose up to 2 sets of pronouns to appear on your profile so
                  others know how to refer to you. You can edit or remove these
                  any time.
                </p>
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-xs font-semibold mb-1"
                >
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={handleInputChange}
                  placeholder="https://"
                  className="w-full bg-[#1E1E1E] border border-gray-700 rounded-md py-2 px-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5c88f6]"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Add a link to drive traffic to your site
                </p>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-800 px-5 py-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition text-sm font-semibold"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-[#5c88f6] px-5 py-2 rounded-full text-white hover:bg-sky-500 transition text-sm font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </>
        )}

        {activeTab === "Update password" && (
          <div className="max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Update password</h1>
            <p className="mb-8 text-gray-400">
              Change your password to keep your account secure.
            </p>
            {/* Placeholder for update password form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Password updated (demo)");
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-xs font-semibold mb-1"
                >
                  Current password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#1E1E1E] border border-gray-700 rounded-md py-2 px-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5c88f6]"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-xs font-semibold mb-1"
                >
                  New password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#1E1E1E] border border-gray-700 rounded-md py-2 px-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5c88f6]"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold mb-1"
                >
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#1E1E1E] border border-gray-700 rounded-md py-2 px-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5c88f6]"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-[#5c88f6] px-5 py-2 rounded-full text-white hover:bg-sky-500 transition text-sm font-semibold"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}

        {showLogoutModal && (
          <ConfirmationModal
            message="Are you sure you want to logout?"
            onCancel={() => setShowLogoutModal(false)}
            onConfirm={handleLogoutConfirm}
          />
        )}
      </main>
    </div>
  );
}
