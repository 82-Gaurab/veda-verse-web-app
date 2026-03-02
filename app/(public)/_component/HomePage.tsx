/* eslint-disable @next/next/no-img-element */
"use client";

import AuthModals from "@/app/(auth)/_components/auth-handler";
import BookCard from "./BookCard";
import CategoryCard from "./CategoryCard";
import TestimonialCard from "./TestimonialCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { handleGetAllBooks } from "@/lib/action/book-action";
import { handleGetAllGenres } from "@/lib/action/genre-action";
import { handleGetTestimonials } from "@/lib/action/message-action";

export type Genre = {
  _id: string;
  name: string;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImg: string;
  genre: Genre[];
};

type Testimonial = {
  username: string;
  message: string;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await handleGetAllBooks();
        const data = response?.data || [];
        setBooks(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setBooks([]);
      } finally {
        setLoadingBooks(false);
      }
    };

    const fetchGenres = async () => {
      try {
        const res = await handleGetAllGenres();
        const genreData = res?.data?.slice(0, 5) || [];
        setGenres(genreData);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
        setGenres([]);
      } finally {
        setLoadingGenres(false);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const res = await handleGetTestimonials();
        const testimonialData = res?.data || [];
        setTestimonials(testimonialData);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoadingTestimonials(false);
      }
    };

    fetchBooks();
    fetchGenres();
    fetchTestimonials();
  }, []);

  return (
    <div className="relative min-h-screen bg-emerald-50 text-emerald-900 overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />

      <main className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-32">
        {/* HERO */}
        <section className="grid md:grid-cols-2 items-center gap-16">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="uppercase text-xs tracking-[0.25em] text-emerald-600">
              Curated Collection
            </span>

            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              Create Your <span className="text-emerald-700">Cozy Reading</span>{" "}
              Space
            </h1>

            <p className="text-gray-600 text-lg max-w-lg">
              Discover heartwarming stories, inspiring ideas, and timeless
              classics — thoughtfully curated for peaceful reading moments.
            </p>

            <div className="flex gap-5 pt-4">
              <Link
                href="/explore"
                className="
                  inline-block
                  px-8 py-3 rounded-xl
                  bg-emerald-700 text-white
                  shadow-md
                  transition-all duration-300
                  hover:bg-emerald-800
                  hover:-translate-y-1
                  active:scale-95
                "
              >
                Browse Books
              </Link>

              <AuthModals
                displayText="Start Your Reading Journey"
                isCompact={false}
                className="
                  px-8 py-3 rounded-xl
                  bg-emerald-100 text-emerald-800
                  shadow-inner
                  transition-all duration-300
                  hover:bg-emerald-200
                  active:scale-95
                "
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-[8px_8px_24px_rgba(0,0,0,0.08),-8px_-8px_24px_rgba(255,255,255,0.8)]">
              <img
                src="/images/bg.jpg"
                alt="Reading"
                className="object-cover w-full h-105"
              />
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-serif font-bold">Featured Reads</h2>
          </div>

          {loadingBooks ? (
            <p className="text-gray-500">Loading books...</p>
          ) : books?.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
              {books.map((book) => (
                <BookCard link={"/book"} key={book._id} {...book} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No featured books found.</p>
          )}
        </section>

        {/* CATEGORIES */}
        <section className="space-y-12">
          <h2 className="text-3xl font-serif font-bold">Browse by Mood</h2>

          {loadingGenres ? (
            <p className="text-gray-500">Loading categories...</p>
          ) : genres?.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-8">
              {genres.map((genre) => (
                <CategoryCard key={genre.name} name={genre.name} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No categories found.</p>
          )}
        </section>

        {/* TESTIMONIALS */}
        <section className="space-y-12">
          <h2 className="text-3xl font-serif font-bold">
            What Our Readers Say
          </h2>

          {loadingTestimonials ? (
            <p className="text-gray-500">Loading testimonials...</p>
          ) : testimonials?.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-10">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.username}
                  name={testimonial.username}
                  review={testimonial.message}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No testimonials yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}
