import { useAuth } from "@/context/AuthContext";

export default function ConfirmationModal({
  message,
  onCancel,
}: {
  message: string;
  onCancel: () => void;
}) {
  const { logout } = useAuth();

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-[#eef2f7] p-8 rounded-2xl w-full max-w-sm
    shadow-[12px_12px_30px_#c9d4e3,-12px_-12px_30px_#ffffff]"
      >
        <p className="mb-8 text-sm text-gray-700">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-xl text-sm
          shadow-[6px_6px_12px_#c9d4e3,-6px_-6px_12px_#ffffff]
          hover:shadow-[inset_3px_3px_6px_#c9d4e3,inset_-3px_-3px_6px_#ffffff]
          transition active:scale-95"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              logout();
            }}
            className="px-5 py-2 rounded-xl text-sm text-white
          bg-red-500 hover:bg-red-600
          shadow-lg transition active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
