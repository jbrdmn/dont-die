export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center bg-gray-950 p-4">
      <div className="text-center space-y-6">
        <div className="pixel-font text-gray-700 text-4xl">404</div>
        <p className="pixel-font text-gray-600" style={{ fontSize: 10 }}>
          This lemming wandered too far.
        </p>
        <a
          href="/"
          className="pixel-font text-gray-500 hover:text-gray-300 transition-colors inline-block"
          style={{ fontSize: 9 }}
        >
          &larr; GO HOME
        </a>
      </div>
    </main>
  );
}
