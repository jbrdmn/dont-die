export default function CliffBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200" />

      {/* Clouds */}
      <div className="absolute top-8 left-[10%] w-16 h-6 bg-white rounded-full opacity-80 animate-cloud-slow" />
      <div className="absolute top-16 left-[40%] w-20 h-7 bg-white rounded-full opacity-70 animate-cloud-med" />
      <div className="absolute top-6 left-[70%] w-14 h-5 bg-white rounded-full opacity-60 animate-cloud-fast" />

      {/* Sun */}
      <div className="absolute top-4 right-8 w-12 h-12 bg-yellow-300 rounded-full shadow-lg shadow-yellow-200/50" />

      {/* Ground / Cliff */}
      <div className="absolute bottom-0 left-0 right-[15%] h-16 bg-green-600" />
      <div className="absolute bottom-0 left-0 right-[15%] h-12 bg-green-700" />

      {/* Grass tufts */}
      <div className="absolute bottom-12 left-[5%] text-green-500 text-2xl pixel-font">
        ⌇⌇⌇
      </div>
      <div className="absolute bottom-12 left-[30%] text-green-500 text-2xl pixel-font">
        ⌇⌇
      </div>
      <div className="absolute bottom-12 left-[55%] text-green-500 text-2xl pixel-font">
        ⌇⌇⌇⌇
      </div>

      {/* Cliff edge */}
      <div className="absolute bottom-0 right-0 w-[15%] h-48 bg-amber-800" />
      <div className="absolute bottom-16 right-[15%] w-4 h-4 border-b-[16px] border-b-amber-800 border-l-[16px] border-l-transparent" />

      {/* Danger zone near cliff */}
      <div className="absolute bottom-12 right-[15%] w-[10%] h-4 bg-gradient-to-r from-transparent to-red-500/30" />

      {/* Abyss */}
      <div className="absolute bottom-0 right-0 w-[15%] h-16 bg-gray-900" />
    </div>
  );
}
