"use client";

import { useState } from "react";

interface DeathAnimationProps {
  lemmingName: string;
  streak: number;
  onCreateNew: () => void;
}

export default function DeathAnimation({
  lemmingName,
  streak,
  onCreateNew,
}: DeathAnimationProps) {
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-gray-900 border-4 border-red-500 rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <div className="text-6xl animate-bounce">💀</div>
        <h2 className="text-2xl pixel-font text-red-400">YOUR LEMMING DIED</h2>
        <p className="pixel-font text-gray-300">
          <span className="text-white font-bold">{lemmingName}</span> walked off
          the cliff.
        </p>
        <p className="pixel-font text-gray-500 text-sm">
          Survived {streak} {streak === 1 ? "day" : "days"}
        </p>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="pixel-font bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg text-lg"
          >
            ADOPT A NEW LEMMING
          </button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newName.trim()) onCreateNew();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              maxLength={20}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name your new lemming..."
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-lg pixel-font text-white text-center focus:border-green-400 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              disabled={!newName.trim()}
              className="pixel-font bg-green-500 hover:bg-green-400 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg w-full"
            >
              BEGIN AGAIN
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
