/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { handleDeleteUser } from "@/lib/action/admin/user-action";
import DeleteModal from "@/app/(public)/_component/DeleteModal";
const DisplayUserTable = ({
  users,
  pagination,
  search,
}: {
  users: any[];
  pagination: any;
  search?: string;
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || "");
  const handleSearchChange = () => {
    router.push(
      `/admin/users?page=1&size=${pagination.size}` +
        (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""),
    );
  };
  const makePagination = (): React.ReactElement[] => {
    const pages = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const delta = 2; // Number of pages to show on each side of current page

    // Previous button
    const prevHref =
      `/admin/users?page=${currentPage - 1}&size=${pagination.size}` +
      (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "");
    pages.push(
      <Link
        key="prev"
        className={`px-4 py-2 rounded-lg text-sm font-medium transition
                    ${
                      currentPage === 1
                        ? "bg-green-200 text-green-600 cursor-not-allowed pointer-events-none"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
        href={currentPage === 1 ? "#" : prevHref}
      >
        Previous
      </Link>,
    );

    // Calculate range of pages to show
    const startPage = Math.max(1, currentPage - delta);
    const endPage = Math.min(totalPages, currentPage + delta);

    // Add first page if not in range
    if (startPage > 1) {
      const href =
        `/admin/users?page=1&size=${pagination.size}` +
        (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "");
      pages.push(
        <Link
          key={1}
          className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100"
          href={href}
        >
          1
        </Link>,
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 text-gray-500">
            ...
          </span>,
        );
      }
    }

    // Add page numbers in range
    for (let i = startPage; i <= endPage; i++) {
      const href =
        `/admin/users?page=${i}&size=${pagination.size}` +
        (search ? `&search=${encodeURIComponent(search)}` : "");
      pages.push(
        <Link
          key={i}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition
                    ${
                      i === currentPage
                        ? "bg-green-600 text-white"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
          href={href}
        >
          {i}
        </Link>,
      );
    }

    // Add last page if not in range
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 text-gray-500">
            ...
          </span>,
        );
      }
      const href =
        `/admin/users?page=${totalPages}&size=${pagination.size}` +
        (search ? `&search=${encodeURIComponent(search)}` : "");
      pages.push(
        <Link
          key={totalPages}
          className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100"
          href={href}
        >
          {totalPages}
        </Link>,
      );
    }

    // Next button
    const nextHref =
      `/admin/users?page=${currentPage + 1}&size=${pagination.size}` +
      (search ? `&search=${encodeURIComponent(search)}` : "");
    pages.push(
      <Link
        key="next"
        className={`px-4 py-2 rounded-lg text-sm font-medium transition
  ${
    currentPage === totalPages
      ? "bg-green-200 text-green-600 cursor-not-allowed pointer-events-none"
      : "bg-green-500 text-white hover:bg-green-600"
  }`}
        href={currentPage === totalPages ? "#" : nextHref}
      >
        Next
      </Link>,
    );

    return pages;
  };
  const [deleteId, setDeleteId] = useState(null);

  const onDelete = async () => {
    try {
      await handleDeleteUser(deleteId!);
      toast.success("User deleted successfully");
    } catch (err: Error | any) {
      toast.error(err.message || "Failed to delete user");
    } finally {
      setDeleteId(null);
    }
  };
  return (
    <div className="mt-6 mb-6 bg-green-80/20 rounded-xl shadow-sm overflow-hidden border border-green-100">
      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={onDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this item? This action cannot be undone."
      />

      {/* Search Bar */}
      <div className="p-5 bg-green-50/60 border-b border-green-100 flex gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchChange();
          }}
          placeholder="Search users..."
          className="w-72 px-4 py-2 border border-green-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <button
          onClick={handleSearchChange}
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"
        >
          Search
        </button>
      </div>

      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-green-100/40 text-green-900 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Username</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-green-100">
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={`transition ${
                index % 2 === 0 ? "bg-green-50/30" : "bg-green-50/60"
              } hover:bg-green-100/50`}
            >
              <td className="px-6 py-4 text-gray-700">{user._id}</td>

              <td className="px-6 py-4">
                {user.profilePicture ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePicture}`}
                    alt="User Image"
                    className="w-10 h-10 rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-700 text-xs">N/A</span>
                  </div>
                )}
              </td>

              <td className="px-6 py-4 font-medium text-gray-800">
                {user.username}
              </td>

              <td className="px-6 py-4 text-gray-700">{user.email}</td>

              <td className="px-6 py-4 text-gray-700 capitalize">
                {user.role}
              </td>

              <td className="px-6 py-4">
                <Link
                  href={`/admin/users/${user._id}`}
                  className="text-green-700 hover:underline font-medium"
                >
                  View
                </Link>
                <Link
                  href={`/admin/users/${user._id}/edit`}
                  className="text-blue-600 ml-4 hover:underline font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteId(user._id)}
                  className="ml-4 text-red-500 hover:underline font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-6 py-4 flex justify-between items-center bg-green-50/60 border-t border-green-100">
        <div className="text-sm text-gray-700">
          Page {pagination.page} of {pagination.totalPages}
        </div>
        <div className="flex items-center gap-2">{makePagination()}</div>
      </div>
    </div>
  );
};

export default DisplayUserTable;
