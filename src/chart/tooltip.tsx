import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

interface ChartData {
  prices: [number, number][];
}

const Chart: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<number[]>([]);
  const [tooltipPos, setTooltipPos] = useState<{ x: number, y: number, visible: boolean, value: number }>({ x: 0, y: 0, visible: false, value: 0 });

  const getDataForChartFromJsonFile = async (): Promise<ChartData> => {
    const path = require('../../assets/gc_API_Request_Res/chart.json');
    try {
      const jsonData: ChartData = path;
      return jsonData;
    } catch (error) {
      console.warn('Error reading data from file:', error);
      return { prices: [] };
    }
  };

  const getAPIdata = async () => {
    try {
      const jsonData = await getDataForChartFromJsonFile();
      if (jsonData && jsonData.prices) {
        const formattedData = jsonData.prices.map(item => item[1]);
        setChartData(formattedData);
      }
      setLoading(false);
    } catch (error) {
      console.warn(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAPIdata();
  }, []);

  const formatNumber = (getString: string): string => {
    if(getString == '0'){
      return '0';
    }
    else{
    // Remove any existing decimal point
    const cleanStr = getString.replace(',', '');
    return `${cleanStr.slice(0, 2)}.${cleanStr.slice(2, 4)}`;
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, }}>
      <LineChart
        data={{
          labels: ["Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", ],
          datasets: [
            {
              data: chartData,
            }
          ]
        }}
        fromZero
        width={screenWidth - 10}
        height={400}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={500}
        withVerticalLabels={true}
        yLabelsOffset={10}
        xLabelsOffset={0}
        withInnerLines={true}
        withOuterLines={true}
        withVerticalLines={true}
        withHorizontalLines={true}
        verticalLabelRotation={30}
        formatYLabel={yvalue => formatNumber(yvalue)}
        segments={3}
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          fillShadowGradientFrom: "grey",
          fillShadowGradientTo: "black",
          strokeWidth: 3,
          decimalPlaces: 0,
          color: (opacity = 255) => `rgba(255, 0, 0, ${opacity})`,
          labelColor: (opacity = 155) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 0
          },
          propsForDots: {
            r: "0",
            strokeWidth: "0",
            stroke: "#fbfbfb"
          },
          propsForBackgroundLines:{
            strokeWidth: "0.3",
            stroke: "orange",
            strokeDasharray: "3",
          },
          propsForHorizontalLabels: {
            // strokeWidth: "0.3",
            // stroke: "orange",
          }
          
  }}
        style={{
          marginVertical: 0,
        }}
        decorator={() => {
          return tooltipPos.visible ? (
            <View>
              <Svg>
                <Rect
                  x={tooltipPos.x - 20}
                  y={tooltipPos.y + 10}
                  width="50"
                  height="30"
                  fill="black"
                />
                <TextSVG
                  x={tooltipPos.x + 5}
                  y={tooltipPos.y + 30}
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle">
                  {formatNumber(tooltipPos.value)}
                </TextSVG>
              </Svg>
            </View>
          ) : null;
        }}
        onDataPointClick={(data) => {
          const isSamePoint = (tooltipPos.x === data.x && tooltipPos.y === data.y);

          if (isSamePoint) {
            setTooltipPos(prevState => ({
              ...prevState,
              visible: !prevState.visible,
              value: data.value
            }));
          } else {
            setTooltipPos({
              x: data.x,
              y: data.y,
              value: data.value,
              visible: true
            });
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default Chart;
