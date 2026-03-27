import AuthForm from "@/components/AuthForm";

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl pixel-font text-white leading-relaxed">
            DON&apos;T DIE
          </h1>
          <div className="text-5xl">🐹</div>
          <p className="pixel-font text-gray-400 text-xs sm:text-sm leading-relaxed">
            Adopt a lemming. It walks toward a cliff every day.
            <br />
            Press SAVE before midnight UTC or it dies.
          </p>
        </div>

        <div className="flex justify-center">
          <AuthForm />
        </div>

        <a
          href="/graveyard"
          className="inline-block pixel-font text-gray-500 hover:text-gray-300 text-xs underline"
        >
          Visit the Graveyard
        </a>
      </div>
    </main>
  );
}
