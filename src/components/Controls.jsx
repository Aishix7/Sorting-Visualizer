import React from "react";

function Controls() {
  return (
    <header className="border bg-pink-50 p-3 border-black mt-6 w-fit shadow-xl mx-auto mb-4">
      <div className="flex gap-3 justify-center">
        <button className="border bg-purple-200 border-black p-2 font-medium">
          Selection Sort
        </button>
        <button className="border bg-purple-200 border-black p-2 font-medium">
          Bubble Sort
        </button>
        <button className="border bg-purple-200 border-black p-2 font-medium">
          Insertion Sort
        </button>
        <button className="border bg-purple-200 border-black p-2 font-medium">
          Merge Sort
        </button>
        <button className="border bg-purple-200 border-black p-2 font-medium">
          Quick Sort
        </button>
      </div>
    </header>
  );
}

export default Controls;
