"use client";

import BookCard from "@/app/(public)/_component/BookCard";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { useState } from "react";
import BookModal from "./BookModel";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"],
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const BOOKS = [
  {
    title: "The Himalayan Manuscripts",
    author: "Siddhartha Lama",
    image: "/images/bg.jpg",
    price: "100",
  },
  {
    title: "Legends of Nepal",
    author: "Maya Shrestha",
    image: "/images/bg.jpg",
    price: "100",
  },
  {
    title: "Ancient Wisdom",
    author: "Bhaskar Rai",
    image: "/images/bg.jpg",
    price: "100",
  },
  {
    title: "Sacred Scripts",
    author: "Tara Gurung",
    image: "/images/bg.jpg",
    price: "100",
  },
  {
    title: "Mythical Tales",
    author: "Rajan Thapa",
    image: "/images/bg.jpg",
    price: "100",
  },
];

export default function ExplorePage() {
  const [selectedBook, setSelectedBook] = useState<(typeof BOOKS)[0] | null>(
    null,
  );
  return (
    <div className="relative min-h-screen bg-[#FDF6E3] text-[#3A3A3A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 py-24 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h1
            className={`${playfair.className} text-5xl md:text-6xl text-[#C6A75E]`}
          >
            Explore the Archive
          </h1>
          <p className={`${cormorant.className} text-lg md:text-xl`}>
            Disimage the treasures of Nepal’s literary heritage. Browse, read,
            and immerse yourself in centuries of wisdom.
          </p>
        </section>

        {/* Search Bar */}
        <section className="flex justify-center">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full md:w-1/2 border border-[#FFECC0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C6A75E]"
          />
        </section>

        {/* Category Buttons */}
        <section className="flex flex-wrap justify-center gap-4">
          {["History", "Mythology", "Science", "Art", "Literature"].map(
            (cat) => (
              <button
                key={cat}
                className="bg-[#FFF8E1] border border-[#FFECC0] rounded-full px-6 py-2 hover:bg-[#FFECC0] transition"
              >
                {cat}
              </button>
            ),
          )}
        </section>

        {/* Book Grid */}
        <section className="flex flex-wrap gap-x-5 gap-y-10 justify-center items-center">
          {BOOKS.map((book) => (
            <div
              key={book.title}
              onClick={() => setSelectedBook(book)}
              className="cursor-pointer"
            >
              <BookCard
                key={book.title}
                title={book.title}
                author={book.author}
                price={"200"}
                image={"/images/bg.jpg"}
              />
            </div>
          ))}
        </section>
      </div>
      {/* Modal */}
      {selectedBook && (
        <BookModal
          {...selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
