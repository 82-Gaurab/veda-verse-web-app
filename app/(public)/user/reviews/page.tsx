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
    <div className="relative min-h-screen bg-emerald-50 overflow-hidden p-6">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-emerald-900 mb-6">My Reviews</h1>
        <MyReviews reviews={reviewData} />
      </div>
    </div>
  );
}
