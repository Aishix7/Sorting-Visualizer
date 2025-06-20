"use client";

function Buttons({
  onRandomReset,
  onPause,
  onSkipToFirst,
  onSkipToLast,
  animationSpeed,
  setAnimationSpeed,
  isSorting,
  isCompleted,
  isPaused,
}) {
  const handleSpeedChange = (e) => {
    if (!isSorting) {
      setAnimationSpeed(Number(e.target.value));
    }
  };

  const canUseSkipButtons = isSorting || isCompleted;

  return (
    <div className="border bg-pink-50 p-3 border-black mt-6 w-fit shadow-xl mx-auto">
      <div className="flex gap-3 justify-center items-center">
        <button
          className="border bg-purple-200 border-black p-2 font-medium text-black-700"
          onClick={onRandomReset}
        >
          Random Reset
        </button>
        <button
          className={`border border-black p-2 font-medium text-black-700 ${
            !canUseSkipButtons
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-200"
          }`}
          onClick={onSkipToFirst}
          disabled={!canUseSkipButtons}
        >
          Skip To First
        </button>
        <button
          className={`border border-black p-2 font-medium text-black-700 ${
            !isSorting ? "bg-gray-300 cursor-not-allowed" : "bg-purple-200"
          }`}
          onClick={onPause}
          disabled={!isSorting}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button
          className={`border border-black p-2 font-medium text-black-700 ${
            !canUseSkipButtons
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-200"
          }`}
          onClick={onSkipToLast}
          disabled={!canUseSkipButtons}
        >
          Skip To Last
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Animation Speed</span>
          <input
            type="range"
            min={1}
            max={100}
            value={animationSpeed}
            className={`w-32 ${
              isSorting ? "cursor-not-allowed opacity-50" : ""
            }`}
            onChange={handleSpeedChange}
            disabled={isSorting}
          />
          <span className="text-xs text-gray-600">{animationSpeed}%</span>
        </div>
      </div>
    </div>
  );
}

export default Buttons;
