import React from "react";

function Buttons() {
  return (
    <div className="border bg-pink-50 p-3 border-black mt-6 w-fit shadow-xl mx-auto">
      <div className="flex gap-3 justify-center">
        <button className="border bg-purple-200 border-black p-2 font-medium text-black-700">
          Random Reset
        </button>
        <button className="border bg-purple-200 border-black p-2 font-medium text-black-700">
          Skip To First
        </button>
        <button className="border bg-purple-200 border-black p-2 font-medium text-black-700">
          Pause
        </button>
        <button className="border bg-purple-200 border-black p-2 font-medium text-black-700">
          Skip To Last
        </button>
        <button className="border bg-purple-200 border-black p-2 font-medium text-black-700">
          Animation Speed
        </button>
        <input
          type="range"
          min={1}
          max={100}
          defaultValue={50}
          className="w-full sm:w-48"
          onChange={(e) => setSpeed(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Buttons;
