import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
const {graphWidth} = Dimensions.get('screen').width;

const AnimatedArea = ({data}: any) => {
  const [lineData, setLineData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  useEffect(() => {
    setShowGraph(false);
    const graphArray = [];
    data?.map(obj => {
      graphArray.push({value: obj[1], timestamp: obj[0]});
    });
    setLineData([...graphArray]);
    setShowGraph(true);
  }, [data]);

  const timeLineObj = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  return (
    <View className="flex-1 justify-center items-center">
      {showGraph ? (
        <LineChart
          hideDataPoints
          isAnimated
          curved
          height={180}
          // width={graphWidth * 0.8}
          animationDuration={500}
          startFillColor="#F9AA4B"
          startOpacity={1}
          endOpacity={0.3}
          initialSpacing={0}
          data={lineData}
          // spacing={10}
          thickness={3}
          hideRules
          hideYAxisText
          yAxisColor="#F9AA4B00"
          verticalLinesColor="rgba(14,164,164,0.5)"
          xAxisColor="#F9AA4B00"
          color="#F9AA4B"
          pointerConfig={{
            pointerStripHeight: 180,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 1,
            pointerColor: 'lightgray',
            radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            // activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: 'center',
                    // marginTop: -30,
                    // marginLeft: -40,
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 16,
                      backgroundColor: 'white',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 10,
                      }}>
                      {'$' + (items[0].value / 10).toFixed(4)}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 10,
                      }}>
                      {'at ' +
                        new Date(items[0].timestamp).toLocaleString(
                          'en-US',
                          timeLineObj,
                        )}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
      ) : (
        <ActivityIndicator size="large" color="#F9AA4B" />
      )}
    </View>
  );
};

export default AnimatedArea;
