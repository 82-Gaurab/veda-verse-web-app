interface Props {
  name: string;
}

const CategoryCard = ({ name }: Props) => {
  return (
    <div className="bg-amber-50 hover:bg-amber-100 transition rounded-xl p-6 text-center shadow cursor-pointer">
      <h4 className="font-semibold text-amber-800">{name}</h4>
    </div>
  );
};

export default CategoryCard;
