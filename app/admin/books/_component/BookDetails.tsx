import Image from "next/image";

interface BookDetailsProps {
  book: {
    title: string;
    author: string;
    description: string;
    genre: string[];
    price: number;
    stockAmount: number;
    publishedYear?: string;
    coverImg?: string | null;
  };
}

export default function BookDetails({ book }: BookDetailsProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto bg-green-100/20 backdrop-blur-sm rounded-2xl border border-green-200 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 p-10">
          {/* Book Cover */}
          <div className="flex justify-center">
            <div
              className="relative w-80 h-120 rounded-2xl overflow-hidden 
                            bg-green-100/40 border border-green-200
                            shadow-[8px_8px_20px_rgba(0,0,0,0.05),-8px_-8px_20px_rgba(255,255,255,0.6)]"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${book.coverImg}`}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Book Info */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-4xl font-semibold text-green-900 tracking-tight">
                  {book.title}
                </h1>
                <p className="text-green-800/80 mt-2">
                  by <span className="font-medium">{book.author}</span>
                </p>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-3">
                {book.genre.map((g, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 text-xs uppercase tracking-wide
                               bg-green-100/50 text-green-800
                               border border-green-200
                               rounded-full
                               shadow-inner"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed text-sm">
                {book.description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="bg-white/60 border border-green-200 rounded-xl p-4 shadow-inner">
                  <p className="uppercase text-xs tracking-wide text-green-800 mb-1">
                    Published
                  </p>
                  <p className="text-gray-800 font-medium">
                    {book.publishedYear}
                  </p>
                </div>

                <div className="bg-white/60 border border-green-200 rounded-xl p-4 shadow-inner">
                  <p className="uppercase text-xs tracking-wide text-green-800 mb-1">
                    Stock
                  </p>
                  <p
                    className={`font-medium ${
                      book.stockAmount > 0 ? "text-green-700" : "text-red-500"
                    }`}
                  >
                    {book.stockAmount > 0
                      ? `${book.stockAmount} available`
                      : "Out of stock"}
                  </p>
                </div>
              </div>
            </div>

            {/* Price + Button */}
            <div className="flex items-center justify-between pt-8 border-t border-green-200">
              <div className="text-3xl font-semibold text-green-900">
                Rs. {book.price.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
