/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { handleUpdateOrder } from "@/lib/action/admin/order-action";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

type Status = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

interface StatusModalProps {
  isOpen: string | null; // order ID if open
  onClose: () => void;
  currentStatus: Status;
}

export default function StatusModal({
  isOpen,
  onClose,
  currentStatus,
}: StatusModalProps) {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [pending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleUpdate = async () => {
    startTransition(async () => {
      try {
        const validatedStatus: Status = status as Status;
        const response = await handleUpdateOrder(isOpen, validatedStatus);

        if (!response.success) {
          throw new Error(response.message || "Failed to update status");
        }

        toast.success("Order status updated successfully");
        onClose();
      } catch (err: any) {
        toast.error(err.message || "Failed to update status");
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>

        <select
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          {["pending", "paid", "shipped", "delivered", "cancelled"].map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={onClose}
            disabled={pending}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ${
              pending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleUpdate}
            disabled={pending}
          >
            {pending ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
