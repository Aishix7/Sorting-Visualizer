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
  const [pivotIndex, setPivotIndex] = useState(-1);
  const [currentStep, setCurrentStep] = useState(0);
  const timeoutRef = useRef(null);

  const validElements = displayElements
    .filter((val) => val !== "")
    .map(Number)
    .filter((num) => !isNaN(num));

  const maxHeight = Math.max(...validElements, 10);

  useEffect(() => {
    if (!isSorting) {
      setDisplayElements(elements);
      setCurrentStep(0);
      setHighlightedIndices([]);
      setPivotIndex(-1);
    }
  }, [elements, isSorting]);

  useEffect(() => {
    if (shouldSkipToFirst && originalArray.length > 0) {
      const newValues = [
        ...originalArray,
        ...Array(elements.length - originalArray.length).fill(""),
      ];
      setDisplayElements(newValues);
      setCurrentStep(0);
      setHighlightedIndices([]);
      setPivotIndex(-1);
      setShouldSkipToFirst(false);
    }
  }, [shouldSkipToFirst, originalArray, elements.length, setShouldSkipToFirst]);

  useEffect(() => {
    if (shouldSkipToLast && sortedArray.length > 0) {
      const newValues = [
        ...sortedArray,
        ...Array(elements.length - sortedArray.length).fill(""),
      ];
      setDisplayElements(newValues);
      setCurrentStep(animations.length);
      setHighlightedIndices([]);
      setPivotIndex(-1);
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
        setPivotIndex(-1);
        onAnimationComplete();
        return;
      }

      const [action, ...params] = animations[currentStep];
      const newElements = [...displayElements];
      let newHighlights = [];
      let newPivot = pivotIndex;

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
        case "select-pivot":
          newPivot = params[0];
          newHighlights = [];
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
        case "partition-complete":
          newHighlights = [params[0]];
          newPivot = -1;
          break;
        default:
          break;
      }

      setHighlightedIndices(newHighlights);
      setPivotIndex(newPivot);
      setDisplayElements(newElements);
      setCurrentStep((prev) => prev + 1);

      const delay = 550 - animationSpeed * 5;
      timeoutRef.current = setTimeout(runAnimation, delay);
    };

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
    pivotIndex,
    shouldSkipToFirst,
    shouldSkipToLast,
    onAnimationComplete,
  ]);

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
      {validElements.map((value, index) => {
        let bgColor = "bg-green-500 hover:bg-green-600";

        if (pivotIndex === index) {
          bgColor = "bg-red-500";
        } else if (highlightedIndices.includes(index)) {
          bgColor = "bg-yellow-400";
        }

        return (
          <div
            key={index}
            className={`transition-colors flex items-end ${bgColor}`}
            style={{
              width: `${50 / validElements.length}%`,
              height: `${(value / maxHeight) * 100}%`,
            }}
            title={`Value: ${value}${pivotIndex === index ? " (Pivot)" : ""}`}
          >
            <span className="mx-auto text-xs text-white font-medium">
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Graph;
