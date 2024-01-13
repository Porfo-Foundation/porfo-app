/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import CoinLogo from '../../../components/coindetails/CoinLogo';
const screenWidth = Dimensions.get('screen').width;

const AccumulatedPortfolioCard = ({navigation, portfolio}: any) => {
  return (
    <TouchableOpacity className="h-52" style={{width: screenWidth / 2}}>
      <ImageBackground
        className="ml-3 p-2 justify-center items-center"
        imageStyle={{borderRadius: 12}}
        source={require('../../../assets/images/inactive-horizontal-bg.png')}>
        <Text className="text-neutral-200">{portfolio.name}</Text>
        <View className="h-[30%] mt-4 w-full flex-wrap border-b-2 justify-center items-center border-r-typography-primary self-center">
          <ScrollView
            className="w-full self-center"
            horizontal
            nestedScrollEnabled>
            {portfolio.coins.map((coin: any, index: number) => (
              <View className="mr-[1.2px] ">
                <CoinLogo
                  symbol={coin?.coin?.logoURI}
                  chainId={coin?.coin?.chainId}
                  key={index}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="flex w-full flex-row justify-center items-center gap-2 mt-2">
          <View className="flex flex-col justify-between mt-1 pb-1">
            <View className="flex flex-col justify-between items-center gap-1 ">
              <CoinLogo
                symbol={portfolio?.baseCoin?.logoURI}
                chainId={portfolio?.baseCoin?.chainId}
              />
            </View>
          </View>
          <View className="flex flex-col justify-between items-center mt-1">
            <View className="flex flex-col justify-between items-center gap-1 ">
              <CoinLogo
                symbol={portfolio?.stableCoin?.logoURI}
                chainId={portfolio?.stableCoin?.chainId}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AccumulatedPortfolioCard;
