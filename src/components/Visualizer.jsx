import React from "react";
import Counts from "./Counts";
import Graph from "./Graph";

import { useState } from "react";

function Visualizer({ elementValues, setElementValues, animations }) {
  return (
    <div>
      <Counts
        elementValues={elementValues}
        setElementValues={setElementValues}
        animations={animations}
      />
    </div>
  );
}

export default Visualizer;
