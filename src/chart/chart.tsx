import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import axios from 'axios';
import { BallIndicator } from 'react-native-indicators';

const screenWidth = Dimensions.get("window").width;

interface ChartData {
  prices: [number, number][];
}

interface ChartProps {
  itemId: string;
}

const Chart: React.FC<ChartProps> = ({ itemId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<number[]>([]);
  const [tooltipPos, setTooltipPos] = useState<{ x: number, y: number, visible: boolean, value: number }>({ x: 0, y: 0, visible: false, value: 0 });
  const [days, setDays] = useState<number>(365);
  const [selectedButton, setSelectedButton] = useState<number>(365);

  const getDataForChart = async (): Promise<ChartData> => {
    const ChartDataCordinates = (currency: string) =>
      `https://api.coingecko.com/api/v3/coins/${itemId}/market_chart?vs_currency=usd&days=${days}`;

    let config = {
      headers: {
        accept: 'application/json',
        'X-CoinAPI-Key': 'CG-SvrA5NgqvrVWpzJ8LviXg5Ci',
      },
    };

    try {
      const response = await axios.get(ChartDataCordinates(itemId), config);
      return response.data;
    } catch (error) {
      console.warn('Error fetching data from API:', error);
      return { prices: [] };
    }
  };

  const getAPIdata = async () => {
    try {
      setLoading(true);
      const jsonData = await getDataForChart();
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
  }, [itemId, days]);

  const formatNumber = (getString: string): string => {
    if (getString === '0') {
      return '0';
    } else {
      const cleanStr = getString.replace(',', '');
      return `${cleanStr.slice(0, 2)}.${cleanStr.slice(2, 4)}`;
    }
  };

  const formatTextforTooltip = (getString: string): string => {
    if (getString === '0') {
      return '0k';
    } else {
      const cleanStr = getString.replace(',', '');
      return "$" + `${cleanStr.slice(0, 2)}.${cleanStr.slice(2, 4)}` + "k";
    }
  };

  // Function to generate labels based on the selected time period
  const generateLabels = (days: number): string[] => {
    const now = new Date();
    const labels: string[] = [];
    if (days === 1) {
      for (let i = 0; i <= now.getHours(); i++) {
        labels.push(`${i}:00`);
      }
    } else if (days === 7) {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      }
    } else if (days === 30) {
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      }
    } else if (days === 365) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentMonth = now.getMonth();
      for (let i = currentMonth + 1; i < months.length; i++) {
        labels.push(months[i]);
      }
      for (let i = 0; i <= currentMonth; i++) {
        labels.push(months[i]);
      }
    }
    return labels;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20 }}>
      <View style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <BallIndicator size={50} color="#f7931a" />
        ) : (
          <LineChart
            data={{
              labels: generateLabels(days),
              datasets: [
                {
                  data: chartData,
                }
              ]
            }}
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
            verticalLabelRotation={days == 1 || days == 30 ? 90 : 30}
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
              propsForBackgroundLines: {
                strokeWidth: "0.3",
                stroke: "orange",
                strokeDasharray: "3",
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
                      x={tooltipPos.x < screenWidth - 120 ? tooltipPos.x + 20 : tooltipPos.x - 110}
                      y={tooltipPos.y + 30}
                      width="90"
                      height="40"
                      fill="grey"
                      rx="10"
                    />
                    <TextSVG
                      x={tooltipPos.x < screenWidth - 120 ? tooltipPos.x + 65 : tooltipPos.x - 65}
                      y={tooltipPos.y + 55}
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle">
                      {formatTextforTooltip(tooltipPos.value.toString())}
                    </TextSVG>
                    <Rect
                      x={tooltipPos.x - 400}
                      y={tooltipPos.y}
                      height={0.5}
                      width={800}
                    />
                    <Rect
                      x={tooltipPos.x}
                      y={tooltipPos.y - 400}
                      height={800}
                      width={0.5}
                    />
                    <Rect
                      x={screenWidth - screenWidth + 63.5}
                      y={0}
                      width="1"
                      height="316"
                      fill="black"
                    />
                    <Rect
                      x={screenWidth - screenWidth + 63.5}
                      y={316}
                      width={screenWidth - 74}
                      height="1"
                      fill="black"
                    />
                  </Svg>
                </View>
              ) : (
                <View>
                  <Svg>
                    <Rect
                      x={screenWidth - screenWidth + 63.5}
                      y={0}
                      width="1"
                      height="316"
                      fill="black"
                    />
                    <Rect
                      x={screenWidth - screenWidth + 63.5}
                      y={316}
                      width={screenWidth - 74}
                      height="1"
                      fill="black"
                    />
                  </Svg>
                </View>
              );
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
        )}
      </View>
      <View style={styles.buttonContainer}>
        {renderButton("1 Day", 1)}
        {renderButton("7 Days", 7)}
        {renderButton("30 Days", 30)}
        {renderButton("365 Days", 365)}
      </View>
    </View>
  );

  function renderButton(title: string, value: number) {
    return (
      <TouchableOpacity
        style={[styles.button, selectedButton === value && styles.selectedButton]}
        onPress={() => {
          setDays(value);
          setSelectedButton(value);
          getAPIdata();
        }}
        disabled={loading}
      >
        <Text style={[styles.buttonText, selectedButton === value && styles.selectedButtonText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#f7931a',
  },
  buttonText: {
    color: 'black',
  },
  selectedButtonText: {
    color: 'black',
  }
});

export default Chart;
