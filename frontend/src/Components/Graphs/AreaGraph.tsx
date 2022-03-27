import React from "react";
import { VictoryStack, VictoryArea } from "victory";

const AreaGraph = () => {
  return (
    <VictoryStack>
      <VictoryArea
        data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
      />
      <VictoryArea
        data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
      />
      <VictoryArea
        data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
      />
    </VictoryStack>
  );
};

AreaGraph.displayName = "Area Graph";

export default AreaGraph;
