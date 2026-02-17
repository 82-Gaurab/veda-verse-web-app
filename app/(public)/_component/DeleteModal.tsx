interface DeleteModalProps {
  isOpen: null | boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}
export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-sm rounded-xl p-5 px-12 shadow-xl bg-[#354152] flex flex-col gap-2">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        <p className="text-gray-300 mt-2">{description}</p>

        <div style={{ marginTop: "10px" }} className="flex gap-1 justify-end">
          <button
            onClick={onClose}
            style={{ backgroundColor: "blueviolet" }}
            className="px-4 py-2 rounded mr-2 text-black"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-red-500 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
