import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {colorThemes} from '../../constants/themeData';
import {useAppSelector} from '../../redux/hooks';

const screenWidth = Dimensions.get('window').width;

const LineGraph = ({graphData, isAllHoldingZero, showGraph}: any) => {
  // console.log('inside LineGraph......', graphData);
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
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

  const [tooltipData, setTooltipData] = useState({
    x: '',
    y: '',
    showTooltip: false,
  });
  const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});

  const handleDataPointClick = ({value, index, x, y}) => {
    const xValue = new Date(graphData[index][0]).toLocaleString(
      'en-US',
      timeLineObj,
    );
    const yValue = graphData[index][1];
    setTooltipData({x: xValue, y: yValue, showTooltip: true});
    setTooltipPosition({x, y});

    // Set a timer to hide the tooltip after 3 seconds (adjust as needed)
    setTimeout(() => {
      setTooltipData({x: '', y: '', showTooltip: false});
    }, 1000);
  };

  return (
    <View className="w-[80%] h-[50%]">
      <View
        className="flex-1 w-full items-center"
        style={{color: colorThemes[selectedTheme]['background']}}>
        {/* <View className="w-full flex flex-row justify-between">
          <Text className="text-neutral-100">{xAxisValue}</Text>
          <Text className="text-neutral-100">
            ${yAxisValue !== '' && yAxisValue?.toFixed(2)}
          </Text>
        </View> */}
        {showGraph ? (
          isAllHoldingZero ? (
            <Text className="text-neutral-100">No Data to Display</Text>
          ) : (
            <View>
              <LineChart
                // fromZero
                data={{
                  labels: graphData.map((ele: any) => ele[0]),
                  datasets: [
                    {
                      data: graphData.map((ele: any) => ele[1]),
                      strokeWidth: 1, // optional
                      color: () => `rgba(177,63,96, ${1})`,
                    },
                  ],
                  // legend: ['Coin Charts'],
                }}
                // onDataPointClick={handleDataPointClick}
                width={screenWidth * 1.25} // from react-native
                height={200}
                yAxisLabel="$"
                yAxisSuffix="k"
                yLabelsOffset={0.5}
                yAxisInterval={0.1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#000000',
                  backgroundGradientFrom: '#000000',
                  backgroundGradientTo: '#000000',
                  fillShadowGradientFromOpacity: 0.2,

                  // decimalPlaces: 1, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(177,63,96,1)`,
                  labelColor: (opacity = 1) => `rgba(177,63,96,1)`,
                  propsForDots: {
                    r: '0.5',
                    strokeWidth: '0.25',
                    stroke: '#B13F60',
                  },
                }}
                // onDataPointClick={({value, index}) => {
                //   setXAxisValue(
                //     new Date(graphData[index][0]).toLocaleString(
                //       'en-US',
                //       timeLineObj,
                //     ),
                //   );
                //   setYAxisValue(graphData[index][1]);
                // }}
                onDataPointClick={handleDataPointClick}
                bezier={true}
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
              {tooltipData.showTooltip && (
                <View
                  style={[
                    styles.tooltip,
                    {
                      left: tooltipPosition.x - 75, // Adjust the position as needed
                      top: tooltipPosition.y + 75, // Adjust the position as needed
                    },
                  ]}>
                  <Text>{tooltipData.y}</Text>
                  <Text>at {tooltipData.x}</Text>
                </View>
              )}
            </View>
          )
        ) : (
          <ActivityIndicator size="large" color="#F9AA4B" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
});
export default LineGraph;
