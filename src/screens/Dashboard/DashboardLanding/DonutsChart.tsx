/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {ISelectedCoin} from '../../../interfaces/main';
import {colorData} from '../../../constants/colorData';
type chartType = {
  pieData: {value: number; color: string; text: string}[];
  totalBalance: number;
};
const DoughnutChart = ({pieData, totalBalance}: chartType) => {
  return (
    <View className="ml-5 mt-3">
      <PieChart
        donut
        textColor="black"
        radius={80}
        innerRadius={65}
        innerCircleColor={'black'}
        innerCircleBorderColor={'grey'}
        innerCircleBorderWidth={5}
        textSize={10}
        textBackgroundRadius={26}
        focusOnPress
        data={pieData}
        centerLabelComponent={() => {
          return (
            <View className="flex flex-col items-center">
              <Text className="text-sm text-neutral-100">Total Assets</Text>
              <Text className="text-sm text-neutral-100">
                ${totalBalance.toLocaleString()}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default DoughnutChart;
