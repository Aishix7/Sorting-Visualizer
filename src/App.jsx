"use client";

import { useState } from "react";
import Header from "./components/Header";
import Visualizer from "./components/Visualizer";
import Buttons from "./components/Buttons";
import { SelectionSort } from "./algorithms/SelectionSort";
import "./App.css";

function App() {
  const [elementValues, setElementValues] = useState(Array(5).fill(""));
  const [animations, setAnimations] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [originalArray, setOriginalArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [shouldSkipToFirst, setShouldSkipToFirst] = useState(false);
  const [shouldSkipToLast, setShouldSkipToLast] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInputChange = (newValues) => {
    setElementValues(newValues);
    // Reset all states when user changes input
    setAnimations([]);
    setIsSorting(false);
    setIsPaused(false);
    setOriginalArray([]);
    setSortedArray([]);
    setShouldSkipToFirst(false);
    setShouldSkipToLast(false);
    setIsCompleted(false);
  };

  const handleRandomReset = () => {
    const nonEmptyValues = elementValues.filter((val) => val !== "");
    if (nonEmptyValues.length === 0) return;

    const shuffled = [...nonEmptyValues];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const newValues = [
      ...shuffled,
      ...Array(elementValues.length - shuffled.length).fill(""),
    ];
    setElementValues(newValues);

    // Reset all animation states
    setAnimations([]);
    setIsSorting(false);
    setIsPaused(false);
    setOriginalArray([]);
    setSortedArray([]);
    setShouldSkipToFirst(false);
    setShouldSkipToLast(false);
    setIsCompleted(false);
  };

  const handleSelectAlgorithm = (algorithm) => {
    if (isSorting) return;

    const validValues = elementValues
      .filter((val) => val !== "")
      .map(Number)
      .filter((num) => !isNaN(num));

    if (validValues.length === 0) return;

    setOriginalArray([...validValues]);
    setIsSorting(true);
    setIsPaused(false);
    setShouldSkipToFirst(false);
    setShouldSkipToLast(false);
    setIsCompleted(false);

    if (algorithm === "selection") {
      const { sortedArray, animations } = SelectionSort(validValues);
      setSortedArray(sortedArray);
      setAnimations(animations);
    }
  };

  const handlePause = () => {
    if (!isSorting) return;
    setIsPaused(!isPaused);
  };

  const handleSkipToFirst = () => {
    if (!isSorting && !isCompleted) return;
    setShouldSkipToFirst(true);
    if (isSorting) {
      setIsPaused(true);
    }
  };

  const handleSkipToLast = () => {
    if (!isSorting && !isCompleted) return;
    setShouldSkipToLast(true);
    if (isSorting) {
      setIsPaused(true);
    }
  };

  const handleAnimationComplete = () => {
    setIsSorting(false);
    setIsPaused(false);
    setShouldSkipToFirst(false);
    setShouldSkipToLast(false);
    setIsCompleted(true);

    // Keep the sorted array displayed
    const newValues = [
      ...sortedArray,
      ...Array(elementValues.length - sortedArray.length).fill(""),
    ];
    setElementValues(newValues);
  };

  return (
    <div>
      <Header onSelectAlgorithm={handleSelectAlgorithm} />
      <Visualizer
        elementValues={elementValues}
        setElementValues={setElementValues}
        onInputChange={handleInputChange}
        animations={animations}
        animationSpeed={animationSpeed}
        isPaused={isPaused}
        isSorting={isSorting}
        isCompleted={isCompleted}
        originalArray={originalArray}
        sortedArray={sortedArray}
        shouldSkipToFirst={shouldSkipToFirst}
        shouldSkipToLast={shouldSkipToLast}
        setShouldSkipToFirst={setShouldSkipToFirst}
        setShouldSkipToLast={setShouldSkipToLast}
        onAnimationComplete={handleAnimationComplete}
      />
      <Buttons
        onRandomReset={handleRandomReset}
        onPause={handlePause}
        onSkipToFirst={handleSkipToFirst}
        onSkipToLast={handleSkipToLast}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        isSorting={isSorting}
        isCompleted={isCompleted}
        isPaused={isPaused}
      />
    </div>
  );
}

export default App;
