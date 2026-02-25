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
    <div className="bg-emerald-50 rounded-2xl p-6 shadow-md border border-emerald-100 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="text-sm font-medium text-gray-700">{order._id}</p>
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
            className="flex justify-between items-center bg-white rounded-xl p-3 shadow-sm"
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

      {/* Footer */}
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
