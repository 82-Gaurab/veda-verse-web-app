import Link from "next/link";

interface Props {
  name: string;
}

const CategoryCard = ({ name }: Props) => {
  return (
    <Link
      href={`/explore?category=${encodeURIComponent(name)}`}
      className="bg-amber-50 hover:bg-amber-100 transition rounded-xl p-6 text-center shadow cursor-pointer block"
    >
      <h4 className="font-semibold text-amber-800">{name}</h4>
    </Link>
  );
};

export default CategoryCard;
