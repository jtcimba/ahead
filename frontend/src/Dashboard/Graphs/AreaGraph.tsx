import { VictoryChart, VictoryBar, VictoryTooltip } from "victory";

interface Props {
  data: Array<any>;
}

const AreaGraph = (props: Props) => {
  return (
      <VictoryChart domainPadding={{x: 40}}>
        <VictoryBar
          labelComponent={<VictoryTooltip/>}
          style={{ data: { fill: '#99CED7'} }}
          data={props.data}
          animate={{
            onLoad: { duration: 1000 }
          }}
          events={[{
            target: "data",
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    target: "data",
                    mutation: (props) => {
                      return {
                        style: Object.assign({}, props.style, {fill: '#F34C38'})
                      };
                    }
                  },
                  {
                    target: "labels",
                    mutation: () => ({ active: true })
                  }
                ];
              },
              onMouseOut: () => {
                return [
                  {
                    target: "data",
                    mutation: () => {
                      return null;
                    }
                  },
                  {
                    target: "labels",
                    mutation: () => ({ active: false })
                  }
                ];
              }
            }
          }]}
        />
      </VictoryChart>
  );
};

AreaGraph.displayName = "Area Graph";

export default AreaGraph;
