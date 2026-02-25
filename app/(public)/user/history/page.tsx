import { handleGetOrderByUserId } from "@/lib/action/order-action";
import OrderHistory from "./_component/OrderHistory";

export default async function Page() {
  const response = await handleGetOrderByUserId();

  if (
    !response.success ||
    !Array.isArray(response.data) ||
    response.data.length === 0
  ) {
    return (
      <div className="text-center text-gray-500 mt-10">No Order History</div>
    );
  }

  const orderData = response.data;

  return (
    <div className="relative min-h-screen bg-emerald-50 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-10">
        <h1 className="text-3xl font-bold text-emerald-900 mb-6">
          Order History
        </h1>
        <OrderHistory orders={orderData} />
      </div>
    </div>
  );
}
