export interface RecentUser {
  _id: string;
  email: string;
  createdAt: string;
}

interface Props {
  users: RecentUser[];
}

export default function RecentUsers({ users }: Props) {
  return (
    <div
      className="
        rounded-3xl p-8 
        bg-green-100/90
        shadow-[10px_10px_30px_#c8d0e0,-10px_-10px_30px_#ffffff]
      "
    >
      <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-6">
        Recent Users
      </h2>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="
              rounded-xl px-5 py-4
              bg-[#eef2f7]
              shadow-[inset_4px_4px_8px_#c8d0e0,inset_-4px_-4px_8px_#ffffff]
              flex justify-between items-center
              transition hover:scale-[1.01]
            "
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{user.email}</p>
              <p className="text-xs text-gray-500">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
