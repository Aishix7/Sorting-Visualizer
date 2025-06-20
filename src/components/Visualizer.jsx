"use client";
import Counts from "./Counts";

function Visualizer({
  elementValues,
  setElementValues,
  onInputChange,
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
  return (
    <div>
      <Counts
        elementValues={elementValues}
        setElementValues={setElementValues}
        onInputChange={onInputChange}
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
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}

export default Visualizer;
