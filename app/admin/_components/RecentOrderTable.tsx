export interface RecentOrder {
  _id: string;
  userId: string;
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}
interface Props {
  orders: RecentOrder[];
}

export default function RecentOrders({ orders }: Props) {
  return (
    <div
      className="
        rounded-3xl p-8 
        bg-green-200/40
        shadow-[10px_10px_30px_#c8d0e0,-10px_-10px_30px_#ffffff]
      "
    >
      <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-6">
        Recent Orders
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="
              rounded-xl px-5 py-4
              bg-[#eef2f7]
              shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
              flex justify-between items-center
              transition hover:scale-[1.01]
            "
          >
            <div>
              <p className="text-sm font-medium text-gray-800">
                #{order._id.slice(-6)}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">
                ${order.totalPrice}
              </p>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
