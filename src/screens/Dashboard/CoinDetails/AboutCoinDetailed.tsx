import {View, Text, Image, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';

import Website from '../../../assets/icons/svg/website.svg';
import Whitepaper from '../../../assets/icons/svg/whitepaper.svg';
import Github from '../../../assets/icons/svg/github.svg';
import Reddit from '../../../assets/icons/svg/reddit.svg';
import Explorer from '../../../assets/icons/svg/explorer.svg';
import {useAppSelector} from '../../../redux/hooks';
import useCoinList from '../../../hooks/reactQuery/apiHooks/useCoinList';

const AboutCoinDetailed = ({coinDetails, coinId}: any) => {
  const [coinLogo, setCoinLogo] = useState(
    'https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/default.png',
  );
  const {data: coinList} = useCoinList();

  useEffect(() => {
    coinList?.map(coin => {
      if (coin.coinId === coinId) {
        setCoinLogo(coin.logoURI);
      }
    });
  }, [coinDetails, coinId]);
  return (
    <View className="px-6 pt-6">
      <View className="flex items-center flex-row gap-x-3 mb-3">
        <Image source={{uri: `${coinLogo}`}} className="w-[37px] h-[37px]" />
        <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF]">
          About {coinDetails?.name}
        </Text>
      </View>
      <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
        Official links
      </Text>
      <View className="flex-row mt-2 gap-x-2">
        <View className="flex-row items-center gap-x-1.5 ml-1 pr-2 py-1 rounded bg-[#868686]">
          <Website />
          <Text
            className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]"
            onPress={() =>
              Linking.openURL(`${coinDetails?.links?.homepage[0]}`)
            }>
            Website
          </Text>
        </View>
        <View className="flex-row items-center gap-x-1.5 ml-1 pr-2 py-1 rounded bg-[#868686]">
          <Github />
          <Text
            className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]"
            onPress={() =>
              Linking.openURL(`${coinDetails?.links?.repos_url?.github[0]}`)
            }>
            Github
          </Text>
        </View>
      </View>
      <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] mt-3">
        Social links
      </Text>
      <View className="flex-row mt-2 gap-x-2">
        <View className="flex-row items-center gap-x-1.5 ml-1 pr-2 py-1 rounded bg-[#868686]">
          <Reddit />
          <Text
            className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]"
            onPress={() =>
              Linking.openURL(`${coinDetails?.links?.subreddit_url}`)
            }>
            Reddit
          </Text>
        </View>
      </View>
      <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] mt-2">
        Network Information
      </Text>
      <View className="flex-row flex-wrap mt-2 gap-x-2">
        <View className="flex-row items-center gap-x-1.5 ml-1 pr-2 py-1 rounded bg-[#868686]">
          <Explorer />
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
            Chain explorers
          </Text>
          {/* <Dropdown /> */}
        </View>
        {coinDetails?.links?.blockchain_site?.map(
          (explorer: string, index: number) => {
            return (
              explorer !== '' && (
                <View
                  className="flex-row items-center gap-x-1.5 ml-1 mt-1 pr-2 py-1 rounded bg-[#4b4646]"
                  key={index}>
                  <Text
                    className="font-[PlusJakartaSans-SemiBold] text-xs text-[#ffffff]"
                    onPress={() => Linking.openURL(`${explorer}`)}>
                    {explorer}
                  </Text>
                </View>
              )
            );
          },
        )}
      </View>
      {/* <Text className="font-[PlusJakartaSans-semiBold] text-sm mt-5 text-[#FFFFFF]">
        What is {coinDetails?.name} ({coinDetails?.symbol?.toUpperCase()})?
      </Text>
      <Text className="font-[PlusJakartaSans-semiBold] text-sm mt-2 text-[#FFFFFF] pb-6 text-justify">
        {coinDetails?.description?.en}
      </Text> */}
    </View>
  );
};

export default AboutCoinDetailed;
