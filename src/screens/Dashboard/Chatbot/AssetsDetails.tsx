import React, {useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {showAmount} from '../../../helpers/showAmount';
import {convertAndShareImage} from '../../../utils/shareData';

const AssetsDetails = ({data}: {data: any}) => {
  const viewRef = useRef<any>();
  return (
    <View className="w-[260px]" ref={viewRef}>
      <View className="w-fit flex flex-row items-center self-end">
        <TouchableOpacity onPress={() => convertAndShareImage(viewRef)}>
          <Image
            source={require('../../../assets/images/share-new.png')}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
      {data?.map((asset: any, index: number) => {
        return (
          <View
            className="w-full pl-4 flex flex-row justify-between items-center self-center pb-3 pt-1 border-b border-[#1E3251] py-3"
            key={index}>
            <View className="flex flex-row">
              {/* <CoinLogo symbol={coin?.symbol} /> */}
              <View className="flex flex-col justify-center items-start ml-2">
                <Text className="text-neutral-100 font-bold text-[16px] font-[PlusJakartaSans-Bold]">
                  {asset?.symbol}
                </Text>
                {/* <Text className="text-neutral-100 opacity-50 text-xs font-bold font-[PlusJakartaSans-SemiBold]">
            {coin?.name}
          </Text> */}
              </View>
            </View>
            <View className="flex-row gap-x-4">
              <View className="flex flex-col justify-center items-end">
                <Text className="text-neutral-100 font-[PlusJakartaSans-SemiBold]">
                  {showAmount(asset?.value)}
                </Text>
                <Text className="text-neutral-100 opacity-50 font-[PlusJakartaSans-SemiBold] text-xs">
                  ${showAmount(asset?.value * asset?.avgPrice)}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default AssetsDetails;
