/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../../redux/hooks';
import {togglePopup, updatepopupName} from '../../../redux/features/popupSlice';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import CoinLogo from '../../../components/coindetails/CoinLogo';
import CoinPnl from '../../../components/coindetails/CoinPnl';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {updateSwapCoin} from '../../../redux/features/coinSlice';
import {ICoin, ICoinBalance} from '../../../interfaces/main';
import {EmptyCoin} from '../../../helpers/coin';
import {showAmount} from '../../../helpers/showAmount';
const {width} = Dimensions.get('screen');

const InactivePortfolioCard = ({
  balance,
  horizontal,
  isWatchable,
}: {
  balance: ICoinBalance;
  horizontal?: boolean;
  isWatchable?: boolean;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const coin: ICoin =
    typeof balance?.coin === 'string' ? EmptyCoin : balance?.coin;

  if (horizontal) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        className="rounded-xl"
        onPress={() => navigation.navigate('CoinDetails', {coin: coin})}>
        <ImageBackground
          className="rounded-xl flex flex-row items-center mx-4 my-1.5 pl-3 justify-between"
          imageStyle={{borderRadius: 12}}
          source={require('../../../assets/images/inactive-horizontal-bg.png')}>
          <View className="flex-1 flex-row justify-between items-center pr-2">
            <View className="flex flex-row py-2 relative justify-between items-center">
              <CoinLogo logoURI={coin.logoURI} chainId={coin?.chainId} />
              <View className="ml-2">
                <Text
                  className={
                    'font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] mb-1'
                  }>
                  {showAmount(balance?.value)} {coin?.symbol}
                </Text>
                <Text
                  className={
                    'font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] opacity-50'
                  }>
                  ${coin?.usdPrice?.toLocaleString()}
                </Text>
              </View>
            </View>
            <CoinPnl pnlPercentage={balance?.pnl} />
          </View>

          {isWatchable ? null : (
            <TouchableOpacity
              onPress={() => {
                dispatch(updateSwapCoin(coin));
                dispatch(updatepopupName('SwapCoins'));
                dispatch(togglePopup());
              }}
              className="bg-primary-600 h-20 items-center justify-center rounded-r-xl">
              <Text className="text-[#000000] -rotate-90 px-3">Buy</Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CoinDetails', {coin: coin})}
      activeOpacity={0.8}
      className="rounded-xl"
      style={{width: (width - 32) * 0.35 - 10, marginRight: 14}}>
      <ImageBackground
        className="rounded-xl"
        imageStyle={{borderRadius: 12}}
        source={require('../../../assets/images/inactive-card-bg.png')}>
        <View className="w-full">
          <View className="w-full pt-4 pb-4 ml-3">
            <View className="w-full flex-row items-center justify-start relative">
              <CoinLogo logoURI={coin?.logoURI} chainId={coin?.chainId} />
              <Text
                className={
                  'font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] ml-1'
                }>
                {coin?.symbol}
              </Text>
            </View>
            <Text
              className={
                'font-[PlusJakartaSans-SemiBold] text-[10px] text-[#FFFFFF] mb-1 mt-4'
              }>
              {showAmount(balance?.value)}
            </Text>
            <Text
              className={
                'font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] opacity-50'
              }>
              ${coin?.usdPrice?.toLocaleString()}
            </Text>
            <CoinPnl pnlPercentage={balance.pnl} />
          </View>
          {isWatchable ? null : (
            <TouchableOpacity
              onPress={() => {
                dispatch(updateSwapCoin(coin));
                dispatch(updatepopupName('SwapCoins'));
                dispatch(togglePopup());
              }}
              className="bg-primary-600 py-2 items-center justify-center rounded-b-xl">
              <Text className="text-[#000000] px-3">Buy</Text>
            </TouchableOpacity>
          )}
          {/* <Image
            source={require('../../../assets/images/graph-md.png')}
            style={{width: (width - 32) * 0.3 - 10}}
          /> */}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default InactivePortfolioCard;
