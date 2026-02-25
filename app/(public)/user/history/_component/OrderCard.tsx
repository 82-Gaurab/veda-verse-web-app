"use client";

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
        relative
        p-6 rounded-2xl bg-emerald-50/70 backdrop-blur-md
        shadow-[6px_6px_16px_rgba(0,0,0,0.06),-6px_-6px_16px_rgba(255,255,255,0.8)]
        transition-all duration-300 ease-out
        hover:shadow-[8px_8px_20px_rgba(0,0,0,0.08),-8px_-8px_20px_rgba(255,255,255,0.9)]
        hover:-translate-y-1 hover:scale-[1.01]
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

      {/* Books List */}
      <div className="space-y-3">
        {order.books.map((item) => (
          <div
            key={item._id}
            className="
              flex justify-between items-center bg-emerald-50/50 rounded-xl p-3
              shadow-[inset_2px_2px_6px_rgba(0,0,0,0.04),inset_-2px_-2px_6px_rgba(255,255,255,0.9)]
              transition-all duration-200
              hover:shadow-[6px_6px_14px_rgba(0,0,0,0.06),-6px_-6px_14px_rgba(255,255,255,0.9)]
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
          </div>
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
