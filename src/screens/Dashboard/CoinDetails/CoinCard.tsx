import {View, Text, ImageBackground, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../redux/hooks';
import useCoinList from '../../../hooks/reactQuery/apiHooks/useCoinList';

type coinType = {
  coinDetails: any;
  coinId: any;
};
const CoinCard = ({coinDetails, coinId}: coinType) => {
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
    <ImageBackground
      className="rounded-xl flex my-1.5 py-4 px-5"
      imageStyle={{borderRadius: 12}}
      source={require('../../../assets/images/history-bg.png')}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image source={{uri: `${coinLogo}`}} className="w-[37px] h-[37px]" />
          <Text
            className={`font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] ml-2`}>
            {coinDetails?.name} ({coinDetails?.symbol?.toUpperCase()})
          </Text>
        </View>
        <View
          className={`flex-row gap-x-2 p-2 border-2 ${
            coinDetails?.market_data?.price_change_percentage_24h_in_currency
              .usd < 0
              ? 'border-semantic-error'
              : 'border-semantic-success'
          } rounded-xl items-end`}>
          {/* <Text
            className={`font-[PlusJakartaSans-semiBold] text-[10px] text-[#FFFFFF] opacity-70`}>
            H
          </Text> */}
          <Text
            className={`font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]`}>
            {coinDetails?.market_data?.price_change_percentage_24h_in_currency?.usd.toFixed(
              2,
            )}{' '}
            %
          </Text>
        </View>
        {/* <View className="flex-row items-center gap-x-2">
          <Share />
          <Exclamatory />
        </View> */}
      </View>
      <View className="mt-4 flex flex-row items-center justify-between">
        <Text
          className={`font-[PlusJakartaSans-semiBold] text-3xl text-[#FFFFFF]`}>
          ${coinDetails?.market_data?.current_price?.usd.toLocaleString()}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default CoinCard;
