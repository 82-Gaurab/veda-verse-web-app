/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MessageData, messageSchema } from "@/app/(auth)/schema";
import { handleUserMessage } from "@/lib/action/auth-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MessageData>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: MessageData) => {
    try {
      const res = await handleUserMessage(data);

      if (!res.success) {
        throw new Error(res.message || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      reset();
    } catch (err: Error | any) {
      toast.error(err.message || "Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 py-24 px-6">
      <div
        className="
          max-w-3xl mx-auto p-12 rounded-3xl
          bg-emerald-50
          shadow-[10px_10px_30px_rgba(0,0,0,0.06),-10px_-10px_30px_rgba(255,255,255,0.9)]
        "
      >
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-emerald-600">
            Contact Us
          </span>

          <h1 className="text-4xl font-serif font-bold text-emerald-900">
            Let’s Start a Conversation
          </h1>

          <p className="text-gray-600 max-w-md mx-auto">
            Have a question, suggestion, or just want to say hello? We&apos;d
            love to hear from you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Name
            </label>
            <input
              {...register("username")}
              placeholder="Your name"
              className="
                w-full px-5 py-3 rounded-xl
                bg-emerald-50
                shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]
                outline-none text-sm text-gray-700
                transition
                focus:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.08),inset_-2px_-2px_4px_rgba(255,255,255,1)]
              "
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Email
            </label>
            <input
              type="email"
              {...register("userEmail")}
              placeholder="Your email"
              className="
                w-full px-5 py-3 rounded-xl
                bg-emerald-50
                shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]
                outline-none text-sm text-gray-700
                transition
                focus:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.08),inset_-2px_-2px_4px_rgba(255,255,255,1)]
              "
            />
            {errors.userEmail && (
              <p className="text-xs text-red-500">{errors.userEmail.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Message
            </label>
            <textarea
              rows={6}
              {...register("message")}
              placeholder="Write your message..."
              className="
                w-full px-5 py-4 rounded-xl
                bg-emerald-50
                shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]
                outline-none text-sm text-gray-700
                transition resize-none
                focus:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.08),inset_-2px_-2px_4px_rgba(255,255,255,1)]
              "
            />
            {errors.message && (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full py-3 rounded-xl
              bg-emerald-700 text-white text-sm font-semibold
              shadow-lg
              transition duration-300
              hover:bg-emerald-800
              active:scale-[0.97]
              disabled:opacity-50
            "
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="text-center mt-16 space-y-2 text-gray-600 text-sm">
        <p>Kathmandu, Nepal</p>
        <p>contact@vedaverse.com</p>
        <p>+977 1 2345678</p>
      </div>
    </div>
  );
}
