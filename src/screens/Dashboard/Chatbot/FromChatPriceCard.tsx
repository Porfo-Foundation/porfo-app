import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {convertAndShareImage} from '../../../utils/shareData';

const FromChatPriceCard = ({data}: any) => {
  const viewRef = useRef<any>();
  return (
    <View className="w-[300px] w-max-[70vw]" ref={viewRef}>
      <View className="w-full px-2">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row justify-between items-center">
            <View className="w-[40px] h-[40px] bg-[#171A3B] self-center mt-1 mb-1 items-center justify-center p-2">
              <Image source={{uri: data?.image}} className="h-6 w-6" />
            </View>
            <Text className="text-neutral-100 ml-2">
              {data?.name} ({data?.symbol?.toUpperCase()})
            </Text>
          </View>
          <View className="w-fit h-full flex flex-row items-center self-end">
            <TouchableOpacity onPress={() => convertAndShareImage(viewRef)}>
              <Image
                source={require('../../../assets/images/share-new.png')}
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="py-4">
          <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF]">
            ${data?.currentPrice?.toString()}
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]">
            1.0 {data?.symbol?.toUpperCase()}
          </Text>
          <Text
            className={`font-[PlusJakartaSans-SemiBold] text-sm ${
              data?.priceChangePercentage24hInCurrency < 0
                ? 'text-semantic-error'
                : 'text-semantic-success'
            }`}>
            {data?.priceChangePercentage24hInCurrency?.toFixed(2)}%
          </Text>
        </View>
        {data?.description && (
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF] mb-6">
            Bitcoin is one of the native currencies of Bitcoin chain. It is most
            widely used currency available in the market. It has the most
            percentage holding in the crypto ecosystem.
          </Text>
        )}
        <View>
          <View className="flex flex-row">
            <View className="flex-1">
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]">
                Market Cap
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
                ${data?.marketCap?.toString()}
              </Text>
            </View>

            <View className="flex-1">
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]">
                Circulating Supply
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
                {data?.circulatingsupply}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-2">
            <View className="flex-1">
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]">
                Total Volume
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
                ${data?.totalVolume?.toString()}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]">
                Total Supply
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
                {data?.totalSupply}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-2">
            <View className="flex-1">
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]">
                Fully Diluted Val
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
                ${data?.currentPrice?.toString()}
              </Text>
            </View>

            <View className="flex-1">
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]">
                Max Supply
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
                {data?.maxsupply}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FromChatPriceCard;
