import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import SelectedTick from '../../../assets/icons/svg/selected-coin.svg';
import {ICoin} from '../../../interfaces/main';
import {useAppDispatch} from '../../../redux/hooks';
import {
  updateBaseCoin,
  updateStableCoin,
} from '../../../redux/features/onBoardingSlice';
import CoinLogo from '../../../components/coindetails/CoinLogo';

type coinCardType = {
  coin: ICoin;
  type: 'base' | 'stable';
  isSelected: boolean;
};
const CoinCard = ({coin, type, isSelected}: coinCardType) => {
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        type === 'base'
          ? dispatch(updateBaseCoin(coin))
          : dispatch(updateStableCoin(coin));
      }}
      className={`w-44 border-2 rounded-xl p-3 mr-3 ${
        isSelected
          ? 'bg-[#282C51] border-[#282C51]'
          : 'bg-background-100 border-[#6681AE]'
      }`}
      activeOpacity={0.8}>
      <View className="w-full flex flex-row items-start justify-between">
        <View className="relative">
          <CoinLogo logoURI={coin.logoURI} chainId={coin?.chainId} />
          {/* <Image
            source={{uri: `${coin.logoURI}`}}
            className="w-[24px] h-[24px] rounded-full"
          />
          <Image
            source={chainMap?.[coin?.chainId]?.image}
            className="absolute left-4 -top-1 w-4 h-4 shadow-md"
          /> */}
        </View>
        {isSelected && <SelectedTick />}
      </View>
      <View className="flex flex-row items-center gap-x-2 mb-1 mt-2">
        <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FEFDFD]">
          {coin.name}
        </Text>
        <Image
          source={require('../../../assets/images/star.png')}
          className="mt-1"
        />
      </View>
      <View className="flex flex-col items-start justify-between">
        <Text className="text-[#999999] font-[PlusJakartaSans-semiBold] text-[10px]">
          Market Cap: ${coin.marketCap.toLocaleString()}
        </Text>
        <Text className="text-[#999999] font-[PlusJakartaSans-semiBold] text-[10px]">
          Price: ${coin.usdPrice.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CoinCard;
