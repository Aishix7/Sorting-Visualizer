import React, { useState, useEffect, useRef } from "react";
function Graph({ elements, animations }) {
  const [displayElements, setDisplayElements] = useState(elements);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const animationRef = useRef();

  const validElements = elements
    .filter((val) => val !== "")
    .map(Number)
    .filter((num) => !isNaN(num));

  const maxHeight = Math.max(...validElements, 10);

  useEffect(() => {
    setDisplayElements(elements);
  }, [elements]);

  useEffect(() => {
    if (animations && animations.length > 0) {
      let currentStep = 0;

      clearInterval(animationRef.current);
      const playAllAnimations = () => {
        if (currentStep >= animations.length) {
          clearInterval(animationRef.current);
          setHighlightedIndices([]);
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
          case "swap":
            const [i, j] = params;
            [newElements[i], newElements[j]] = [newElements[j], newElements[i]];
            break;
          default:
            break;
        }
        setHighlightedIndices(newHighlights);
        setDisplayElements(newElements);
        currentStep++;
      };

      animationRef.current = setInterval(playAllAnimations, 100);
      return () => clearInterval(animationRef.current);
    }
  }, [animations]);

  return (
    <div
      className="mt-8 border border-gray-300 shadow-xl h-[70vh] flex items-end justify-center bg-white p-2"
      style={{ gap: "2px" }}
    >
      {displayElements
        .filter((val) => val !== "")
        .map(Number)
        .filter((num) => !isNaN(num))
        .map((value, index) => (
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
