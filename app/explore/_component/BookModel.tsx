"use client";

import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"],
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

interface BookModalProps {
  title: string;
  author: string;
  price: number;
  coverImg: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookModal({
  title,
  author,
  price,
  coverImg,
  isOpen,
  onClose,
}: BookModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="
          bg-[#FFF8E1] border border-[#FFECC0] rounded-xl shadow-2xl 
          max-w-lg w-full p-6 relative
          animate-page-turn
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-[#C6A75E] text-[15px] z-40 cursor-pointer hover:bg-gray-500 pt-1 pr-2 pb-1 pl-2 rounded-2xl"
          onClick={() => onClose()}
        >
          X
        </button>

        {/* Book Cover */}
        <div className="relative w-full h-64 mb-6 mt-2.5">
          <Image
            src={coverImg}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <h2 className={`${playfair.className} text-3xl text-[#C6A75E] mb-2`}>
          {title}
        </h2>
        <p className={`${cormorant.className} text-lg text-gray-700 mb-2`}>
          by {author}
        </p>
        <p className={`${cormorant.className} text-amber-700 font-bold mb-4`}>
          {price}
        </p>
        <p className={`${cormorant.className} text-gray-600`}>
          Dive into the pages of this mystical book, where centuries of wisdom
          meet the golden glow of Nepal’s literary heritage.
        </p>
      </div>
    </div>
  );
}
