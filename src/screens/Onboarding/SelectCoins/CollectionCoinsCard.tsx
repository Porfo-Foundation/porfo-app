import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import SelectedTick from '../../../assets/icons/svg/selected-coin.svg';
const {width} = Dimensions.get('screen');

const CollectionCoinsCard = ({
  data,
  setSelectedCollection,
  isSelected,
  setSelectedCoins,
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedCollection(data.item);
        setSelectedCoins(data.item.coins);
      }}
      activeOpacity={0.8}
      className={`border-2 mr-1.5 mb-2.5 rounded-lg py-2 px-1 ${
        isSelected
          ? 'bg-[#282C51] border-[#282C51]'
          : 'bg-background-100 border-[#6681AE]'
      }`}
      style={{width: (width - 48) / 3 - 6}}>
      <View className="flex flex-row items-start pl-5 justify-between">
        {data.item.coins.map((coin: any, index: any) => {
          return (
            <Image
              key={index}
              source={{
                uri: coin?.logoURI,
              }}
            />
          );
        })}

        {isSelected && <SelectedTick />}
      </View>
      <View className="flex flex-row py-2 pl-1 gap-x-2 items-center">
        <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FEFDFD]">
          {data.item.name}
        </Text>
        <Image
          source={require('../../../assets/images/star.png')}
          className="mt-1"
        />
      </View>
      <View className="flex flex-row pl-1 gap-x-1 items-center opacity-60">
        <Text className="font-[PlusJakartaSans-Regular] text-[10px] text-[#FEFDFD]">
          1yr APY
        </Text>
        <Text className="font-[PlusJakartaSans-Regular] text-[10px] text-[#F8DC7B]">
          +20%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CollectionCoinsCard;
