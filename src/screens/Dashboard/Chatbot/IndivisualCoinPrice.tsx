import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';

import {convertAndShareImage} from '../../../utils/shareData';

const IndivisualCoinPrice = ({data}: any) => {
  const viewRef = useRef<any>();
  if (data.error) {
    return (
      <View
        className="w-[200px] w-max-[70vw] h-15 flex flex-col justify-between items-start p-4"
        ref={viewRef}>
        <View className="w-[190px] flex flex-row justify-between items-center gap-3">
          <Text className="text-neutral-100">{data.error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      className="w-[260px] w-max-[70vw] h-28 flex flex-col justify-between items-start p-4"
      ref={viewRef}>
      <View className="w-[260px] flex flex-row justify-between items-center gap-3">
        <View className="w-[40px] h-[40px] bg-[#171A3B] self-center mt-1 mb-1 items-center justify-center">
          <Image source={{uri: data.image}} className="h-6 w-6" />
        </View>
        <Text className="text-neutral-100">
          {data.name} ({data.symbol.toUpperCase()})
        </Text>
        <View className="w-fit h-full flex flex-row items-center self-end">
          <TouchableOpacity onPress={() => convertAndShareImage(viewRef)}>
            <Image
              source={require('../../../assets/images/share-new.png')}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-[180px] flex flex-row justify-between items-center">
        <Text className="text-neutral-100 text-2xl font-bold">
          ${data?.currentPrice?.toLocaleString()}
        </Text>
        <View className="rounded-md p-2">
          <Text
            className={`${
              data.priceChangePercentage24hInCurrency < 0
                ? 'text-semantic-error'
                : 'text-semantic-success'
            } text-lg`}>
            {data.priceChangePercentage24hInCurrency.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default IndivisualCoinPrice;
