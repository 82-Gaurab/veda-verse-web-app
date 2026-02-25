"use client";

import { useEffect, useState } from "react";
import { handleGetAllBooks } from "@/lib/action/book-action";
import { Book, Genre } from "@/app/(public)/_component/HomePage";
import { handleGetAllGenres } from "@/lib/action/genre-action";
import UserBookCard from "./UserBookCard";

export default function UserExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const fetchBooks = async (search?: string) => {
    try {
      setLoading(true);
      const response = await handleGetAllBooks(search);
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await handleGetAllGenres();
        setGenres(res.data);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
    fetchBooks();
  }, []);

  const handleSearch = () => {
    fetchBooks(searchTerm);
  };

  return (
    <div className="min-h-screen bg-[#2d3750] text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* ================= SEARCH ================= */}
        <section className="flex justify-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search books..."
            className="
              w-full md:w-1/2 px-6 py-3 rounded-lg
              bg-[#3b4663]
              outline-none text-sm text-white
              placeholder-gray-400
            "
          />

          <button
            onClick={handleSearch}
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </section>

        {/* ================= GENRES ================= */}
        <section className="flex flex-wrap gap-4">
          {genres.map((gen) => (
            <button
              key={gen.name}
              className="
                px-4 py-2 rounded-full
                bg-[#3b4663]
                text-sm text-gray-200
                hover:bg-indigo-600 transition
              "
            >
              {gen.name}
            </button>
          ))}
        </section>

        {/* ================= ALL BOOKS ================= */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-300">All Books</h2>

          <div className="flex flex-wrap gap-x-6 gap-y-10 justify-center">
            {books.map((book) => (
              <UserBookCard link={"/user/explore"} key={book._id} {...book} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
