import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {colorData} from '../../../constants/colorData';
import DoughnutChart from './DonutsChart';
import useDonutChartData from '../../../hooks/reactQuery/apiHooks/useDonutChartData';

const PortfolioDetailed = ({coinAssets, totalBalance}: any) => {
  const chartData = useDonutChartData(coinAssets, totalBalance);
  const {donutChartData, pieData} = chartData
    ? chartData
    : {donutChartData: [], pieData: []};
  return (
    <View className="w-full">
      <View className="flex flex-row justify-center items-center gap-3 px-4">
        <DoughnutChart pieData={pieData} totalBalance={totalBalance} />
        <ScrollView className="flex-1">
          {donutChartData?.map((coin: any, index: number) => (
            <View
              key={index}
              className="flex flex-row items-center justify-evenly">
              <View className="flex items-center flex-row gap-x-2">
                <View
                  className="w-2 h-2 rounded-full"
                  style={{backgroundColor: `${colorData[index]}`}}></View>
                <Text
                  className={`font-[PlusJakartaSans-semiBold] text-[#FFFFFF] ml-1`}>
                  {coin.coin.symbol}
                </Text>
              </View>
              <Text
                className={`font-[PlusJakartaSans-semiBold] text-semantic-success ml-1`}>
                {Number(coin.percentage)?.toFixed(2)}%
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PortfolioDetailed;
