"use client";

function Controls({ onSelectAlgorithm }) {
  return (
    <header className="border bg-pink-50 p-3 border-black mt-6 w-fit shadow-xl mx-auto mb-4">
      <div className="flex gap-3 justify-center">
        <button
          className="border bg-purple-200 border-black p-2 font-medium"
          onClick={() => onSelectAlgorithm("selection")}
        >
          Selection Sort
        </button>
        <button
          className="border bg-purple-200 border-black p-2 font-medium"
          onClick={() => onSelectAlgorithm("bubble")}
        >
          Bubble Sort
        </button>
        <button
          className="border bg-purple-200 border-black p-2 font-medium"
          onClick={() => onSelectAlgorithm("insertion")}
        >
          Insertion Sort
        </button>
        <button
          className="border bg-purple-200 border-black p-2 font-medium"
          onClick={() => onSelectAlgorithm("merge")}
        >
          Merge Sort
        </button>
        <button
          className="border bg-purple-200 border-black p-2 font-medium"
          onClick={() => onSelectAlgorithm("quick")}
        >
          Quick Sort
        </button>
      </div>
    </header>
  );
}

export default Controls;
