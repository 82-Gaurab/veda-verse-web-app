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
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative z-50 w-full max-w-sm rounded-2xl p-6 bg-[#e6ebf0] 
                      shadow-[6px_6px_12px_#c0c7d1,-6px_-6px_12px_#ffffff] 
                      flex flex-col gap-4 animate-fadeIn"
      >
        <h2 className="text-gray-800 text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl 
                       bg-[#f0f3f7] 
                       shadow-[inset_3px_3px_6px_#c0c7d1,inset_-3px_-3px_6px_#ffffff]
                       text-gray-800 
                       hover:shadow-[inset_1px_1px_3px_#c0c7d1,inset_-1px_-1px_3px_#ffffff] 
                       transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl 
                       bg-[#ffeded] 
                       shadow-[inset_3px_3px_6px_#f0baba,inset_-3px_-3px_6px_#ffffff]
                       text-red-600 
                       hover:shadow-[inset_1px_1px_3px_#f0baba,inset_-1px_-1px_3px_#ffffff] 
                       transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
