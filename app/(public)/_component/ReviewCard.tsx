import Image from "next/image";

interface ReviewCardProps {
  username: string;
  profilePicture?: string | null;
  rating: number;
  comment: string;
}

const ReviewCard = ({
  username,
  profilePicture,
  rating,
  comment,
}: ReviewCardProps) => {
  const filledStars = Math.floor(rating); // 4
  const emptyStars = 5 - filledStars;

  return (
    <div className="bg-white/60 border border-green-200 rounded-xl p-4 flex gap-4 shadow-sm">
      {/* Profile Picture */}
      <div className="w-12 h-12 relative rounded-full overflow-hidden">
        {profilePicture ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${profilePicture}`}
            alt={username}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>

      {/* Review Info */}
      <div className="flex flex-col">
        <p className="font-semibold text-green-900">{username}</p>
        <p className="text-yellow-500 text-sm">
          {"★".repeat(filledStars)}
          {"☆".repeat(emptyStars)}
        </p>
        <p className="text-gray-700 text-sm">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
