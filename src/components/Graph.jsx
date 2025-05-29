import React from "react";

function Graph({ elements }) {
  const validElements = elements
    .filter((val) => val !== "")
    .map(Number)
    .filter((num) => !isNaN(num));

  const maxHeight = Math.max(...validElements, 10);

  return (
    <div
      className="mt-8 border border-gray-300 shadow-xl h-[70vh] flex items-end justify-center bg-white p-2"
      style={{ gap: "2px" }}
    >
      {validElements.map((value, index) => (
        <div
          key={index}
          className="bg-green-500 hover:bg-green-600 transition-colors flex items-end"
          style={{
            width: `${50 / validElements.length}%`,
            height: `${(value / maxHeight) * 100}%`,
          }}
          title={`Value: ${value}`}
        >
          <span className="mx-auto text-xs text-white font-medium">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Graph;
