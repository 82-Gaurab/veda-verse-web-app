"use client";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function MessageModal({
  isOpen,
  onClose,
  message,
}: ViewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-lg mx-4 bg-gray-900 text-gray-200 rounded-2xl shadow-2xl border border-gray-700 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Message Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-100 overflow-y-auto">
          <p className="whitespace-pre-wrap leading-relaxed text-gray-300">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
