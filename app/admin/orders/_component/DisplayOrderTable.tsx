/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DeleteModal from "@/app/(public)/_component/DeleteModal";
import StatusModal from "./StatusModal";
import { handleDeleteOrder } from "@/lib/action/admin/order-action";

const DisplayOrderTable = ({
  orders,
  pagination,
  search,
}: {
  orders: any[];
  pagination: any;
  search?: string;
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [statusModalOrderId, setStatusModalOrderId] = useState<string | null>(
    null,
  );
  const [newStatus, setNewStatus] = useState<
    "pending" | "paid" | "shipped" | "delivered" | "cancelled"
  >("pending");

  const handleSearchChange = () => {
    router.push(
      `/admin/orders?page=1&size=${pagination.size}` +
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
      `/admin/orders?page=${currentPage - 1}&size=${pagination.size}` +
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
        `/admin/orders?page=1&size=${pagination.size}` +
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
        `/admin/orders?page=${i}&size=${pagination.size}` +
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
        `/admin/orders?page=${totalPages}&size=${pagination.size}` +
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
      `/admin/orders?page=${currentPage + 1}&size=${pagination.size}` +
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
      await handleDeleteOrder(deleteId!);
      toast.success("Order deleted successfully");
    } catch (err: Error | any) {
      toast.error(err.message || "Failed to delete order");
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
        title="Delete Confirmation"
        description="Are you sure you want to delete this item? This action cannot be undone."
      />

      <StatusModal
        isOpen={statusModalOrderId}
        onClose={() => setStatusModalOrderId(null)}
        currentStatus={newStatus}
      />

      {/* Search & Page Size */}
      <div className="p-5 bg-green-100/40 border-b border-green-200 flex flex-wrap gap-3 items-center">
        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchChange()}
          placeholder="Search orders..."
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
                `/admin/orders?page=1&size=${e.target.value}` +
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

      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-green-200/40 text-green-900 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Books</th>
            <th className="px-6 py-4">Total price</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-green-200">
          {orders.map((order, index) => (
            <tr
              key={order._id}
              className={`transition ${
                index % 2 === 0 ? "bg-green-100/30" : "bg-green-100/50"
              } hover:bg-green-200/50`}
            >
              <td className="px-6 py-4 text-gray-700">{order._id}</td>

              <td className="px-6 py-4 font-medium text-gray-800">
                {order.books.map((book: any, index: number) => (
                  <div key={index}>
                    {book.bookName} (x{book.quantity})
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 font-medium text-gray-800">
                {order.totalPrice}
              </td>
              <td className="px-6 py-4 font-medium text-gray-800">
                {order.status}
              </td>

              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setStatusModalOrderId(order._id);
                    setNewStatus(order.status);
                  }}
                  className="text-green-700 ml-4 hover:underline font-medium"
                >
                  Edit Status
                </button>

                <button
                  onClick={() => setDeleteId(order._id)}
                  className="ml-4 text-red-600 hover:underline font-medium"
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
  );
};

export default DisplayOrderTable;
