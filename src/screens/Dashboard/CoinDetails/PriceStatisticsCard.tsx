import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Information from '../../../assets/icons/svg/information.svg';
import DownTrend from '../../../assets/icons/svg/downtrend.svg';
import UpTrend from '../../../assets/icons/svg/uptrend.svg';
import {SelectedCardProps} from './AboutCoin';

const PriceStatisticsCard = ({coinDetails, onPress}: SelectedCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-[#0D2B59] rounded-lg mt-4 p-4 py-6"
      onPress={onPress}>
      <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF]">
        {coinDetails?.name} Price Statistics
      </Text>
      <Text className="font-[PlusJakartaSans-SemiBold] py-5 text-sm text-[#FFFFFF]">
        {coinDetails?.name} Market Cap
      </Text>
      <View className="pt-5">
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              Market Cap
            </Text>
            <Information />
          </View>
          <View className="flex-row items-center gap-x-1">
            {coinDetails?.market_data
              ?.market_cap_change_percentage_24h_in_currency?.usd < 0 ? (
              <DownTrend />
            ) : (
              <UpTrend />
            )}
            <Text
              className={`font-[PlusJakartaSans-SemiBold] text-sm ${
                coinDetails?.market_data
                  ?.market_cap_change_percentage_24h_in_currency?.usd < 0
                  ? 'text-semantic-error'
                  : 'text-semantic-success'
              } `}>
              {coinDetails?.market_data?.market_cap_change_percentage_24h_in_currency?.usd?.toFixed(
                2,
              )}
              %
            </Text>
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              ${coinDetails?.market_data?.market_cap?.usd?.toLocaleString()}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center mt-1.5">
          <View className="flex-1 flex-row relative">
            <View className="flex-1 bg-[#FFFFFF] opacity-60 h-1 mt-2 rounded-sm"></View>
          </View>
        </View>
      </View>
      <View className="pt-5">
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              Volume (24h)
            </Text>
            <Information />
          </View>
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-semantic-success"></Text>
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              ${coinDetails?.market_data?.total_volume?.usd?.toLocaleString()}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center mt-1.5">
          <View className="flex-1 flex-row relative">
            <View className="flex-1 bg-[#FFFFFF] opacity-60 h-1 mt-2 rounded-sm"></View>
          </View>
        </View>
      </View>
      <View className="pt-5">
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              Circulating Supply
            </Text>
            <Information />
          </View>
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              {coinDetails?.market_data?.circulating_supply?.toLocaleString()}{' '}
              {coinDetails?.symbol?.toUpperCase()}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center mt-1.5">
          <View className="flex-1 flex-row relative">
            <View className="flex-1 bg-[#FFFFFF] opacity-60 h-1.5 mr-4"></View>
            {/* <View className="absolute bg-[#ffffff] h-4 right-4 -top-1 w-1"></View> */}
          </View>
          <Text className="bg-[#A2B8D9] px-1.5 rounded py-px text-xs font-[PlusJakartaSans-SemiBold]">
            {(
              (coinDetails?.market_data?.circulating_supply /
                coinDetails?.market_data?.total_supply) *
              100
            ).toFixed(2)}{' '}
            %
          </Text>
        </View>
      </View>
      <View className="my-6 flex-row items-center justify-between">
        <Text className="font-[PlusJakartaSans-Bold] text-lg text-[#FFFFFF]">
          Price performance
        </Text>
        <Text className="bg-[#A2B8D9] px-1.5 font-[PlusJakartaSans-SemiBold] rounded py-px">
          24H
        </Text>
      </View>
      <View>
        <View className="flex-row items-center justify-between">
          <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#FFFFFF]">
            Low
          </Text>
          <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#FFFFFF]">
            High
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
            ${coinDetails?.market_data?.low_24h?.usd?.toLocaleString()}
          </Text>
          <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
            ${coinDetails?.market_data?.high_24h?.usd?.toLocaleString()}
          </Text>
        </View>
        <View className="flex-1 flex-row relative mt-3">
          <View className="flex-1 bg-[#FFFFFF] opacity-60 h-1.5"></View>
          <View className="absolute bg-[#ffffff] h-4 right-0 -top-1"></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PriceStatisticsCard;
