import Image from "next/image";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";

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
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

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

        {/* Rating */}
        <div className="flex items-center gap-0.5 text-yellow-500">
          {Array(fullStars)
            .fill(0)
            .map((_, idx) => (
              <Star fill="yellow" key={`full-${idx}`} size={16} />
            ))}
          {hasHalfStar && <StarHalf fill="yellow" size={16} />}
          {Array(emptyStars)
            .fill(0)
            .map((_, idx) => (
              <StarOutline
                key={`empty-${idx}`}
                size={16}
                className="text-gray-300"
              />
            ))}
        </div>

        <p className="text-gray-700 text-sm mt-1">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
