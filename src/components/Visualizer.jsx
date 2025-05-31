import React from "react";
import Counts from "./Counts";
import Graph from "./Graph";

import { useState } from "react";

function Visualizer({ elementValues, setElementValues }) {
  return (
    <div>
      <Counts
        elementValues={elementValues}
        setElementValues={setElementValues}
      />
    </div>
  );
}

export default Visualizer;
