import {View, Text} from 'react-native';
import React from 'react';
import Information from '../../../assets/icons/svg/information.svg';
import DownTrend from '../../../assets/icons/svg/downtrend.svg';
import UpTrend from '../../../assets/icons/svg/uptrend.svg';
import DropDown from '../../../assets/icons/svg/dropdown-black.svg';

const PriceStatisticsDetailed = ({coinDetails}: any) => {
  // format date like November 10, 2021
  const formatTimestamp = (isoTimestamp: string) => {
    const date = new Date(isoTimestamp);
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <View className="px-6 pt-6">
      <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF]">
        {coinDetails?.symbol?.toUpperCase()} Price Statistics
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
      <View className="pt-7">
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              Volume/Market cap (24h)
            </Text>
            <Information />
          </View>
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              {(
                (coinDetails?.market_data?.total_volume?.usd /
                  coinDetails?.market_data?.market_cap?.usd) *
                100
              ).toFixed(2)}{' '}
              %
            </Text>
          </View>
        </View>
      </View>

      <View className="pt-7">
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
      <View className="pt-7">
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              Total Supply
            </Text>
            <Information />
          </View>
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              {coinDetails?.market_data?.total_supply?.toLocaleString()}{' '}
              {coinDetails?.symbol?.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View className="pt-7">
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              Max Supply
            </Text>
            <Information />
          </View>
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              {coinDetails?.market_data?.max_supply?.toLocaleString()}{' '}
              {coinDetails?.symbol?.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View className="pt-7">
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              Fully diluted market cap
            </Text>
            <Information />
          </View>
          <View className="flex-row items-center gap-x-1">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              $
              {coinDetails?.market_data?.fully_diluted_valuation?.usd?.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
      <View className="pt-7">
        <View className="flex-row justify-between">
          <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF]">
            Price Performance
          </Text>
          <View className="flex-row items-center gap-x-2 bg-[#A2B8D9] px-3 rounded">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#000000]">
              24H
            </Text>
            {/* <DropDown /> */}
          </View>
        </View>
      </View>
      <View className="pt-7">
        <View className="flex-row justify-between mb-1">
          <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
            Low
          </Text>
          <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
            High
          </Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
            ${coinDetails?.market_data?.low_24h?.usd?.toLocaleString()}
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
            ${coinDetails?.market_data?.high_24h?.usd?.toLocaleString()}
          </Text>
        </View>
        <View className="flex-row items-center mt-1.5">
          <View className="flex-1 flex-row relative">
            <View className="flex-1 bg-[#FFFFFF] opacity-60 h-1.5"></View>
            <View className="absolute bg-[#ffffff] h-4 right-0 -top-1"></View>
          </View>
        </View>
      </View>
      <View className="mt-8 pb-8">
        <View className="flex-row justify-between mb-1">
          <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
            All-time high
          </Text>
          <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
            ${coinDetails?.market_data?.ath?.usd?.toLocaleString()}
          </Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
            {/* Nov 10, 2021 (2 years ago) */}
            {formatTimestamp(coinDetails?.market_data?.ath_date?.usd)}
          </Text>
          <Text className="font-[PlusJakartaSans-semiBold] text-sm text-semantic-error">
            {coinDetails?.market_data?.ath_change_percentage?.usd?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View className="pb-8">
        <View className="flex-row justify-between mb-1">
          <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
            All-time low
          </Text>
          <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
            ${coinDetails?.market_data?.atl?.usd?.toLocaleString()}
          </Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
            {/* Nov 15, 2011 (13 years ago) */}
            {formatTimestamp(coinDetails?.market_data?.atl_date?.usd)}
          </Text>
          <Text className="font-[PlusJakartaSans-semiBold] text-sm text-semantic-success">
            {coinDetails?.market_data?.atl_change_percentage?.usd?.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PriceStatisticsDetailed;
