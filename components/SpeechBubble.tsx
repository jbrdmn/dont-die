"use client";

import { useState, useEffect } from "react";

const quotes = [
  "I trust you completely.",
  "You wouldn't forget me... right?",
  "The cliff looks far away.",
  "I believe in you.",
  "Is it midnight yet?",
  "I'm just a little guy.",
  "Please come back.",
  "This grass is nice.",
  "Don't leave me here.",
  "I can see the edge...",
  "You're my only hope.",
  "I heard the graveyard is nice.",
  "Just one button. Please.",
  "I've been walking all day.",
  "Are you still there?",
];

const panicQuotes = [
  "HELP!",
  "THE EDGE IS RIGHT THERE!",
  "PLEASE SAVE ME!",
  "I DON'T WANT TO DIE!",
  "NOW WOULD BE GOOD!",
  "HURRY!!!",
];

const savedQuotes = [
  "Thank you... zzz...",
  "Safe... for now...",
  "See you tomorrow...",
  "You came back...",
  "zzz...",
];

interface SpeechBubbleProps {
  savedToday: boolean;
  isPanic: boolean;
}

export default function SpeechBubble({ savedToday, isPanic }: SpeechBubbleProps) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    function pick() {
      const pool = savedToday ? savedQuotes : isPanic ? panicQuotes : quotes;
      setQuote(pool[Math.floor(Math.random() * pool.length)]);
    }
    pick();
    const interval = setInterval(pick, savedToday ? 8000 : isPanic ? 3000 : 12000);
    return () => clearInterval(interval);
  }, [savedToday, isPanic]);

  if (!quote) return null;

  return (
    <div className={`relative inline-block max-w-[200px] ${isPanic ? "animate-shake" : ""}`}>
      <div
        className={`pixel-font leading-relaxed px-3 py-2 rounded-lg border ${
          isPanic
            ? "bg-red-950/80 border-red-800/60 text-red-300"
            : savedToday
            ? "bg-green-950/80 border-green-800/40 text-green-400/80"
            : "bg-gray-900/80 border-gray-700/50 text-gray-400"
        }`}
        style={{ fontSize: 7 }}
      >
        &ldquo;{quote}&rdquo;
      </div>
      {/* Triangle */}
      <div
        className="absolute -bottom-1.5 left-4 w-0 h-0"
        style={{
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: `6px solid ${isPanic ? "rgba(127,29,29,0.8)" : savedToday ? "rgba(20,83,45,0.8)" : "rgba(17,24,39,0.8)"}`,
        }}
      />
    </div>
  );
}
