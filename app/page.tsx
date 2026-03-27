import AuthForm from "@/components/AuthForm";
import LandingLemming from "@/components/LandingLemming";

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-5xl pixel-font text-white leading-relaxed">
            DON&apos;T DIE
          </h1>

          {/* Animated pixel lemming walking across */}
          <div className="relative h-16 w-full overflow-hidden">
            <LandingLemming />
          </div>

          <p className="pixel-font text-gray-400 text-xs leading-relaxed px-2">
            Adopt a lemming. It walks toward a cliff every day.
            <br />
            <span className="text-red-400">Press SAVE</span> before midnight
            UTC or it dies.
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
