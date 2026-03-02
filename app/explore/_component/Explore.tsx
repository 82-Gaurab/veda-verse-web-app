"use client";

import { useEffect, useState } from "react";
import BookCard from "@/app/(public)/_component/BookCard";
import {
  handleGetAllBooks,
  handleGetBookByGenre,
} from "@/lib/action/book-action";
import { handleGetAllGenres } from "@/lib/action/genre-action";
import UserBookCard from "@/app/(public)/user/dashboard/_component/UserBookCard";

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

interface ExplorePageProps {
  isLoggedIn?: boolean; // determines which card to show
}

export default function ExplorePage({ isLoggedIn = false }: ExplorePageProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const CardComponent = isLoggedIn ? UserBookCard : BookCard;
  const link = isLoggedIn ? "/user/dashboard" : "/book";

  // Fetch all books
  const fetchBooks = async (search?: string) => {
    try {
      setLoading(true);
      const response = await handleGetAllBooks(search);
      setBooks(response.data || []);
      setActiveGenre(null); // reset genre selection
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books by genre
  const fetchBooksByGenre = async (genreId: string) => {
    try {
      setLoading(true);
      const response = await handleGetBookByGenre(genreId);
      setBooks(response.data || []);
      setActiveGenre(genreId);
    } catch (error) {
      console.error("Failed to fetch books by genre:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await handleGetAllGenres();
        setGenres(res.data || []);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
        setGenres([]);
      }
    };
    fetchGenres();
    fetchBooks();
  }, []);

  console.log({ ...books });
  const handleSearch = () => fetchBooks(searchTerm.trim() || undefined);

  return (
    <div className="relative min-h-screen bg-emerald-50 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto py-24 space-y-20">
        {/* Search */}
        <section className="flex justify-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search books..."
            className="
              w-full md:w-1/2 px-6 py-4 rounded-2xl
              bg-emerald-50
              border border-emerald-400
              shadow-[inset_4px_4px_10px_rgba(0,0,0,0.06),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]
              outline-none text-sm text-gray-700
              transition
              focus:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.08),inset_-2px_-2px_6px_rgba(255,255,255,1)]
            "
          />
          <button
            onClick={handleSearch}
            className="px-6 py-4 rounded-2xl bg-emerald-700 text-white hover:bg-emerald-800 transition"
          >
            Search
          </button>
        </section>

        {/* Genres */}
        <section className="flex flex-wrap justify-center gap-5">
          <button
            onClick={() => fetchBooks()}
            className={`px-6 py-2 rounded-full text-sm transition duration-300
              shadow-[6px_6px_14px_rgba(0,0,0,0.06),-6px_-6px_14px_rgba(255,255,255,0.9)]
              hover:-translate-y-1 hover:bg-emerald-100
              active:scale-95
              ${activeGenre === null ? "bg-emerald-700 text-white hover:bg-emerald-400" : "bg-emerald-50 text-emerald-800"}
            `}
          >
            All
          </button>
          {genres.map((gen) => (
            <button
              key={gen._id}
              onClick={() => fetchBooksByGenre(gen._id)}
              className={`px-6 py-2 rounded-full text-sm transition duration-300
                shadow-[6px_6px_14px_rgba(0,0,0,0.06),-6px_-6px_14px_rgba(255,255,255,0.9)]
                hover:-translate-y-1 hover:bg-emerald-100
                active:scale-95
                ${activeGenre === gen._id ? "bg-emerald-700 text-white hover:bg-emerald-400" : "bg-emerald-50 text-emerald-800"}
              `}
            >
              {gen.name}
            </button>
          ))}
        </section>

        {/* Books Grid */}
        <section className="flex flex-wrap gap-x-4 gap-y-7 justify-center">
          {loading ? (
            <p className="text-gray-600">Loading books...</p>
          ) : books.length > 0 ? (
            books.map((book) => (
              <CardComponent key={book._id} link={link} {...book} />
            ))
          ) : (
            <p className="text-gray-600">No books found.</p>
          )}
        </section>
      </div>
    </div>
  );
}
