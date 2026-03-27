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
  if (savedToday) {
    return (
      <div className="w-full py-4 rounded-2xl text-center pixel-font text-sm bg-green-900/30 text-green-400/80 border border-green-800/40">
        <span className="mr-2">&#10003;</span>SAVED — SLEEPING SAFE
      </div>
    );
  }

  return (
    <button
      onClick={onSave}
      disabled={disabled}
      className={`
        pixel-font text-base sm:text-lg w-full py-5 rounded-2xl
        transition-all duration-150 touch-manipulation
        active:scale-[0.97] active:brightness-90
        ${
          disabled
            ? "bg-gray-800 text-gray-600 border border-gray-700 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-500 text-white border-2 border-red-400/60 animate-save-glow cursor-pointer"
        }
      `}
    >
      SAVE YOUR LEMMING
    </button>
  );
}
