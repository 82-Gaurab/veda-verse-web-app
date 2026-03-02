"use client";
import Link from "next/link";
export type Order = {
  _id: string;
  books: {
    _id: string;
    quantity: number;
    bookId: {
      _id: string;
      title: string;
      price: number;
    };
  }[];
  totalPrice: number;
  status: string;
  createdAt: string;
};

export default function OrderCard({ order }: { order: Order }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div
      className="
      group
    bg-white/90
    backdrop-blur-xl

    flex flex-col

    border border-emerald-100
    ring-1 ring-black/5

    shadow-lg shadow-emerald-900/5
    hover:shadow-2xl hover:shadow-emerald-900/10

    hover:-translate-y-2
    hover:scale-[1.02]
        relative
        p-6 rounded-2xl
        transition-all duration-300 ease-out
        space-y-4
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs uppercase text-gray-500">Order ID</p>
          <p className="text-sm font-medium text-emerald-900">{order._id}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-emerald-900 mb-6">Books</h1>

      {/* Books List */}
      <div className="space-y-3">
        {order.books.map((item) => (
          <Link
            key={item._id}
            href={`/user/dashboard/${item.bookId._id}`} // adjust route if needed
            className="
    flex justify-between items-center bg-emerald-50/50 rounded-xl p-3
    shadow-[inset_2px_2px_6px_rgba(0,0,0,0.04),inset_-2px_-2px_6px_rgba(255,255,255,0.9)]
    transition-all duration-200
    hover:shadow-[6px_6px_14px_rgba(0,0,0,0.06),-6px_-6px_14px_rgba(255,255,255,0.9)]
    hover:-translate-y-0.5
    active:scale-[0.99]
    cursor-pointer
  "
          >
            <div>
              <p className="font-medium text-emerald-900">
                {item.bookId.title}
              </p>
              <p className="text-sm text-gray-500">
                Rs.{item.bookId.price} × {item.quantity}
              </p>
            </div>

            <p className="font-semibold text-emerald-800">
              Rs.{item.bookId.price * item.quantity}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-emerald-100">
        <p className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p className="text-lg font-bold text-emerald-900">
          Total: Rs.{order.totalPrice}
        </p>
      </div>
    </div>
  );
}
