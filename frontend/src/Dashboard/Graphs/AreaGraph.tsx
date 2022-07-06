import React from "react";
import { VictoryChart, VictoryBar } from "victory";
import styles from "./index.module.scss";

interface Props {
  data: Array<any>;
}

const AreaGraph = (props: Props) => {
  return (
    <div className={styles.container}>
      <VictoryChart
        domainPadding={{x: 20}}
      >
        <VictoryBar
          style={{ data: { fill: '#F0AA2F'} }}
          data={props.data}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        />
      </VictoryChart>
    </div>
  );
};

AreaGraph.displayName = "Area Graph";

export default AreaGraph;
