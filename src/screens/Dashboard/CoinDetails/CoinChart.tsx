import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
// import {LineChart} from 'react-native-gifted-charts';
import {LineChart} from 'react-native-chart-kit';
import {lineData} from '../../../constants/graphData';
import {coinData} from '../../../constants/graphData';
const screenWidth = Dimensions.get('window').width;

type animatedareaType = {
  coinId: string;
  daysAgo: string;
  setPriceTime?: any;
  setCoinPrice?: any;
};
const CoinChart = ({
  coinId,
  daysAgo,
  setPriceTime,
  setCoinPrice,
}: animatedareaType) => {
  let yoffsetInitial = 0;
  const [chartData, setChartData] = useState(coinData['24h']);
  const [showChart, setShowChart] = useState(true);
  const [xAxisValue, setXAxisValue] = useState('');
  const [yAxisValue, setYAxisValue] = useState('');

  const timeLineObj = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  useEffect(() => {
    setShowChart(false);
    let data: [] = [];
    const apiCall = async () => {
      try {
        if (daysAgo === '1H') {
          data = await fetchData(coinId, 1);
        } else if (daysAgo === '1D') {
          data = await fetchData(coinId, 1);
        } else if (daysAgo === '1W') {
          data = await fetchData(coinId, 7);
        } else if (daysAgo === '1M') {
          data = await fetchData(coinId, 30);
        } else if (daysAgo === '1Y') {
          data = await fetchData(coinId, 365);
        } else if (daysAgo === 'All') {
          data = await fetchData(coinId, 'max');
        }
        // yoffsetInitial = data[0][1];
        // for (let i = 0; i < data.length; i++) {
        //   chartData.push({value: data[i][1], date: data[i][0]});
        //   if (yoffsetInitial > data[i][1]) {
        //     yoffsetInitial = data[i][1];
        //   }
        // }
        // setChartData([...chartData]);
        setChartData(data);
        // setXAxisValue(
        //   new Date(data[0][0]).toLocaleString('en-US', timeLineObj),
        // );
        // setYAxisValue(data[0][1]);
        setPriceTime(new Date(data[0][0]).toLocaleString('en-US', timeLineObj));
        setCoinPrice(data[0][1]);
        setShowChart(true);
      } catch (error) {
        console.log('coingecko api error...', error);
      }
    };
    apiCall();
  }, [daysAgo, coinId]);

  const fetchData = async (coin_id: string, days_Ago: any) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=usd&days=${days_Ago}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data.prices;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View>
      {showChart ? (
        // <LineChart
        //   hideDataPoints
        //   isAnimated
        //   curved
        //   height={150}
        //   animateOnDataChange
        //   animationDuration={1200}
        //   onDataChangeAnimationDuration={300}
        //   startFillColor="#F9AA4B"
        //   startOpacity={1}
        //   endOpacity={0.3}
        //   initialSpacing={0}
        //   data={chartData}
        //   spacing={10}
        //   thickness={3}
        //   hideRules
        //   // hideYAxisText
        //   yAxisColor="#F9AA4B00"
        //   yAxisOffset={`${yoffsetInitial}`}
        //   verticalLinesColor="rgba(14,164,164,0.5)"
        //   xAxisColor="#F9AA4B00"
        //   color="#F9AA4B"
        //   pointerConfig={{
        //     pointerStripHeight: 160,
        //     pointerStripColor: 'lightgray',
        //     pointerStripWidth: 2,
        //     pointerColor: 'lightgray',
        //     radius: 6,
        //     pointerLabelWidth: 100,
        //     pointerLabelHeight: 90,
        //     // activatePointersOnLongPress: true,
        //     autoAdjustPointerLabelPosition: false,
        //     pointerLabelComponent: items => {
        //       return (
        //         <View
        //           style={{
        //             height: 90,
        //             width: 100,
        //             justifyContent: 'center',
        //             // marginTop: -30,
        //             // marginLeft: -40,
        //           }}>
        //           <Text
        //             style={{
        //               color: '#F9AA4B',
        //               fontSize: 10,
        //               marginBottom: 6,
        //               textAlign: 'center',
        //             }}>
        //             {items[0].date}
        //           </Text>

        //           <View
        //             style={{
        //               paddingHorizontal: 10,
        //               paddingVertical: 4,
        //               borderRadius: 16,
        //               backgroundColor: 'white',
        //             }}>
        //             <Text
        //               style={{
        //                 fontWeight: 'bold',
        //                 textAlign: 'center',
        //                 color: 'black',
        //                 fontSize: 10,
        //               }}>
        //               {'$' + items[0].value + '.0'}
        //             </Text>
        //           </View>
        //         </View>
        //       );
        //     },
        //   }}
        // />
        //from another library
        <View className="flex-1 w-full items-center">
          <View className="flex flex-row justify-between w-full">
            <Text className="text-neutral-100">{xAxisValue}</Text>
            <Text className="text-neutral-100">
              ${yAxisValue !== '' && yAxisValue?.toFixed(2)}
            </Text>
          </View>

          <LineChart
            data={{
              labels: chartData?.map((ele: any) => ele[0]),
              datasets: [
                {
                  data: chartData?.map((ele: any) => ele[1]),
                  strokeWidth: 1, // optional
                  color: () => `rgba(177,63,96,1)`,
                },
              ],
              // legend: ['Coin Charts'],
            }}
            // onDataPointClick={handleDataPointClick}
            width={screenWidth * 1.3} // from react-native
            height={200}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={25} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#000000',
              backgroundGradientFrom: '#000000',
              backgroundGradientTo: '#000000',
              fillShadowGradientFromOpacity: 0.2,

              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(177,63,96,1)`,
              labelColor: (opacity = 1) => `rgba(177,63,96,1)`,
              propsForDots: {
                r: '0.5',
                strokeWidth: '0.1',
                stroke: '#B13F60',
              },
            }}
            onDataPointClick={({value, index}) => {
              // setXAxisValue(
              //   new Date(chartData[index][0]).toLocaleString(
              //     'en-US',
              //     timeLineObj,
              //   ),
              // );
              // setYAxisValue(chartData[index][1]);
              setPriceTime(
                new Date(chartData[index][0]).toLocaleString(
                  'en-US',
                  timeLineObj,
                ),
              );
              setCoinPrice(chartData[index][1]);
            }}
            // bezier
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              borderRadius: 8,
            }}
            withShadow={false}
            withInnerLines={false}
            withHorizontalLines={false}
            withVerticalLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
          />
        </View>
      ) : (
        // <Text className="text-neutral-100">Loading...</Text>
        <View className="w-full h-[200px] items-center justify-center">
          <ActivityIndicator size="large" color="#F9AA4B" />
        </View>
      )}
    </View>
  );
};

export default CoinChart;
