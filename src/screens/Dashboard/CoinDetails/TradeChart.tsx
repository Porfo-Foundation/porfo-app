import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CoinChart from './CoinChart';

type tradeChart = {
  coinDetails: any;
};
const TradeChart = ({coinDetails}: tradeChart) => {
  const timelines: Array<any> = [
    {
      name: '1H',
    },
    {
      name: '1D',
    },
    {
      name: '1W',
    },
    {
      name: '1M',
    },
    {
      name: '1Y',
    },
    {
      name: 'All',
    },
  ];
  const {width, height} = Dimensions.get('screen');
  const [selectedTimeline, setSelectedTimeline] = useState('1D');
  return (
    <View className="mt-4">
      <Text
        className={`font-[PlusJakartaSans-semiBold] text-base text-[#FFFFFF]`}>
        {coinDetails?.name} Price Chart
      </Text>
      <View className="flex flex-row justify-evenly my-4 mb-4">
        {timelines?.map((timeline: any, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            onPress={() => setSelectedTimeline(timeline.name)}>
            <Text
              className={`font-[PlusJakartaSans-semiBold] text-base ${
                selectedTimeline === timeline.name
                  ? 'text-[#453DE0]'
                  : 'text-[#FFFFFF]'
              }`}>
              {timeline.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <CoinChart coinId={coinDetails?.id} daysAgo={selectedTimeline} />
    </View>
  );
};

export default TradeChart;
