import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Header from "./components/Header";
import Visualizer from "./components/Visualizer";
import Buttons from "./components/Buttons";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Visualizer />
      <Buttons />
    </div>
  );
}

export default App;
