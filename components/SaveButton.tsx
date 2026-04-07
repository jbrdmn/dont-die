"use client";

interface SaveButtonProps {
  onSave: () => void;
  disabled: boolean;
  savedToday: boolean;
  justSaved?: boolean;
  lemmingName?: string;
}

export default function SaveButton({
  onSave,
  disabled,
  savedToday,
  justSaved,
  lemmingName,
}: SaveButtonProps) {
  if (savedToday) {
    return (
      <div className="w-full py-2.5 rounded-lg text-center pixel-font text-xs flex items-center justify-center gap-2 bg-green-500/10 text-green-400/80 border border-green-500/20">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {justSaved ? "SAFE" : "SAVED"}
      </div>
    );
  }

  const name = lemmingName ? lemmingName.toUpperCase() : "LEMMING";

  return (
    <button
      onClick={onSave}
      disabled={disabled}
      className={`
        pixel-font text-xs w-full py-3 rounded-lg flex items-center justify-center gap-2
        transition-all duration-150 touch-manipulation
        active:scale-[0.97] active:brightness-90
        ${
          disabled
            ? "bg-gray-800/50 text-gray-600 border border-gray-700/50 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-500 text-white border border-red-400/50 animate-save-glow cursor-pointer"
        }
      `}
    >
      {!disabled && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
      SAVE {name}!
    </button>
  );
}
