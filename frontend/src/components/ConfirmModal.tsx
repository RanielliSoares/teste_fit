"use client";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmColor?: string; // classes tailwind para cor do botão confirmar
  cancelColor?: string;  // classes tailwind para cor do botão cancelar
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmText,
  cancelText,
  confirmColor = "bg-red-600 hover:bg-red-700 text-white",
  cancelColor = "bg-gray-200 hover:bg-gray-300 text-black",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-10 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={onCancel}
            className={`px-10 py-2 rounded-full transition ${cancelColor}`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-10 py-2 rounded-full transition ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}