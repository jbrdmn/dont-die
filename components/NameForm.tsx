"use client";

import { useState } from "react";

interface NameFormProps {
  onSubmit: (name: string) => void;
  title?: string;
  subtitle?: string;
}

export default function NameForm({
  onSubmit,
  title = "Name Your Lemming",
  subtitle = "Choose wisely. This little guy is counting on you.",
}: NameFormProps) {
  const [name, setName] = useState("");

  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl">🐹</div>
      <h1 className="text-2xl sm:text-3xl pixel-font text-white">{title}</h1>
      <p className="pixel-font text-gray-400 text-sm">{subtitle}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) onSubmit(name.trim());
        }}
        className="space-y-4 max-w-sm mx-auto"
      >
        <input
          type="text"
          maxLength={20}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name..."
          className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-lg pixel-font text-white text-center text-lg focus:border-green-400 focus:outline-none"
          autoFocus
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full pixel-font bg-green-500 hover:bg-green-400 disabled:bg-gray-600 text-white px-6 py-4 rounded-lg text-lg"
        >
          ADOPT LEMMING
        </button>
      </form>
    </div>
  );
}
