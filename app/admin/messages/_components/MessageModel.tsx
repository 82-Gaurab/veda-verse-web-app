"use client";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isTestimonial: string;
}

export default function MessageModal({
  isOpen,
  onClose,
  message,
  isTestimonial,
}: ViewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-lg mx-4 bg-green-50/90 text-gray-800 rounded-2xl shadow-2xl border border-green-200 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-green-200">
          <h2 className="text-lg font-semibold text-green-900">
            Message Details
          </h2>
          <button
            onClick={onClose}
            className="text-green-700 hover:text-green-900 transition text-[25px] font-bold"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5 max-h-100 overflow-y-auto">
          <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
            {message}
          </p>
          <span className="text-green-900">
            Is This Testimonial: {isTestimonial}
          </span>
        </div>

        <div className="px-6 py-4 border-t border-green-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
