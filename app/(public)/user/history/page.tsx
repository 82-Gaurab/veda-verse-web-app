import { handleGetOrderByUserId } from "@/lib/action/order-action";
import OrderHistory from "./_component/OrderHistory";

export default async function Page() {
  const response = await handleGetOrderByUserId();
  // info: Check if request failed or data is empty
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
    <div>
      Order History
      <OrderHistory orders={orderData} />
    </div>
  );
}
