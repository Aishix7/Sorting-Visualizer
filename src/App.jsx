import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Header from "./components/Header";
import Visualizer from "./components/Visualizer";
import Buttons from "./components/Buttons";
import "./App.css";

function App() {
  const [elementValues, setElementValues] = useState(Array(5).fill(""));

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
  return (
    <div>
      <Header />
      <Visualizer
        elementValues={elementValues}
        setElementValues={setElementValues}
      />
      <Buttons onRandomReset={handleRandomReset} />
    </div>
  );
}

export default App;
