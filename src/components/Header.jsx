import React from "react";
import Controls from "./Controls";
function Header() {
  return (
    <header className="border border-black shadow-xl  bg-gray-300 p-4 ">
      <h1 className="text-xl font-bold">Sorting Visualizer</h1>
      <p>(Step-by-step algorithm breakdown)</p>
      <Controls />
    </header>
  );
}

export default Header;
