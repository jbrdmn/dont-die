import AuthForm from "@/components/AuthForm";
import LandingLemming from "@/components/LandingLemming";

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-950">
      <div className="max-w-sm w-full space-y-10 text-center">
        {/* Title */}
        <div className="space-y-6">
          <h1
            className="pixel-font text-white text-4xl sm:text-5xl"
            style={{ textShadow: "0 0 40px rgba(239,68,68,0.2)" }}
          >
            DON&apos;T DIE
          </h1>

          {/* Walking lemming */}
          <div className="relative h-14 w-full overflow-hidden rounded-xl bg-gray-900/50 border border-gray-800/50">
            <LandingLemming />
          </div>

          <p className="pixel-font text-gray-500 leading-loose" style={{ fontSize: 10 }}>
            Adopt a lemming.
            <br />
            It walks toward a cliff every day.
            <br />
            <span className="text-red-400">Save it before midnight UTC</span>
            <br />
            or it dies forever.
          </p>
        </div>

        {/* Auth */}
        <AuthForm />

        <a
          href="/graveyard"
          className="pixel-font text-gray-700 hover:text-gray-500 transition-colors inline-block"
          style={{ fontSize: 8 }}
        >
          VISIT THE GRAVEYARD
        </a>
      </div>
    </main>
  );
}
