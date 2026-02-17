import Image from "next/image";

interface Book {
  title: string;
  author: string;
  price: string;
  image: string;
}

const BookCard = ({ title, author, price, image }: Book) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4">
      <Image
        src={image}
        alt={title}
        height={20}
        width={20}
        className="rounded-md mb-4 h-56 w-full object-cover"
      />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500">{author}</p>
      <p className="text-amber-700 font-bold mt-2">{price}</p>
    </div>
  );
};

export default BookCard;
