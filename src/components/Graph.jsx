// Graph.jsx
import React from "react";

function Graph({ elements }) {
  // Filter and convert elements to numbers
  const validElements = elements
    .filter((val) => val !== "")
    .map(Number)
    .filter((num) => !isNaN(num));

  return (
    <div className="mt-8 border border-black shadow-xl h-[70vh] flex items-end justify-center gap-1 p-4">
      {validElements.map((value, index) => (
        <div
          key={index}
          className="flex flex-col items-center"
          style={{ width: `${100 / validElements.length}%` }}
        >
          <div
            className="bg-blue-500 w-full rounded-t hover:bg-blue-600 transition-colors"
            style={{ height: `${value}px` }} // Directly use the value as vh
            title={`Value: ${value}`}
          />
          <span className="text-xs mt-1">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default Graph;
