"use client";

import { useState, useEffect, useRef } from "react";

function Graph({
  elements,
  animations,
  animationSpeed,
  isPaused,
  isSorting,
  isCompleted,
  originalArray,
  sortedArray,
  shouldSkipToFirst,
  shouldSkipToLast,
  setShouldSkipToFirst,
  setShouldSkipToLast,
  onAnimationComplete,
}) {
  const [displayElements, setDisplayElements] = useState(elements);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const timeoutRef = useRef(null);

  const validElements = displayElements
    .filter((val) => val !== "")
    .map(Number)
    .filter((num) => !isNaN(num));

  const maxHeight = Math.max(...validElements, 10);

  // Update display elements when elements change
  useEffect(() => {
    if (!isSorting) {
      setDisplayElements(elements);
      setCurrentStep(0);
      setHighlightedIndices([]);
    }
  }, [elements, isSorting]);

  // Handle skip to first
  useEffect(() => {
    if (shouldSkipToFirst && originalArray.length > 0) {
      const newValues = [
        ...originalArray,
        ...Array(elements.length - originalArray.length).fill(""),
      ];
      setDisplayElements(newValues);
      setCurrentStep(0);
      setHighlightedIndices([]);
      setShouldSkipToFirst(false);
    }
  }, [shouldSkipToFirst, originalArray, elements.length, setShouldSkipToFirst]);

  // Handle skip to last
  useEffect(() => {
    if (shouldSkipToLast && sortedArray.length > 0) {
      const newValues = [
        ...sortedArray,
        ...Array(elements.length - sortedArray.length).fill(""),
      ];
      setDisplayElements(newValues);
      setCurrentStep(animations.length);
      setHighlightedIndices([]);
      setShouldSkipToLast(false);
      if (isSorting) {
        onAnimationComplete();
      }
    }
  }, [
    shouldSkipToLast,
    sortedArray,
    elements.length,
    animations.length,
    setShouldSkipToLast,
    onAnimationComplete,
    isSorting,
  ]);

  // Main animation logic
  useEffect(() => {
    if (!animations || animations.length === 0 || !isSorting) {
      return;
    }

    if (isPaused || shouldSkipToFirst || shouldSkipToLast) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    const runAnimation = () => {
      if (currentStep >= animations.length) {
        setHighlightedIndices([]);
        onAnimationComplete();
        return;
      }

      const [action, ...params] = animations[currentStep];
      const newElements = [...displayElements];
      let newHighlights = [];

      switch (action) {
        case "compare":
          newHighlights = params;
          break;
        case "select-min":
          newHighlights = [params[0]];
          break;
        case "select-element":
          newHighlights = [params[0]];
          break;
        case "deselect-min":
          newHighlights = [];
          break;
        case "pre-swap":
          newHighlights = params;
          break;
        case "swap":
          const [i, j] = params;
          [newElements[i], newElements[j]] = [newElements[j], newElements[i]];
          newHighlights = [i, j];
          break;
        case "overwrite":
          const [index, value] = params;
          newElements[index] = value;
          newHighlights = [index];
          break;
        default:
          break;
      }

      setHighlightedIndices(newHighlights);
      setDisplayElements(newElements);
      setCurrentStep((prev) => prev + 1);

      // Calculate delay: speed 1 = 500ms, speed 100 = 50ms
      const delay = 550 - animationSpeed * 5;
      timeoutRef.current = setTimeout(runAnimation, delay);
    };

    // Clear any existing timeout before starting new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(runAnimation, 550 - animationSpeed * 5);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [
    animations,
    currentStep,
    isPaused,
    isSorting,
    animationSpeed,
    displayElements,
    shouldSkipToFirst,
    shouldSkipToLast,
    onAnimationComplete,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="mt-8 border border-gray-300 shadow-xl h-[70vh] flex items-end justify-center bg-white p-2"
      style={{ gap: "2px" }}
    >
      {validElements.map((value, index) => (
        <div
          key={index}
          className={`transition-colors flex items-end ${
            highlightedIndices.includes(index)
              ? "bg-yellow-400"
              : "bg-green-500 hover:bg-green-600"
          }`}
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
