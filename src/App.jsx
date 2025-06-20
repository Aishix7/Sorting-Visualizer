import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Header from "./components/Header";
import Visualizer from "./components/Visualizer";
import Buttons from "./components/Buttons";
import { SelectionSort } from "./algorithms/SelectionSort";
import "./App.css";

function App() {
  const [elementValues, setElementValues] = useState(Array(5).fill(""));
  const [animations, setAnimations] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

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
  };
  const handleSelectAlgorithm = (algorithm) => {
    if (isSorting) return;

    const validValues = elementValues
      .filter((val) => val !== "")
      .map(Number)
      .filter((num) => !isNaN(num));

    if (validValues.length === 0) return;

    setIsSorting(true);

    if (algorithm === "selection") {
      const { sortedArray, animations } = SelectionSort(validValues);
      setAnimations([]);
      setTimeout(() => {
        setAnimations(animations);

        setTimeout(() => {
          const newValues = [
            ...sortedArray,
            ...Array(elementValues.length - sortedArray.length).fill(""),
          ];
          setElementValues(newValues);
          setIsSorting(false);
        }, animations.length * 100 + 100);
      }, 50);
    }
  };
  return (
    <div>
      <Header onSelectAlgorithm={handleSelectAlgorithm} />
      <Visualizer
        elementValues={elementValues}
        setElementValues={setElementValues}
        animations={animations}
      />
      <Buttons onRandomReset={handleRandomReset} />
    </div>
  );
}

export default App;
