/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DeleteModal from "@/app/(public)/_component/DeleteModal";
import { handleDeleteMessage } from "@/lib/action/admin/message-action";
import MessageModal from "./MessageModel";

const DisplayMessageTable = ({
  messages,
  pagination,
  search,
}: {
  messages: any[];
  pagination: any;
  search?: string;
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [deleteId, setDeleteId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewMessage, setViewMessage] = useState("");

  const handleSearchChange = () => {
    router.push(
      `/admin/messages?page=1&size=${pagination.size}` +
        (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""),
    );
  };

  const makePagination = (): React.ReactElement[] => {
    const pages = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const delta = 2;

    const createHref = (pageNumber: number) =>
      `/admin/messages?page=${pageNumber}&size=${pagination.size}` +
      (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "");

    // Previous
    pages.push(
      <Link
        key="prev"
        href={currentPage === 1 ? "#" : createHref(currentPage - 1)}
        className={`px-3 py-1 border rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-black pointer-events-none"
            : "bg-white text-blue-500 hover:bg-blue-100"
        }`}
      >
        Previous
      </Link>,
    );

    const startPage = Math.max(1, currentPage - delta);
    const endPage = Math.min(totalPages, currentPage + delta);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          href={createHref(i)}
          className={`px-3 py-1 border rounded-md ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 hover:bg-blue-100"
          }`}
        >
          {i}
        </Link>,
      );
    }

    // Next
    pages.push(
      <Link
        key="next"
        href={currentPage === totalPages ? "#" : createHref(currentPage + 1)}
        className={`px-3 py-1 border rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-black pointer-events-none"
            : "bg-white text-blue-500 hover:bg-blue-100"
        }`}
      >
        Next
      </Link>,
    );

    return pages;
  };

  const onDelete = async () => {
    try {
      await handleDeleteMessage(deleteId!);
      toast.success("Message deleted successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete message");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="mt-6 mb-6 bg-green-100/20 rounded-xl shadow-sm overflow-hidden border border-green-200">
      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={onDelete}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
      />

      <MessageModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        message={viewMessage}
      />
      {/* Search & Page Size */}
      <div className="p-5 bg-green-100/40 border-b border-green-200 flex flex-wrap gap-3 items-center">
        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchChange()}
          placeholder="Search messages..."
          className="w-72 px-4 py-2 border border-green-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSearchChange}
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
        >
          Search
        </button>

        {/* Page size selector */}
        <div className="ml-auto flex items-center gap-2">
          <label
            htmlFor="pageSize"
            className="text-green-900 text-sm font-medium"
          >
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pagination.size}
            onChange={(e) => {
              router.push(
                `/admin/messages?page=1&size=${e.target.value}` +
                  (searchTerm
                    ? `&search=${encodeURIComponent(searchTerm)}`
                    : ""),
              );
            }}
            className="px-3 py-2 border border-green-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {[5, 10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-green-200/40 text-green-900 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Message</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-green-200">
          {messages.map((message, index) => (
            <tr
              key={message._id}
              className={`transition ${
                index % 2 === 0 ? "bg-green-100/30" : "bg-green-100/50"
              } hover:bg-green-200/50`}
            >
              <td className="px-4 py-2 text-gray-700">{message._id}</td>
              <td className="px-4 py-2 text-gray-700">{message.username}</td>
              <td className="px-4 py-2 text-gray-700">{message.userEmail}</td>
              <td className="px-4 py-2 max-w-xs truncate text-gray-700">
                {message.message}
              </td>
              <td className="px-6 py-4">
                <button
                  className="text-green-700 hover:underline font-medium"
                  onClick={() => {
                    setShowViewModal(true);
                    setViewMessage(message.message);
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => setDeleteId(message._id)}
                  className="ml-1 text-red-500 hover:underline font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-6 py-4 flex justify-between items-center bg-green-100/40 border-t border-green-200">
        <div className="text-sm text-gray-700">
          Page {pagination.page} of {pagination.totalPages}
        </div>
        <div className="flex items-center gap-2">{makePagination()}</div>
      </div>
    </div>
    // <div className="mt-6 border border-gray-700 rounded-lg overflow-hidden">
    //   <DeleteModal
    //     isOpen={deleteId}
    //     onClose={() => setDeleteId(null)}
    //     onConfirm={onDelete}
    //     title="Delete Message"
    //     description="Are you sure you want to delete this message? This action cannot be undone."
    //   />

    //   <MessageModal
    //     isOpen={showViewModal}
    //     onClose={() => setShowViewModal(false)}
    //     message={viewMessage}
    //   />

    //   {/* Search */}
    //   <div className="p-4 bg-gray-800">
    //     <input
    //       type="text"
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //       onKeyDown={(e) => e.key === "Enter" && handleSearchChange()}
    //       placeholder="Search messages..."
    //       className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //     <button
    //       onClick={handleSearchChange}
    //       className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    //     >
    //       Search
    //     </button>
    //   </div>

    //   {/* Table */}
    //   <table className="w-full table-auto border-collapse">
    //     <thead className="bg-gray-800">
    //       <tr>
    //         <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
    //           ID
    //         </th>
    //         <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
    //           Name
    //         </th>
    //         <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
    //           Email
    //         </th>
    //         <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
    //           Message
    //         </th>
    //         <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
    //           Actions
    //         </th>
    //       </tr>
    //     </thead>

    //     <tbody className="bg-gray-900 divide-y divide-gray-700">
    //       {messages.map((message) => (
    //         <tr key={message._id}>
    //           <td className="px-4 py-2 text-sm text-gray-300">{message._id}</td>
    //           <td className="px-4 py-2 text-sm text-gray-300">
    //             {message.username}
    //           </td>
    //           <td className="px-4 py-2 text-sm text-gray-300">
    //             {message.userEmail}
    //           </td>
    //           <td className="px-4 py-2 text-sm max-w-xs truncate">
    //             {message.message}
    //           </td>
    //           <td className="px-4 py-2 text-sm">
    //             <button
    //               className="text-green-500 hover:underline cursor-pointer w-fit"
    //               onClick={() => {
    //                 setShowViewModal(true);
    //                 setViewMessage(message.message);
    //               }}
    //             >
    //               View
    //             </button>

    //             <button
    //               onClick={() => setDeleteId(message._id)}
    //               className="ml-4 text-red-500 hover:underline cursor-pointer w-fit"
    //             >
    //               Delete
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>

    //   {/* Pagination */}
    //   <div className="p-4 flex justify-between items-center bg-gray-800">
    //     <div className="text-sm text-gray-300">
    //       Page {pagination.page} of {pagination.totalPages}
    //     </div>
    //     <div className="space-x-2">{makePagination()}</div>
    //   </div>
    // </div>
  );
};

export default DisplayMessageTable;
