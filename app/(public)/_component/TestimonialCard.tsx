interface Props {
  name: string;
  review: string;
}

const TestimonialCard = ({ name, review }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <p className="text-gray-600 italic">&quot;{review}&quot;</p>
      <h4 className="mt-4 font-semibold text-amber-700">- {name}</h4>
    </div>
  );
};

export default TestimonialCard;
