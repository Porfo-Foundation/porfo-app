import {View, ScrollView} from 'react-native';
import React from 'react';
import CoinRecommendation from './CoinRecommendation';
import {ISelectedCoin} from '../../interfaces/main';
type propsType = {
  coin: ISelectedCoin;
};
const CoinList = ({coin}: propsType) => {
  return (
    <View className="flex-1">
      <ScrollView className="">
        <CoinRecommendation firstCoin={coin} />
        <CoinRecommendation firstCoin={coin} />
        <CoinRecommendation firstCoin={coin} />
        <CoinRecommendation firstCoin={coin} />
        <CoinRecommendation firstCoin={coin} />
        <CoinRecommendation firstCoin={coin} />
        <CoinRecommendation firstCoin={coin} />
        <CoinRecommendation firstCoin={coin} />
        <CoinRecommendation firstCoin={coin} />
        <CoinRecommendation firstCoin={coin} />
      </ScrollView>
    </View>
  );
};

export default CoinList;
