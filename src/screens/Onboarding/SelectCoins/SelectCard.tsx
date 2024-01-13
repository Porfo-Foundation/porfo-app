import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {SetStateAction, Dispatch} from 'react';
import SelectedTick from '../../../assets/icons/svg/selected-coin.svg';
import {ICoin} from '../../../interfaces/main';

type selectCardType = {
  data: ICoin;
  selectedCoins: ICoin[];
  setSelectedCoins: Dispatch<SetStateAction<ICoin[]>>;
  isSelected: boolean;
};
const SelectCard = ({
  data,
  isSelected,
  selectedCoins,
  setSelectedCoins,
}: selectCardType) => {
  const chainMap = {
    1: {
      symbol: 'ETH',
      image: require('../../../assets/images/ETH.png'),
    },
    56: {
      symbol: 'BSC',
      image: require('../../../assets/images/BSC.png'),
    },
    137: {
      symbol: 'MATIC',
      image: require('../../../assets/images/MATIC.png'),
    },
  };
  const handlePress = () => {
    if (isSelected) {
      setSelectedCoins(
        selectedCoins.filter((coin: any) => coin.id !== data.id),
      );
    } else {
      setSelectedCoins([...selectedCoins, data]);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`border-2 justify-between ${
        isSelected
          ? 'bg-[#282C51] border-[#282C51]'
          : 'bg-background-100 border-[#6681AE]'
      } rounded-xl w-full flex flex-row items-center p-2 mt-2`}>
      <View className="flex flex-row items-center gap-x-2 relative">
        <Image
          source={{
            uri: data?.logoURI,
          }}
        />
        <Image
          className="absolute top-0 left-5 shadow-md"
          source={chainMap?.[data?.chainId]?.image}
        />
        <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
          {data?.name}
        </Text>
      </View>
      {isSelected && <SelectedTick />}
    </TouchableOpacity>
  );
};

export default SelectCard;
