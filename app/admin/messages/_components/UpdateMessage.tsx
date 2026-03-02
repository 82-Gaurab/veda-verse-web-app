/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { handleUpdateMessage } from "@/lib/action/admin/message-action";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

interface MessageModalProps {
  isOpen: string | null; // message ID if open
  onClose: () => void;
  isTestimonial: boolean; // keep as boolean
}

export default function UpdateMessageModal({
  isOpen,
  onClose,
  isTestimonial,
}: MessageModalProps) {
  // Keep value as string for <select>, convert to boolean when sending
  const [value, setValue] = useState<string>(isTestimonial ? "true" : "false");
  const [pending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleUpdate = async () => {
    startTransition(async () => {
      try {
        // Convert string "true"/"false" to actual boolean
        const booleanValue = value === "true";

        const response = await handleUpdateMessage(isOpen, booleanValue);

        if (!response.success) {
          throw new Error(response.message || "Failed to update status");
        }

        toast.success("Message testimonial status updated successfully");
        onClose();
      } catch (err: any) {
        toast.error(err.message || "Failed to update status");
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          Update Testimonial Status
        </h3>

        <select
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
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
