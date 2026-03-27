"use client";

interface SaveButtonProps {
  onSave: () => void;
  disabled: boolean;
  savedToday: boolean;
  justSaved?: boolean;
}

export default function SaveButton({
  onSave,
  disabled,
  savedToday,
  justSaved,
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

  return (
    <button
      onClick={onSave}
      disabled={disabled}
      className={`
        pixel-font text-xs w-full py-3 rounded-lg
        transition-all duration-150 touch-manipulation
        active:scale-[0.97] active:brightness-90
        ${
          disabled
            ? "bg-gray-800/50 text-gray-600 border border-gray-700/50 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-500 text-white border border-red-400/50 animate-save-glow cursor-pointer"
        }
      `}
    >
      SAVE
    </button>
  );
}
