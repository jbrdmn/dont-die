"use client";

import { useRouter } from "next/navigation";
import NameForm from "@/components/NameForm";
import { useLemming } from "@/hooks/useLemming";

export default function NameYourLemmingPage() {
  const router = useRouter();
  const { createLemming } = useLemming();

  const handleSubmit = async (name: string) => {
    await createLemming(name);
    router.push("/game");
  };

  return (
    <main className="flex-1 flex items-center justify-center p-6">
      <NameForm onSubmit={handleSubmit} />
    </main>
  );
}
