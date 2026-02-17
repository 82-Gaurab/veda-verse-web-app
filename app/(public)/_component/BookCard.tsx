import Image from "next/image";

interface Book {
  title: string;
  author: string;
  price: string;
  image: string;
}

const BookCard = ({ title, author, price, image }: Book) => {
  return (
    <div
      className={`
        w-57.5
        bg-[#FFF8E1] 
        border border-[#FFECC0] 
        rounded-xl 
        shadow-md 
        hover:shadow-2xl 
        hover:-translate-y-2 
        transition 
        duration-300 
        ease-in-out
        p-4
        flex flex-col items-center
        h-100 
      `}
    >
      {/* Book Image */}
      <div className="relative w-full h-56 mb-4 shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg text-[#C6A75E] text-center mb-1 line-clamp-2">
        {title}
      </h3>

      {/* Author */}
      <p className="text-gray-700 text-sm text-center mb-2 line-clamp-1">
        {author}
      </p>

      {/* Price */}
      <p className="text-amber-700 font-bold mt-auto text-center">{price}</p>
    </div>
  );
};

export default BookCard;
