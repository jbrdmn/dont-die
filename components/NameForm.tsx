"use client";

import { useState } from "react";

interface NameFormProps {
  onSubmit: (name: string) => void;
}

export default function NameForm({ onSubmit }: NameFormProps) {
  const [name, setName] = useState("");

  return (
    <div className="space-y-8 text-center max-w-sm mx-auto">
      <div className="space-y-4">
        <div className="text-5xl">&#129413;</div>
        <h1 className="pixel-font text-white text-lg">Name Your Lemming</h1>
        <p className="pixel-font text-gray-600" style={{ fontSize: 9, lineHeight: "1.6" }}>
          This little guy is counting on you.
          <br />
          Choose wisely.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) onSubmit(name.trim());
        }}
        className="space-y-4"
      >
        <input
          type="text"
          maxLength={20}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter a name..."
          className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-2xl pixel-font text-white text-center text-base focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/30 transition-all placeholder:text-gray-700"
          autoFocus
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full pixel-font bg-green-600 hover:bg-green-500 disabled:bg-gray-800 disabled:text-gray-600 text-white px-6 py-4 rounded-2xl text-sm transition-all touch-manipulation active:scale-[0.97] border border-green-500/50 disabled:border-gray-700"
        >
          ADOPT
        </button>
      </form>
    </div>
  );
}
