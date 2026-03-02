import { handleGetMyData } from "@/lib/action/auth-action";
import CartList from "./_component/CartList";

export default async function Page() {
  const response = await handleGetMyData();

  if (
    !response.success ||
    !Array.isArray(response.data?.cart) ||
    response.data.cart.length === 0
  ) {
    return (
      <div className="text-center text-gray-500 mt-10">Your cart is empty.</div>
    );
  }

  const cartData = response.data.cart;

  return (
    <div className="relative min-h-screen bg-emerald-50 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-12">
        <h1 className="text-3xl font-bold text-emerald-900 mb-6">My Cart</h1>
        <CartList cart={cartData} />
      </div>
    </div>
  );
}
