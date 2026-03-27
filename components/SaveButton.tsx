"use client";

interface SaveButtonProps {
  onSave: () => void;
  disabled: boolean;
  savedToday: boolean;
}

export default function SaveButton({
  onSave,
  disabled,
  savedToday,
}: SaveButtonProps) {
  return (
    <button
      onClick={onSave}
      disabled={disabled}
      className={`
        pixel-font text-xl sm:text-2xl px-8 py-4 rounded-xl
        transition-all duration-200
        ${
          savedToday
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : disabled
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-400 active:bg-red-600 text-white shadow-lg shadow-red-500/50 hover:shadow-red-400/60 animate-pulse-slow hover:animate-none hover:scale-105 active:scale-95"
        }
      `}
    >
      {savedToday ? "✓ SAVED TODAY" : "SAVE YOUR LEMMING"}
    </button>
  );
}
