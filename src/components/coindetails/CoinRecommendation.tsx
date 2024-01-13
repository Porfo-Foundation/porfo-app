import {View, Image, Text, Pressable} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../redux/hooks';
import {togglePopup, updatepopupName} from '../../redux/features/popupSlice';
import {ISelectedCoin} from '../../interfaces/main';
import {updateSelectedCoin} from '../../redux/features/mainSlice';
import CoinLogo from './CoinLogo';

type propsType = {
  firstCoin: ISelectedCoin;
};
const CoinRecommendation = ({firstCoin}: propsType) => {
  const dispatch = useAppDispatch();
  return (
    <Pressable
      onPress={() => {
        dispatch(updateSelectedCoin(firstCoin));
        dispatch(updatepopupName('TradeRecommendation'));
        dispatch(togglePopup());
      }}
      className="flex w-full flex-row justify-between items-center p-0.5 border-2 dark:border-neutral-700 rounded-md mt-1">
      <View className="w-[60px] h-[60px] justify-center items-center">
        <View className="w-[40px] h-[40px] border-2 dark:border-neutral-700 rounded-full justify-center items-center">
          <CoinLogo
            logoURI={firstCoin.coin.logoURI}
            chainId={firstCoin.coin.chainId}
          />
        </View>
        <Text className="dark:text-neutral-200">{firstCoin.coin.symbol}</Text>
      </View>
      <Image
        source={require('../../assets/images/left-to-right-arrow.png')}
        className="w-[100px] h-[37px]"
      />
      <View className="w-[60px] h-[60px] justify-center items-center">
        <View className="w-[40px] h-[40px] border-2 dark:border-neutral-700 rounded-full justify-center items-center">
          <Image
            source={require('../../assets/images/etherium-logo.png')}
            className="w-[37px] h-[37px]"
          />
        </View>
        <Text className="dark:text-neutral-200">{'ETH'}</Text>
      </View>
    </Pressable>
  );
};

export default CoinRecommendation;
