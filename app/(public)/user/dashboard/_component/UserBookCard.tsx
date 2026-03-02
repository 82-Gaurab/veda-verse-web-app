/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAddToCart } from "@/lib/action/auth-action";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
interface Genre {
  _id: string;
  name: string;
}

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImg: string;
  genre: Genre[];
  link: string;
}

const UserBookCard = ({
  _id,
  title,
  author,
  price,
  coverImg,
  genre,
  link,
}: Book) => {
  const [loading, setLoading] = useState(false);
  const handleAddToCartAction = async () => {
    try {
      setLoading(true);
      const response = await handleAddToCart({ product: _id, quantity: 1 });

      if (!response?.success) {
        toast.error(response?.message);
      }
      toast.success("Item Added to Cart");
    } catch (error: Error | any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
    group
    bg-white
    backdrop-blur-xl
    rounded-2xl
    min-w-75
    w-full max-w-75
    p-5
    h-120
    flex flex-col
    transition-all
    duration-300
    ease-out

    border border-emerald-100
    ring-1 ring-black/5

    shadow-lg shadow-emerald-900/5
    hover:shadow-2xl hover:shadow-emerald-900/10

    hover:-translate-y-2
    hover:scale-[1.02]
  "
    >
      {/* Image */}
      <div className="relative w-full h-60 mb-6 rounded-xl overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${coverImg}`}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
          priority
          unoptimized
        />
      </div>

      <h3 className="font-serif text-lg text-emerald-900 leading-snug line-clamp-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 mt-1 line-clamp-1">by {author}</p>

      <div className="grow" />

      {/* Genres */}
      {genre?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {genre.map((g, index) => (
            <span
              key={`${g.name}-${index}`}
              className="
                text-xs
                px-3
                py-1
                rounded-full
                bg-emerald-100/70
                text-emerald-800
                shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
              "
            >
              {g.name}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-2">
        {/* Price */}
        <span className="text-emerald-800 font-semibold text-lg">
          Rs.{price}
        </span>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`${link}/${_id}`}
            className="
              text-sm
              px-4
              py-2
              rounded-xl
              bg-emerald-100
              text-emerald-800
              shadow-inner
              transition
              duration-300
              hover:bg-emerald-200
              active:scale-95
            "
          >
            View
          </Link>

          <button
            disabled={loading}
            onClick={handleAddToCartAction}
            className="
              text-sm
              px-4
              py-2
              rounded-xl
              bg-emerald-600
              text-white
              shadow-md
              transition
              duration-300
              hover:bg-emerald-700
              active:scale-95
            "
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBookCard;
