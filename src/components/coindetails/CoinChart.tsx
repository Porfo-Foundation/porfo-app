import {View, Text, Pressable, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {coinData} from '../../constants/graphData';
import {LineChart} from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;
const CoinChart = () => {
  const [graphData, setGraphData] = useState<any>(coinData['24h']);
  const handleButtonPressed = (timeline: string) => {
    if (timeline === '24h') {
      setGraphData(coinData['24h']);
    } else if (timeline === '1w') {
      setGraphData(coinData['1w']);
    } else if (timeline === '1m') {
      setGraphData(coinData['1m']);
    } else if (timeline === '1y') {
      setGraphData(coinData['1y']);
    } else if (timeline === 'all') {
      setGraphData(coinData.all);
    }
  };
  const handleDataPointClick = (data: any) => {
    // Handle the click event for the data point
    console.log('Data point clicked:', data);
  };
  return (
    <View className="flex-1 items-center border-2 dark:border-neutral-700 rounded-md">
      <View className="flex-1 w-full items-center bg-[#071952]">
        <LineChart
          data={{
            labels: graphData.map((ele: any) => ele[0]),
            datasets: [
              {
                data: graphData.map((ele: any) => ele[1]),
                strokeWidth: 1, // optional
                color: () => `rgba(255, 255, 255, ${1})`,
              },
            ],
            // legend: ['Coin Charts'],
          }}
          onDataPointClick={handleDataPointClick}
          width={screenWidth * 0.9} // from react-native
          height={200}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={25} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#071952',
            backgroundGradientFrom: '#071952',
            backgroundGradientTo: '#071952',
            fillShadowGradientFromOpacity: 0.2,

            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '1',
              strokeWidth: '1',
              stroke: '#ffa726',
            },
          }}
          bezier
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            borderRadius: 8,
          }}
          withShadow={true}
          withInnerLines={true}
          withHorizontalLines={true}
          withVerticalLines={false}
          withOuterLines={true}
          horizontalLabelRotation={0}
          verticalLabelRotation={0}
          segments={6}
          // hidePointsAtIndex={[1, 3, 5]}
          // withVerticalLabels={false}
          // withHorizontalLabels={false}
        />
      </View>
      <View className="flex-1/4 w-full flex-row justify-between items-center px-2 mb-1 bg-[#071952]">
        <Pressable
          className="w-1/6 h-6 bg-boxShadow-1 items-center rounded-3xl"
          onPress={() => handleButtonPressed('24h')}>
          <Text className="dark:text-neutral-200">24h</Text>
        </Pressable>
        <Pressable
          className="w-1/6 h-6 bg-boxShadow-1 items-center rounded-3xl"
          onPress={() => handleButtonPressed('1w')}>
          <Text className="dark:text-neutral-200">1w</Text>
        </Pressable>
        <Pressable
          className="w-1/6 h-6 bg-boxShadow-1 items-center rounded-3xl"
          onPress={() => handleButtonPressed('1m')}>
          <Text className="dark:text-neutral-200">1m</Text>
        </Pressable>
        <Pressable
          className="w-1/6 h-6 bg-boxShadow-1 items-center rounded-3xl"
          onPress={() => handleButtonPressed('1y')}>
          <Text className="dark:text-neutral-200">1y</Text>
        </Pressable>
        <Pressable
          className="w-1/6 h-6 bg-boxShadow-1 items-center rounded-3xl"
          onPress={() => handleButtonPressed('all')}>
          <Text className="dark:text-neutral-200">All</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CoinChart;
