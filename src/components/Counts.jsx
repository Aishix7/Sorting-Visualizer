import React from "react";
import { useState } from "react";
import Graph from "./Graph";

function Counts({ elementValues, setElementValues }) {
  const [elementCount, setElementCount] = useState(5);
  const [elementsInput, setElementsInput] = useState("");

  const handleCountChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^[0-9]*$/.test(value)) {
      setElementCount(value);

      const numValue = Number(value);
      if (!isNaN(numValue) && numValue >= 5 && numValue <= 50) {
        setElementValues(Array(numValue).fill(""));
        setElementsInput("");
      }
    }
  };

  const handleCountBlur = (e) => {
    let numValue = Number(elementCount);
    if (isNaN(numValue) || numValue < 5) numValue = 5;
    if (numValue > 50) numValue = 50;

    setElementCount(numValue);
    setElementValues(Array(numValue).fill(""));
    setElementsInput("");
  };

  const handleElementsInputChange = (e) => {
    const input = e.target.value;
    const values = input.split(" ").filter((val) => val !== "");

    if (values.length > elementCount) {
      setElementsInput(values.slice(0, elementCount).join(" "));
      alert("You cannot exceed the number of elements");
      return;
    }

    setElementsInput(input);

    const newElementValues = Array(elementCount).fill("");
    values.slice(0, elementCount).forEach((val, index) => {
      const numVal = Number(val);
      newElementValues[index] = isNaN(numVal) ? "" : numVal;
    });

    setElementValues(newElementValues);
  };

  return (
    <>
      <div className="  h-[20vh] flex items-end justify-center">
        <div className="flex items-center gap-6 p-4 ">
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="elementCount"
              className="block text-sm w-full font-medium text-black-700 mb-1"
            >
              Enter The Number Of Elements
            </label>
            <input
              className="border border-black rounded p-2 w-full font-medium text-black-700 max-w-xs"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={elementCount}
              onChange={handleCountChange}
              onBlur={handleCountBlur}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="Elements"
              className="block text-sm w-full font-medium text-black-700 mb-1"
            >
              Enter The Elements
            </label>
            <input
              className="border border-black rounded p-2 font-medium text-black-700 w-full max-w-xs"
              type="text"
              value={elementsInput}
              onChange={handleElementsInputChange}
              placeholder="e.g 10 20 30 40 50"
            />
          </div>
        </div>
      </div>
      {/* Add the Graph component below */}
      <Graph elements={elementValues} />
    </>
  );
}

export default Counts;
