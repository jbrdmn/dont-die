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
  const isActive = !savedToday && !disabled;

  return (
    <button
      onClick={onSave}
      disabled={disabled}
      className={`
        pixel-font text-lg sm:text-xl w-full py-5 rounded-xl
        transition-all duration-200 touch-manipulation
        ${
          savedToday
            ? "bg-green-900/60 text-green-400 border-2 border-green-700 cursor-not-allowed"
            : disabled
            ? "bg-gray-800 text-gray-500 border-2 border-gray-700 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white border-2 border-red-400 animate-save-glow active:scale-95"
        }
      `}
    >
      {savedToday ? (
        <span className="flex items-center justify-center gap-2">
          <span className="text-green-400">&#10003;</span> SAVED TODAY
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <span className="text-2xl">&#9829;</span> SAVE YOUR LEMMING
        </span>
      )}
    </button>
  );
}
