import { handleGetMyReviews } from "@/lib/action/review-action";
import MyReviews from "./_components/MyReviews";

export default async function Page() {
  const response = await handleGetMyReviews();

  if (
    !response.success ||
    !Array.isArray(response.data) ||
    response.data.length === 0
  ) {
    return (
      <div className="text-center text-gray-500 mt-10">No Reviews Yet</div>
    );
  }

  const reviewData = response.data;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Reviews</h1>
      <MyReviews reviews={reviewData} />
    </div>
  );
}
