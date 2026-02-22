/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MessageData, messageSchema } from "@/app/(auth)/schema";
import { handleUserMessage } from "@/lib/action/auth-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"],
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    <div className="relative min-h-screen bg-[#FDF6E3] text-[#3A3A3A] overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 py-24 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1
            className={`${playfair.className} text-5xl md:text-6xl text-[#C6A75E]`}
          >
            Get in Touch
          </h1>
          <div className="w-24 h-0.5 bg-[#C6A75E] mx-auto" />
          <p
            className={`${cormorant.className} text-lg md:text-xl leading-relaxed text-[#3A3A3A]`}
          >
            Have questions, suggestions, or want to contribute? Reach out and
            connect with us at VedaVerse – your mystical archive of knowledge.
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="bg-[#FFF8E1] border border-[#FFECC0] rounded-xl shadow-lg p-10">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label
                className={`${cormorant.className} text-lg`}
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="mt-2 w-full border border-[#FFECC0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C6A75E]"
                placeholder="Your name"
                {...register("username")}
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                className={`${cormorant.className} text-lg`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="mt-2 w-full border border-[#FFECC0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C6A75E]"
                placeholder="Your email"
                {...register("userEmail")}
              />
              {errors.userEmail && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.userEmail.message}
                </span>
              )}
            </div>

            <div>
              <label
                className={`${cormorant.className} text-lg`}
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                rows={6}
                className="mt-2 w-full border border-[#FFECC0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C6A75E]"
                placeholder="Write your message..."
                {...register("message")}
              />
              {errors.message && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#C6A75E] text-[#FDF6E3] font-semibold rounded-lg px-6 py-3 hover:bg-[#bfa75e] transition"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Contact Info Section */}
        <section className="text-center space-y-6">
          <h2 className={`${playfair.className} text-3xl text-[#C6A75E]`}>
            Our Library
          </h2>
          <p className={`${cormorant.className} text-lg`}>
            Address: Kathmandu, Nepal
          </p>
          <p className={`${cormorant.className} text-lg`}>
            Email: contact@vedaverse.com
          </p>
          <p className={`${cormorant.className} text-lg`}>
            Phone: +977 1 2345678
          </p>
        </section>
      </div>
    </div>
  );
}
