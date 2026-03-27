"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import NameForm from "@/components/NameForm";
import { useLemming } from "@/hooks/useLemming";

export default function NameYourLemmingPage() {
  const router = useRouter();
  const { createLemming } = useLemming();
  const [error, setError] = useState("");

  const handleSubmit = async (name: string) => {
    setError("");
    try {
      await createLemming(name);
      router.push("/game");
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-gray-950">
      <div className="w-full">
        <NameForm onSubmit={handleSubmit} />
        {error && (
          <div className="text-center mt-4 pixel-font text-red-400" style={{ fontSize: 9 }}>
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
