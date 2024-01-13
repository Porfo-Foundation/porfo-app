/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

const ActivePortfolioCard = ({horizontal}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="rounded-xl"
      style={{width: (width - 32) * 0.4 - 10, marginRight: 14}}>
      <ImageBackground
        className="rounded-xl"
        imageStyle={{borderRadius: 12}}
        source={require('../../../assets/images/active-card-bg.png')}>
        <View>
          <View className="px-4 pt-4">
            <Image source={require('../../../assets/images/bitcoin.png')} />
            <Text
              className={
                'font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF] mb-1 mt-6'
              }>
              0.24 BTC
            </Text>
            <Text
              className={
                'font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] opacity-50'
              }>
              $123456 CAD
            </Text>
            <Text
              className={
                'font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] opacity-50'
              }>
              1.44%
            </Text>
          </View>
          <Image
            source={require('../../../assets/images/graph-md.png')}
            style={{width: (width - 32) * 0.4 - 10}}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ActivePortfolioCard;
