import {View, Text, Image} from 'react-native';
import React from 'react';

const VenusTable = () => {
  return (
    <View className="mx-4 my-6">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-3">
          <View className="relative">
            <Image source={require('../../../assets/images/bitcoin.png')} />
            <Image
              source={require('../../../assets/images/bitcoin.png')}
              className="absolute right-0 left-6 w-4 h-4"
            />
          </View>
          <Text className="font-[PlusJakartaSans-SemiBold] text-md text-[#b8b8b8]">
            VENUS
          </Text>
        </View>
        <Text className="font-[PlusJakartaSans-SemiBold] text-md text-[#b8b8b8]">
          $75,138,721
        </Text>
      </View>
      <View className="bg-[#344A71] py-2 rounded-xl mt-4">
        <View className="flex-row items-center justify-between px-4">
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#5089FF] bg-[#5089FF1A] px-3 py-1 rounded-full">
            Lending
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#ffffff]">
            $75,138,721
          </Text>
        </View>
        <View>
          <Text className="text-sm text-[#b8b8b8] px-4 my-4 py-2">
            Health rate{' '}
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              {' '}
              1.12
            </Text>
          </Text>
        </View>
        <View className="flex-row px-4">
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#b8b8b8] w-[30%]">
            SUPPLIED
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#b8b8b8] w-[40%]">
            AMOUNT
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#b8b8b8] w-[30%]">
            USD VALUE
          </Text>
        </View>
        <View className="flex-row items-center px-4 mt-3">
          <View className="flex-row items-center gap-x-2 w-[30%]">
            <Image source={require('../../../assets/images/bitcoin.png')} />
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff]">
              BNB
            </Text>
          </View>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff] w-[40%]">
            934,788.89
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff] w-[30%]">
            $228,649,362
          </Text>
        </View>
        <View className="flex-row px-4 mt-6">
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#b8b8b8] w-[30%]">
            BORROWED
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#b8b8b8] w-[40%]">
            AMOUNT
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#b8b8b8] w-[30%]">
            USD VALUE
          </Text>
        </View>
        <View className="flex-row items-center px-4 mt-3">
          <View className="flex-row items-center gap-x-2 w-[30%]">
            <Image source={require('../../../assets/images/bitcoin.png')} />
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff]">
              BNB
            </Text>
          </View>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff] w-[40%]">
            934,788.89
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff] w-[30%]">
            $228,649,362
          </Text>
        </View>
        <View className="flex-row items-center px-4 mt-2">
          <View className="flex-row items-center gap-x-2 w-[30%]">
            <Image source={require('../../../assets/images/bitcoin.png')} />
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff]">
              BNB
            </Text>
          </View>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff] w-[40%]">
            934,788.89
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff] w-[30%]">
            $228,649,362
          </Text>
        </View>
        <View className="flex-row px-4 mt-6">
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#b8b8b8] w-[30%]">
            REWARDS
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#b8b8b8] w-[40%]">
            AMOUNT
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#b8b8b8] w-[30%]">
            USD VALUE
          </Text>
        </View>
        <View className="flex-row items-center px-4 mt-3">
          <View className="flex-row items-center gap-x-2 w-[30%]">
            <Image source={require('../../../assets/images/bitcoin.png')} />
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff]">
              BNB
            </Text>
          </View>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff] w-[40%]">
            934,788.89
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff] w-[30%]">
            $228,649,362
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VenusTable;
